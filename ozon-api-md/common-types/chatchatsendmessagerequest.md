# chatChatSendMessageRequest

## Top-level fields
- `chatChatSendMessageRequest` (top-level fields):
  - `chat_id`: `string`
  - `text`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "chat_id",
    "text"
  ],
  "properties": {
    "chat_id": {
      "type": "string",
      "description": "Идентификатор чата."
    },
    "text": {
      "type": "string",
      "description": "Текст сообщения в формате plain text от 1 до 1000 символов."
    }
  },
  "title": "ChatSendMessage",
  "type": "object"
}
```
