# AverageDeliveryTimeSummaryResponseTariff

Информация о тарифе.

## Top-level fields
- `AverageDeliveryTimeSummaryResponseTariff` (top-level fields):
  - `fee`: `number`
  - `start`: `integer`
  - `tariff_status` → `$ref` AverageDeliveryTimeSummaryResponseTariffStatus
  - `tariff_value`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация о тарифе.",
  "properties": {
    "fee": {
      "description": "Процент от цены товаров.",
      "type": "number",
      "format": "float"
    },
    "start": {
      "description": "Значение метрики среднего времени доставки.",
      "type": "integer",
      "format": "int32"
    },
    "tariff_status": {
      "$ref": "#/components/schemas/AverageDeliveryTimeSummaryResponseTariffStatus"
    },
    "tariff_value": {
      "description": "Процент к базовому тарифу логистики FBO.",
      "type": "number",
      "format": "float"
    }
  }
}
```
