# v2ReportReturnsCreateRequest

## Top-level fields
- `v2ReportReturnsCreateRequest` (top-level fields):
  - `filter` → `$ref` v2ReportReturnsCreateRequestFilter
  - `language` → `$ref` reportLanguage

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "type": "object",
      "description": "Фильтр.",
      "$ref": "#/components/schemas/v2ReportReturnsCreateRequestFilter"
    },
    "language": {
      "$ref": "#/components/schemas/reportLanguage"
    }
  }
}
```
