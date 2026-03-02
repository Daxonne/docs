---
id: configuration
title: Configuration
sidebar_position: 5
---

# Configuration — `daxonne.yaml`

All project settings are stored in `daxonne.yaml` at the root of your project. This file is **gitignored** by default — never commit credentials.

Use `daxonne.yaml.example` as a reference template and copy it:

```bash
cp daxonne.yaml.example daxonne.yaml
# then edit with your connection string
```

---

## Full reference

```yaml
database:
  type: oracle           # oracle | postgres | mysql | mariadb | postgresql
  connection: "oracle://user:password@host:1521/service_name"
  owner: "MY_SCHEMA"     # schema owner / database name

output:
  path: "./generated"    # where generated files are written

templates:
  - csharp-dapper
  - typescript-prisma
```

---

## Fields

### `database.type`

The database engine to connect to.

| Value | Engine |
|---|---|
| `oracle` | Oracle Database |
| `postgres` or `postgresql` | PostgreSQL |
| `mysql` or `mariadb` | MySQL / MariaDB |

### `database.connection`

The connection string for your database. Format depends on the engine:

**Oracle:**
```
oracle://user:password@host:1521/service_name
```

**PostgreSQL:**
```
postgres://user:password@host:5432/dbname
```

**MySQL:**
```
mysql://user:password@host:3306/dbname
```

### `database.owner`

The schema owner or database name that scopes which tables to read.

| Engine | Meaning |
|---|---|
| Oracle | Schema owner (e.g. `MY_SCHEMA`) — queries `ALL_TABLES` where `OWNER = ?` |
| PostgreSQL | Schema name (e.g. `public`) — queries `information_schema` where `table_schema = ?` |
| MySQL | Database name (e.g. `mydb`) — queries `information_schema` where `TABLE_SCHEMA = ?` |

### `output.path`

Directory where generated files are written. Created automatically if it doesn't exist.

Default: `./generated`

### `templates`

List of template names to use during `daxonne generate`. Templates must be installed first with `daxonne add`.

```yaml
templates:
  - csharp-dapper
  - typescript-prisma
```

---

## Environment variables

You can override `daxonne.yaml` values with environment variables (useful in CI):

| Variable | Description |
|---|---|
| `GITHUB_TOKEN` | GitHub personal access token — avoids API rate limits when downloading templates |

---

## Security

- `daxonne.yaml` is in `.gitignore` by default — verify before committing
- Use environment variable substitution or a secrets manager in CI pipelines
- The connection string contains credentials — treat it like a password
