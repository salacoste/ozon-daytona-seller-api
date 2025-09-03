# v2Warehouse

Склад поставки.

## Top-level fields
- `v2Warehouse` (top-level fields):
  - `address`: `string`
  - `name`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Склад поставки.",
  "properties": {
    "address": {
      "type": "string",
      "description": "Адрес склада."
    },
    "name": {
      "type": "string",
      "description": "Название склада."
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада."
    }
  }
}
```
