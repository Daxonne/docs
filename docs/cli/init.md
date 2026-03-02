---
id: init
title: daxonne init
sidebar_position: 2
---

# `daxonne init`

Interactively creates `daxonne.yaml` in the current directory.

## Usage

```bash
daxonne init
```

## Prompts

```
Database type (oracle/postgres/mysql): oracle
Connection string: oracle://user:password@localhost:1521/FREEPDB1
Schema owner / database name: MY_SCHEMA
Output path [./generated]:
```

## Output

Creates `daxonne.yaml`:

```yaml
database:
  type: oracle
  connection: "oracle://user:password@localhost:1521/FREEPDB1"
  owner: "MY_SCHEMA"

output:
  path: "./generated"

templates: []
```

:::warning
`daxonne.yaml` is gitignored by default. Never commit it — it contains database credentials.
:::

## Notes

- If `daxonne.yaml` already exists, the command will overwrite it
- You can also copy `daxonne.yaml.example` and edit it manually instead
