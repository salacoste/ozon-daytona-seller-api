# seller_apiProductV1ResponseResult

Результаты запроса.

## Top-level fields
- `seller_apiProductV1ResponseResult` (top-level fields):
  - `product_ids`: `array`
  - `rejected`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "product_ids": {
      "type": "array",
      "items": {
        "type": "number",
        "format": "double"
      },
      "description": "Список идентификаторов товаров, которые добавлены в акцию."
    },
    "rejected": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/seller_apiProductV1ResponseProduct"
      },
      "description": "Список товаров, которые не удалось добавить в акцию."
    }
  },
  "description": "Результаты запроса."
}
```
