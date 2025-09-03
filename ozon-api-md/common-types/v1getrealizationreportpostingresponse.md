# v1GetRealizationReportPostingResponse

Результат запроса.

## Top-level fields
- `v1GetRealizationReportPostingResponse` (top-level fields):
  - `header` → `$ref` GetRealizationReportResponseV2Header
  - `rows`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат запроса.",
  "properties": {
    "header": {
      "$ref": "#/components/schemas/GetRealizationReportResponseV2Header"
    },
    "rows": {
      "description": "Таблица отчёта.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1GetRealizationReportPostingResponseRow"
      }
    }
  }
}
```
