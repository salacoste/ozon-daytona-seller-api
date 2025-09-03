# v1QuestionAnswerListRequest

## Top-level fields
- `v1QuestionAnswerListRequest` (top-level fields):
  - `last_id`: `None`
  - `question_id`: `string`
  - `sku`: `int64`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "last_id": {
      "type": null,
      "description": "Идентификатор последнего значения на странице. \n\nЕсли запрос первый, оставьте поле пустым. Для следующих значений указывайте `last_id` из ответа предыдущего запроса.\n"
    },
    "question_id": {
      "type": "string",
      "description": "Идентификатор вопроса."
    },
    "sku": {
      "type": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "required": [
    "question_id",
    "sku"
  ]
}
```
