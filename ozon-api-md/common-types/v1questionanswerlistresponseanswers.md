# v1QuestionAnswerListResponseAnswers

## Top-level fields
- `v1QuestionAnswerListResponseAnswers` (top-level fields):
  - `author_name`: `string`
  - `id`: `string`
  - `published_at`: `timestamp`
  - `question_id`: `string`
  - `sku`: `int64`
  - `text`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "author_name": {
      "type": "string",
      "description": "Автор ответа."
    },
    "id": {
      "type": "string",
      "description": "Идентификатор ответа."
    },
    "published_at": {
      "type": "timestamp",
      "description": "Дата публикации ответа."
    },
    "question_id": {
      "type": "string",
      "description": "Идентификатор вопроса."
    },
    "sku": {
      "type": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "text": {
      "type": "string",
      "description": "Текст ответа."
    }
  }
}
```
