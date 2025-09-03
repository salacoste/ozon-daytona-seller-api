# PostingProductCancelRequestItem

## Top-level fields
- `PostingProductCancelRequestItem` (top-level fields):
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "quantity",
    "sku"
  ],
  "properties": {
    "quantity": {
      "format": "int32",
      "type": "integer",
      "description": "Количество товара в отправлении."
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
