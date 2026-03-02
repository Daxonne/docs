---
id: overview
title: CLI Overview
sidebar_position: 1
---

# CLI Reference

Daxonne is a single binary with four commands:

| Command | Description |
|---|---|
| [`daxonne init`](/cli/init) | Interactive project setup — creates `daxonne.yaml` |
| [`daxonne pull`](/cli/pull) | Read schema from DB → `.daxonne/schema.json` |
| [`daxonne add <name>`](/cli/add) | Download and install a template |
| [`daxonne generate`](/cli/generate) | Generate code from cached schema + installed templates |

---

## Global flags

```
-h, --help      Show help for any command
```

---

## Typical workflow

```bash
# 1. First time setup
daxonne init

# 2. Pull the schema (re-run whenever your schema changes)
daxonne pull

# 3. Install templates (once per template)
daxonne add csharp-dapper

# 4. Generate code (re-run after any pull or template change)
daxonne generate
```

---

## Local work directory

Daxonne stores its runtime data in `.daxonne/`:

```
.daxonne/
├── schema.json        ← cached schema (written by daxonne pull)
└── templates/         ← installed templates (written by daxonne add)
    └── csharp-dapper/
        ├── template.json
        ├── dto.hbs
        └── repository.hbs
```

Both `schema.json` and `templates/` are gitignored — they are machine-specific and re-generated on demand.
