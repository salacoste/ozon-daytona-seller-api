# v6FbsPostingProductExemplarCreateOrGetV6Response

## Top-level fields
- `v6FbsPostingProductExemplarCreateOrGetV6Response` (top-level fields):
  - `multi_box_qty`: `integer`
  - `posting_number`: `string`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "multi_box_qty": {
      "type": "integer",
      "format": "int32",
      "description": "Количество коробок, в которые упакован товар."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "products": {
      "type": "array",
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/FbsPostingProductExemplarCreateOrGetV6ResponseProduct"
      }
    }
  }
}
```
