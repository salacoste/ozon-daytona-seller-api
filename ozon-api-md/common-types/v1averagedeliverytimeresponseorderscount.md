# v1AverageDeliveryTimeResponseOrdersCount

Количество заказанных товаров из кластера отгрузки.

## Top-level fields
- `v1AverageDeliveryTimeResponseOrdersCount` (top-level fields):
  - `fast` → `$ref` v1AverageDeliveryTimeResponseOrdersCountValueFast
  - `long` → `$ref` v1AverageDeliveryTimeResponseOrdersCountValueLong
  - `medium` → `$ref` v1AverageDeliveryTimeResponseOrdersCountValueMedium
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "description": "Количество заказанных товаров из кластера отгрузки.",
  "type": "object",
  "properties": {
    "fast": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseOrdersCountValueFast"
    },
    "long": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseOrdersCountValueLong"
    },
    "medium": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseOrdersCountValueMedium"
    },
    "total": {
      "description": "Всего.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
