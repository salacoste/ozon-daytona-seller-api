# v1SupplyOrderPassStatusResponse

## Top-level fields
- `v1SupplyOrderPassStatusResponse` (top-level fields):
  - `errors`: `array`
  - `result` → `$ref` v1SupplyOrderPassStatusResponseStatus

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "errors": {
      "description": "Причина ошибки:\n- `UNSPECIFIED` — статус не указан;\n- `INVALID_ORDER_STATE` — неверный статус заявки;\n- `VEHICLE_NOT_REQUIRED` — указывать данные автомобиля необязательно;\n- `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическом лицом, работать с ней не получится;\n- `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1SetVehicleError"
      }
    },
    "result": {
      "$ref": "#/components/schemas/v1SupplyOrderPassStatusResponseStatus"
    }
  }
}
```
