# postingPostingProductChangeRequest

## Top-level fields
- `postingPostingProductChangeRequest` (top-level fields):
  - `items`: `array`
  - `posting_number`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "items",
    "posting_number"
  ],
  "properties": {
    "items": {
      "items": {
        "$ref": "#/components/schemas/PostingProductChangeRequestItem"
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
