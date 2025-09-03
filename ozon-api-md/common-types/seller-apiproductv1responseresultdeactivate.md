# seller_apiProductV1ResponseResultDeactivate

Результаты запроса.

## Top-level fields
- `seller_apiProductV1ResponseResultDeactivate` (top-level fields):
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
      "description": "Список идентификаторов товаров, которые удалены из акции."
    },
    "rejected": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/seller_apiProductV1ResponseProductDeactivate"
      },
      "description": "Список товаров, которые не удалось удалить из акции."
    }
  },
  "description": "Результаты запроса."
}
```
