# v1AddStrategyItemsRequest

## Top-level fields
- `v1AddStrategyItemsRequest` (top-level fields):
  - `product_id`: `array`
  - `strategy_id`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "product_id",
    "strategy_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Список идентификаторов товаров в системе продавца — `product_id`. Максимальное количество — 50."
    },
    "strategy_id": {
      "type": "string",
      "description": "Идентификатор стратегии."
    }
  }
}
```
