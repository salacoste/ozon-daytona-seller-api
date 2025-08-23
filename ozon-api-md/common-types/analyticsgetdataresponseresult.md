# AnalyticsGetDataResponseResult

Результаты запроса.

## Top-level fields
- `AnalyticsGetDataResponseResult` (top-level fields):
  - `data`: `array`
  - `totals`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "data": {
      "items": {
        "$ref": "#/components/schemas/analyticsDataRow"
      },
      "type": "array",
      "description": "Массив данных."
    },
    "totals": {
      "items": {
        "format": "double",
        "type": "number"
      },
      "type": "array",
      "description": "Итоговые и средние значения метрик."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результаты запроса."
}
```
