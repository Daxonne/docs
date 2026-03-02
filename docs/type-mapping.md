---
id: type-mapping
title: Type Mapping
sidebar_position: 8
---

# Type Mapping

Daxonne converts database-native types to a normalised **internal type** set, then maps those to language-specific types in templates.

## Internal types

| Internal type | Description |
|---|---|
| `string` | Variable-length text |
| `int` | 32-bit integer |
| `long` | 64-bit integer |
| `decimal` | Fixed or floating point number |
| `bool` | Boolean (true/false) |
| `date` | Date without time component |
| `datetime` | Date with time component |
| `bytes` | Binary data |
| `uuid` | Universally unique identifier |

---

## Database → Internal type

### Oracle

| Oracle type | Condition | Internal type |
|---|---|---|
| `VARCHAR2`, `CHAR`, `NVARCHAR2`, `NCHAR`, `CLOB`, `NCLOB`, `LONG` | — | `string` |
| `NUMBER` | No precision | `decimal` |
| `NUMBER(p,0)` | p ≤ 9 | `int` |
| `NUMBER(p,0)` | 10 ≤ p ≤ 18 | `long` |
| `NUMBER(p,s)` | s > 0 | `decimal` |
| `INTEGER`, `SMALLINT`, `INT` | — | `int` |
| `FLOAT`, `BINARY_FLOAT`, `BINARY_DOUBLE` | — | `decimal` |
| `DATE` | — | `date` |
| `TIMESTAMP*` | — | `datetime` |
| `BLOB`, `RAW`, `LONG RAW` | — | `bytes` |
| Anything else | — | `string` |

### PostgreSQL

| PostgreSQL type | Condition | Internal type |
|---|---|---|
| `boolean` | — | `bool` |
| `uuid` | — | `uuid` |
| `smallint`, `int2` | — | `int` |
| `integer`, `serial`, `int4` | — | `int` |
| `bigint`, `bigserial`, `int8` | — | `long` |
| `numeric`, `decimal` | scale > 0 | `decimal` |
| `numeric`, `decimal` | p ≤ 9, scale = 0 | `int` |
| `numeric`, `decimal` | p ≤ 18, scale = 0 | `long` |
| `real`, `double precision` | — | `decimal` |
| `date` | — | `date` |
| `timestamp*` | — | `datetime` |
| `bytea` | — | `bytes` |
| Everything else | — | `string` |

### MySQL / MariaDB

| MySQL type | Condition | Internal type |
|---|---|---|
| `TINYINT(1)` | — | `bool` ← MySQL boolean convention |
| `BOOL`, `BOOLEAN` | — | `bool` |
| `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `INTEGER` | — | `int` |
| `BIGINT` | — | `long` |
| `DECIMAL`, `NUMERIC` | scale > 0 | `decimal` |
| `DECIMAL`, `NUMERIC` | p ≤ 9, scale = 0 | `int` |
| `DECIMAL`, `NUMERIC` | p ≤ 18, scale = 0 | `long` |
| `FLOAT`, `DOUBLE`, `REAL` | — | `decimal` |
| `DATE` | — | `date` |
| `DATETIME`, `TIMESTAMP` | — | `datetime` |
| `BLOB`, `BINARY`, `VARBINARY`, `*BLOB` | — | `bytes` |
| Everything else | — | `string` |

---

## Internal type → Language type

| Internal | C# | TypeScript | Java | Python | SQLAlchemy |
|---|---|---|---|---|---|
| `string` | `string` | `string` | `String` | `str` | `String` |
| `int` | `int` | `number` | `Integer` | `int` | `Integer` |
| `long` | `long` | `number` | `Long` | `int` | `BigInteger` |
| `decimal` | `decimal` | `number` | `BigDecimal` | `Decimal` | `Numeric` |
| `bool` | `bool` | `boolean` | `Boolean` | `bool` | `Boolean` |
| `date` | `DateOnly` | `Date` | `LocalDate` | `date` | `Date` |
| `datetime` | `DateTime` | `Date` | `LocalDateTime` | `datetime` | `DateTime` |
| `bytes` | `byte[]` | `Uint8Array` | `byte[]` | `bytes` | `LargeBinary` |
| `uuid` | `Guid` | `string` | `UUID` | `UUID` | `Uuid` |
