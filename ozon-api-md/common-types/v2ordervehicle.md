# v2OrderVehicle

Информация о водителе и автомобиле.

## Top-level fields
- `v2OrderVehicle` (top-level fields):
  - `can_not_set_reasons`: `array`
  - `can_set`: `boolean`
  - `is_required`: `boolean`
  - `value`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о водителе и автомобиле.",
  "properties": {
    "can_not_set_reasons": {
      "description": "Причина, по которой не получается указать или изменить данные водителя и автомобиля.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "can_set": {
      "type": "boolean",
      "description": "`true`, если можно указать или изменить данные водителя и автомобиля.\n"
    },
    "is_required": {
      "type": "boolean",
      "description": "`true`, если характеристику указывать обязательно.\n"
    },
    "value": {
      "description": "Данные водителя и автомобиля.",
      "items": {
        "$ref": "#/components/schemas/v2VehicleInfo"
      }
    }
  }
}
```
