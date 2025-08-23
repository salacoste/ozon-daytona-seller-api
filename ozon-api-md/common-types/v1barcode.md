# v1Barcode

## Top-level fields
- `v1Barcode` (top-level fields):
  - `barcode`: `string`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "barcode",
    "sku"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "barcode": {
      "type": "string",
      "description": "Значение штрихкода. Не больше 100 символов."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
