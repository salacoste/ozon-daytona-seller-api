# productImportProductsPricesRequest

## Top-level fields
- `productImportProductsPricesRequest` (top-level fields):
  - `prices`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "prices": {
      "maxItems": 1000,
      "items": {
        "$ref": "#/components/schemas/productImportProductsPricesRequestPrice"
      },
      "type": "array",
      "description": "Информация о ценах товаров."
    }
  },
  "type": "object",
  "title": "object"
}
```
