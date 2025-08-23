# DetailsPayment

Выплачено за период.

## Top-level fields
- `DetailsPayment` (top-level fields):
  - `currency_code`: `string`
  - `payment`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Выплачено за период.",
  "properties": {
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "payment": {
      "type": "number",
      "format": "double",
      "description": "Сумма выплаты."
    }
  }
}
```
