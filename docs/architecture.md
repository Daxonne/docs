---
id: architecture
title: Architecture
sidebar_position: 9
---

# Architecture

## Repository structure

Daxonne is split across three repositories:

| Repository | Purpose |
|---|---|
| [`Daxonne/core`](https://github.com/Daxonne/core) | The CLI binary — all Go source code |
| [`Daxonne/templates`](https://github.com/Daxonne/templates) | Template marketplace — downloaded at runtime |
| [`Daxonne/docs`](https://github.com/Daxonne/docs) | This documentation site |

## Core repository structure

```
core/
├── main.go                     ← entry point
├── cmd/                        ← Cobra CLI commands
│   ├── root.go
│   ├── init.go
│   ├── pull.go
│   ├── add.go
│   └── generate.go
├── internal/
│   ├── config/                 ← daxonne.yaml read/write
│   ├── schema/                 ← ISchemaReader interface + universal model
│   ├── generator/              ← ICodeGenerator interface + Handlebars engine
│   ├── plugin/                 ← factory: DB type → ISchemaReader
│   └── template/               ← registry (GitHub) + installer (GitHub download)
└── plugins/
    ├── oracle/                 ← Oracle ISchemaReader implementation
    ├── postgres/               ← PostgreSQL ISchemaReader implementation
    └── mysql/                  ← MySQL ISchemaReader implementation
```

## Data flow

```
daxonne pull
  │
  ├─► plugin.GetSchemaReader(cfg.Database.Type)
  │         └─► oracle.Reader / postgres.Reader / mysql.Reader
  │
  ├─► reader.Connect(cfg.Database.Connection)
  ├─► reader.ReadSchema(cfg.Database.Owner)
  │         └─► Tables, Columns, PKs, FKs
  │
  └─► Write .daxonne/schema.json

daxonne generate
  │
  ├─► Read .daxonne/schema.json
  ├─► For each template in cfg.Templates:
  │     ├─► Read .daxonne/templates/<name>/template.json
  │     └─► For each file definition:
  │           ├─► Parse .hbs with raymond
  │           ├─► Execute with table data (per: "table") or schema data (per: "schema")
  │           └─► Write output file
  └─► Done
```

## Key interfaces

### `ISchemaReader`

```go
type ISchemaReader interface {
    Connect(connString string) error
    ReadSchema(owner string) (*Schema, error)
    Close() error
}
```

Implemented by `plugins/oracle`, `plugins/postgres`, `plugins/mysql`. Adding a new database = implementing this interface and registering it in `internal/plugin/loader.go`.

### Universal schema model

```go
type Schema struct {
    Tables []Table
}

type Table struct {
    Name        string
    Columns     []Column
    PrimaryKeys []string
    ForeignKeys []ForeignKey
}

type Column struct {
    Name      string
    Type      InternalType
    Nullable  bool
    IsPrimary bool
    Length    *int
    Precision *int
    Scale     *int
}

type ForeignKey struct {
    Column           string
    ReferencedTable  string
    ReferencedColumn string
}
```

All database-specific types are normalised to `InternalType` (`string`, `int`, `long`, `decimal`, `bool`, `date`, `datetime`, `bytes`, `uuid`) before leaving the plugin layer.

### `ICodeGenerator`

```go
type ICodeGenerator interface {
    GenerateFromTemplates(s *Schema, cfg *Config) ([]GeneratedFile, error)
}
```

The Handlebars engine (`internal/generator/engine.go`) implements this interface. It registers helpers once via `sync.Once` and processes templates using `github.com/aymerick/raymond`.

## Template download flow

```
daxonne add csharp-dapper
  │
  ├─► GET api.github.com/repos/Daxonne/templates/contents/csharp-dapper
  │         └─► JSON array of { name, type, download_url }
  │
  ├─► For each file: GET download_url → write to .daxonne/templates/csharp-dapper/<file>
  │
  └─► Update daxonne.yaml: templates: [csharp-dapper]
```

If GitHub is unreachable, the installer falls back to `templates-src/<name>/` (local development fallback).

## CI / GitHub Actions

Two jobs run on every push and pull request:

```
┌─────────────────────────────┐
│  build                      │
│  go mod verify              │
│  go vet ./...               │
│  go build -v ./...          │
│  go test -race ./...        │
└──────────────┬──────────────┘
               │ needs: build
┌──────────────▼──────────────┐
│  integration                │
│  Oracle Free service        │
│  go test -tags integration  │
└─────────────────────────────┘
```

The integration job spins up `gvenzl/oracle-free:latest` as a service container and runs the full Oracle schema read + code generation test suite.

## Dependencies

| Package | Purpose |
|---|---|
| `github.com/spf13/cobra` | CLI framework |
| `github.com/spf13/viper` | YAML config (`daxonne.yaml`) |
| `github.com/aymerick/raymond` | Handlebars template engine |
| `github.com/sijms/go-ora/v2` | Oracle driver (pure Go, no Oracle Client) |
| `github.com/jackc/pgx/v5` | PostgreSQL driver |
| `github.com/go-sql-driver/mysql` | MySQL driver |
| `github.com/fatih/color` | Coloured CLI output |
