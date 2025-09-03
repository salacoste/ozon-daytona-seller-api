# v1DropOffWarehouse

## Top-level fields
- `v1DropOffWarehouse` (top-level fields):
  - `current_time_in_timezone`: `string`
  - `days`: `array`
  - `drop_off_warehouse_id`: `integer`
  - `warehouse_timezone`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "current_time_in_timezone": {
      "type": "string",
      "format": "date-time",
      "description": "Текущее время в часовом поясе склада."
    },
    "days": {
      "type": "array",
      "description": "Таймслоты по датам.",
      "items": {
        "$ref": "#/components/schemas/v1Day"
      }
    },
    "drop_off_warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада."
    },
    "warehouse_timezone": {
      "type": "string",
      "description": "Часовой пояс склада."
    }
  }
}
```
