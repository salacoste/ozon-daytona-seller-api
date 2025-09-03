# productv3GetProductListRequestFilter

Фильтр по товарам.

## Top-level fields
- `productv3GetProductListRequestFilter` (top-level fields):
  - `offer_id`: `object`
  - `product_id`: `object`
  - `visibility` → `$ref` productv3GetProductListRequestFilterFilterVisibility

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по товарам.",
  "properties": {
    "offer_id": {
      "description": "Фильтр по параметру `offer_id`. Вы можете передавать список значений.",
      "items": {
        "type": "string"
      }
    },
    "product_id": {
      "description": "Фильтр по параметру `product_id`. Вы можете передавать список значений.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "visibility": {
      "$ref": "#/components/schemas/productv3GetProductListRequestFilterFilterVisibility"
    }
  }
}
```
