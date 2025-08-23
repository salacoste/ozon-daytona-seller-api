# DeleteProductsResponseDeleteStatus

## Top-level fields
- `DeleteProductsResponseDeleteStatus` (top-level fields):
  - `error`: `string`
  - `is_deleted`: `boolean`
  - `offer_id`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "error": {
      "type": "string",
      "description": "Причина ошибки, которая возникла при обработке запроса."
    },
    "is_deleted": {
      "type": "boolean",
      "description": "Если запрос выполнен без ошибок и товары удалены — `true`."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    }
  },
  "type": "object",
  "title": "object"
}
```
