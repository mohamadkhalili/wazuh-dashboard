#!/usr/bin/env bash

set -Eeuo pipefail

SOURCE_ROOT=/source
WORKSPACE_ROOT=/workspace

copy_source() {
  local repository="$1"
  shift
  local source_path="${SOURCE_ROOT}/${repository}"
  local destination_path="${WORKSPACE_ROOT}/${repository}"

  [[ -d "${source_path}" ]] || {
    printf '[wazuh-source] Missing source repository: %s\n' "${source_path}" >&2
    exit 1
  }
  mkdir -p "${destination_path}"
  tar -C "${source_path}" "$@" -cf - . | tar -C "${destination_path}" -xf -
}

copy_plugin_source() {
  local source_path="$1"
  local plugin_name="$2"
  local destination_path="${WORKSPACE_ROOT}/wazuh-dashboard/plugins/${plugin_name}"

  case "${plugin_name}" in
    main|wazuh-core|wazuh-check-updates|wazuh-rtl|wazuh-security-dashboards-plugin|wazuh-farsi) ;;
    *)
      printf '[wazuh-source] Refusing unexpected plugin destination: %s\n' \
        "${plugin_name}" >&2
      exit 1
      ;;
  esac
  [[ -d "${source_path}" ]] || {
    printf '[wazuh-source] Missing plugin source: %s\n' "${source_path}" >&2
    exit 1
  }

  install -d -o node -g node -m 0755 "${destination_path}"
  find "${destination_path}" -mindepth 1 -maxdepth 1 \
    ! -name node_modules ! -name target -exec rm -rf -- {} +
  tar -C "${source_path}" \
    --exclude='./.git' \
    --exclude='./build' \
    --exclude='./graphify-out' \
    --exclude='./node_modules' \
    --exclude='./target' \
    -cf - . | tar -C "${destination_path}" -xf -
}

printf '[wazuh-source] Copying read-only source snapshots into the container workspace...\n'
copy_source wazuh-dashboard \
  --exclude='./.git' \
  --exclude='./.node_binaries' \
  --exclude='./build' \
  --exclude='./graphify-out' \
  --exclude='./node_modules' \
  --exclude='./plugins/wazuh-rtl-build-stage' \
  --exclude='./plugins/main-backup*' \
  --exclude='./plugins/main' \
  --exclude='./plugins/wazuh-farsi' \
  --exclude='./plugins/wazuh-check-updates' \
  --exclude='./plugins/wazuh-core' \
  --exclude='./plugins/wazuh-rtl' \
  --exclude='./plugins/wazuh-security-dashboards-plugin' \
  --exclude='./packages/wazuh-farsi' \
  --exclude='./packages/osd-ui-shared-deps/target' \
  --exclude='./src/core/target' \
  --exclude='./target'
copy_source wazuh-dashboard-plugins \
  --exclude='./.git' \
  --exclude='./plugins/main/node_modules' \
  --exclude='./plugins/*/build' \
  --exclude='./plugins/*/graphify-out' \
  --exclude='./plugins/*/target'
copy_source wazuh-farsi --exclude='./.git' --exclude='./graphify-out'
copy_source wazuh-rtl \
  --exclude='./.git' \
  --exclude='./graphify-out' \
  --exclude='./plugins/*/build' \
  --exclude='./plugins/*/target'
copy_source wazuh-security-dashboards-plugin \
  --exclude='./.git' \
  --exclude='./build' \
  --exclude='./graphify-out' \
  --exclude='./node_modules' \
  --exclude='./target'

printf '[wazuh-source] Binding plugin sources into the writable Dashboard workspace...\n'
copy_plugin_source \
  "${SOURCE_ROOT}/wazuh-dashboard-plugins/plugins/main" \
  main
copy_plugin_source \
  "${SOURCE_ROOT}/wazuh-dashboard-plugins/plugins/wazuh-core" \
  wazuh-core
copy_plugin_source \
  "${SOURCE_ROOT}/wazuh-dashboard-plugins/plugins/wazuh-check-updates" \
  wazuh-check-updates
copy_plugin_source \
  "${SOURCE_ROOT}/wazuh-rtl/plugins/wazuh-rtl" \
  wazuh-rtl
copy_plugin_source \
  "${SOURCE_ROOT}/wazuh-security-dashboards-plugin" \
  wazuh-security-dashboards-plugin
copy_plugin_source \
  "${SOURCE_ROOT}/wazuh-farsi/dist/fa-IR-rtl/plugins/wazuh-farsi" \
  wazuh-farsi

# Remove temporary RTL staging plugins before plugin discovery.
rm -rf   "${WORKSPACE_ROOT}/wazuh-dashboard/plugins/wazuh-rtl-build-stage"   "${WORKSPACE_ROOT}/wazuh-dashboard/plugins/.wazuh-rtl-build-stage"

