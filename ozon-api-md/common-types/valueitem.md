# ValueItem

## Top-level fields
- `ValueItem` (top-level fields):
  - `barcode`: `string`
  - `expires_at`: `string`
  - `quant`: `integer`
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "barcode": {
      "description": "Штрихкод товара.",
      "type": "string"
    },
    "expires_at": {
      "description": "Годен до.",
      "type": "string",
      "format": "date-time"
    },
    "quant": {
      "description": "Размер кванта.",
      "type": "integer",
      "format": "int32"
    },
    "quantity": {
      "description": "Количество товара.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
