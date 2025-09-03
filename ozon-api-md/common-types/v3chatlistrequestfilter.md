# v3ChatListRequestFilter

Фильтр по чатам.

## Top-level fields
- `v3ChatListRequestFilter` (top-level fields):
  - `chat_status`: `string`
  - `unread_only`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по чатам.",
  "properties": {
    "chat_status": {
      "type": "string",
      "description": "Фильтр по статусу чата:\n- `All` — все чаты.\n- `Opened` — открытые чаты.\n- `Closed` — закрытые чаты.\n\nЗначение по умолчанию: `All`.\n"
    },
    "unread_only": {
      "type": "boolean",
      "description": "Фильтр по чатам с непрочитанными сообщениями."
    }
  }
}
```
