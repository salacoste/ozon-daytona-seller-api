# reportReportListRequest

## Top-level fields
- `reportReportListRequest` (top-level fields):
  - `page`: `integer`
  - `page_size`: `integer`
  - `report_type` → `$ref` ReportListRequestReportType

## Full schema (JSON)
```json
{
  "required": [
    "page",
    "page_size"
  ],
  "properties": {
    "page": {
      "format": "int32",
      "type": "integer",
      "description": "Номер страницы."
    },
    "page_size": {
      "format": "int32",
      "type": "integer",
      "description": "Количество значений на странице:\n  - по умолчанию — 100,\n  - маĸсимальное значение — 1000.\n"
    },
    "report_type": {
      "$ref": "#/components/schemas/ReportListRequestReportType"
    }
  },
  "title": "ReportList",
  "type": "object"
}
```
