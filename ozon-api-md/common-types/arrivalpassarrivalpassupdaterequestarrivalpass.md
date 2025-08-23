# arrivalpassArrivalPassUpdateRequestArrivalPass

## Top-level fields
- `arrivalpassArrivalPassUpdateRequestArrivalPass` (top-level fields):
  - `arrival_pass_id`: `integer`
  - `arrival_time`: `string`
  - `driver_name`: `string`
  - `driver_phone`: `string`
  - `vehicle_license_plate`: `string`
  - `vehicle_model`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "arrival_pass_id",
    "arrival_time",
    "driver_name",
    "driver_phone",
    "vehicle_license_plate",
    "vehicle_model"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "arrival_pass_id": {
      "type": "integer",
      "description": "Идентификатор пропуска.",
      "format": "int64"
    },
    "arrival_time": {
      "type": "string",
      "description": "Время прибытия в формате UTC.\nВ это время начнёт действовать пропуск.\n\nЧтобы изменить время прибытия, используйте метод [/v1/carriage/pass/update](#operation/carriagePassUpdate).\n",
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
    "vehicle_license_plate": {
      "type": "string",
      "description": "Номер автомобиля."
    },
    "vehicle_model": {
      "type": "string",
      "description": "Модель автомобиля."
    }
  }
}
```
