# chatChatSendFileRequest

## Top-level fields
- `chatChatSendFileRequest` (top-level fields):
  - `base64_content`: `string`
  - `chat_id`: `string`
  - `name`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "chat_id"
  ],
  "properties": {
    "base64_content": {
      "type": "string",
      "description": "Файл в виде строки base64."
    },
    "chat_id": {
      "type": "string",
      "description": "Идентификатор чата."
    },
    "name": {
      "type": "string",
      "description": "Название файла с расширением."
    }
  },
  "title": "ChatSendFile",
  "type": "object"
}
```
