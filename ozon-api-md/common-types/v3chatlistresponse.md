# v3ChatListResponse

## Top-level fields
- `v3ChatListResponse` (top-level fields):
  - `chats`: `object`
  - `total_unread_count`: `integer`
  - `cursor`: `string`
  - `has_next`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "chats": {
      "description": "Данные чатов.",
      "items": {
        "$ref": "#/components/schemas/v3ChatInfo"
      }
    },
    "total_unread_count": {
      "type": "integer",
      "format": "int64",
      "description": "Общее количество непрочитанных сообщений."
    },
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "has_next": {
      "type": "boolean",
      "description": "Признак, что в ответе вернулись не все чаты:\n- `true` — сделайте повторный запрос с новым параметром `cursor` для получения остальных чатов;\n- `false` — ответ содержит все чаты для фильтра, который был задан в запросе.\n"
    }
  }
}
```
