# v1CargoesLabelGetResponseStatus

Статус формирования этикеток:
- `SUCCESS` — готовы.
- `IN_PROGRESS` — формируются.
- `FAILED` — ошибка при формировании.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Статус формирования этикеток:\n- `SUCCESS` — готовы.\n- `IN_PROGRESS` — формируются.\n- `FAILED` — ошибка при формировании.\n",
  "default": "SUCCESS",
  "enum": [
    "SUCCESS",
    "IN_PROGRESS",
    "FAILED"
  ]
}
```
