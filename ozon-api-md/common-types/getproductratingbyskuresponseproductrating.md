# GetProductRatingBySkuResponseProductRating

## Top-level fields
- `GetProductRatingBySkuResponseProductRating` (top-level fields):
  - `sku`: `integer`
  - `rating`: `number`
  - `groups`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара на Ozon."
    },
    "rating": {
      "type": "number",
      "format": "float",
      "description": "Контент-рейтинг товара: от 0 до 100.\n"
    },
    "groups": {
      "description": "Группы характеристик, из которых складывается контент-рейтинг.",
      "items": {
        "$ref": "#/components/schemas/GetProductRatingBySkuResponseRatingGroup"
      }
    }
  }
}
```
