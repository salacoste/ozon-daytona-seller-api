# DraftClusterListResponseLogisticCluster

## Top-level fields
- `DraftClusterListResponseLogisticCluster` (top-level fields):
  - `warehouses`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "warehouses": {
      "type": "array",
      "description": "Склады.",
      "items": {
        "$ref": "#/components/schemas/v1DraftClusterListResponseWarehouse"
      }
    }
  }
}
```
