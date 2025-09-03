# v1ProductActionTimerUpdateRequest

## Top-level fields
- `v1ProductActionTimerUpdateRequest` (top-level fields):
  - `product_ids`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "product_ids": {
      "description": "Список идентификаторов товаров в системе продавца — `product_id`.",
      "maximum": 1000,
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
