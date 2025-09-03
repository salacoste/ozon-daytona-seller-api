# seller_apiProductIDsV1Request

## Top-level fields
- `seller_apiProductIDsV1Request` (top-level fields):
  - `action_id`: `number`
  - `product_ids`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "action_id",
    "product_ids"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "action_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор акции. Можно получить с помощью метода [/v1/actions](#operation/Promos)."
    },
    "product_ids": {
      "type": "array",
      "items": {
        "type": "number",
        "format": "double"
      },
      "description": "Список идентификаторов товаров в системе продавца — `product_id`."
    }
  }
}
```
