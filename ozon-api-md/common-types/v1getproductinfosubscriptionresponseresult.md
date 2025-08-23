# v1GetProductInfoSubscriptionResponseResult

## Top-level fields
- `v1GetProductInfoSubscriptionResponseResult` (top-level fields):
  - `count`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество подписавшихся пользователей."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon, SKU."
    }
  }
}
```
