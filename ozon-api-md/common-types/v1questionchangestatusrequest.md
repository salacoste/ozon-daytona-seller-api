# v1QuestionChangeStatusRequest

## Top-level fields
- `v1QuestionChangeStatusRequest` (top-level fields):
  - `question_ids`: `object`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "question_ids": {
      "items": {
        "type": "string"
      },
      "description": "Идентификаторы вопросов."
    },
    "status": {
      "type": "string",
      "description": "Статусы вопросов:\n  - `NEW` — новые,\n  - `VIEWED` — просмотренные,\n  - `PROCESSED` — обработанные.\n"
    }
  },
  "required": [
    "question_ids",
    "status"
  ]
}
```
