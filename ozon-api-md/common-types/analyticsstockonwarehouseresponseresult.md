# analyticsStockOnWarehouseResponseResult

Результат запроса.

## Top-level fields
- `analyticsStockOnWarehouseResponseResult` (top-level fields):
  - `rows`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат запроса.",
  "properties": {
    "rows": {
      "type": "array",
      "description": "Информация о товарах и остатках.",
      "items": {
        "$ref": "#/components/schemas/analyticsStockOnWarehouseResultRows"
      }
    }
  }
}
```
