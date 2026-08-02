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

printf '[wazuh-source] Copying read-only source snapshots into the container workspace...\n'
copy_source wazuh-dashboard \
  --exclude='./.git' \
  --exclude='./.node_binaries' \
  --exclude='./build' \
  --exclude='./graphify-out' \
  --exclude='./node_modules' \
  --exclude='./plugins/.wazuh-rtl-build-stage' \
  --exclude='./plugins/main' \
  --exclude='./plugins/wazuh-farsi' \
  --exclude='./plugins/wazuh-check-updates' \
  --exclude='./plugins/wazuh-core' \
  --exclude='./plugins/wazuh-rtl' \
  --exclude='./plugins/wazuh-security-dashboards-plugin' \
  --exclude='./packages/wazuh-farsi' \
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

printf '[wazuh-source] Building the wazuhFarsi browser bundle with one worker...\n'
su node -s /bin/bash -c \
  'cd /workspace/wazuh-dashboard && node docker/build-wazuh-farsi-bundle.js'

printf '[wazuh-source] Starting Wazuh Dashboard 4.14.6 from the copied source workspace...\n'
exec su node -s /bin/bash -c \
  'cd /workspace/wazuh-dashboard && exec yarn start --no-base-path --no-optimizer'
