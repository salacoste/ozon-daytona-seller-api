# v1GetFinanceProductsBuyoutResponse

## Top-level fields
- `v1GetFinanceProductsBuyoutResponse` (top-level fields):
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "products": {
      "description": "Список выкупленных товаров",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetFinanceProductsBuyoutResponseProduct"
      }
    }
  }
}
```
