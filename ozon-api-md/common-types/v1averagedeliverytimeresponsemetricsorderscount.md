# v1AverageDeliveryTimeResponseMetricsOrdersCount

Количество заказанных товаров.

## Top-level fields
- `v1AverageDeliveryTimeResponseMetricsOrdersCount` (top-level fields):
  - `fast` → `$ref` v1AverageDeliveryTimeResponseMetricsOrdersCountValueFast
  - `long` → `$ref` v1AverageDeliveryTimeResponseMetricsOrdersCountValueLong
  - `medium` → `$ref` v1AverageDeliveryTimeResponseMetricsOrdersCountValueMedium
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Количество заказанных товаров.",
  "properties": {
    "fast": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseMetricsOrdersCountValueFast"
    },
    "long": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseMetricsOrdersCountValueLong"
    },
    "medium": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseMetricsOrdersCountValueMedium"
    },
    "total": {
      "description": "Всего.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
