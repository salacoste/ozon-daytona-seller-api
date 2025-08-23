# v1GetStrategyItemsResponseResult

Список товаров.

## Top-level fields
- `v1GetStrategyItemsResponseResult` (top-level fields):
  - `product_id`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Список товаров.",
  "properties": {
    "product_id": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  }
}
```
