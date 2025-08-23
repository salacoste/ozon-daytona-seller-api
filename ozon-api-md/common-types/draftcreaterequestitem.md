# DraftCreateRequestItem

## Top-level fields
- `DraftCreateRequestItem` (top-level fields):
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товара."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "required": [
    "quantity",
    "sku"
  ]
}
```
