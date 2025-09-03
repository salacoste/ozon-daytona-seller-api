# PostingPostingAnalyticsData

Данные аналитики.

## Top-level fields
- `PostingPostingAnalyticsData` (top-level fields):
  - `city`: `string`
  - `delivery_type`: `string`
  - `is_legal`: `boolean`
  - `is_premium`: `boolean`
  - `payment_type_group_name`: `string`
  - `region`: `string`
  - `warehouse_id`: `integer`
  - `warehouse_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Данные аналитики.",
  "properties": {
    "city": {
      "description": "Город доставки. Только для отправлений rFBS и продавцов из СНГ.",
      "type": "string"
    },
    "delivery_type": {
      "description": "Способ доставки.",
      "type": "string"
    },
    "is_legal": {
      "description": "Признак, что получатель юридическое лицо:\n- `true` — юридическое лицо,\n- `false` — физическое лицо.\n",
      "type": "boolean"
    },
    "is_premium": {
      "description": "Наличие подписки Premium.",
      "type": "boolean"
    },
    "payment_type_group_name": {
      "description": "Способ оплаты:\n- `картой онлайн`,\n- `Ozon Карта`,\n- `автосписание с Ozon Карты при выдаче`,\n- `сохранённой картой при получении`,\n- `Система Быстрых Платежей`,\n- `Ozon Рассрочка`,\n- `оплата на расчётный счёт`,\n- `SberPay`.\n",
      "type": "string"
    },
    "region": {
      "type": "string",
      "description": "Регион доставки. Только для отправлений rFBS."
    },
    "warehouse_id": {
      "description": "Идентификатор склада.",
      "type": "integer",
      "format": "int64"
    },
    "warehouse_name": {
      "description": "Название склада.",
      "type": "string"
    }
  }
}
```
