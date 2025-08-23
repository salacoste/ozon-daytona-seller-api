# analyticsDataRow

## Top-level fields
- `analyticsDataRow` (top-level fields):
  - `dimensions`: `array`
  - `metrics`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "dimensions": {
      "items": {
        "$ref": "#/components/schemas/analyticsDataRowDimension"
      },
      "type": "array",
      "description": "Группировка данных в отчёте."
    },
    "metrics": {
      "items": {
        "format": "double",
        "type": "number"
      },
      "type": "array",
      "description": "Список значений метрики."
    }
  },
  "type": "object",
  "title": "object"
}
```
