# draftv1Cluster

## Top-level fields
- `draftv1Cluster` (top-level fields):
  - `cluster_id`: `integer`
  - `cluster_name`: `string`
  - `warehouses`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "cluster_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор кластера."
    },
    "cluster_name": {
      "type": "string",
      "description": "Название кластера."
    },
    "warehouses": {
      "type": "array",
      "description": "Склады.",
      "items": {
        "$ref": "#/components/schemas/draftv1Warehouse"
      }
    }
  }
}
```
