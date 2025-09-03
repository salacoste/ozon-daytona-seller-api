# v4GetProductInfoStocksRequestFilter

Фильтр по товарам.

## Top-level fields
- `v4GetProductInfoStocksRequestFilter` (top-level fields):
  - `offer_id`: `array`
  - `product_id`: `array`
  - `visibility` → `$ref` v4Visibility
  - `with_quant` → `$ref` FilterWithQuant

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Фильтр по товарам.",
  "properties": {
    "offer_id": {
      "description": "Фильтр по параметру `offer_id`. Можно передавать список значений.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "product_id": {
      "description": "Фильтр по параметру `product_id`. Можно передавать список значений.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "visibility": {
      "$ref": "#/components/schemas/v4Visibility"
    },
    "with_quant": {
      "$ref": "#/components/schemas/FilterWithQuant"
    }
  }
}
```
