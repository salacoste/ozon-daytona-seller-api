# analyticsAnalyticsGetDataResponse

## Top-level fields
- `analyticsAnalyticsGetDataResponse` (top-level fields):
  - `result` → `$ref` AnalyticsGetDataResponseResult
  - `timestamp`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "result": {
      "$ref": "#/components/schemas/AnalyticsGetDataResponseResult"
    },
    "timestamp": {
      "type": "string",
      "description": "Время создания отчёта."
    }
  },
  "type": "object",
  "title": "object"
}
```
