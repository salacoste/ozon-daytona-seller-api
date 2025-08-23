# v1AverageDeliveryTimeDetailsResponseMetricsOrdersCount

Заказано товаров по нормативному времени доставки.

## Top-level fields
- `v1AverageDeliveryTimeDetailsResponseMetricsOrdersCount` (top-level fields):
  - `fast` → `$ref` v1AverageDeliveryTimeDetailsResponseMetricsOrdersCountValueFast
  - `long` → `$ref` v1AverageDeliveryTimeDetailsResponseMetricsOrdersCountValueLong
  - `medium` → `$ref` v1AverageDeliveryTimeDetailsResponseMetricsOrdersCountValueMedium
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Заказано товаров по нормативному времени доставки.",
  "properties": {
    "fast": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseMetricsOrdersCountValueFast"
    },
    "long": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseMetricsOrdersCountValueLong"
    },
    "medium": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseMetricsOrdersCountValueMedium"
    },
    "total": {
      "type": "integer",
      "format": "int32",
      "description": "Общее количество заказанных товаров."
    }
  }
}
```
