#!/usr/bin/env bash

set -Eeuo pipefail

cd -- "${0%/*}/.."

ACTION="${1:-}"
PROFILE="${2:-default}"
REPO_PATH="$(pwd)"
PROJECT_ROOT="$(cd -- "${REPO_PATH}/.." && pwd)"
NODE_VERSION="$(tr -d '[:space:]' < "${REPO_PATH}/.nvmrc")"
OPENSEARCH_VERSION="$(bash "${REPO_PATH}/docker/get_version.sh")"
WAZUH_VERSION="4.14.6"

WAZUH_DASHBOARD_PLUGINS_REPO_PATH="${WAZUH_DASHBOARD_PLUGINS_REPO_PATH:-${PROJECT_ROOT}/wazuh-dashboard-plugins}"
WAZUH_FARSI_REPO_PATH="${WAZUH_FARSI_REPO_PATH:-${PROJECT_ROOT}/wazuh-farsi}"
WAZUH_RTL_REPO_PATH="${WAZUH_RTL_REPO_PATH:-${PROJECT_ROOT}/wazuh-rtl}"
SECURITY_PLUGIN_REPO_PATH="${SECURITY_PLUGIN_REPO_PATH:-${PROJECT_ROOT}/wazuh-security-dashboards-plugin}"
WAZUH_DEPLOYMENT_CONFIG_PATH="${WAZUH_DEPLOYMENT_CONFIG_PATH:-${PROJECT_ROOT}/deployment/wazuh-03/config}"

export REPO_PATH PROJECT_ROOT NODE_VERSION OPENSEARCH_VERSION WAZUH_VERSION
export WAZUH_DASHBOARD_PLUGINS_REPO_PATH WAZUH_FARSI_REPO_PATH
export WAZUH_RTL_REPO_PATH SECURITY_PLUGIN_REPO_PATH
export WAZUH_DEPLOYMENT_CONFIG_PATH

case "${PROFILE}" in
  default)
    COMPOSE_FILE=docker/dev.yml
    ;;
  security)
    COMPOSE_FILE=docker/dev_security.yml
    ;;
  wazuh)
    COMPOSE_FILE=docker/wazuh-dev-05.compose.yml
    ;;
  *)
    printf 'Unknown profile: %s\n' "${PROFILE}" >&2
    printf 'Usage: %s {up|down|stop|logs|config} [default|security|wazuh]\n' "$0" >&2
    exit 2
    ;;
esac

if docker info >/dev/null 2>&1; then
  DOCKER=(docker)
elif sudo -n docker info >/dev/null 2>&1; then
  DOCKER=(sudo -n docker)
elif [[ -t 0 ]]; then
  printf '[wazuh-docker] Docker requires elevated access; sudo may ask for your password.\n'
  DOCKER=(sudo docker)
else
  printf '[wazuh-docker] Docker access is unavailable; run from an interactive terminal.\n' >&2
  exit 1
fi

COMPOSE=("${DOCKER[@]}" compose -f "${COMPOSE_FILE}")

print_variables() {
  printf 'PROFILE: %s\n' "${PROFILE}"
  printf 'NODE_VERSION: %s\n' "${NODE_VERSION}"
  printf 'OPENSEARCH_VERSION: %s\n' "${OPENSEARCH_VERSION}"
  printf 'WAZUH_VERSION: %s\n' "${WAZUH_VERSION}"
}

if [[ "${PROFILE}" == "wazuh" ]] && command -v node >/dev/null 2>&1; then
  node docker/check-wazuh-workspace.mjs "${PROJECT_ROOT}"
fi

case "${ACTION}" in
  up)
    print_variables
    "${COMPOSE[@]}" up -d --force-recreate
    if [[ "${PROFILE}" == "wazuh" ]]; then
      dashboard_url="${WAZUH_DASHBOARD_URL:-https://127.0.0.1:30300}"
      printf '[wazuh-docker] Waiting for %s ...\n' "${dashboard_url}"
      ready=0
      for _ in {1..180}; do
        if curl --fail --insecure --silent --output /dev/null "${dashboard_url}"; then
          ready=1
          break
        fi
        container_id="$("${COMPOSE[@]}" ps -q wazuh.dashboard)"
        if [[ -n "${container_id}" ]]; then
          running="$("${DOCKER[@]}" inspect --format '{{.State.Running}}' "${container_id}")"
          if [[ "${running}" != "true" ]]; then
            printf '[wazuh-docker] Dashboard container exited before becoming ready.\n' >&2
            "${COMPOSE[@]}" ps
            "${COMPOSE[@]}" logs --tail 200 wazuh.dashboard
            exit 1
          fi
        fi
        sleep 2
      done
      if [[ "${ready}" -ne 1 ]]; then
        printf '[wazuh-docker] Dashboard did not become ready within 360 seconds.\n' >&2
        "${COMPOSE[@]}" ps
        "${COMPOSE[@]}" logs --tail 200 wazuh.dashboard
        exit 1
      fi
      printf '[wazuh-docker] Dashboard is ready at %s\n' "${dashboard_url}"
    fi
    ;;
  down)
    "${COMPOSE[@]}" down
    ;;
  stop)
    "${COMPOSE[@]}" stop
    ;;
  logs)
    "${COMPOSE[@]}" logs -f wazuh.dashboard
    ;;
  config)
    "${COMPOSE[@]}" config
    ;;
  *)
    printf 'Usage: %s {up|down|stop|logs|config} [default|security|wazuh]\n' "$0" >&2
    exit 2
    ;;
esac
