# v1GetFinanceProductsBuyoutRequest

## Top-level fields
- `v1GetFinanceProductsBuyoutRequest` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "required": [
    "date_from",
    "date_to"
  ],
  "properties": {
    "date_from": {
      "description": "Дата, с которой будут данные в отчёте.",
      "type": "string"
    },
    "date_to": {
      "description": "Дата, по которую будут данные в отчёте.\n\nМаксимальный период — 31 день.\n",
      "type": "string"
    }
  }
}
```
