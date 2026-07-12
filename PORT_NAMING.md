# Port Naming Convention

All ports in this project follow a 5-digit naming scheme: `EAASS`

## Structure

| Position | Digits | Meaning | Values |
|----------|--------|---------|--------|
| E | 1st | Environment | `1` = production, `2` = staging, `3` = development |
| AA | 2nd–3rd | Application ID | `01` = this app (honarkade) |
| SS | 4th–5th | Service within app | See table below |

## Service IDs

| SS | Service |
|----|---------|
| `00` | App / Nuxt server |
| `02` | postgress |

## Port Allocation Table

| Service | Development | Staging | Production |
|---------|-------------|---------|------------|
| Nuxt app | `30100` | `20100` | `10100` |
| Backend app | `30101` | `20101` | `10101`
| PostgreSQL | `30102` | `20102` | `10102` |

## Examples

- `30102` → dev (3) · honarkade app (01) · postgress (02)
- `20100` → staging (2) · honarkade app (01) · Nuxt (00)
