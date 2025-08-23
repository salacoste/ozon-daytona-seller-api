# v5FbsPostingProductExemplarCreateOrGetV5Response

## Top-level fields
- `v5FbsPostingProductExemplarCreateOrGetV5Response` (top-level fields):
  - `multi_box_qty`: `integer`
  - `posting_number`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "multi_box_qty": {
      "description": "Количество коробок, в которые упакован товар.",
      "type": "integer",
      "format": "int32"
    },
    "posting_number": {
      "description": "Номер отправления.",
      "type": "string"
    },
    "products": {
      "description": "Список товаров.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarCreateOrGetV5ResponseProduct"
      }
    }
  }
}
```
