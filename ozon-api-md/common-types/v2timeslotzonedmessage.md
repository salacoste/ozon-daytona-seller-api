# v2TimeslotZonedMessage

## Top-level fields
- `v2TimeslotZonedMessage` (top-level fields):
  - `timeslot`: `object`
  - `timezone_info`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "timeslot": {
      "description": "Интервал поставки по местному времени.",
      "items": {
        "$ref": "#/components/schemas/v2Timeslot"
      }
    },
    "timezone_info": {
      "description": "Часовой пояс.",
      "items": {
        "$ref": "#/components/schemas/v2Timezone"
      }
    }
  }
}
```
