# productv2ProductsStocksRequest

## Top-level fields
- `productv2ProductsStocksRequest` (top-level fields):
  - `stocks`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "stocks"
  ],
  "properties": {
    "stocks": {
      "items": {
        "$ref": "#/components/schemas/productv2ProductsStocksRequestStock"
      },
      "type": "array",
      "description": "Информация о товарах на складах."
    }
  },
  "type": "object",
  "title": "object"
}
```
