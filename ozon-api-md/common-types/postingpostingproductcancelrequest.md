# postingPostingProductCancelRequest

## Top-level fields
- `postingPostingProductCancelRequest` (top-level fields):
  - `cancel_reason_id`: `integer`
  - `cancel_reason_message`: `string`
  - `items`: `array`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "cancel_reason_id",
    "cancel_reason_message",
    "items",
    "posting_number"
  ],
  "properties": {
    "cancel_reason_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор причины отмены отправления товара."
    },
    "cancel_reason_message": {
      "type": "string",
      "description": "Обязательное поле. Дополнительная информация по отмене."
    },
    "items": {
      "items": {
        "$ref": "#/components/schemas/PostingProductCancelRequestItem"
      },
      "type": "array",
      "description": "Информация о товарах."
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
