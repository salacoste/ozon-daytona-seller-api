# v1AverageDeliveryTimeDetailsResponseClustersData

## Top-level fields
- `v1AverageDeliveryTimeDetailsResponseClustersData` (top-level fields):
  - `another_delivery_time`: `array`
  - `cluster_id`: `integer`
  - `delivery_time_FBO`: `integer`
  - `delivery_time_FBS`: `number`
  - `delivery_time_status` → `$ref` v1AverageDeliveryTimeDetailsResponseDeliveryTimeStatus
  - `orders_count`: `integer`
  - `orders_percent`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "another_delivery_time": {
      "description": "Зачли доставку с другим временем.\n",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseClustersDataAmnesty"
      }
    },
    "cluster_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор кластера."
    },
    "delivery_time_FBO": {
      "type": "integer",
      "format": "int32",
      "description": "Нормативное время доставки по FBO в часах."
    },
    "delivery_time_FBS": {
      "type": "number",
      "format": "double",
      "description": "Нормативное время доставки по FBS в часах."
    },
    "delivery_time_status": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseDeliveryTimeStatus"
    },
    "orders_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заказанных товаров из кластера отгрузки."
    },
    "orders_percent": {
      "description": "Процент заказов из указанного кластера от общего количества заказов по всем кластерам отгрузки.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
