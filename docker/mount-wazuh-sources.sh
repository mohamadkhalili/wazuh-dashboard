#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
DASHBOARD_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
PROJECT_ROOT="$(cd -- "${DASHBOARD_ROOT}/.." && pwd)"

ensure_source_link() {
  local source_path="$1"
  local target_path="$2"
  local label="$3"
  local target_parent relative_source

  [[ -d "${source_path}" ]] || {
    printf '[wazuh-mount] Missing %s source: %s\n' "${label}" "${source_path}" >&2
    exit 1
  }

  target_parent="$(dirname -- "${target_path}")"
  mkdir -p -- "${target_parent}"

  if [[ -L "${target_path}" ]]; then
    if [[ "$(realpath -e -- "${target_path}")" != "$(realpath -e -- "${source_path}")" ]]; then
      printf '[wazuh-mount] Refusing to replace an unexpected %s link: %s -> %s\n' \
        "${label}" "${target_path}" "$(readlink -- "${target_path}")" >&2
      exit 1
    fi
    printf '[wazuh-mount] Bound %-24s %s\n' "${label}" "${target_path}"
    return
  fi

  if [[ -e "${target_path}" ]]; then
    printf '[wazuh-mount] Refusing to overwrite an existing %s path: %s\n' \
      "${label}" "${target_path}" >&2
    exit 1
  fi

  relative_source="$(realpath --relative-to="${target_parent}" -- "${source_path}")"
  ln -s -- "${relative_source}" "${target_path}"
  printf '[wazuh-mount] Mounted %-22s %s -> %s\n' \
    "${label}" "${target_path}" "${relative_source}"
}

ensure_source_link \
  "${PROJECT_ROOT}/wazuh-dashboard-plugins/plugins/main" \
  "${DASHBOARD_ROOT}/plugins/main" \
  'Wazuh main plugin'
ensure_source_link \
  "${PROJECT_ROOT}/wazuh-dashboard-plugins/plugins/wazuh-core" \
  "${DASHBOARD_ROOT}/plugins/wazuh-core" \
  'Wazuh core plugin'
ensure_source_link \
  "${PROJECT_ROOT}/wazuh-dashboard-plugins/plugins/wazuh-check-updates" \
  "${DASHBOARD_ROOT}/plugins/wazuh-check-updates" \
  'Wazuh updates plugin'
ensure_source_link \
  "${PROJECT_ROOT}/wazuh-rtl/plugins/wazuh-rtl" \
  "${DASHBOARD_ROOT}/plugins/wazuh-rtl" \
  'Wazuh RTL plugin'
ensure_source_link \
  "${PROJECT_ROOT}/wazuh-security-dashboards-plugin" \
  "${DASHBOARD_ROOT}/plugins/wazuh-security-dashboards-plugin" \
  'Security plugin'
ensure_source_link \
  "${DASHBOARD_ROOT}/packages/wazuh-farsi" \
  "${DASHBOARD_ROOT}/node_modules/wazuh-farsi" \
  'Farsi package resolver'

node "${DASHBOARD_ROOT}/docker/check-wazuh-workspace.mjs" "${PROJECT_ROOT}"
printf '[wazuh-mount] All Wazuh 4.14.6 source bindings are ready.\n'
