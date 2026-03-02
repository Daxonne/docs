---
id: mysql
title: MySQL / MariaDB Plugin
sidebar_position: 4
---

# MySQL / MariaDB Plugin

Connects to MySQL or MariaDB using the [`go-sql-driver/mysql`](https://github.com/go-sql-driver/mysql) driver.

## Configuration

```yaml
database:
  type: mysql
  connection: "mysql://user:password@host:3306/dbname"
  owner: "mydb"
```

### Connection string format

Daxonne accepts the `mysql://` URL scheme and converts it automatically to the driver DSN format:

```
mysql://user:password@host:3306/dbname
```

| Part | Example | Description |
|---|---|---|
| `user` | `myuser` | MySQL username |
| `password` | `mypass` | MySQL password |
| `host` | `localhost` | Database host |
| `port` | `3306` | MySQL port (default: 3306) |
| `dbname` | `mydb` | Database name |

You can also use the native go-sql-driver DSN directly:

```
user:password@tcp(host:3306)/dbname?parseTime=true
```

### `owner`

For MySQL, `owner` is the **database name** (same as in the connection string).

```yaml
owner: "mydb"
```

## What is read

The plugin queries `information_schema`:

| Table | Purpose |
|---|---|
| `information_schema.COLUMNS` | Column names, types (full `COLUMN_TYPE`), nullability |
| `information_schema.TABLES` | Filter to `BASE TABLE` (excludes views) |
| `information_schema.STATISTICS` | Primary key columns (via `INDEX_NAME = 'PRIMARY'`) |
| `information_schema.KEY_COLUMN_USAGE` | Foreign key columns |
| `information_schema.REFERENTIAL_CONSTRAINTS` | Foreign key referenced tables and columns |

## Type mapping

| MySQL type | Condition | Internal type |
|---|---|---|
| `TINYINT(1)` | — | `bool` ← canonical MySQL boolean |
| `BOOL`, `BOOLEAN` | — | `bool` |
| `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `INTEGER`, `YEAR` | — | `int` |
| `BIGINT` | — | `long` |
| `DECIMAL`, `NUMERIC` | scale > 0 | `decimal` |
| `DECIMAL`, `NUMERIC` | scale = 0, p ≤ 9 | `int` |
| `DECIMAL`, `NUMERIC` | scale = 0, p ≤ 18 | `long` |
| `FLOAT`, `DOUBLE`, `REAL` | — | `decimal` |
| `DATE` | — | `date` |
| `DATETIME`, `TIMESTAMP` | — | `datetime` |
| `TIME` | — | `string` |
| `BINARY`, `VARBINARY`, `TINYBLOB`, `BLOB`, `MEDIUMBLOB`, `LONGBLOB` | — | `bytes` |
| `CHAR`, `VARCHAR`, `TEXT`, `ENUM`, `SET`, `JSON`, and others | — | `string` |

:::note TINYINT(1) and booleans
MySQL has no native boolean type. `TINYINT(1)` is the community convention for boolean columns. Daxonne detects this exact type string and maps it to `bool`. `TINYINT` without `(1)` is mapped to `int`.
:::

## MariaDB

MariaDB is fully supported — use `type: mariadb` or `type: mysql`:

```yaml
database:
  type: mariadb
  connection: "mysql://user:password@host:3306/dbname"
  owner: "mydb"
```

## Running MySQL locally (Docker)

```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=myuser \
  -e MYSQL_PASSWORD=mypass \
  mysql:8-debian
```

```yaml
connection: "mysql://myuser:mypass@localhost:3306/mydb"
owner: "mydb"
```
