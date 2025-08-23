# v1GetProductInfoSubscriptionRequest

## Top-level fields
- `v1GetProductInfoSubscriptionRequest` (top-level fields):
  - `skus`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "skus"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "skus": {
      "description": "Список SKU, идентификаторов товара в системе Ozon.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
