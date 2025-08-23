# FbsPostingShipV4RequestPackageProduct

## Top-level fields
- `FbsPostingShipV4RequestPackageProduct` (top-level fields):
  - `product_id`: `integer`
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "product_id",
    "quantity"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество экземпляров."
    }
  }
}
```
