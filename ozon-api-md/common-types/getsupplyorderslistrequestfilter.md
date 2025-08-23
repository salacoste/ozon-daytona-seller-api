# GetSupplyOrdersListRequestFilter

Фильтр.

## Top-level fields
- `GetSupplyOrdersListRequestFilter` (top-level fields):
  - `states`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр.",
  "properties": {
    "states": {
      "description": "Фильтр по статусу поставки:\n- `ORDER_STATE_DATA_FILLING` — заполнение данных;\n- `ORDER_STATE_READY_TO_SUPPLY` — готова к отгрузке;\n- `ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки;\n- `ORDER_STATE_IN_TRANSIT` — в пути;\n- `ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе;\n- `ORDER_STATE_REPORTS_CONFIRMATION_AWAITING` — согласование актов;\n- `ORDER_STATE_REPORT_REJECTED` — спор;\n- `ORDER_STATE_COMPLETED` — завершена;\n- `ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке;\n- `ORDER_STATE_CANCELLED` — отменена.\n",
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "ORDER_STATE_DATA_FILLING",
          "ORDER_STATE_READY_TO_SUPPLY",
          "ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE",
          "ORDER_STATE_IN_TRANSIT",
          "ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE",
          "ORDER_STATE_REPORTS_CONFIRMATION_AWAITING",
          "ORDER_STATE_REPORT_REJECTED",
          "ORDER_STATE_COMPLETED",
          "ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE",
          "ORDER_STATE_CANCELLED"
        ]
      }
    }
  }
}
```
