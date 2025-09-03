# v1GenerateBarcodeResponse

## Top-level fields
- `v1GenerateBarcodeResponse` (top-level fields):
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
        "$ref": "#/components/schemas/v1GenerateBarcodeResult"
      },
      "description": "Ошибки при создании штрихкода."
    }
  }
}
```
