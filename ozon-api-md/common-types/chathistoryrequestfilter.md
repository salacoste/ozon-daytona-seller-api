# ChatHistoryRequestFilter

Фильтр по сообщениям.

## Top-level fields
- `ChatHistoryRequestFilter` (top-level fields):
  - `message_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Фильтр по сообщениям.",
  "properties": {
    "message_ids": {
      "description": "Идентификаторы сообщений.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "uint64"
      }
    }
  }
}
```
