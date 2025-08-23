# CargoesCreateErrorsItemValidation

## Top-level fields
- `CargoesCreateErrorsItemValidation` (top-level fields):
  - `barcode`: `string`
  - `cargo_key`: `string`
  - `quant`: `integer`
  - `type` → `$ref` ItemValidationErrorType

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "barcode": {
      "description": "Штрихкод товара.",
      "type": "string"
    },
    "cargo_key": {
      "description": "Ключ грузоместа.",
      "type": "string"
    },
    "quant": {
      "description": "Размер кванта.",
      "type": "integer",
      "format": "int32"
    },
    "type": {
      "$ref": "#/components/schemas/ItemValidationErrorType"
    }
  }
}
```
