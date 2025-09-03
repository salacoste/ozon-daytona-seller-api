# OperationItem

## Top-level fields
- `OperationItem` (top-level fields):
  - `name`: `string`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "type": "object",
  "title": "object"
}
```
