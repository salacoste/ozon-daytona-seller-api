# seller_apiProductPrice

## Top-level fields
- `seller_apiProductPrice` (top-level fields):
  - `product_id`: `number`
  - `action_price`: `number`
  - `stock`: `number`

## Full schema (JSON)
```json
{
  "required": [
    "product_id",
    "action_price"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "action_price": {
      "type": "number",
      "format": "double",
      "description": "Цена товара по акции."
    },
    "stock": {
      "type": "number",
      "format": "double",
      "description": "Количество единиц товара в акции типа «Скидка на сток»."
    }
  }
}
```
