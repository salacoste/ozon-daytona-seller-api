# DetailsOthers

Компенсация и прочие начисления.

## Top-level fields
- `DetailsOthers` (top-level fields):
  - `total`: `number`
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Компенсация и прочие начисления.",
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
        "$ref": "#/components/schemas/FinanceCashFlowStatementListResponseDetailsOthers"
      }
    }
  }
}
```
