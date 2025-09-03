# v3ChatHistoryResponse

## Top-level fields
- `v3ChatHistoryResponse` (top-level fields):
  - `has_next`: `boolean`
  - `messages`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в ответе вернули не все сообщения."
    },
    "messages": {
      "description": "Массив сообщений, отсортированный в соответствии с параметром `direction` из тела запроса.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3ChatMessage"
      }
    }
  }
}
```
