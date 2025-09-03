# v1GetProductInfoDiscountedRequest

## Top-level fields
- `v1GetProductInfoDiscountedRequest` (top-level fields):
  - `discounted_skus`: `object`

## Full schema (JSON)
```json
{
  "required": [
    "discounted_skus"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "discounted_skus": {
      "description": "Список SKU уценённых товаров.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
