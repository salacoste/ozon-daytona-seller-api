# warehouseWarehouseListResponse

## Top-level fields
- `warehouseWarehouseListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "result": {
      "items": {
        "$ref": "#/components/schemas/WarehouseListResponseWarehouse"
      },
      "type": "array",
      "description": "Список складов."
    }
  },
  "type": "object",
  "title": "object"
}
```
