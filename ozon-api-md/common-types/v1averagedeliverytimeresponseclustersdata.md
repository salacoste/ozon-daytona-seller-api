# v1AverageDeliveryTimeResponseClustersData

## Top-level fields
- `v1AverageDeliveryTimeResponseClustersData` (top-level fields):
  - `another_delivery_time`: `array`
  - `cluster_id`: `integer`
  - `delivery_time_FBO`: `integer`
  - `delivery_time_FBS`: `number`
  - `delivery_time_status` → `$ref` v1AverageDeliveryTimeResponseDeliveryTimeStatus
  - `orders_count`: `integer`
  - `orders_percent`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "another_delivery_time": {
      "description": "Зачли с другим временем доставки.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseClustersDataAmnesty"
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
      "$ref": "#/components/schemas/v1AverageDeliveryTimeResponseDeliveryTimeStatus"
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
