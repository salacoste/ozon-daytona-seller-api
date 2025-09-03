# v2ChatMessage

## Top-level fields
- `v2ChatMessage` (top-level fields):
  - `created_at`: `string`
  - `data`: `object`
  - `is_read`: `boolean`
  - `messageId`: `integer`
  - `user` → `$ref` v2User

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания сообщения."
    },
    "data": {
      "description": "Массив с содержимым сообщения в формате Markdown.",
      "items": {
        "type": "string"
      }
    },
    "is_read": {
      "type": "boolean",
      "description": "Признак, что сообщение прочитано."
    },
    "messageId": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор сообщения."
    },
    "user": {
      "$ref": "#/components/schemas/v2User"
    }
  }
}
```
