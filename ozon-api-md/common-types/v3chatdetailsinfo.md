# v3ChatDetailsInfo

Информация о чате.

## Top-level fields
- `v3ChatDetailsInfo` (top-level fields):
  - `created_at`: `string`
  - `chat_id`: `string`
  - `chat_status`: `string`
  - `chat_type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация о чате.",
  "properties": {
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания чата."
    },
    "chat_id": {
      "type": "string",
      "description": "Идентификатор чата."
    },
    "chat_status": {
      "type": "string",
      "description": "Статус чата:\n- `All` — все чаты.\n- `Opened` — открытые чаты.\n- `Closed` — закрытые чаты.\n- `UNSPECIFIED` — не определено.\n"
    },
    "chat_type": {
      "type": "string",
      "description": "Тип чата:\n- `Seller_Support` — чат с поддержкой.\n- `Buyer_Seller` — чат с покупателем.\n- `UNSPECIFIED` — не определено.\n"
    }
  }
}
```
