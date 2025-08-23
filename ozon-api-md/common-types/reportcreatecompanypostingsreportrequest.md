# reportCreateCompanyPostingsReportRequest

## Top-level fields
- `reportCreateCompanyPostingsReportRequest` (top-level fields):
  - `filter` → `$ref` reportCreateCompanyPostingsReportRequestFilter
  - `language` → `$ref` reportLanguage

## Full schema (JSON)
```json
{
  "required": [
    "filter"
  ],
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/reportCreateCompanyPostingsReportRequestFilter"
    },
    "language": {
      "$ref": "#/components/schemas/reportLanguage"
    }
  },
  "type": "object",
  "title": "object"
}
```
