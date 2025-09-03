# v1GetRealizationReportByDayRequest

## Top-level fields
- `v1GetRealizationReportByDayRequest` (top-level fields):
  - `day`: `integer`
  - `month`: `integer`
  - `year`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "day",
    "month",
    "year"
  ],
  "type": "object",
  "properties": {
    "day": {
      "description": "День.",
      "type": "integer",
      "format": "int32"
    },
    "month": {
      "description": "Месяц.",
      "type": "integer",
      "format": "int32"
    },
    "year": {
      "description": "Год.",
      "type": "integer",
      "format": "int32"
    }
  }
}
```
