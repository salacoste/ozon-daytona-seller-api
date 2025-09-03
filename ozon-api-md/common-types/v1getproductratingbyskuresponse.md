# v1GetProductRatingBySkuResponse

## Top-level fields
- `v1GetProductRatingBySkuResponse` (top-level fields):
  - `products`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "products": {
      "description": "Контент-рейтинг товаров.",
      "items": {
        "$ref": "#/components/schemas/GetProductRatingBySkuResponseProductRating"
      }
    }
  }
}
```
