# v3FinanceCashFlowStatementListRequest

## Top-level fields
- `v3FinanceCashFlowStatementListRequest` (top-level fields):
  - `date` → `$ref` financev3Period
  - `page`: `integer`
  - `with_details`: `boolean`
  - `page_size`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "date": {
      "$ref": "#/components/schemas/financev3Period"
    },
    "page": {
      "format": "int32",
      "type": "integer",
      "description": "Номер страницы, возвращаемой в запросе."
    },
    "with_details": {
      "type": "boolean",
      "description": "`true`, если нужно добавить дополнительные параметры в ответ."
    },
    "page_size": {
      "format": "int32",
      "type": "integer",
      "description": "Количество элементов на странице."
    }
  },
  "required": [
    "page",
    "page_size",
    "date"
  ]
}
```
