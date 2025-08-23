# productsv1GetProductInfoStocksByWarehouseFbsResponseResult

## Top-level fields
- `productsv1GetProductInfoStocksByWarehouseFbsResponseResult` (top-level fields):
  - `sku`: `integer`
  - `present`: `integer`
  - `product_id`: `integer`
  - `reserved`: `integer`
  - `warehouse_id`: `integer`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    },
    "present": {
      "description": "Общее количество товара на складе.",
      "type": "integer",
      "format": "int64"
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — артикул.",
      "type": "integer",
      "format": "int64"
    },
    "reserved": {
      "description": "Количество зарезервированных товаров на складе.",
      "type": "integer",
      "format": "int64"
    },
    "warehouse_id": {
      "description": "Идентификатор склада.",
      "type": "integer",
      "format": "int64"
    },
    "warehouse_name": {
      "description": "Название склада.",
      "type": "string"
    }
  }
}
```
