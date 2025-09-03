# v3ChatInfo

## Top-level fields
- `v3ChatInfo` (top-level fields):
  - `chat` → `$ref` v3ChatDetailsInfo
  - `first_unread_message_id`: `integer`
  - `last_message_id`: `integer`
  - `unread_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "chat": {
      "$ref": "#/components/schemas/v3ChatDetailsInfo"
    },
    "first_unread_message_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор первого непрочитанного сообщения в чате."
    },
    "last_message_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор последнего сообщения в чате."
    },
    "unread_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество непрочитанных сообщений в чате."
    }
  }
}
```
