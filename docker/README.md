# Frontend development environments

Install [Docker Desktop][docker-desktop] as per its instructions, available for Windows, Mac
and Linux (Ubuntu, Debian & Fedora).
This ensures that the development experience between Linux, Mac and Windows is as
similar as possible.

> IMPORTANT: be methodic during the installation of Docker Desktop, and proceed
> step by step as described in their documentation. Make sure that your system
> meets the system requirements before installing Docker Desktop, and read any
> post-installation note, specially on Linux: [Differences between
> Docker Desktop for Linux and Docker Engine][docker-variant].

## Pre-requisites

1. Assign resources to [Docker Desktop][docker-desktop]. The requirements for the
   environments are:

   - 8 GB of RAM (minimum)
   - 4 cores

   The more resources the better ☺

2. Clone the [wazuh-dashboard][app-repo] and the [wazuh-security-dashboards-plugin][security-repo]
   repositories at the same level.

3. Set up user permissions

   The Docker volumes will be created by the internal Docker user, making them
   read-only. To prevent this, a new group named `docker-desktop` and GUID 100999
   needs to be created, then added to your user and the source code folder:

   ```bash
   sudo groupadd -g 100999 docker-desktop
   sudo useradd -u 100999 -g 100999 -M docker-desktop
   sudo chown -R docker-desktop:docker-desktop $WZD_HOME
   sudo usermod -aG docker-desktop $USER
   ```

## Understanding Docker contexts

Before we begin starting Docker containers, we need to understand the
differences between Docker Engine and Docker Desktop, more precisely, that the
use different contexts.

Carefully read these two sections of the Docker documentation:

- [Differences between Docker Desktop for Linux and Docker Engine][docker-variant].
- [Switch between Docker Desktop and Docker Engine][docker-context].

Docker Desktop will change to its context automatically at start, so be sure
that any existing Docker container using the default context is **stopped**
before starting Docker Desktop and any of the environments in this folder.

## Starting up the environments

Use the sh script to up the environment.

Example:

```bash
Usage: ./dev.sh {up|down|stop|logs|config} [default|security|wazuh]
```

Once the `wazuh-dashboard` container is up, attach a shell to it and run `yarn start --no-base-path`
to start the application.

The dependencies of the project will be installed automatically by the `installed` container,
even for the security plugin, if the security flag is provided.

### Wazuh 4.14.6 source profile

Use the `wazuh` profile for the complete local Wazuh stack:

```bash
./docker/mount-wazuh-sources.sh
./docker/dev.sh up wazuh
./docker/dev.sh logs wazuh
```

Run `mount-wazuh-sources.sh` before Compose. It creates and validates relative
source bindings for the Wazuh main, core, updates, RTL, and Security plugins in
`wazuh-dashboard/plugins`, plus the `wazuh-farsi` package resolver used by core
Dashboard imports. It is idempotent and refuses to overwrite an unexpected
link or real directory.

Compose then bind-mounts those five repository source directories directly on
their `/workspace/wazuh-dashboard/plugins/*` paths. They are excluded from the
tar snapshot so the bind targets cannot be replaced by symlinks. This keeps
Node module resolution rooted at `wazuh-dashboard`, allowing source plugins to
use the Dashboard dependency tree exactly as installed plugins do. The legacy
`.wazuh-rtl-build-stage` directory is also excluded so only the repository RTL
source registers the `wazuhRtl` plugin id.

Existing `src/core/target` and `src/plugins/*/target` browser bundles are kept
in the snapshot; removing them makes the server return `404` for otherwise
valid core assets. The canonical Farsi plugin and package are bind-mounted from
the `wazuh-farsi` repository. Before the server starts, only the `wazuhFarsi`
browser bundle is freshly built with one optimizer worker; the full Dashboard
bundle set is not rebuilt.

OpenSearch Dashboards 2.19.5 can discover the filtered Farsi bundle but fail to
dispatch the initial optimizer batch. `build-wazuh-farsi-bundle.js` uses the
same official `OptimizerConfig` and optimizer worker directly, requires exactly
one `wazuhFarsi` bundle, and fails startup unless the browser output is written.
It bypasses the repository-wide cache-key scan, which is unnecessary for this
single fresh output and can remain pending against a copied workspace. An
explicit Node lifecycle handle remains active until the worker Observable
settles.
The server then starts with `--no-optimizer`: starting its broken integrated
optimizer would invalidate and remove the freshly built filtered bundle before
serving it, while still failing to dispatch a replacement worker. Existing core
and plugin targets plus the freshly built Farsi target are served unchanged.

The canonical Farsi package is also mounted over the stale package copies in
the main and Security plugin dependency trees. Those copies contain an
`opensearch_dashboards.json` plugin manifest and otherwise make the optimizer
discover three bundles with the same `wazuhFarsi` id. The canonical package
keeps bare imports working without registering duplicate browser plugins.

TLS source certificates remain read-only. Startup copies only the Dashboard
certificate and key into the temporary workspace, assigns them to the container
`node` user, and keeps the private key at mode `0600`; deployment certificate
permissions are never changed.

Dashboard Git metadata is mounted read-only at the copied workspace root. The
development optimizer requires `git ls-files` for its cache key and change
detection; source and Git metadata remain immutable from the container.

This profile is locked to Wazuh `4.14.6`, OpenSearch Dashboards `2.19.5`, and
Node 18. It mounts all five repositories read-only, copies filtered snapshots
to the Dashboard container filesystem, and starts the Dashboard automatically.
The container never writes `build` or `target` output into the host repositories.
Existing `packages/*/target` output is copied because the linked OpenSearch
Dashboards workspace packages load those entrypoints at runtime. After changing
one of those packages, build that package normally and run `up wazuh` again to
recreate the source snapshot. Dashboard and plugin application source is
compiled by the development server from the fresh snapshot.

The startup script replaces the host development configuration inside the
temporary workspace with the Docker configuration. The Dashboard therefore
listens on container port `5601` with HTTPS while the Indexer and Manager are
reached by their Compose service names; host port `30300` remains the only UI
entrypoint.

Installed dependency trees are mounted read-only instead of being copied, so
startup does not spend minutes duplicating `node_modules`. The `up wazuh`
command waits up to six minutes for HTTPS readiness; if the Dashboard exits or
times out, it prints Compose status and the last 200 Dashboard log lines. A
preflight checks every linked workspace package entrypoint before startup, and
the development Dashboard is not automatically restarted after an error, so a
missing build artifact cannot create a copy/crash restart loop.

The Dashboard container is capped at half of one CPU and one optimizer worker;
Manager and Indexer are each capped at one CPU. The registered development UI
is available at `https://127.0.0.1:30300`.

[docker-desktop]: https://docs.docker.com/get-docker
[docker-variant]: https://docs.docker.com/desktop/install/linux-install/#differences-between-docker-desktop-for-linux-and-docker-engine
[docker-context]: https://docs.docker.com/desktop/install/linux-install/#context
[app-repo]: https://github.com/wazuh/wazuh-dashboard
[security-repo]: https://github.com/wazuh/wazuh-security-dashboards-plugin
