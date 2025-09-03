# GetRealizationReportResponseV2Result

Результат запроса.

## Top-level fields
- `GetRealizationReportResponseV2Result` (top-level fields):
  - `header` → `$ref` GetRealizationReportResponseV2Header
  - `rows`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "header": {
      "$ref": "#/components/schemas/GetRealizationReportResponseV2Header"
    },
    "rows": {
      "description": "Таблица отчёта.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetRealizationReportResponseV2Row"
      }
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
