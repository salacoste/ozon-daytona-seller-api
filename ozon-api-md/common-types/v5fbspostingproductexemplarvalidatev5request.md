# v5FbsPostingProductExemplarValidateV5Request

## Top-level fields
- `v5FbsPostingProductExemplarValidateV5Request` (top-level fields):
  - `posting_number`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "posting_number": {
      "description": "Номер отправления.",
      "type": "string"
    },
    "products": {
      "type": "array",
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarValidateV5RequestProduct"
      }
    }
  }
}
```
