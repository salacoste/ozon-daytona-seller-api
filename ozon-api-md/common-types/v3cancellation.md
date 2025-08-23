# v3Cancellation

Информация об отмене.

## Top-level fields
- `v3Cancellation` (top-level fields):
  - `affect_cancellation_rating`: `boolean`
  - `cancel_reason`: `string`
  - `cancel_reason_id`: `integer`
  - `cancellation_initiator`: `string`
  - `cancellation_type`: `string`
  - `cancelled_after_ship`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "affect_cancellation_rating": {
      "type": "boolean",
      "description": "Если отмена влияет на рейтинг продавца — `true`."
    },
    "cancel_reason": {
      "type": "string",
      "description": "Причина отмены."
    },
    "cancel_reason_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор причины отмены отправления."
    },
    "cancellation_initiator": {
      "type": "string",
      "description": "Инициатор отмены:\n- `Продавец`, \n- `Клиент` или `покупатель`,\n- `Ozon`,  \n- `Система`, \n- `Служба доставки`.\n"
    },
    "cancellation_type": {
      "type": "string",
      "description": "Тип отмены отправления:\n- `seller` — отменено продавцом;\n- `client` или `customer` — отменено покупателем;\n- `ozon` — отменено Ozon;\n- `system`— отменено системой;\n- `delivery` — отменено службой доставки.\n"
    },
    "cancelled_after_ship": {
      "type": "boolean",
      "description": "Если отмена произошла после сборки отправления — `true`."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Информация об отмене."
}
```
