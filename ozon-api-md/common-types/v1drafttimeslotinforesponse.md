# v1DraftTimeslotInfoResponse

## Top-level fields
- `v1DraftTimeslotInfoResponse` (top-level fields):
  - `drop_off_warehouse_timeslots`: `array`
  - `requested_date_from`: `string`
  - `requested_date_to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "drop_off_warehouse_timeslots": {
      "type": "array",
      "description": "Таймслоты складов.",
      "items": {
        "$ref": "#/components/schemas/v1DropOffWarehouse"
      }
    },
    "requested_date_from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала интересующего периода."
    },
    "requested_date_to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата окончания интересующего периода."
    }
  }
}
```
