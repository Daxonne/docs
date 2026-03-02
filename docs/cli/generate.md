---
id: generate
title: daxonne generate
sidebar_position: 5
---

# `daxonne generate`

Reads `.daxonne/schema.json` and applies all installed templates, writing output files to the configured output directory.

## Usage

```bash
daxonne generate
```

## Prerequisites

- `daxonne pull` must have been run — `.daxonne/schema.json` must exist
- At least one template must be installed — `daxonne add <name>`
- `daxonne.yaml` must list the templates to use under `templates:`

## Example output

```
Generating code for 12 table(s) using template(s): [csharp-dapper typescript-prisma]
  + generated/CustomerDto.cs
  + generated/CustomerRepository.cs
  + generated/OrderDto.cs
  + generated/OrderRepository.cs
  + generated/Customer.ts
  + generated/CustomerService.ts
  + generated/Order.ts
  + generated/OrderService.ts
  ...

Done! 48 file(s) written to ./generated
```

## How it works

For each template listed in `daxonne.yaml`:

1. Reads `template.json` from `.daxonne/templates/<name>/`
2. For each file definition in `template.json`:
   - `per: "table"` → renders the `.hbs` template once per table, producing one output file per table
   - `per: "schema"` → renders the template once with the full schema, producing a single output file
3. Output filenames are themselves Handlebars expressions (e.g. `{{PascalCase name}}Dto.cs`)
4. Files are written to `output.path` (default: `./generated`)

## Notes

- Existing files are **overwritten** on each run
- The `generated/` directory is created automatically if it doesn't exist
- `generated/` is gitignored by default — add the files to your project's gitignore if needed
- `daxonne generate` reads from the **schema cache** — run `daxonne pull` first if the schema has changed
