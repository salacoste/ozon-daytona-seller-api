# v1GenerateBarcodeRequest

## Top-level fields
- `v1GenerateBarcodeRequest` (top-level fields):
  - `product_ids`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "product_ids"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "product_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Идентификаторы товаров, для которых нужно создать штрихкод."
    }
  }
}
```
