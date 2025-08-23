# FbsPostingFbsPostingAnalyticsData

Аналитические данные.

## Top-level fields
- `FbsPostingFbsPostingAnalyticsData` (top-level fields):
  - `city`: `string`
  - `delivery_type`: `string`
  - `is_legal`: `boolean`
  - `is_premium`: `boolean`
  - `payment_type_group_name`: `string`
  - `region`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "city": {
      "type": "string",
      "description": "Город доставки."
    },
    "delivery_type": {
      "type": "string",
      "description": "Способ доставки."
    },
    "is_legal": {
      "type": "boolean",
      "description": "Признак, что получатель юридическое лицо:\n  - `true` — юридическое лицо,\n  - `false` — физическое лицо.\n"
    },
    "is_premium": {
      "type": "boolean",
      "description": "Наличие подписки Premium."
    },
    "payment_type_group_name": {
      "type": "string",
      "description": "Способ оплаты: \n- `картой онлайн`,\n- `Ozon Карта`,\n- `автосписание с Ozon Карты при выдаче`,\n- `сохранённой картой при получении`,\n- `Система Быстрых Платежей`, \n- `Ozon Рассрочка`, \n- `оплата на расчётный счёт`,\n- `SberPay`.\n"
    },
    "region": {
      "type": "string",
      "description": "Регион доставки."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Аналитические данные."
}
```
