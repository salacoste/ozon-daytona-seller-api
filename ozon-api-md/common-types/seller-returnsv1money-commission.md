# seller_returnsv1Money_commission

Информация о комиссии.

## Top-level fields
- `seller_returnsv1Money_commission` (top-level fields):
  - `currency_code`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о комиссии.",
  "properties": {
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Размер комиссии."
    }
  }
}
```
