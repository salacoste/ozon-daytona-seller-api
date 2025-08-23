# v1SupplyOrderPassCreateResponse

## Top-level fields
- `v1SupplyOrderPassCreateResponse` (top-level fields):
  - `error_reasons`: `array`
  - `operation_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "error_reasons": {
      "description": "Причина ошибки:\n  - `UNSPECIFIED` — статус заявки не указан;\n  - `INVALID_ORDER_STATE` — неверный статус заявки;\n  - `VEHICLE_NOT_REQUIRED` — указывать данные автомобиля необязательно;\n  - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическом лицом, работать с ней не получится;\n  - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1SetVehicleError"
      }
    },
    "operation_id": {
      "description": "Идентификатор операции.",
      "type": "string"
    }
  }
}
```
