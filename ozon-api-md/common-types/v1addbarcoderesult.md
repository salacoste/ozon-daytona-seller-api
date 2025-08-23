# v1AddBarcodeResult

## Top-level fields
- `v1AddBarcodeResult` (top-level fields):
  - `code`: `string`
  - `error`: `string`
  - `barcode`: `string`
  - `sku`: `integer`

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
      "description": "Штрихкод, который не удалось привязать."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара, к которому не удалось привязать штрихкод."
    }
  }
}
```
