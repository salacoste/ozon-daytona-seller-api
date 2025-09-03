# v1AverageDeliveryTimeResponseData

## Top-level fields
- `v1AverageDeliveryTimeResponseData` (top-level fields):
  - `clusters_data`: `array`
  - `delivery_cluster_id`: `integer`
  - `metrics` → `$ref` v1AverageDeliveryTimeResponseMetrics

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "clusters_data": {
      "type": "array",
      "description": "Данные по кластерам отгрузки.",
      "items": {
        "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseClustersData"
      }
    },
    "delivery_cluster_id": {
      "description": "Идентификатор кластера доставки.",
      "type": "integer",
      "format": "int64"
    },
    "metrics": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseMetrics"
    }
  }
}
```
