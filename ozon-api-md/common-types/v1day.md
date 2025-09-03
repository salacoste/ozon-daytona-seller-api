# v1Day

## Top-level fields
- `v1Day` (top-level fields):
  - `date_in_timezone`: `string`
  - `timeslots`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "date_in_timezone": {
      "type": "string",
      "format": "date-time",
      "description": "Дата таймслотов."
    },
    "timeslots": {
      "type": "array",
      "description": "Таймслоты.",
      "items": {
        "$ref": "#/components/schemas/v1DayTimeSlot"
      }
    }
  }
}
```
