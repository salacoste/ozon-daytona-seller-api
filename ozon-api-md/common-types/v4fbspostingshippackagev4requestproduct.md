# v4FbsPostingShipPackageV4RequestProduct

## Top-level fields
- `v4FbsPostingShipPackageV4RequestProduct` (top-level fields):
  - `exemplarsIds`: `array`
  - `product_id`: `integer`
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplarsIds": {
      "description": "Идентификаторы экземпляров товара.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — SKU.",
      "type": "integer",
      "format": "int64"
    },
    "quantity": {
      "description": "Количество экземпляров.",
      "type": "integer",
      "format": "int32"
    }
  },
  "required": [
    "product_id",
    "quantity"
  ]
}
```
