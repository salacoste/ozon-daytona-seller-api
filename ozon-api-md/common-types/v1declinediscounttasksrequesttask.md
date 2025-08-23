# v1DeclineDiscountTasksRequestTask

## Top-level fields
- `v1DeclineDiscountTasksRequestTask` (top-level fields):
  - `id`: `integer`
  - `seller_comment`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "uint64",
      "description": "Идентификатор заявки."
    },
    "seller_comment": {
      "type": "string",
      "description": "Комментарий продавца к заявке."
    }
  }
}
```
