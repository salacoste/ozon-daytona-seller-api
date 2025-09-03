# v5FbsPostingProductExemplarValidateV5Response

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5Response` (top-level fields):
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarValidateV5ResponseProduct"
      }
    }
  }
}
```
