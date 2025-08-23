# seller_apiActivateProductV1Request

## Top-level fields
- `seller_apiActivateProductV1Request` (top-level fields):
  - `action_id`: `number`
  - `products`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "action_id",
    "products"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "action_id": {
      "type": "number",
      "format": "double",
      "description": "Идентификатор акции. Можно получить с помощью метода [/v1/actions](#operation/Promos)."
    },
    "products": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/seller_apiProductPrice"
      },
      "description": "Список товаров."
    }
  }
}
```
