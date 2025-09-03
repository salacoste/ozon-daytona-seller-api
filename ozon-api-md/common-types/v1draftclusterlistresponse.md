# v1DraftClusterListResponse

## Top-level fields
- `v1DraftClusterListResponse` (top-level fields):
  - `clusters`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "clusters": {
      "type": "array",
      "description": "Кластеры.",
      "items": {
        "$ref": "#/components/schemas/v1DraftClusterListResponseCluster"
      }
    }
  }
}
```
