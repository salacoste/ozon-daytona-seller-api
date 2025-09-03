# v1GetSupplyOrderTimeslotsResponse

## Top-level fields
- `v1GetSupplyOrderTimeslotsResponse` (top-level fields):
  - `timeslots`: `array`
  - `timezone`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "timeslots": {
      "description": "Интервалы поставки.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1SupplyOrderTimeslot"
      }
    },
    "timezone": {
      "description": "Часовой пояс.",
      "items": {
        "$ref": "#/components/schemas/v1Timezone"
      }
    }
  }
}
```
