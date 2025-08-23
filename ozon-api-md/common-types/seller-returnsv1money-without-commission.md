# seller_returnsv1Money_without_commission

Стоимость товара без комиссии.

## Top-level fields
- `seller_returnsv1Money_without_commission` (top-level fields):
  - `currency_code`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Стоимость товара без комиссии.",
  "properties": {
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Стоимость товара без комиссии."
    }
  }
}
```
