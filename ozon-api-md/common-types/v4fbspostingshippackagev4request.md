# v4FbsPostingShipPackageV4Request

## Top-level fields
- `v4FbsPostingShipPackageV4Request` (top-level fields):
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
      "description": "Список товаров в отправлении.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v4FbsPostingShipPackageV4RequestProduct"
      }
    }
  },
  "required": [
    "posting_number"
  ]
}
```
