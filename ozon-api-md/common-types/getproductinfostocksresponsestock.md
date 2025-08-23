# GetProductInfoStocksResponseStock

## Top-level fields
- `GetProductInfoStocksResponseStock` (top-level fields):
  - `present`: `integer`
  - `reserved`: `integer`
  - `shipment_type` → `$ref` StockShipmentType
  - `sku`: `integer`
  - `type`: `string`
  - `warehouse_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "present": {
      "description": "Сейчас на складе.",
      "type": "integer",
      "format": "int32"
    },
    "reserved": {
      "description": "Зарезервировано.",
      "type": "integer",
      "format": "int32"
    },
    "shipment_type": {
      "$ref": "#/components/schemas/StockShipmentType"
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "integer",
      "format": "int64"
    },
    "type": {
      "description": "Тип склада.",
      "type": "string"
    },
    "warehouse_ids": {
      "type": "array",
      "description": "Идентификаторы складов, на которых хранился или хранится товар.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
