# DetailsReturnDetails

Возвраты и отмены.

## Top-level fields
- `DetailsReturnDetails` (top-level fields):
  - `total`: `number`
  - `amount`: `number`
  - `return_services` → `$ref` DetailsReturns

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Возвраты и отмены.",
  "properties": {
    "total": {
      "type": "number",
      "format": "double",
      "description": "Общая сумма."
    },
    "amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма, на которую получено возвратов с учётом комиссий."
    },
    "return_services": {
      "$ref": "#/components/schemas/DetailsReturns",
      "description": "Плата за возвраты и отмены."
    }
  }
}
```
