---
id: intro
title: Introduction
sidebar_position: 1
slug: /
---

# Daxonne

> **Language-agnostic code generation from your database schema.**

Daxonne reads your database schema and generates production-ready code — DTOs, repositories, queries — through a template and plugin system. No ORM lock-in, no manual boilerplate.

[![CI](https://github.com/Daxonne/core/actions/workflows/ci.yml/badge.svg)](https://github.com/Daxonne/core/actions/workflows/ci.yml)
[![Go](https://img.shields.io/badge/Go-1.23+-00ADD8?logo=go)](https://go.dev)
[![License](https://img.shields.io/github/license/Daxonne/core)](https://github.com/Daxonne/core/blob/main/LICENSE)

---

## How it works

```
Database schema
      │
      ▼  daxonne pull
 schema.json (cached)
      │
      ▼  daxonne generate
 Handlebars templates
      │
      ▼
 Generated code (C#, TypeScript, Java, Python, …)
```

1. **`daxonne pull`** — connects to your database, reads tables, columns, primary keys and foreign keys, and caches the schema locally.
2. **`daxonne add <template>`** — downloads a code generation template from the [Daxonne templates registry](https://github.com/Daxonne/templates).
3. **`daxonne generate`** — applies every template to every table and writes the output files.

---

## Supported databases

| Database | Plugin | Status |
|---|---|---|
| Oracle | `plugins/oracle` | ✅ Stable |
| PostgreSQL | `plugins/postgres` | ✅ Stable |
| MySQL / MariaDB | `plugins/mysql` | ✅ Stable |
| SQLite | — | 🔜 Planned |
| SQL Server | — | 🔜 Planned |

## Available templates

| Template | Language | Description |
|---|---|---|
| `csharp-dapper` | C# | Records + Dapper CRUD repositories |
| `typescript-prisma` | TypeScript | Interfaces + Prisma client services |
| `java-jpa` | Java | Jakarta EE entities + Spring Data JPA |
| `python-sqlalchemy` | Python | SQLAlchemy models + async repositories |

---

## Quick install

```bash
go install github.com/daxonne/core@latest
```

Then jump to [Getting Started](/getting-started) to run your first generation in under 5 minutes.
