# arrivalpassArrivalPassCreateRequestArrivalPass

## Top-level fields
- `arrivalpassArrivalPassCreateRequestArrivalPass` (top-level fields):
  - `arrival_time`: `string`
  - `driver_name`: `string`
  - `driver_phone`: `string`
  - `dropoff_point_id`: `integer`
  - `vehicle_license_plate`: `string`
  - `vehicle_model`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "arrival_time",
    "driver_name",
    "driver_phone",
    "dropoff_point_id",
    "vehicle_license_plate",
    "vehicle_model",
    "warehouse_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "arrival_time": {
      "type": "string",
      "description": "Время прибытия в формате UTC. \nВ это время пропуск начнёт действовать.\n",
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
      "description": "Идентификатор склада, на который оформляется пропуск.",
      "format": "int64"
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
      "description": "Идентификатор склада продавца. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList).",
      "format": "int64"
    }
  }
}
```
