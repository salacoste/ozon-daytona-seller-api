# v1QuestionListRequest

## Top-level fields
- `v1QuestionListRequest` (top-level fields):
  - `filter` → `$ref` v1QuestionListRequestFilter
  - `last_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/v1QuestionListRequestFilter"
    },
    "last_id": {
      "type": "string",
      "description": "Идентификатор последнего значения на странице. \n\nОставьте это поле пустым при выполнении первого запроса. Чтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса.\n"
    }
  }
}
```
