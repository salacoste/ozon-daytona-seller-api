# v1TimeRange_return_date

Фильтр по дате создания возврата.

## Top-level fields
- `v1TimeRange_return_date` (top-level fields):
  - `time_from`: `string`
  - `time_to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по дате создания возврата.",
  "properties": {
    "time_from": {
      "type": "string",
      "description": "Начало периода.",
      "format": "date-time"
    },
    "time_to": {
      "type": "string",
      "description": "Окончание периода.",
      "format": "date-time"
    }
  }
}
```
