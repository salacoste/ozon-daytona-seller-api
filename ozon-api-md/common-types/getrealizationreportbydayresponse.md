# GetRealizationReportByDayResponse

Результат запроса.

## Top-level fields
- `GetRealizationReportByDayResponse` (top-level fields):
  - `rows`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "rows": {
      "description": "Таблица отчёта.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetRealizationReportByDayResponseRow"
      }
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
