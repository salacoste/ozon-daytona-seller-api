# v3FbsPostingAnalyticsData

Данные аналитики.

## Top-level fields
- `v3FbsPostingAnalyticsData` (top-level fields):
  - `city`: `string`
  - `delivery_date_begin`: `string`
  - `delivery_date_end`: `string`
  - `delivery_type`: `string`
  - `is_legal`: `boolean`
  - `is_premium`: `boolean`
  - `payment_type_group_name`: `string`
  - `region`: `string`
  - `tpl_provider`: `string`
  - `tpl_provider_id`: `integer`
  - `warehouse`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "city": {
      "type": "string",
      "description": "Город доставки. Только для отправлений rFBS и продавцов из СНГ."
    },
    "delivery_date_begin": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время начала доставки."
    },
    "delivery_date_end": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время конца доставки."
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
      "description": "Регион доставки. Только для отправлений rFBS."
    },
    "tpl_provider": {
      "type": "string",
      "description": "Служба доставки."
    },
    "tpl_provider_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор службы доставки."
    },
    "warehouse": {
      "type": "string",
      "description": "Название склада отправки заказа."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Данные аналитики."
}
```