cd "${WORKSPACE_ROOT}/wazuh-dashboard"
node docker/check-wazuh-workspace.mjs "${WORKSPACE_ROOT}" "${SOURCE_ROOT}"
install -d -o node -g node -m 0700 "${WORKSPACE_ROOT}/certs"
install -o node -g node -m 0600 \
  /certs-source/wazuh.dashboard-key.pem \
  "${WORKSPACE_ROOT}/certs/wazuh.dashboard-key.pem"
install -o node -g node -m 0644 \
  /certs-source/wazuh.dashboard.pem \
  "${WORKSPACE_ROOT}/certs/wazuh.dashboard.pem"
install -o node -g node -m 0644 \
  docker/config/opensearch_dashboards.dev.security.yml \
  config/opensearch_dashboards.dev.yml
install -o node -g node -m 0644 \
  docker/config/wazuh.dev.yml \
  data/wazuh/config/wazuh.yml
chown node:node "${WORKSPACE_ROOT}" "${WORKSPACE_ROOT}"/*
for plugin_name in \
  main \
  wazuh-core \
  wazuh-check-updates \
  wazuh-rtl \
  wazuh-security-dashboards-plugin \
  wazuh-farsi; do
  install -d -o node -g node -m 0755 \
    "${WORKSPACE_ROOT}/wazuh-dashboard/plugins/${plugin_name}/target/public"
done
install -d -o node -g node -m 0755 \
  "${WORKSPACE_ROOT}/wazuh-dashboard/src/core/target/public" \
  "${WORKSPACE_ROOT}/wazuh-dashboard/packages/osd-ui-shared-deps/target"

if [[ "${WAZUH_SKIP_BUNDLE_BUILD:-0}" != 1 ]]; then
  printf '[wazuh-source] Rebuilding the optimizer runtime from Dashboard 2.19.5 source...\n'
  su node -s /bin/bash -c \
    'cd /workspace/wazuh-dashboard && yarn --cwd packages/osd-optimizer build'

  printf '[wazuh-source] Rebuilding shared browser dependencies from Dashboard 2.19.5 source...\n'

  shared_deps_source="${WORKSPACE_ROOT}/wazuh-dashboard/packages/osd-ui-shared-deps"
  shared_deps_build="${WORKSPACE_ROOT}/wazuh-dashboard/packages/osd-ui-shared-deps-build"
  shared_deps_target="${shared_deps_source}/target"

  rm -rf "${shared_deps_build}"
  install -d -o node -g node -m 0755 "${shared_deps_build}"

  tar -C "${shared_deps_source}" \
    --exclude='./target' \
    -cf - . | tar -C "${shared_deps_build}" -xf -

  chown -R node:node "${shared_deps_build}"

  su node -s /bin/bash -c \
    'cd /workspace/wazuh-dashboard && yarn --cwd packages/osd-ui-shared-deps-build osd:bootstrap'

  find "${shared_deps_target}" \
    -mindepth 1 -maxdepth 1 \
    -exec rm -rf -- {} +

  cp -a "${shared_deps_build}/target/." "${shared_deps_target}/"
  chown -R node:node "${shared_deps_target}"

  printf '[wazuh-source] Building Core and changed Wazuh browser bundles from current source...\n'
  su node -s /bin/bash -c \
    'cd /workspace/wazuh-dashboard && node docker/build-wazuh-source-bundles.js core wazuh wazuhCore wazuhCheckUpdates securityDashboards wazuhRtl wazuhFarsi'

  su node -s /bin/bash -c \
    'cd /workspace/wazuh-dashboard && node docker/check-wazuh-browser-artifacts.mjs --write-manifest'
fi

for bundle_spec in \
  main:wazuh \
  wazuh-core:wazuhCore \
  wazuh-check-updates:wazuhCheckUpdates \
  wazuh-rtl:wazuhRtl \
  wazuh-security-dashboards-plugin:securityDashboards \
  wazuh-farsi:wazuhFarsi; do
  plugin_name="${bundle_spec%%:*}"
  bundle_name="${bundle_spec#*:}"
  bundle_output="${WORKSPACE_ROOT}/wazuh-dashboard/plugins/${plugin_name}/target/public/${bundle_name}.plugin.js"
  [[ -s "${bundle_output}" ]] || {
    printf '[wazuh-source] Missing browser bundle: %s\n' "${bundle_output}" >&2
    exit 1
  }
done

su node -s /bin/bash -c \
  'cd /workspace/wazuh-dashboard && node docker/check-wazuh-browser-artifacts.mjs'

if [[ "${WAZUH_BUNDLE_ONLY:-0}" == 1 ]]; then
  printf '[wazuh-source] Shared Docker bundle targets are ready.\n'
  exit 0
fi

printf '[wazuh-source] Starting Wazuh Dashboard 4.14.6 from the copied source workspace...\n'
exec su node -s /bin/bash -c \
  'cd /workspace/wazuh-dashboard && exec scripts/use_node scripts/opensearch_dashboards --no-optimizer --config config/opensearch_dashboards.dev.yml'
