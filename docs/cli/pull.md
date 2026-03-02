---
id: pull
title: daxonne pull
sidebar_position: 3
---

# `daxonne pull`

Connects to your database and reads the full schema, then caches it to `.daxonne/schema.json`.

## Usage

```bash
daxonne pull
```

## What it reads

- All **tables** in the configured schema/owner
- All **columns** with their names, data types, nullability, and precision/scale
- **Primary key** constraints
- **Foreign key** constraints (referenced table + column)

## Example output

```
Connecting to oracle database...
Reading schema for owner "MY_SCHEMA"...

Schema pulled successfully!
  Tables      : 12
  Columns     : 87
  Foreign keys: 9
  Cached at   : .daxonne/schema.json
```

## Cache format

`.daxonne/schema.json` contains the normalised schema in the [internal model format](/type-mapping):

```json
{
  "tables": [
    {
      "name": "CUSTOMER",
      "columns": [
        { "name": "ID",         "type": "long",    "nullable": false, "isPrimary": true  },
        { "name": "FIRST_NAME", "type": "string",  "nullable": false, "isPrimary": false },
        { "name": "EMAIL",      "type": "string",  "nullable": true,  "isPrimary": false },
        { "name": "BALANCE",    "type": "decimal", "nullable": false, "isPrimary": false }
      ],
      "primaryKeys": ["ID"],
      "foreignKeys": []
    }
  ]
}
```

## Notes

- `daxonne pull` reads from the **live database** every time it is called
- Run it again whenever your schema changes before calling `daxonne generate`
- The cached `schema.json` is gitignored — it is machine-specific
- `daxonne generate` reads from the cache, **not** from the database directly
