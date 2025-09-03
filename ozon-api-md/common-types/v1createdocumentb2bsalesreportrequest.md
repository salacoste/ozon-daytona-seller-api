# v1CreateDocumentB2BSalesReportRequest

## Top-level fields
- `v1CreateDocumentB2BSalesReportRequest` (top-level fields):
  - `date`: `string`
  - `language` → `$ref` commonLanguage

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "date": {
      "type": "string",
      "description": "Отчётный период в формате `YYYY-MM`."
    },
    "language": {
      "$ref": "#/components/schemas/commonLanguage"
    }
  }
}
```
