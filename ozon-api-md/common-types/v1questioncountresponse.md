# v1QuestionCountResponse

## Top-level fields
- `v1QuestionCountResponse` (top-level fields):
  - `all`: `int64`
  - `new`: `int64`
  - `processed`: `int64`
  - `unprocessed`: `int64`
  - `viewed`: `int64`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "all": {
      "type": "int64",
      "description": "Всего вопросов."
    },
    "new": {
      "type": "int64",
      "description": "Новые вопросы."
    },
    "processed": {
      "type": "int64",
      "description": "Обработанные вопросы."
    },
    "unprocessed": {
      "type": "int64",
      "description": "Необработанные вопросы."
    },
    "viewed": {
      "type": "int64",
      "description": "Просмотренные вопросы."
    }
  }
}
```
