# v1TimeRange_storage_tariffication

Фильтр по дате начала тарификации.

## Top-level fields
- `v1TimeRange_storage_tariffication` (top-level fields):
  - `time_from`: `string`
  - `time_to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по дате начала тарификации.",
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
