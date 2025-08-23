# analyticsStockOnWarehouseResultRows

## Top-level fields
- `analyticsStockOnWarehouseResultRows` (top-level fields):
  - `sku`: `integer`
  - `item_code`: `string`
  - `item_name`: `string`
  - `free_to_sell_amount`: `integer`
  - `promised_amount`: `integer`
  - `reserved_amount`: `integer`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "item_code": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "item_name": {
      "type": "string",
      "description": "Название товара в системе Ozon."
    },
    "free_to_sell_amount": {
      "type": "integer",
      "format": "int64",
      "description": "Количество товара, доступное к продаже на Ozon."
    },
    "promised_amount": {
      "type": "integer",
      "format": "int64",
      "description": "Количество товара, указанное в подтверждённых будущих поставках."
    },
    "reserved_amount": {
      "type": "integer",
      "format": "int64",
      "description": "Количество товара, зарезервированное для покупки, возврата и перевозки между складами."
    },
    "warehouse_name": {
      "type": "string",
      "description": "Название склада, где находится товар."
    }
  }
}
```
