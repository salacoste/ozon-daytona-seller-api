# analyticsStockOnWarehouseRequest

## Top-level fields
- `analyticsStockOnWarehouseRequest` (top-level fields):
  - `limit`: `integer`
  - `offset`: `integer`
  - `warehouse_type` → `$ref` AnalyticsGetStockOnWarehousesRequestWarehouseType

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество ответов на странице. По умолчанию — 100."
    },
    "offset": {
      "type": "integer",
      "format": "int64",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента."
    },
    "warehouse_type": {
      "$ref": "#/components/schemas/AnalyticsGetStockOnWarehousesRequestWarehouseType"
    }
  }
}
```
