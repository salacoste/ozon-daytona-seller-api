# v1SupplyOrderCancelStatusResponseStatus

Статус отмены заявки на поставку. Возможные значения:
- `SUCCESS` — заявка отменена.
- `IN_PROGRESS` — заявки в процессе отмены.
- `ERROR` — ошибка.


## Full schema (JSON)
```json
{
  "type": "string",
  "enum": [
    "SUCCESS",
    "IN_PROGRESS",
    "ERROR"
  ],
  "description": "Статус отмены заявки на поставку. Возможные значения:\n- `SUCCESS` — заявка отменена.\n- `IN_PROGRESS` — заявки в процессе отмены.\n- `ERROR` — ошибка.\n"
}
```
