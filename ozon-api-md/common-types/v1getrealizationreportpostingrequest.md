# v1GetRealizationReportPostingRequest

## Top-level fields
- `v1GetRealizationReportPostingRequest` (top-level fields):
  - `month`: `integer`
  - `year`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "month",
    "year"
  ],
  "type": "object",
  "properties": {
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
