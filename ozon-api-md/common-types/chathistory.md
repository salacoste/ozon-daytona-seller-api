# ChatHistory

## Top-level fields
- `ChatHistory` (top-level fields):
  - `chat_id`: `string`
  - `direction`: `string`
  - `from_message_id`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "chat_id": {
      "type": "string",
      "description": "Идентификатор чата."
    },
    "direction": {
      "type": "string",
      "description": "Направление сортировки сообщений:\n- `Forward` — от старых к новым.\n- `Backward` — от новых к старым.\n\nЗначение по умолчанию — `Backward`. Количество сообщений можно установить в параметре `limit`.\n"
    },
    "from_message_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор сообщения, с которого начать вывод истории чата. По умолчанию — последнее видимое сообщение."
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество сообщений в ответе. По умолчанию — 50. Максимальное значение — 1000."
    }
  },
  "required": [
    "chat_id",
    "limit"
  ]
}
```
