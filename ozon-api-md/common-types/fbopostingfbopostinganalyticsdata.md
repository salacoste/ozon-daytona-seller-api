# FboPostingFboPostingAnalyticsData

Данные аналитики.

## Top-level fields
- `FboPostingFboPostingAnalyticsData` (top-level fields):
  - `city`: `string`
  - `delivery_type`: `string`
  - `is_legal`: `boolean`
  - `is_premium`: `boolean`
  - `payment_type_group_name`: `string`
  - `warehouse_id`: `integer`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "city": {
      "type": "string",
      "description": "Город доставки. Только для продавцов из СНГ."
    },
    "delivery_type": {
      "type": "string",
      "description": "Способ доставки."
    },
    "is_legal": {
      "type": "boolean",
      "description": "Получатель юридическое лицо:\n  - `true` — юридическое лицо,\n  - `false` — физическое лицо.\n"
    },
    "is_premium": {
      "type": "boolean",
      "description": "Наличие подписки Premium."
    },
    "payment_type_group_name": {
      "type": "string",
      "description": "Способ оплаты: \n- `картой онлайн`,\n- `Ozon Карта`,\n- `автосписание с Ozon Карты при выдаче`,\n- `сохранённой картой при получении`,\n- `Система Быстрых Платежей`, \n- `Ozon Рассрочка`, \n- `оплата на расчётный счёт`,\n- `SberPay`.\n"
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    },
    "warehouse_name": {
      "type": "string",
      "description": "Название склада отправки заказа."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Данные аналитики."
}
```
