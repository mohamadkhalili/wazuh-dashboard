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

From this `docker` directory, use the `wazuh` profile for the complete local
Wazuh stack:

```bash
./mount-wazuh-sources.sh
./dev.sh up wazuh
./dev.sh logs wazuh
```

`mount-wazuh-sources.sh` validates the host-side source links and Farsi package
resolver. Compose independently bind-mounts the complete Dashboard, Wazuh
plugins, Farsi, RTL, and Security repositories read-only below `/source`.
Startup copies these current sources into the writable container-only Dashboard
workspace and excludes host `build`, `target`, caches, and `node_modules`.
Installed dependency trees are mounted read-only, so they are not duplicated.

Before the server starts, `build-wazuh-source-bundles.js` uses the official
OpenSearch Dashboards optimizer to freshly build all six source bundles:
`wazuh`, `wazuhCore`, `wazuhCheckUpdates`, `securityDashboards`, `wazuhRtl`, and
`wazuhFarsi`. This is required because `--no-optimizer` serves files from
`target/public`; mounting source while retaining a stale target makes changes
such as a new Security login page invisible. Startup fails if any requested
bundle is missing, does not report compiler success, or does not write its
browser file.

Only the temporary container workspace receives the fresh targets. The source
repositories on the host remain read-only and unchanged. The optimizer runtime
itself is rebuilt from the Dashboard 2.19.5 source in that workspace first, so
a stale host optimizer target cannot introduce an incompatible dependency.
The server then starts directly with `--no-optimizer`, avoiding the development
cluster wrapper that removes freshly built targets during startup.

This profile is locked to Wazuh `4.14.6`, OpenSearch Dashboards `2.19.5`, and
Node 18. The Dashboard container is pinned to logical CPUs 0-1, capped at two
CPUs, and started at nice level 10, while the complete bundle build uses exactly
one optimizer worker; Manager and Indexer are each
capped at one CPU. Re-running `./dev.sh up wazuh` force-recreates the containers,
copies the latest source, and rebuilds every Wazuh bundle without consuming all
host CPU cores.

The startup script replaces the host development configuration inside the
temporary workspace with the Docker configuration. The Dashboard therefore
listens on container port `5601` with HTTPS while the Indexer and Manager are
reached by their Compose service names; host port `30300` remains the only UI
entrypoint.

TLS source certificates remain read-only; startup copies only the Dashboard
certificate and key into the temporary workspace and restricts the private key
to mode `0600`. The `up wazuh` command waits up to six minutes for HTTPS
readiness and prints status and logs on failure. The Dashboard is not
automatically restarted after an error, preventing a copy/build/crash loop.
The registered development UI is available at `https://127.0.0.1:30300`.

[docker-desktop]: https://docs.docker.com/get-docker
[docker-variant]: https://docs.docker.com/desktop/install/linux-install/#differences-between-docker-desktop-for-linux-and-docker-engine
[docker-context]: https://docs.docker.com/desktop/install/linux-install/#context
[app-repo]: https://github.com/wazuh/wazuh-dashboard
[security-repo]: https://github.com/wazuh/wazuh-security-dashboards-plugin
