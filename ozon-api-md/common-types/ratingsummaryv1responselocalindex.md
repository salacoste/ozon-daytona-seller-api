# RatingSummaryV1ResponseLocalIndex

## Top-level fields
- `RatingSummaryV1ResponseLocalIndex` (top-level fields):
  - `calculation_date`: `string`
  - `localization_percentage`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "calculation_date": {
      "description": "Дата расчёта индекса локализации.",
      "format": "date-time",
      "type": "string"
    },
    "localization_percentage": {
      "description": "Значение индекса локализации.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
