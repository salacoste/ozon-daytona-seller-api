# postingGetFboPostingListRequestFilter

Фильтр для поиска отправлений.

## Top-level fields
- `postingGetFboPostingListRequestFilter` (top-level fields):
  - `since`: `string`
  - `status`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "since",
    "to"
  ],
  "properties": {
    "since": {
      "format": "date-time",
      "type": "string",
      "description": "Начало периода в формате YYYY-MM-DD."
    },
    "status": {
      "type": "string",
      "description": "Статус отправления.\n- `awaiting_packaging` — ожидает упаковки,\n- `awaiting_deliver` — ожидает отгрузки,\n- `delivering` — доставляется,\n- `delivered` — доставлено,\n- `cancelled` — отменено.\n"
    },
    "to": {
      "format": "date-time",
      "type": "string",
      "description": "Конец периода в формате YYYY-MM-DD."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр для поиска отправлений."
}
```
