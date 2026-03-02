---
id: oracle
title: Oracle Plugin
sidebar_position: 2
---

# Oracle Plugin

Connects to Oracle Database using the pure-Go [`go-ora`](https://github.com/sijms/go-ora) driver. **No Oracle Client installation required.**

## Configuration

```yaml
database:
  type: oracle
  connection: "oracle://user:password@host:1521/service_name"
  owner: "MY_SCHEMA"
```

### Connection string format

```
oracle://user:password@host:port/service_name
```

| Part | Example | Description |
|---|---|---|
| `user` | `myuser` | Oracle username |
| `password` | `mypass` | Oracle password |
| `host` | `localhost` | Database host |
| `port` | `1521` | Oracle listener port (default: 1521) |
| `service_name` | `FREEPDB1` | Oracle service name (not SID) |

### `owner`

The Oracle schema owner. Used in `WHERE OWNER = :owner` clauses. Must be **uppercase**.

```yaml
owner: "MYSCHEMA"   # ✅
owner: "myschema"   # ❌ — Oracle stores names in uppercase
```

## What is read

The plugin queries four Oracle data dictionary views:

| View | Purpose |
|---|---|
| `ALL_TABLES` | List of tables accessible to the connected user |
| `ALL_TAB_COLUMNS` | Column names, types, precision, scale, nullability, position |
| `ALL_CONSTRAINTS` | Primary key constraint definitions |
| `ALL_CONS_COLUMNS` | Column membership in constraints |

## Type mapping

| Oracle type | Condition | Internal type |
|---|---|---|
| `VARCHAR2`, `CHAR`, `NVARCHAR2`, `NCHAR`, `CLOB`, `NCLOB`, `LONG` | — | `string` |
| `NUMBER` | No precision | `decimal` |
| `NUMBER(p, 0)` | p ≤ 9 | `int` |
| `NUMBER(p, 0)` | 10 ≤ p ≤ 18 | `long` |
| `NUMBER(p, s)` | s > 0 | `decimal` |
| `INTEGER`, `SMALLINT`, `INT` | — | `int` |
| `FLOAT`, `BINARY_FLOAT`, `BINARY_DOUBLE` | — | `decimal` |
| `DATE` | — | `date` |
| `TIMESTAMP`, `TIMESTAMP WITH TIME ZONE`, `TIMESTAMP WITH LOCAL TIME ZONE` | — | `datetime` |
| `BLOB`, `RAW`, `LONG RAW` | — | `bytes` |
| Anything else | — | `string` |

:::note Oracle `DATE` vs `TIMESTAMP`
Oracle's `DATE` type includes both date and time components. Daxonne maps it to `date` (not `datetime`) for consistency with the intent. If you need timestamp precision, use `TIMESTAMP` in your schema.
:::

## Running Oracle locally (Docker)

```bash
docker run -d \
  --name oracle \
  -p 1521:1521 \
  -e ORACLE_PASSWORD=secret \
  -e APP_USER=myuser \
  -e APP_USER_PASSWORD=mypass \
  gvenzl/oracle-free:latest
```

Wait for the health check, then connect:

```yaml
connection: "oracle://myuser:mypass@localhost:1521/FREEPDB1"
owner: "MYUSER"
```
