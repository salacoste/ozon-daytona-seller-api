# ChatInfo

Данные чата.

## Top-level fields
- `ChatInfo` (top-level fields):
  - `chat_id`: `string`
  - `chat_status`: `string`
  - `chat_type`: `string`
  - `created_at`: `string`
  - `first_unread_message_id`: `integer`
  - `last_message_id`: `integer`
  - `unread_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Данные чата.",
  "properties": {
    "chat_id": {
      "type": "string",
      "description": "Идентификатор чата."
    },
    "chat_status": {
      "type": "string",
      "description": "Статус чата:\n- `All` — все чаты.\n- `Opened` — открытые чаты.\n- `Closed` — закрытые чаты.\n"
    },
    "chat_type": {
      "type": "string",
      "description": "Тип чата:\n- `Seller_Support` — чат с поддержкой.\n- `Buyer_Seller` — чат с покупателем.\n"
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания чата."
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
