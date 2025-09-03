# v2CancellationStateEnumFilters

Фильтр по статусу заявки на отмену:
- `ALL` — заявки в любом статусе, 
- `ON_APPROVAL` — заявки на рассмотрении,
- `APPROVED` — подтверждённые заявки, 
- `REJECTED` — отклонённые заявки.


## Full schema (JSON)
```json
{
  "type": "string",
  "default": "ALL",
  "description": "Фильтр по статусу заявки на отмену:\n- `ALL` — заявки в любом статусе, \n- `ON_APPROVAL` — заявки на рассмотрении,\n- `APPROVED` — подтверждённые заявки, \n- `REJECTED` — отклонённые заявки.\n",
  "enum": [
    "ALL",
    "ON_APPROVAL",
    "APPROVED",
    "REJECTED"
  ]
}
```
