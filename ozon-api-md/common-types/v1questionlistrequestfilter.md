# v1QuestionListRequestFilter

Фильтр.

## Top-level fields
- `v1QuestionListRequestFilter` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр.",
  "properties": {
    "date_from": {
      "type": "string",
      "format": "date-time",
      "description": "Начало периода."
    },
    "date_to": {
      "type": "string",
      "format": "date-time",
      "description": "Конец периода."
    },
    "status": {
      "type": "string",
      "description": "Статусы вопроса:\n  - `NEW` — новый,\n  - `ALL` — все вопросы,\n  - `VIEWED` — просмотренный,\n  - `PROCESSED` — обработанный,\n  - `UNPROCESSED` — необработанный.\n"
    }
  }
}
```
