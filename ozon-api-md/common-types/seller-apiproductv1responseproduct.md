# seller_apiProductV1ResponseProduct

## Top-level fields
- `seller_apiProductV1ResponseProduct` (top-level fields):
  - `product_id`: `number`
  - `reason`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "reason": {
      "type": "string",
      "description": "Причина, почему товар не добавлен в акцию."
    }
  }
}
```
