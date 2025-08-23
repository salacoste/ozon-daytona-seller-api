# v1AddBarcodeResponse

## Top-level fields
- `v1AddBarcodeResponse` (top-level fields):
  - `errors`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1AddBarcodeResult"
      },
      "description": "Список ошибок."
    }
  }
}
```
