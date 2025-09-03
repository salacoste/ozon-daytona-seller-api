# RatingValue

## Top-level fields
- `RatingValue` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `status` → `$ref` v1RatingStatus
  - `value`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "date_from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала подсчёта рейтинга."
    },
    "date_to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата конца подсчёта рейтинга."
    },
    "status": {
      "$ref": "#/components/schemas/v1RatingStatus"
    },
    "value": {
      "type": "number",
      "format": "double",
      "description": "Значение рейтинга."
    }
  }
}
```
