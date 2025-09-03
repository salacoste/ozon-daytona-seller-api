# v1AnalyticsManageStocksResponse

## Top-level fields
- `v1AnalyticsManageStocksResponse` (top-level fields):
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "type": "array",
      "description": "Товары.",
      "items": {
        "$ref": "#/components/schemas/v1AnalyticsManageStocksResponseItem"
      }
    }
  }
}
```
