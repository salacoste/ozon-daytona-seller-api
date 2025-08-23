# SupplierAvailableWarehousesResponseResult

## Top-level fields
- `SupplierAvailableWarehousesResponseResult` (top-level fields):
  - `schedule` → `$ref` SupplierAvailableWarehousesResponseSchedule
  - `warehouse` → `$ref` SupplierAvailableWarehousesResponseWarehouse

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "schedule": {
      "$ref": "#/components/schemas/SupplierAvailableWarehousesResponseSchedule"
    },
    "warehouse": {
      "$ref": "#/components/schemas/SupplierAvailableWarehousesResponseWarehouse"
    }
  }
}
```
