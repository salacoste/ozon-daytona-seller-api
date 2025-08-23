# v1GetSupplierReturnsSummaryReportResponse

## Top-level fields
- `v1GetSupplierReturnsSummaryReportResponse` (top-level fields):
  - `last_id`: `string`
  - `returns_summary_report_rows`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "last_id": {
      "description": "Идентификатор последнего значения на странице.",
      "type": "string"
    },
    "returns_summary_report_rows": {
      "description": "Информация о товарах.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1GetSupplierReturnsSummaryReportResponseRow"
      }
    }
  }
}
```
