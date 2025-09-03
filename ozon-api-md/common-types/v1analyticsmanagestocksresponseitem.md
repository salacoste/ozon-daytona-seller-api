# v1AnalyticsManageStocksResponseItem

## Top-level fields
- `v1AnalyticsManageStocksResponseItem` (top-level fields):
  - `defect_stock_count`: `integer`
  - `expiring_stock_count`: `integer`
  - `name`: `string`
  - `offer_id`: `string`
  - `sku`: `integer`
  - `valid_stock_count`: `integer`
  - `waitingdocs_stock_count`: `integer`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "defect_stock_count": {
      "type": "integer",
      "format": "int64",
      "description": "Остаток дефектного товара, шт."
    },
    "expiring_stock_count": {
      "type": "integer",
      "format": "int64",
      "description": "Остаток товара с истекающим сроком годности, шт."
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "valid_stock_count": {
      "type": "integer",
      "format": "int64",
      "description": "Остаток товара, доступного для продажи."
    },
    "waitingdocs_stock_count": {
      "type": "integer",
      "format": "int64",
      "description": "Остаток товара, ожидающего документы."
    },
    "warehouse_name": {
      "type": "string",
      "description": "Название склада."
    }
  }
}
```
