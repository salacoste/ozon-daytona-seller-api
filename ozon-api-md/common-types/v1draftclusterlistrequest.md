# v1DraftClusterListRequest

## Top-level fields
- `v1DraftClusterListRequest` (top-level fields):
  - `cluster_ids`: `array`
  - `cluster_type` → `$ref` v1ClusterType

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "cluster_ids": {
      "type": "array",
      "description": "Идентификаторы кластеров.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "cluster_type": {
      "$ref": "#/components/schemas/v1ClusterType"
    }
  },
  "required": [
    "cluster_type"
  ]
}
```
