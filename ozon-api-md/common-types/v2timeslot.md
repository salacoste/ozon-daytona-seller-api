# v2Timeslot

## Top-level fields
- `v2Timeslot` (top-level fields):
  - `from`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "from": {
      "type": "string",
      "description": "Начало интервала.",
      "format": "date-time"
    },
    "to": {
      "type": "string",
      "format": "date-time",
      "description": "Конец интервала."
    }
  }
}
```
