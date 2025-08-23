# v1QuestionListResponse

## Top-level fields
- `v1QuestionListResponse` (top-level fields):
  - `questions`: `object`
  - `last_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "questions": {
      "description": "Вопросы.",
      "items": {
        "$ref": "#/components/schemas/v1QuestionListResponseQuestions"
      }
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице.\n\nЧтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре `last_id`.\n"
    }
  }
}
```
