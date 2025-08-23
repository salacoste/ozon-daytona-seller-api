# sellerSellerAPIArrivalPassUpdateRequestArrivalPass

## Top-level fields
- `sellerSellerAPIArrivalPassUpdateRequestArrivalPass` (top-level fields):
  - `driver_name`: `string`
  - `driver_phone`: `string`
  - `id`: `integer`
  - `vehicle_license_plate`: `string`
  - `vehicle_model`: `string`
  - `with_returns`: `boolean`

## Full schema (JSON)
```json
{
  "required": [
    "driver_name",
    "driver_phone",
    "id",
    "vehicle_license_plate",
    "vehicle_model"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "driver_name": {
      "type": "string",
      "description": "ФИО водителя."
    },
    "driver_phone": {
      "type": "string",
      "description": "Номер телефона водителя."
    },
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор пропуска."
    },
    "vehicle_license_plate": {
      "type": "string",
      "description": "Номер автомобиля."
    },
    "vehicle_model": {
      "type": "string",
      "description": "Модель автомобиля."
    },
    "with_returns": {
      "type": "boolean",
      "description": "`true`, если будете вывозить возвраты. По умолчанию — `false`.\n"
    }
  }
}
```
