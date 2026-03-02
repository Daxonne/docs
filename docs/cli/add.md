---
id: add
title: daxonne add
sidebar_position: 4
---

# `daxonne add`

Downloads and installs a template from the [Daxonne templates registry](https://github.com/Daxonne/templates).

## Usage

```bash
# Install a template
daxonne add <template-name>

# List all available templates
daxonne add --list
```

## Flags

| Flag | Short | Description |
|---|---|---|
| `--list` | `-l` | List all templates available in the registry |

## Examples

```bash
daxonne add csharp-dapper
daxonne add typescript-prisma
daxonne add java-jpa
daxonne add python-sqlalchemy
```

## What it does

1. Fetches the [registry.json](https://github.com/Daxonne/templates/blob/main/registry.json) from GitHub to validate the template name
2. Calls the GitHub Contents API to list all files in the template directory
3. Downloads each file to `.daxonne/templates/<name>/`
4. Automatically adds the template name to `daxonne.yaml`

## Output

```
Installing csharp-dapper v1.0.0 (C# records + Dapper CRUD repositories)...
Template "csharp-dapper" installed successfully.
Added "csharp-dapper" to daxonne.yaml.
```

## GitHub API rate limits

Unauthenticated requests to the GitHub API are limited to 60/hour. To avoid this, set a `GITHUB_TOKEN`:

```bash
export GITHUB_TOKEN=ghp_your_token_here
daxonne add csharp-dapper
```

## Listing templates

```bash
daxonne add --list
```

```
NAME                      VERSION    LANGUAGE       DESCRIPTION
────────────────────────  ───────    ────────────   ────────────────────────────────────────
csharp-dapper             1.0.0      csharp         C# records + Dapper CRUD repositories
typescript-prisma         1.0.0      typescript     TypeScript types + Prisma client queries
java-jpa                  1.0.0      java           Java entities + Spring Data JPA repositories
python-sqlalchemy         1.0.0      python         Python SQLAlchemy models + async repositories
```

The registry is fetched live from GitHub — the list always reflects the latest available templates.
