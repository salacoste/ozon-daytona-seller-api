# v1SupplyOrderContentUpdateRequestItem

## Top-level fields
- `v1SupplyOrderContentUpdateRequestItem` (top-level fields):
  - `quant`: `integer`
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "quant": {
      "type": "integer",
      "format": "int32",
      "description": "Размер кванта."
    },
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
  }
}
```
