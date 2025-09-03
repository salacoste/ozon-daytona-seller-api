# v1DraftClusterListResponseCluster

## Top-level fields
- `v1DraftClusterListResponseCluster` (top-level fields):
  - `id`: `integer`
  - `logistic_clusters`: `array`
  - `name`: `string`
  - `type`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор кластера."
    },
    "logistic_clusters": {
      "type": "array",
      "description": "Информация о складах кластера.",
      "items": {
        "$ref": "#/components/schemas/DraftClusterListResponseLogisticCluster"
      }
    },
    "name": {
      "type": "string",
      "description": "Название кластера."
    },
    "type": {
      "type": "string",
      "enum": [
        "CLUSTER_TYPE_OZON",
        "CLUSTER_TYPE_CIS"
      ],
      "description": "Тип кластера:\n- `CLUSTER_TYPE_OZON` — кластер в России,\n- `CLUSTER_TYPE_CIS` — кластер в СНГ.\n"
    }
  }
}
```
