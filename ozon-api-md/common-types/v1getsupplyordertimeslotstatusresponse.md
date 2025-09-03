# v1GetSupplyOrderTimeslotStatusResponse

## Top-level fields
- `v1GetSupplyOrderTimeslotStatusResponse` (top-level fields):
  - `errors`: `array`
  - `status` → `$ref` v1GetSupplyOrderTimeslotStatusResponseStatus

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "errors": {
      "description": "Возможные ошибки: \n  - `UNSPECIFIED` — статус не указан;\n  - `INVALID_ORDER_STATE` — неверный статус заказа;\n  - `INCOMPATIBLE_ORDER_FLOW` — неверный статус интервала поставки;\n  - `SET_TIMESLOT_DEADLINE_EXCEED` — заявка на поставку просрочена;\n  - `OUT_OF_ALLOWED_RANGE` — вы ввели некорректное значение интервала поставки;\n  - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическом лицом, работать с ней не получится;\n  - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1UpdateTimeslotError"
      }
    },
    "status": {
      "$ref": "#/components/schemas/v1GetSupplyOrderTimeslotStatusResponseStatus"
    }
  }
}
```
