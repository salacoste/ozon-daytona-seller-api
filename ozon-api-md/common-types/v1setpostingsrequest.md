# v1SetPostingsRequest

## Top-level fields
- `v1SetPostingsRequest` (top-level fields):
  - `carriage_id`: `integer`
  - `posting_numbers`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "carriage_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор отгрузки.",
      "required": true
    },
    "posting_numbers": {
      "type": "array",
      "description": "Актуальный список отправлений.",
      "items": {
        "type": "string"
      }
    }
  }
}
```
