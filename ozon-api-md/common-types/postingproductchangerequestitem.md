# PostingProductChangeRequestItem

## Top-level fields
- `PostingProductChangeRequestItem` (top-level fields):
  - `sku`: `integer`
  - `weightReal`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "sku",
    "weightReal"
  ],
  "properties": {
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "weightReal": {
      "type": "array",
      "items": {
        "type": "number",
        "format": "double"
      },
      "description": "Вес единиц товара в отправлении."
    }
  },
  "type": "object",
  "title": "object"
}
```
