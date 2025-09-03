# v2ChatListResponse

## Top-level fields
- `v2ChatListResponse` (top-level fields):
  - `chats`: `object`
  - `total_chats_count`: `integer`
  - `total_unread_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "chats": {
      "description": "Данные чатов.",
      "items": {
        "$ref": "#/components/schemas/ChatInfo"
      }
    },
    "total_chats_count": {
      "type": "integer",
      "format": "int64",
      "description": "Общее количество чатов."
    },
    "total_unread_count": {
      "type": "integer",
      "format": "int64",
      "description": "Общее количество непрочитанных сообщений."
    }
  }
}
```
