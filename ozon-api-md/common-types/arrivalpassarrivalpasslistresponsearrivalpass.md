# arrivalpassArrivalPassListResponseArrivalPass

## Top-level fields
- `arrivalpassArrivalPassListResponseArrivalPass` (top-level fields):
  - `arrival_pass_id`: `integer`
  - `arrival_reasons`: `array`
  - `arrival_time`: `string`
  - `driver_name`: `string`
  - `driver_phone`: `string`
  - `dropoff_point_id`: `integer`
  - `is_active`: `boolean`
  - `vehicle_license_plate`: `string`
  - `vehicle_model`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "arrival_pass_id": {
      "type": "integer",
      "description": "Идентификатор пропуска.",
      "format": "int64"
    },
    "arrival_reasons": {
      "type": "array",
      "description": "Цель приезда.",
      "items": {
        "type": "string"
      }
    },
    "arrival_time": {
      "type": "string",
      "description": "Дата и время въезда в формате UTC.",
      "format": "date-time"
    },
    "driver_name": {
      "type": "string",
      "description": "ФИО водителя."
    },
    "driver_phone": {
      "type": "string",
      "description": "Номер телефона водителя."
    },
    "dropoff_point_id": {
      "type": "integer",
      "description": "Идентификатор точки отгрузки.",
      "format": "int64"
    },
    "is_active": {
      "type": "boolean",
      "description": "`true`, если заявка активна.\n"
    },
    "vehicle_license_plate": {
      "type": "string",
      "description": "Номер автомобиля."
    },
    "vehicle_model": {
      "type": "string",
      "description": "Модель автомобиля."
    },
    "warehouse_id": {
      "type": "integer",
      "description": "Идентификатор склада продавца.",
      "format": "int64"
    }
  }
}
```
