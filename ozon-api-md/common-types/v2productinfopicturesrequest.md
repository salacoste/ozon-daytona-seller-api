# v2ProductInfoPicturesRequest

## Top-level fields
- `v2ProductInfoPicturesRequest` (top-level fields):
  - `product_id`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "description": "Список идентификаторов товаров в системе продавца — `product_id`.",
      "maxItems": 1000,
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  },
  "required": [
    "product_id"
  ]
}
```
