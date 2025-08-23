# productv2ProductsStocksRequestStock

## Top-level fields
- `productv2ProductsStocksRequestStock` (top-level fields):
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `stock`: `integer`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "product_id",
    "quant_size",
    "stock",
    "warehouse_id"
  ],
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "stock": {
      "format": "int64",
      "type": "integer",
      "description": "Количество товара в наличии без учёта зарезервированных товаров."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада, полученный из метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList)."
    }
  },
  "type": "object",
  "title": "object"
}
```
