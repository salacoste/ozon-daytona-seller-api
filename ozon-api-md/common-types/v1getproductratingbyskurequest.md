# v1GetProductRatingBySkuRequest

## Top-level fields
- `v1GetProductRatingBySkuRequest` (top-level fields):
  - `skus`: `object`

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
      "description": "Идентификаторы товаров в системе Ozon — SKU,  для которых нужно вернуть контент-рейтинг.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
