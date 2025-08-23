# v1DayTimeSlot

Таймслот поставки.

## Top-level fields
- `v1DayTimeSlot` (top-level fields):
  - `from_in_timezone`: `string`
  - `to_in_timezone`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Таймслот поставки.",
  "properties": {
    "from_in_timezone": {
      "type": "string",
      "format": "date-time",
      "description": "Начало таймслота."
    },
    "to_in_timezone": {
      "type": "string",
      "format": "date-time",
      "description": "Конец таймслота."
    }
  }
}
```
