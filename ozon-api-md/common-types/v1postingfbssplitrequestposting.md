# v1PostingFbsSplitRequestPosting

## Top-level fields
- `v1PostingFbsSplitRequestPosting` (top-level fields):
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "description": "Список товаров в заказе.",
      "items": {
        "$ref": "#/components/schemas/v1ProductFbsSplit"
      }
    }
  },
  "required": [
    "products"
  ]
}
```
