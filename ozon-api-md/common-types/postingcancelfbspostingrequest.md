# postingCancelFbsPostingRequest

## Top-level fields
- `postingCancelFbsPostingRequest` (top-level fields):
  - `cancel_reason_id`: `integer`
  - `cancel_reason_message`: `string`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "cancel_reason_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор причины отмены отправления."
    },
    "cancel_reason_message": {
      "type": "string",
      "description": "Дополнительная информация по отмене. Если `cancel_reason_id = 402`, параметр обязательный."
    },
    "posting_number": {
      "type": "string",
      "description": "Идентификатор отправления."
    }
  },
  "type": "object",
  "title": "object"
}
```
