# v1AnalyticsStocksResponse

## Top-level fields
- `v1AnalyticsStocksResponse` (top-level fields):
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "type": "array",
      "description": "Информация о товарах.",
      "items": {
        "$ref": "#/components/schemas/v1AnalyticsStocksResponseItem"
      }
    }
  }
}
```
