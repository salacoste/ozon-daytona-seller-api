# v1OrderState

Статус поставки:
- `UNSPECIFIED` — статус не указан;
- `DATA_FILLING` — заполнение данных;
- `READY_TO_SUPPLY` — готова к отгрузке;
- `ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки;
- `IN_TRANSIT` — в пути;
- `ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе;
- `REPORTS_CONFIRMATION_AWAITING` — согласование актов;
- `REPORT_REJECTED` — спор;
- `COMPLETED` — завершена;
- `REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке;
- `CANCELLED` — отменена.


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "SupplyOrderStatusCounter",
  "default": "ORDER_STATE_UNSPECIFIED",
  "enum": [
    "ORDER_STATE_UNSPECIFIED",
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
  ],
  "description": "Статус поставки:\n- `UNSPECIFIED` — статус не указан;\n- `DATA_FILLING` — заполнение данных;\n- `READY_TO_SUPPLY` — готова к отгрузке;\n- `ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки;\n- `IN_TRANSIT` — в пути;\n- `ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе;\n- `REPORTS_CONFIRMATION_AWAITING` — согласование актов;\n- `REPORT_REJECTED` — спор;\n- `COMPLETED` — завершена;\n- `REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке;\n- `CANCELLED` — отменена.\n"
}
```
