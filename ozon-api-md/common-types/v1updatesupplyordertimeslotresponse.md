# v1UpdateSupplyOrderTimeslotResponse

## Top-level fields
- `v1UpdateSupplyOrderTimeslotResponse` (top-level fields):
  - `errors`: `array`
  - `operation_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1UpdateTimeslotError"
      },
      "description": "Возможные ошибки: \n  - `UNSPECIFIED` — статус не указан;\n  - `INVALID_ORDER_STATE` — неверный статус заказа;\n  - `INCOMPATIBLE_ORDER_FLOW` — неверный статус интервала поставки;\n  - `SET_TIMESLOT_DEADLINE_EXCEED` — заявка на поставку просрочена;\n  - `OUT_OF_ALLOWED_RANGE` — вы ввели некорректное значение интервала поставки;\n  - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическим лицом, работать с ней не получится;\n  - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится.\n"
    },
    "operation_id": {
      "description": "Идентификатор операции.",
      "type": "string"
    }
  }
}
```
