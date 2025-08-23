# v1TimeRange_visual_status

Фильтр по дате изменения статуса возврата.

## Top-level fields
- `v1TimeRange_visual_status` (top-level fields):
  - `time_from`: `string`
  - `time_to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по дате изменения статуса возврата.",
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
