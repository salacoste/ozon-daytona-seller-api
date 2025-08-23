# v1GetDecompensationReportRequest

## Top-level fields
- `v1GetDecompensationReportRequest` (top-level fields):
  - `date`: `string`
  - `language` → `$ref` compensationReportLanguage

## Full schema (JSON)
```json
{
  "required": [
    "date"
  ],
  "type": "object",
  "properties": {
    "date": {
      "type": "string",
      "description": "Отчётный период в формате `YYYY-MM`."
    },
    "language": {
      "$ref": "#/components/schemas/compensationReportLanguage"
    }
  }
}
```
