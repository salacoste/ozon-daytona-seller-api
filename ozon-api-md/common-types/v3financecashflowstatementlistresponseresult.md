# v3FinanceCashFlowStatementListResponseResult

Результат работы метода.

## Top-level fields
- `v3FinanceCashFlowStatementListResponseResult` (top-level fields):
  - `cash_flows`: `object`
  - `details` → `$ref` FinanceCashFlowStatementListResponseDetails
  - `page_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Результат работы метода.",
  "properties": {
    "cash_flows": {
      "description": "Список отчётов.",
      "items": {
        "$ref": "#/components/schemas/FinanceCashFlowStatementListResponseCashFlow"
      }
    },
    "details": {
      "type": "array",
      "items": null,
      "$ref": "#/components/schemas/FinanceCashFlowStatementListResponseDetails",
      "description": "Детализированная информация."
    },
    "page_count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество страниц с отчётами."
    }
  }
}
```
