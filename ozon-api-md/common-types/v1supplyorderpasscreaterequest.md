# v1SupplyOrderPassCreateRequest

## Top-level fields
- `v1SupplyOrderPassCreateRequest` (top-level fields):
  - `supply_order_id`: `integer`
  - `vehicle` → `$ref` v1VehicleInfo

## Full schema (JSON)
```json
{
  "required": [
    "supply_order_id",
    "vehicle"
  ],
  "type": "object",
  "properties": {
    "supply_order_id": {
      "description": "Идентификатор заявки на поставку.",
      "type": "integer",
      "format": "int64"
    },
    "vehicle": {
      "$ref": "#/components/schemas/v1VehicleInfo"
    }
  }
}
```
