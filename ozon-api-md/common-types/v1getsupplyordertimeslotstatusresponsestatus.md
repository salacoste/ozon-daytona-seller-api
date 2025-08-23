# v1GetSupplyOrderTimeslotStatusResponseStatus

Статус данных: 
  - `UNSPECIFIED` — не указан;
  - `ERROR` — ошибка;
  - `IN_PROGRESS` — устанавливается;
  - `SUCCESS` — установлен.


## Full schema (JSON)
```json
{
  "type": "string",
  "title": "object",
  "default": "STATUS_UNSPECIFIED",
  "enum": [
    "STATUS_UNSPECIFIED",
    "STATUS_ERROR",
    "STATUS_IN_PROGRESS",
    "STATUS_SUCCESS"
  ],
  "description": "Статус данных: \n  - `UNSPECIFIED` — не указан;\n  - `ERROR` — ошибка;\n  - `IN_PROGRESS` — устанавливается;\n  - `SUCCESS` — установлен.\n"
}
```
