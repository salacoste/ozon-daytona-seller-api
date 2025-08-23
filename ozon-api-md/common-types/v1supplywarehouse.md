# v1SupplyWarehouse

Склады для поставки.

## Top-level fields
- `v1SupplyWarehouse` (top-level fields):
  - `address`: `string`
  - `name`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Склады для поставки.",
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
