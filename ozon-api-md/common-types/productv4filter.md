# productv4Filter

Фильтр по товарам.

## Top-level fields
- `productv4Filter` (top-level fields):
  - `offer_id`: `object`
  - `product_id`: `object`
  - `sku`: `array`
  - `visibility` → `$ref` productv2GetProductListRequestFilterFilterVisibility

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Фильтр по товарам.",
  "properties": {
    "offer_id": {
      "description": "Фильтр по параметру `offer_id`. Можно передавать список значений.",
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
    "sku": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      },
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "visibility": {
      "$ref": "#/components/schemas/productv2GetProductListRequestFilterFilterVisibility"
    }
  }
}
```
