# financev3FinanceTransactionListV3Request

## Top-level fields
- `financev3FinanceTransactionListV3Request` (top-level fields):
  - `filter` → `$ref` FinanceTransactionListV3RequestFilter
  - `page`: `integer`
  - `page_size`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "page",
    "page_size"
  ],
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/FinanceTransactionListV3RequestFilter"
    },
    "page": {
      "format": "int64",
      "type": "integer",
      "description": "Номер страницы, возвращаемой в запросе."
    },
    "page_size": {
      "format": "int64",
      "type": "integer",
      "description": "Количество элементов на странице."
    }
  },
  "type": "object",
  "title": "object"
}
```
