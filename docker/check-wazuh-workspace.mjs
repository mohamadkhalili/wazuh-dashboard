#!/usr/bin/env node

import { access, lstat, readFile, readdir, realpath, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";

const workspaceRoot = path.resolve(process.argv[2] || "/workspace");
const sourceRoot = path.resolve(process.argv[3] || workspaceRoot);
const expected = {
  dashboard: "2.19.5",
  wazuh: "4.14.6",
  nodeAbi: "108",
};
const errors = [];
const dashboardRoot = path.join(workspaceRoot, "wazuh-dashboard");
const requireFromDashboard = createRequire(path.join(dashboardRoot, "package.json"));
const ignoredSourceDirectories = new Set([
  ".git",
  "build",
  "graphify-out",
  "node_modules",
  "target",
]);

const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(workspaceRoot, relativePath), "utf8"));
const expect = (actual, wanted, label) => {
  if (actual !== wanted) {
    errors.push(`${label} is ${actual || "unknown"}; expected ${wanted}`);
  }
};

const treeDigest = async (root) => {
  const digest = createHash("sha256");
  const visit = async (directory, prefix = "") => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      if (!prefix && ignoredSourceDirectories.has(entry.name)) continue;
      const relativePath = path.posix.join(prefix, entry.name);
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolutePath, relativePath);
      } else if (entry.isFile()) {
        digest.update(relativePath);
        digest.update("\0");
        digest.update(await readFile(absolutePath));
        digest.update("\0");
      }
    }
  };
  await visit(root);
  return digest.digest("hex");
};

const workspacePackageLinks = async () => {
  const nodeModules = path.join(dashboardRoot, "node_modules");
  const links = [];

  for (const name of await readdir(nodeModules)) {
    const candidate = path.join(nodeModules, name);
    if (name.startsWith("@")) {
      for (const packageName of await readdir(candidate)) {
        links.push(path.join(candidate, packageName));
      }
    } else {
      links.push(candidate);
    }
  }

  return links;
};

for (const packagePath of await workspacePackageLinks()) {
  if (!(await lstat(packagePath)).isSymbolicLink()) continue;

  const sourcePath = path.relative(dashboardRoot, await realpath(packagePath));
  if (sourcePath.split(path.sep)[0] === "test") continue;

  const packageJsonPath = path.join(packagePath, "package.json");
  let packageJson;
  try {
    packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  } catch {
    continue;
  }

  for (const field of ["main", "module", "browser"]) {
    const entrypoint = packageJson[field];
    if (typeof entrypoint !== "string") continue;

    try {
      await access(path.resolve(packagePath, entrypoint));
    } catch {
      errors.push(
        `${packageJson.name} ${field} entrypoint is missing: ${entrypoint}`
      );
    }
  }
}

const pluginSources = [
  [
    "Wazuh main plugin",
    "wazuh-dashboard/plugins/main",
    "wazuh-dashboard-plugins/plugins/main",
  ],
  [
    "Wazuh core plugin",
    "wazuh-dashboard/plugins/wazuh-core",
    "wazuh-dashboard-plugins/plugins/wazuh-core",
  ],
  [
    "Wazuh updates plugin",
    "wazuh-dashboard/plugins/wazuh-check-updates",
    "wazuh-dashboard-plugins/plugins/wazuh-check-updates",
  ],
  [
    "Wazuh RTL plugin",
    "wazuh-dashboard/plugins/wazuh-rtl",
    "wazuh-rtl/plugins/wazuh-rtl",
  ],
  [
    "Security plugin",
    "wazuh-dashboard/plugins/wazuh-security-dashboards-plugin",
    "wazuh-security-dashboards-plugin",
  ],
];

