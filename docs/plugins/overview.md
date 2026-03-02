---
id: overview
title: Database Plugins
sidebar_position: 1
---

# Database Plugins

A Daxonne **plugin** is a Go package that implements the `ISchemaReader` interface. It knows how to connect to a specific database engine and read its schema.

## Supported databases

| Plugin | Type string in `daxonne.yaml` | Status |
|---|---|---|
| [Oracle](/plugins/oracle) | `oracle` | ✅ Stable |
| [PostgreSQL](/plugins/postgres) | `postgres` or `postgresql` | ✅ Stable |
| [MySQL / MariaDB](/plugins/mysql) | `mysql` or `mariadb` | ✅ Stable |

## ISchemaReader interface

Every plugin implements this interface:

```go
type ISchemaReader interface {
    Connect(connString string) error
    ReadSchema(owner string) (*Schema, error)
    Close() error
}
```

| Method | Description |
|---|---|
| `Connect` | Opens a connection and verifies reachability (Ping) |
| `ReadSchema` | Reads all tables, columns, PKs and FKs for the given owner |
| `Close` | Releases the connection |

## Adding a new database

To add support for a new database:

1. Create a new package in `plugins/<engine>/`
2. Implement `ISchemaReader` (two files: `<engine>.go` + `types.go`)
3. Register the engine in `internal/plugin/loader.go`

```go
// internal/plugin/loader.go
case "mydb":
    return &mydb.Reader{}, nil
```

No other files need to change.
