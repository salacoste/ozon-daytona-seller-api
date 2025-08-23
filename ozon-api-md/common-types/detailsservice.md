# DetailsService

Услуги.

## Top-level fields
- `DetailsService` (top-level fields):
  - `total`: `number`
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Услуги.",
  "properties": {
    "total": {
      "description": "Общая сумма.",
      "type": "number",
      "format": "double"
    },
    "items": {
      "description": "Детализация.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/FinanceCashFlowStatementListResponseService"
      }
    }
  }
}
```
