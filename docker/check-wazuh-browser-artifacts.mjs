#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const writeManifest = process.argv.includes('--write-manifest');
const manifestRelativePath = 'src/core/target/public/.wazuh-source-build.json';
const artifactRelativePaths = [
  'src/core/target/public/core.entry.js',
  'packages/osd-ui-shared-deps/target/osd-ui-shared-deps.js',
  'packages/osd-ui-shared-deps/target/osd-ui-shared-deps.@elastic.js',
  'packages/osd-ui-shared-deps/target/osd-ui-shared-deps.v7.light.css',
  'plugins/main/target/public/wazuh.plugin.js',
  'plugins/wazuh-core/target/public/wazuhCore.plugin.js',
  'plugins/wazuh-check-updates/target/public/wazuhCheckUpdates.plugin.js',
  'plugins/wazuh-security-dashboards-plugin/target/public/securityDashboards.plugin.js',
  'plugins/wazuh-rtl/target/public/wazuhRtl.plugin.js',
  'plugins/wazuh-farsi/target/public/wazuhFarsi.plugin.js',
];

const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(dashboardRoot, relativePath), 'utf8'));
const sha256 = (contents) => createHash('sha256').update(contents).digest('hex');
const errors = [];
const artifacts = {};

for (const relativePath of artifactRelativePaths) {
  const absolutePath = path.join(dashboardRoot, relativePath);
  try {
    const metadata = await stat(absolutePath);
    if (!metadata.isFile() || metadata.size === 0) {
      errors.push(`${relativePath} is empty or is not a regular file`);
      continue;
    }
    artifacts[relativePath] = sha256(await readFile(absolutePath));
  } catch (error) {
    errors.push(`${relativePath} is missing: ${error.message}`);
  }
}

const dashboard = await readJson('package.json');
const react = await readJson('node_modules/react/package.json');
const reactDom = await readJson('node_modules/react-dom/package.json');
const versions = {
  dashboard: dashboard.version,
  react: react.version,
  reactDom: reactDom.version,
};

try {
  const coreBundle = await readFile(
    path.join(dashboardRoot, 'src/core/target/public/core.entry.js'),
    'utf8'
  );
  const monacoSource = await readFile(
    path.join(dashboardRoot, 'packages/osd-monaco/src/index.ts'),
    'utf8'
  );
  const reactDomMajor = Number.parseInt(reactDom.version.split('.')[0], 10);

  if (reactDomMajor < 18 && coreBundle.includes('react-dom/client')) {
    errors.push(
      `core.entry.js imports react-dom/client but installed react-dom is ${reactDom.version}`
    );
  }
  if (!monacoSource.includes('setBuildHash') && coreBundle.includes('setBuildHash')) {
    errors.push(
      'core.entry.js calls setBuildHash but the current @osd/monaco source does not export it'
    );
  }
} catch (error) {
  errors.push(`Core compatibility check failed: ${error.message}`);
}

const manifestPath = path.join(dashboardRoot, manifestRelativePath);
if (writeManifest) {
  if (!errors.length) {
    await writeFile(
      manifestPath,
      `${JSON.stringify({ versions, artifacts }, null, 2)}\n`,
      'utf8'
    );
  }
} else {
  try {
    const manifest = await readJson(manifestRelativePath);
    for (const [name, version] of Object.entries(versions)) {
      if (manifest.versions?.[name] !== version) {
        errors.push(
          `Browser artifact ${name} version is ${manifest.versions?.[name] || 'unknown'}; expected ${version}`
        );
      }
    }
    for (const [relativePath, digest] of Object.entries(artifacts)) {
      if (manifest.artifacts?.[relativePath] !== digest) {
        errors.push(`${relativePath} does not match the source-build manifest`);
      }
    }
  } catch (error) {
    errors.push(`Browser artifact manifest is missing or invalid: ${error.message}`);
  }
}

if (errors.length) {
  throw new Error(
    [
      'The Docker browser artifacts are not compatible with the current Dashboard source:',
      ...errors.map((error) => `- ${error}`),
    ].join('\n')
  );
}

console.log(
  JSON.stringify({
    ok: true,
    mode: writeManifest ? 'manifest-written' : 'validated',
    artifactCount: artifactRelativePaths.length,
    versions,
  })
);
