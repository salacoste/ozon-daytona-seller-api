# DetailsReturns

Плата за возвраты и отмены.

## Top-level fields
- `DetailsReturns` (top-level fields):
  - `total`: `number`
  - `items` → `$ref` FinanceCashFlowStatementListResponseReturnService

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Плата за возвраты и отмены.",
  "properties": {
    "total": {
      "description": "Общая сумма.",
      "type": "number",
      "format": "double"
    },
    "items": {
      "description": "Детализация.",
      "type": "array",
      "items": null,
      "$ref": "#/components/schemas/FinanceCashFlowStatementListResponseReturnService"
    }
  }
}
```
