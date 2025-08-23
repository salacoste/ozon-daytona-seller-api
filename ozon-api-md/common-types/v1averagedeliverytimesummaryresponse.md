# v1AverageDeliveryTimeSummaryResponse

## Top-level fields
- `v1AverageDeliveryTimeSummaryResponse` (top-level fields):
  - `average_delivery_time`: `integer`
  - `current_tariff` → `$ref` AverageDeliveryTimeSummaryResponseTariff
  - `lost_profit`: `number`
  - `perfect_delivery_time`: `integer`
  - `updated_at`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "average_delivery_time": {
      "description": "Среднее время доставки до покупателя.",
      "type": "integer",
      "format": "int32"
    },
    "current_tariff": {
      "$ref": "#/components/schemas/AverageDeliveryTimeSummaryResponseTariff"
    },
    "lost_profit": {
      "description": "Переплата за логистику FBO.",
      "type": "number",
      "format": "double"
    },
    "perfect_delivery_time": {
      "description": "Рекомендуемое среднее время доставки до покупателя.",
      "type": "integer",
      "format": "int32"
    },
    "updated_at": {
      "description": "Дата и время последнего обновления данных.",
      "type": "string",
      "format": "date-time"
    }
  }
}
```
