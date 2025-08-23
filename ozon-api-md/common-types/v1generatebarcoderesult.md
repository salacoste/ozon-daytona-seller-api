# v1GenerateBarcodeResult

## Top-level fields
- `v1GenerateBarcodeResult` (top-level fields):
  - `code`: `string`
  - `error`: `string`
  - `barcode`: `string`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Код ошибки."
    },
    "error": {
      "type": "string",
      "description": "Описание ошибки."
    },
    "barcode": {
      "type": "string",
      "description": "Штрихкод, при создании которого произошла ошибка."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара, для которого не удалось создать штрихкод."
    }
  }
}
```
