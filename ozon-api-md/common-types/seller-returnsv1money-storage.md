# seller_returnsv1Money_storage

Стоимость хранения.

## Top-level fields
- `seller_returnsv1Money_storage` (top-level fields):
  - `currency_code`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Стоимость хранения.",
  "properties": {
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Стоимость хранения."
    }
  }
}
```
