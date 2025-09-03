# v2ChatHistoryResponse

## Top-level fields
- `v2ChatHistoryResponse` (top-level fields):
  - `has_next`: `boolean`
  - `messages`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в ответе вернули не все сообщения."
    },
    "messages": {
      "description": "Массив сообщений, отсортированный в соответствии с параметром `direction` из тела запроса.",
      "items": {
        "$ref": "#/components/schemas/v2ChatMessage"
      }
    }
  }
}
```
