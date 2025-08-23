# AddStrategyItemsResponseError

## Top-level fields
- `AddStrategyItemsResponseError` (top-level fields):
  - `code`: `string`
  - `error`: `string`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Код ошибки."
    },
    "error": {
      "type": "string",
      "description": "Текст ошибки."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  }
}
```
