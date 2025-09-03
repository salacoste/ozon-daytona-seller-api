# ChatMessageContext

Информация о чате.

## Top-level fields
- `ChatMessageContext` (top-level fields):
  - `order_number`: `string`
  - `sku`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация о чате.",
  "properties": {
    "order_number": {
      "description": "Номер заказа.",
      "type": "string"
    },
    "sku": {
      "type": "string",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
