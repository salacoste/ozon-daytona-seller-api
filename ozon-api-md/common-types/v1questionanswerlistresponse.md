# v1QuestionAnswerListResponse

## Top-level fields
- `v1QuestionAnswerListResponse` (top-level fields):
  - `answers`: `object`
  - `last_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "answers": {
      "description": "Ответы.",
      "items": {
        "$ref": "#/components/schemas/v1QuestionAnswerListResponseAnswers"
      }
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице.\n\nЧтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре `last_id`.\n"
    }
  }
}
```
