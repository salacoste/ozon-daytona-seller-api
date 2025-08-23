# v1AverageDeliveryTimeDetailsResponseMetrics

Метрики доставки.

## Top-level fields
- `v1AverageDeliveryTimeDetailsResponseMetrics` (top-level fields):
  - `attention_level` → `$ref` AverageDeliveryTimeDetailsResponseMetricsAttentionLevel
  - `average_delivery_time`: `integer`
  - `average_delivery_time_status` → `$ref` v1AverageDeliveryTimeDetailsResponseDeliveryTimeStatus
  - `impact_share`: `integer`
  - `exact_impact_share`: `string`
  - `lost_profit`: `integer`
  - `orders_count` → `$ref` v1AverageDeliveryTimeDetailsResponseMetricsOrdersCount
  - `recommended_supply`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Метрики доставки.",
  "properties": {
    "attention_level": {
      "$ref": "#/components/schemas/AverageDeliveryTimeDetailsResponseMetricsAttentionLevel"
    },
    "average_delivery_time": {
      "type": "integer",
      "format": "int32",
      "description": "Среднее время доставки до покупателя."
    },
    "average_delivery_time_status": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseDeliveryTimeStatus"
    },
    "impact_share": {
      "type": "integer",
      "format": "int32",
      "description": "Доля влияния кластера на общий показатель в процентах.",
      "deprecated": true
    },
    "exact_impact_share": {
      "type": "string",
      "description": "Доля влияния кластера на общий показатель c точностью до 4 знаков после запятой."
    },
    "lost_profit": {
      "type": "integer",
      "format": "int32",
      "description": "Переплата за логистику."
    },
    "orders_count": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseMetricsOrdersCount"
    },
    "recommended_supply": {
      "type": "integer",
      "format": "int32",
      "description": "Рекомендуемая поставка в штуках."
    }
  }
}
```
