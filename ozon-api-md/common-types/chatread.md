# ChatRead

## Top-level fields
- `ChatRead` (top-level fields):
  - `chat_id`: `string`
  - `from_message_id`: `integer`

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
    "from_message_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор сообщения."
    }
  },
  "required": [
    "chat_id"
  ]
}
```
