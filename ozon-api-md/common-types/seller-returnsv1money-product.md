# seller_returnsv1Money_product

Стоимость товара.

## Top-level fields
- `seller_returnsv1Money_product` (top-level fields):
  - `currency_code`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Стоимость товара.",
  "properties": {
    "currency_code": {
      "type": "string",
      "description": "Валюта."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Стоимость товара."
    }
  }
}
```
