#!/usr/bin/env node

require('../src/setup_node_env');

const Fs = require('node:fs');
const Path = require('node:path');
const { lastValueFrom } = require('@osd/std');
const { toArray } = require('rxjs/operators');
const { OptimizerConfig } = require('@osd/optimizer');
const {
  observeWorker,
} = require('@osd/optimizer/target/optimizer/observe_worker');
const {
  getBundleCacheEvent$,
} = require('@osd/optimizer/target/optimizer/bundle_cache');

const dashboardRoot = Path.resolve(__dirname, '..');
const requestedBundleIds = [...new Set(process.argv.slice(2))];

async function main() {
  if (!requestedBundleIds.length) {
    throw new Error('At least one Wazuh browser bundle id is required');
  }

  const config = OptimizerConfig.create({
    repoRoot: dashboardRoot,
    includeCoreBundle: false,
    cache: true,
    watch: false,
    examples: false,
    maxWorkerCount: 1,
    filter: requestedBundleIds,
  });
  const discoveredBundleIds = config.bundles.map(({ id }) => id).sort();
  const expectedBundleIds = [...requestedBundleIds].sort();

  if (JSON.stringify(discoveredBundleIds) !== JSON.stringify(expectedBundleIds)) {
    throw new Error(
      `Expected Wazuh bundles ${expectedBundleIds.join(', ')}, found: ${
        discoveredBundleIds.join(', ') || 'none'
      }`
    );
  }

  const optimizerCacheKey = 'wazuh-4.14.6';
  const cacheEvents = await lastValueFrom(
    getBundleCacheEvent$(config, optimizerCacheKey).pipe(toArray())
  );
  const bundlesToBuild = cacheEvents
    .filter(({ type }) => type === 'bundle not cached')
    .map(({ bundle }) => bundle);
  const cachedIds = cacheEvents
    .filter(({ type }) => type === 'bundle cached')
    .map(({ bundle }) => bundle.id)
    .sort();

  if (cachedIds.length) {
    console.log(`[wazuh-source] Reusing current bundles: ${cachedIds.join(', ')}`);
  }

  let events = [];
  if (bundlesToBuild.length) {
    console.log(
      `[wazuh-source] Building ${bundlesToBuild
        .map(({ id }) => id)
        .sort()
        .join(', ')} with one optimizer worker`
    );
    events = await lastValueFrom(
      observeWorker(
        config,
        config.getWorkerConfig(optimizerCacheKey),
        bundlesToBuild
      ).pipe(toArray())
    );
  }
  const failure = events.find(({ type }) =>
    ['compiler error', 'compiler issue', 'worker error'].includes(type)
  );

  if (failure) {
    throw new Error(
      failure.errorMsg || failure.failure || `Optimizer failed: ${failure.type}`
    );
  }

  const successfulBundleIds = new Set(
    events
      .filter(({ type }) => type === 'compiler success')
      .map(({ bundleId }) => bundleId)
  );
  for (const bundle of bundlesToBuild) {
    const outputFile = Path.join(bundle.outputDir, `${bundle.id}.plugin.js`);
    if (!successfulBundleIds.has(bundle.id)) {
      throw new Error(`Optimizer did not report success for ${bundle.id}`);
    }
    if (!Fs.existsSync(outputFile)) {
      throw new Error(`Browser bundle was not written: ${outputFile}`);
    }
    console.log(`[wazuh-source] Built ${outputFile}`);
  }

  for (const bundle of config.bundles) {
    const outputFile = Path.join(bundle.outputDir, `${bundle.id}.plugin.js`);
    if (!Fs.existsSync(outputFile)) {
      throw new Error(`Browser bundle is missing: ${outputFile}`);
    }
  }
}

// Keep Node alive until the optimizer worker Observable has fully settled.
const lifecycleHandle = setInterval(() => {}, 1000);

main()
  .catch((error) => {
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  })
  .finally(() => clearInterval(lifecycleHandle));
