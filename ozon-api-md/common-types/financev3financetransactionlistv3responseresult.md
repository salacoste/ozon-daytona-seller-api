# financev3FinanceTransactionListV3ResponseResult

Результаты запроса.

## Top-level fields
- `financev3FinanceTransactionListV3ResponseResult` (top-level fields):
  - `operations`: `array`
  - `page_count`: `integer`
  - `row_count`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "operations": {
      "items": {
        "$ref": "#/components/schemas/FinanceTransactionListV3ResponseOperation"
      },
      "type": "array",
      "description": "Информация об операциях."
    },
    "page_count": {
      "format": "int64",
      "type": "integer",
      "description": "Количество страниц. Если 0, страниц больше нет."
    },
    "row_count": {
      "format": "int64",
      "type": "integer",
      "description": "Количество транзакций на всех страницах. Если 0, транзакций больше нет."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результаты запроса."
}
```
