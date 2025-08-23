# GetReturnsListResponseStorage

Информация о хранении.

## Top-level fields
- `GetReturnsListResponseStorage` (top-level fields):
  - `sum` → `$ref` seller_returnsv1Money_storage
  - `tariffication_first_date`: `string`
  - `tariffication_start_date`: `string`
  - `arrived_moment`: `string`
  - `days`: `integer`
  - `utilization_sum` → `$ref` seller_returnsv1Money_utilization
  - `utilization_forecast_date`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о хранении.",
  "properties": {
    "sum": {
      "$ref": "#/components/schemas/seller_returnsv1Money_storage"
    },
    "tariffication_first_date": {
      "type": "string",
      "description": "Первый день тарификации за хранение.",
      "format": "date-time"
    },
    "tariffication_start_date": {
      "type": "string",
      "description": "Дата старта тарификации за хранение.",
      "format": "date-time"
    },
    "arrived_moment": {
      "type": "string",
      "description": "Дата, когда возврат был готов к выдаче.",
      "format": "date-time"
    },
    "days": {
      "type": "integer",
      "description": "Сколько дней возврат ожидает выдачи продавцу.",
      "format": "int64"
    },
    "utilization_sum": {
      "format": "date-time",
      "$ref": "#/components/schemas/seller_returnsv1Money_utilization"
    },
    "utilization_forecast_date": {
      "type": "string",
      "description": "Планируемая дата утилизации."
    }
  }
}
```
