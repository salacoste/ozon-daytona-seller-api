# v1QuestionAnswerCreateRequest

## Top-level fields
- `v1QuestionAnswerCreateRequest` (top-level fields):
  - `question_id`: `string`
  - `sku`: `int64`
  - `text`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
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
      "description": "Текст ответа объёмом от 2 до 3000 символов."
    }
  },
  "required": [
    "question_id",
    "sku",
    "text"
  ]
}
```
