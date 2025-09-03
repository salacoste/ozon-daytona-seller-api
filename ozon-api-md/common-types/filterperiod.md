# FilterPeriod

Фильтр по дате.

## Top-level fields
- `FilterPeriod` (top-level fields):
  - `from`: `string`
  - `to`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "from": {
      "format": "date-time",
      "type": "string",
      "description": "Начало периода.\n\nФормат: `YYYY-MM-DDTHH:mm:ss.sssZ`.<br>\nПример: `2019-11-25T10:43:06.51`.\n"
    },
    "to": {
      "format": "date-time",
      "type": "string",
      "description": "Конец периода.\n\nФормат: `YYYY-MM-DDTHH:mm:ss.sssZ`.<br>\nПример: `2019-11-25T10:43:06.51`.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр по дате."
}
```
