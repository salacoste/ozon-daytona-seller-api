# v1QuestionAnswerDeleteRequest

## Top-level fields
- `v1QuestionAnswerDeleteRequest` (top-level fields):
  - `answer_id`: `string`
  - `sku`: `int64`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "answer_id": {
      "type": "string",
      "description": "Идентификатор ответа."
    },
    "sku": {
      "type": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "required": [
    "answer_id",
    "sku"
  ]
}
```
