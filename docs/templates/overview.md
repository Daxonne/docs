---
id: overview
title: Templates Overview
sidebar_position: 1
---

# Templates

Templates are the code generation units in Daxonne. Each template is a directory of [Handlebars](https://handlebarsjs.com/) (`.hbs`) files that describes how to generate code for one target language or framework.

Templates live in the [Daxonne/templates](https://github.com/Daxonne/templates) repository and are downloaded on demand by `daxonne add`.

## Available templates

| Template | Language | Description |
|---|---|---|
| [`csharp-dapper`](/templates/csharp-dapper) | C# | Immutable records + Dapper CRUD repositories |
| [`typescript-prisma`](/templates/typescript-prisma) | TypeScript | Interfaces + Prisma client services |
| [`java-jpa`](/templates/java-jpa) | Java | Jakarta EE entities + Spring Data JPA repositories |
| [`python-sqlalchemy`](/templates/python-sqlalchemy) | Python | SQLAlchemy models + async repositories |

## Template directory structure

```
<name>/
├── template.json       ← manifest (required)
├── dto.hbs             ← Handlebars source files
└── repository.hbs
```

## `template.json` format

```json
{
  "name": "my-template",
  "version": "1.0.0",
  "language": "csharp",
  "description": "Short description",
  "author": "your-handle",
  "files": [
    {
      "template": "dto.hbs",
      "output": "{{PascalCase name}}Dto.cs",
      "per": "table"
    },
    {
      "template": "index.hbs",
      "output": "index.ts",
      "per": "schema"
    }
  ]
}
```

### `files[].per`

| Value | Behaviour |
|---|---|
| `"table"` | The template is rendered once per table. Output filename is a Handlebars expression evaluated with the table's data. |
| `"schema"` | The template is rendered once with the full schema. Produces a single output file. |

## Template data

### Per-table context

```json
{
  "name": "TABLE_NAME",
  "columns": [
    {
      "name": "ID",
      "type": "long",
      "nullable": false,
      "isPrimary": true
    },
    {
      "name": "EMAIL",
      "type": "string",
      "nullable": true,
      "isPrimary": false
    }
  ],
  "primaryKeys": ["ID"],
  "foreignKeys": [
    {
      "column": "ORDER_ID",
      "referencedTable": "ORDERS",
      "referencedColumn": "ID"
    }
  ]
}
```

### Per-schema context

```json
{
  "tables": [
    { "name": "...", "columns": [...], "primaryKeys": [...], "foreignKeys": [...] }
  ]
}
```

## Built-in Handlebars helpers

### Naming helpers

| Helper | Input | Output |
|---|---|---|
| `{{PascalCase name}}` | `USER_ACCOUNT` | `UserAccount` |
| `{{CamelCase name}}` | `USER_ACCOUNT` | `userAccount` |
| `{{SnakeCase name}}` | `USER_ACCOUNT` | `user_account` |

### Type helpers

| Helper | Input | Output |
|---|---|---|
| `{{CSharpType type}}` | `decimal` | `decimal` |
| `{{TypeScriptType type}}` | `long` | `number` |
| `{{JavaType type}}` | `decimal` | `BigDecimal` |
| `{{PythonType type}}` | `datetime` | `datetime` |
| `{{SQLAlchemyType type}}` | `long` | `BigInteger` |

### Column helpers

| Helper | Description | Output |
|---|---|---|
| `{{JoinColumns columns}}` | All column names joined | `ID, FIRST_NAME, EMAIL` |
| `{{JoinParams columns}}` | PascalCase params with `:` prefix | `:Id, :FirstName, :Email` |
| `{{PrimaryKeyColumn columns}}` | First PK column name | `ID` |
| `{{PrimaryKeyCamelCase columns}}` | First PK in camelCase | `id` |

### PK type helpers

| Helper | Output |
|---|---|
| `{{PrimaryKeyType columns}}` | C# type of first PK |
| `{{TypeScriptPrimaryKeyType columns}}` | TypeScript type of first PK |
| `{{JavaPrimaryKeyType columns}}` | Java type of first PK |
| `{{PythonPrimaryKeyType columns}}` | Python type of first PK |
