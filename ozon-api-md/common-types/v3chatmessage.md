# v3ChatMessage

## Top-level fields
- `v3ChatMessage` (top-level fields):
  - `context` → `$ref` ChatMessageContext
  - `created_at`: `string`
  - `data`: `array`
  - `is_image`: `boolean`
  - `is_read`: `boolean`
  - `message_id`: `integer`
  - `moderate_image_status` → `$ref` ChatMessageModerateImageStatus
  - `user` → `$ref` v3User

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "context": {
      "$ref": "#/components/schemas/ChatMessageContext"
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания сообщения."
    },
    "data": {
      "description": "Массив с содержимым сообщения в формате Markdown.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "is_image": {
      "description": "Признак, что сообщение содержит изображение.",
      "type": "boolean"
    },
    "is_read": {
      "type": "boolean",
      "description": "Признак, что сообщение прочитано."
    },
    "message_id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор сообщения."
    },
    "moderate_image_status": {
      "description": "Статус модерации изображения.",
      "$ref": "#/components/schemas/ChatMessageModerateImageStatus"
    },
    "user": {
      "$ref": "#/components/schemas/v3User"
    }
  }
}
```
