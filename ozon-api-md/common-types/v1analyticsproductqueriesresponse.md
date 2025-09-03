# v1AnalyticsProductQueriesResponse

## Top-level fields
- `v1AnalyticsProductQueriesResponse` (top-level fields):
  - `analytics_period` → `$ref` AnalyticsProductQueriesResponseAnalyticsPeriod
  - `items`: `array`
  - `page_count`: `integer`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "analytics_period": {
      "$ref": "#/components/schemas/AnalyticsProductQueriesResponseAnalyticsPeriod"
    },
    "items": {
      "type": "array",
      "description": "Список товаров.",
      "items": {
        "$ref": "#/components/schemas/v1AnalyticsProductQueriesResponseItem"
      }
    },
    "page_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество страниц."
    },
    "total": {
      "type": "integer",
      "format": "int64",
      "description": "Общее количество запросов."
    }
  }
}
```
