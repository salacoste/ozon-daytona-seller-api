# v1AverageDeliveryTimeDetailsResponseClustersDataAmnesty

## Top-level fields
- `v1AverageDeliveryTimeDetailsResponseClustersDataAmnesty` (top-level fields):
  - `delivery_time`: `integer`
  - `delivery_time_status` → `$ref` v1AverageDeliveryTimeDetailsResponseDeliveryTimeStatus
  - `orders_count`: `integer`
  - `orders_percent`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "delivery_time": {
      "type": "integer",
      "format": "int32",
      "description": "Нормативное время доставки в часах."
    },
    "delivery_time_status": {
      "$ref": "#/components/schemas/v1AverageDeliveryTimeDetailsResponseDeliveryTimeStatus"
    },
    "orders_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество заказанных товаров из кластера."
    },
    "orders_percent": {
      "type": "integer",
      "format": "int32",
      "description": "Процент заказов из указанного кластера от общего количества заказов по всем кластерам отгрузки."
    }
  }
}
```
