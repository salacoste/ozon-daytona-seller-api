# productv5Filter

Фильтр по товарам.

## Top-level fields
- `productv5Filter` (top-level fields):
  - `offer_id`: `object`
  - `product_id`: `object`
  - `visibility` → `$ref` productv5GetProductListRequestFilterFilterVisibility

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по товарам.",
  "properties": {
    "offer_id": {
      "description": "Фильтр по параметру `offer_id`. Можно передавать до 1000 значений.",
      "items": {
        "type": "string"
      }
    },
    "product_id": {
      "description": "Фильтр по параметру `product_id`. Можно передавать до 1000 значений.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "visibility": {
      "$ref": "#/components/schemas/productv5GetProductListRequestFilterFilterVisibility"
    }
  }
}
```
