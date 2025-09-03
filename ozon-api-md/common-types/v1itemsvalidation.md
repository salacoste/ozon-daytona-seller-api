# v1ItemsValidation

## Top-level fields
- `v1ItemsValidation` (top-level fields):
  - `reasons`: `array`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "reasons": {
      "type": "array",
      "description": "Причины ошибки.",
      "items": {
        "type": "string"
      }
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
