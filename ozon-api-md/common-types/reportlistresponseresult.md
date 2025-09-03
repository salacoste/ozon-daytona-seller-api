# ReportListResponseResult

Результаты запроса.

## Top-level fields
- `ReportListResponseResult` (top-level fields):
  - `reports`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "reports": {
      "items": {
        "$ref": "#/components/schemas/reportReport"
      },
      "type": "array",
      "description": "Массив со всеми сгенерированными отчётами."
    },
    "total": {
      "format": "int32",
      "type": "integer",
      "description": "Суммарное количество отчётов."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результаты запроса."
}
```
