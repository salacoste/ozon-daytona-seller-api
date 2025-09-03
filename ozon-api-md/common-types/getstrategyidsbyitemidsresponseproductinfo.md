# GetStrategyIDsByItemIDsResponseProductInfo

## Top-level fields
- `GetStrategyIDsByItemIDsResponseProductInfo` (top-level fields):
  - `product_id`: `integer`
  - `strategy_id`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "strategy_id": {
      "type": "string",
      "description": "Идентификатор стратегии, в которую добавлен товар."
    }
  }
}
```