for (const [label, targetPath, sourcePath] of pluginSources) {
  try {
    const target = path.join(workspaceRoot, targetPath);
    const source = path.join(sourceRoot, sourcePath);
    if (sourceRoot === workspaceRoot) {
      const targetStat = await stat(target);
      const sourceStat = await stat(source);
      expect(
        `${targetStat.dev}:${targetStat.ino}`,
        `${sourceStat.dev}:${sourceStat.ino}`,
        `${label} source binding`
      );
    } else {
      expect(
        await treeDigest(target),
        await treeDigest(source),
        `${label} source snapshot`
      );
    }
  } catch (error) {
    errors.push(`${label} source is missing: ${error.message}`);
  }
}

if (sourceRoot !== workspaceRoot) {
  try {
    const targetPath = path.join(
      workspaceRoot,
      "wazuh-dashboard/plugins/wazuh-farsi"
    );
    const sourcePath = path.join(
      sourceRoot,
      "wazuh-farsi/dist/fa-IR-rtl/plugins/wazuh-farsi"
    );
    expect(
      await treeDigest(targetPath),
      await treeDigest(sourcePath),
      "Wazuh Farsi plugin source snapshot"
    );
  } catch (error) {
    errors.push(`Wazuh Farsi plugin source snapshot is missing: ${error.message}`);
  }

  for (const [label, targetPath, sourcePath] of [
    [
      "Wazuh Farsi package",
      "wazuh-dashboard/packages/wazuh-farsi",
      "wazuh-farsi/package",
    ],
  ]) {
    try {
      const target = await stat(path.join(workspaceRoot, targetPath));
      const source = await stat(path.join(sourceRoot, sourcePath));
      expect(
        `${target.dev}:${target.ino}`,
        `${source.dev}:${source.ino}`,
        `${label} source binding`
      );
    } catch (error) {
      errors.push(`${label} source binding is missing: ${error.message}`);
    }
  }
}

try {
  requireFromDashboard.resolve("wazuh-farsi/locale");
} catch (error) {
  errors.push(`Farsi package resolver is missing: ${error.message}`);
}

const dashboard = await readJson("wazuh-dashboard/package.json");
const main = await readJson("wazuh-dashboard-plugins/plugins/main/package.json");
const security = await readJson(
  "wazuh-security-dashboards-plugin/opensearch_dashboards.json"
);
const rtl = await readJson("wazuh-rtl/plugins/wazuh-rtl/package.json");

expect(dashboard.version, expected.dashboard, "Dashboard version");
expect(dashboard.wazuh?.version, expected.wazuh, "Dashboard Wazuh version");
expect(main.version, expected.wazuh, "Main Wazuh plugin version");
expect(main.pluginPlatform?.version, expected.dashboard, "Main plugin platform");
expect(
  security.opensearchDashboardsVersion,
  expected.dashboard,
  "Security plugin platform"
);
expect(rtl.version, expected.wazuh, "RTL plugin version");
expect(rtl.pluginPlatform?.version, expected.dashboard, "RTL plugin platform");

for (const [label, relativePath] of [
  ["Dashboard", "wazuh-dashboard/node_modules/.yarn-integrity"],
  [
    "Main Wazuh plugin",
    "wazuh-dashboard-plugins/plugins/main/node_modules/.yarn-integrity",
  ],
  [
    "Security plugin",
    "wazuh-security-dashboards-plugin/node_modules/.yarn-integrity",
  ],
]) {
  try {
    const integrity = await readJson(relativePath);
    const abi = integrity.systemParams?.split("-").at(-1);
    expect(abi, expected.nodeAbi, `${label} Node ABI`);
  } catch (error) {
    errors.push(`${label} dependencies are missing: ${error.message}`);
  }
}

if (errors.length) {
  throw new Error(
    [
      "The Docker source workspace is not compatible with Wazuh 4.14.6:",
      ...errors.map((error) => `- ${error}`),
    ].join("\n")
  );
}

console.log(
  JSON.stringify({
    ok: true,
    wazuhVersion: expected.wazuh,
    dashboardVersion: expected.dashboard,
    nodeAbi: expected.nodeAbi,
  })
);
