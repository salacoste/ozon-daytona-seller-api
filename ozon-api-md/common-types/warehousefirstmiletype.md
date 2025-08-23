# WarehouseFirstMileType

Первая миля FBS.

## Top-level fields
- `WarehouseFirstMileType` (top-level fields):
  - `dropoff_point_id`: `string`
  - `dropoff_timeslot_id`: `integer`
  - `first_mile_is_changing`: `boolean`
  - `first_mile_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Первая миля FBS.",
  "properties": {
    "dropoff_point_id": {
      "type": "string",
      "description": "Идентификатор DropOff-точки."
    },
    "dropoff_timeslot_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор временного слота для DropOff."
    },
    "first_mile_is_changing": {
      "type": "boolean",
      "description": "Признак, что настройки склада обновляются."
    },
    "first_mile_type": {
      "type": "string",
      "description": "Тип первой мили — `DropOff` или `Pickup`.",
      "enum": [
        "DropOff",
        "Pickup"
      ]
    }
  }
}
```
