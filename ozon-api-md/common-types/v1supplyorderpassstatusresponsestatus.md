# v1SupplyOrderPassStatusResponseStatus

Статус ввода данных о водителе и автомобиле:
- `Unknown` — статус неизвестен;
- `Success` — данные указаны;
- `InProgress` — данные обрабатываются;
- `Failed` — не удалось обработать данные.


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "object",
  "default": "Unknown",
  "enum": [
    "Unknown",
    "Success",
    "InProgress",
    "Failed"
  ],
  "description": "Статус ввода данных о водителе и автомобиле:\n- `Unknown` — статус неизвестен;\n- `Success` — данные указаны;\n- `InProgress` — данные обрабатываются;\n- `Failed` — не удалось обработать данные.\n"
}
```
