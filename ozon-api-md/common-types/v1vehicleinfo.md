# v1VehicleInfo

Информация о водителе и автомобиле.

## Top-level fields
- `v1VehicleInfo` (top-level fields):
  - `driver_name`: `string`
  - `driver_phone`: `string`
  - `vehicle_model`: `string`
  - `vehicle_number`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "driver_name",
    "driver_phone",
    "vehicle_model",
    "vehicle_number"
  ],
  "type": "object",
  "title": "object",
  "description": "Информация о водителе и автомобиле.",
  "properties": {
    "driver_name": {
      "type": "string",
      "description": "Имя водителя."
    },
    "driver_phone": {
      "type": "string",
      "description": "Телефон водителя."
    },
    "vehicle_model": {
      "type": "string",
      "description": "Модель автомобиля."
    },
    "vehicle_number": {
      "type": "string",
      "description": "Номер автомобиля."
    }
  }
}
```
