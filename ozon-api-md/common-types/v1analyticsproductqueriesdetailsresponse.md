# v1AnalyticsProductQueriesDetailsResponse

## Top-level fields
- `v1AnalyticsProductQueriesDetailsResponse` (top-level fields):
  - `analytics_period` → `$ref` v1AnalyticsProductQueriesDetailsResponseAnalyticsPeriod
  - `page_count`: `integer`
  - `queries`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "analytics_period": {
      "$ref": "#/components/schemas/v1AnalyticsProductQueriesDetailsResponseAnalyticsPeriod"
    },
    "page_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество страниц."
    },
    "queries": {
      "type": "array",
      "description": "Список запросов.",
      "items": {
        "$ref": "#/components/schemas/AnalyticsProductQueriesDetailsResponseQuery"
      }
    },
    "total": {
      "type": "integer",
      "format": "int64",
      "description": "Общее количество запросов."
    }
  }
}
```
