# v1AverageDeliveryTimeDetailsResponseData

## Top-level fields
- `v1AverageDeliveryTimeDetailsResponseData` (top-level fields):
  - `clusters_data`: `array`
  - `item` → `$ref` AverageDeliveryTimeDetailsResponseItemData
  - `metrics` → `$ref` v1AverageDeliveryTimeDetailsResponseMetrics

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "clusters_data": {
      "type": "array",
      "description": "Данные по кластерам отгрузки.",
      "items": {
        "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseClustersData"
      }
    },
    "item": {
      "$ref": "#/components/schemas/AverageDeliveryTimeDetailsResponseItemData"
    },
    "metrics": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseMetrics"
    }
  }
}
```
