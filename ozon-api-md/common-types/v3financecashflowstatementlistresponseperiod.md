# v3FinanceCashFlowStatementListResponsePeriod

Период.

## Top-level fields
- `v3FinanceCashFlowStatementListResponsePeriod` (top-level fields):
  - `begin`: `string`
  - `end`: `string`
  - `id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Период.",
  "properties": {
    "begin": {
      "type": "string",
      "format": "date-time",
      "description": "Начало периода."
    },
    "end": {
      "type": "string",
      "format": "date-time",
      "description": "Конец периода."
    },
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор."
    }
  }
}
```
