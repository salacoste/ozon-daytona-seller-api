# DetailsDeliveryDetails

Заказы.

## Top-level fields
- `DetailsDeliveryDetails` (top-level fields):
  - `total`: `number`
  - `amount`: `number`
  - `delivery_services` → `$ref` DetailsServices

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Заказы.",
  "properties": {
    "total": {
      "type": "number",
      "format": "double",
      "description": "Общая сумма."
    },
    "amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма, на которую выкуплено товаров с учётом комиссий."
    },
    "delivery_services": {
      "$ref": "#/components/schemas/DetailsServices",
      "description": "Плата за обработку и доставку."
    }
  }
}
```
