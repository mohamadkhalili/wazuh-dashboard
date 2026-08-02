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

const dashboardRoot = Path.resolve(__dirname, '..');
const outputFile = Path.join(
  dashboardRoot,
  'plugins/wazuh-farsi/target/public/wazuhFarsi.plugin.js'
);

async function main() {
  const config = OptimizerConfig.create({
    repoRoot: dashboardRoot,
    includeCoreBundle: false,
    cache: false,
    watch: false,
    examples: false,
    maxWorkerCount: 1,
    filter: ['wazuhFarsi'],
  });

  if (config.bundles.length !== 1 || config.bundles[0].id !== 'wazuhFarsi') {
    throw new Error(
      `Expected exactly one wazuhFarsi bundle, found: ${config.bundles
        .map(({ id }) => id)
        .join(', ') || 'none'}`
    );
  }

  console.log('[wazuh-source] Discovered exactly one wazuhFarsi bundle');
  console.log('[wazuh-source] Starting the official optimizer worker');
  const events = await lastValueFrom(
    observeWorker(
      config,
      config.getWorkerConfig({ sourceProfile: 'wazuh-4.14.6' }),
      config.bundles
    ).pipe(toArray())
  );
  const terminal = events.find(({ type }) =>
    ['compiler error', 'compiler issue', 'worker error'].includes(type)
  );

  if (terminal) {
    throw new Error(
      terminal.errorMsg || terminal.failure || `Optimizer failed: ${terminal.type}`
    );
  }
  if (!events.some(({ type }) => type === 'compiler success')) {
    throw new Error('The wazuhFarsi optimizer worker did not report success');
  }
  if (!Fs.existsSync(outputFile)) {
    throw new Error(`The wazuhFarsi browser bundle was not written: ${outputFile}`);
  }

  console.log(`[wazuh-source] Built ${outputFile}`);
}

// Hold one cheap timer until the complete optimizer lifecycle settles.
const lifecycleHandle = setInterval(() => {}, 1000);

main()
  .catch((error) => {
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  })
  .finally(() => clearInterval(lifecycleHandle));
