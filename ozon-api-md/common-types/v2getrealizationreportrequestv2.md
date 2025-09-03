# v2GetRealizationReportRequestV2

## Top-level fields
- `v2GetRealizationReportRequestV2` (top-level fields):
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
