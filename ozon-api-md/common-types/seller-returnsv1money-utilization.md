# seller_returnsv1Money_utilization

Стоимость утилизации.

## Top-level fields
- `seller_returnsv1Money_utilization` (top-level fields):
  - `currency_code`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Стоимость утилизации.",
  "properties": {
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Стоимость утилизации."
    }
  }
}
```
