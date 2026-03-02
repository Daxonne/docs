---
id: postgres
title: PostgreSQL Plugin
sidebar_position: 3
---

# PostgreSQL Plugin

Connects to PostgreSQL using the [`pgx`](https://github.com/jackc/pgx) driver via the standard `database/sql` interface.

## Configuration

```yaml
database:
  type: postgres
  connection: "postgres://user:password@host:5432/dbname"
  owner: "public"
```

### Connection string format

```
postgres://user:password@host:port/dbname
```

| Part | Example | Description |
|---|---|---|
| `user` | `myuser` | PostgreSQL username |
| `password` | `mypass` | PostgreSQL password |
| `host` | `localhost` | Database host |
| `port` | `5432` | PostgreSQL port (default: 5432) |
| `dbname` | `mydb` | Database name |

You can also pass additional parameters:

```
postgres://user:pass@host:5432/mydb?sslmode=disable
```

### `owner`

The PostgreSQL schema name. Default is `public`. Daxonne reads only tables in the specified schema.

```yaml
owner: "public"       # default schema
owner: "my_schema"    # custom schema
```

## What is read

The plugin queries `information_schema`:

| View | Purpose |
|---|---|
| `information_schema.columns` | Column names, types, precision, nullability |
| `information_schema.tables` | Filter to `BASE TABLE` (excludes views) |
| `information_schema.table_constraints` | Primary key constraints |
| `information_schema.key_column_usage` | PK column membership |
| `information_schema.referential_constraints` | Foreign key definitions |
| `information_schema.constraint_column_usage` | FK referenced columns |

## Type mapping

| PostgreSQL type | Internal type |
|---|---|
| `boolean` | `bool` |
| `uuid` | `uuid` |
| `smallint`, `int2` | `int` |
| `integer`, `serial`, `int4` | `int` |
| `bigint`, `bigserial`, `int8` | `long` |
| `numeric`, `decimal` (scale > 0) | `decimal` |
| `numeric`, `decimal` (no scale, p ≤ 9) | `int` |
| `numeric`, `decimal` (no scale, p ≤ 18) | `long` |
| `real`, `double precision`, `float4`, `float8` | `decimal` |
| `date` | `date` |
| `timestamp`, `timestamptz`, `timestamp with time zone` | `datetime` |
| `bytea` | `bytes` |
| `varchar`, `char`, `text`, `time`, `json`, `jsonb`, and all others | `string` |

## Running PostgreSQL locally (Docker)

```bash
docker run -d \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypass \
  -e POSTGRES_DB=mydb \
  postgres:16-alpine
```

```yaml
connection: "postgres://myuser:mypass@localhost:5432/mydb?sslmode=disable"
owner: "public"
```
