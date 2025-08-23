# v1CargoesCreateInfoResponseStatus

Статус формирования грузомест:
  - `SUCCESS` — успешно.
  - `IN_PROGRESS` — формируются.
  - `FAILED` — при формировании грузомест произошла ошибка.


## Full schema (JSON)
```json
{
  "type": "string",
  "description": "Статус формирования грузомест:\n  - `SUCCESS` — успешно.\n  - `IN_PROGRESS` — формируются.\n  - `FAILED` — при формировании грузомест произошла ошибка.\n",
  "default": "SUCCESS",
  "enum": [
    "SUCCESS",
    "IN_PROGRESS",
    "FAILED"
  ]
}
```
