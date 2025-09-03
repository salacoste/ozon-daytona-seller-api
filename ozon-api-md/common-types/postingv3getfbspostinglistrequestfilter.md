# postingv3GetFbsPostingListRequestFilter

Фильтр.

## Top-level fields
- `postingv3GetFbsPostingListRequestFilter` (top-level fields):
  - `delivery_method_id`: `array`
  - `is_quantum`: `boolean`
  - `order_id`: `integer`
  - `provider_id`: `array`
  - `since`: `string`
  - `to`: `string`
  - `status`: `string`
  - `warehouse_id`: `array`
  - `last_changed_status_date` → `$ref` postinglistV3status

## Full schema (JSON)
```json
{
  "required": [
    "since",
    "to"
  ],
  "properties": {
    "delivery_method_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "description": "Идентификатор способа доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList).",
      "type": "array"
    },
    "is_quantum": {
      "type": "boolean",
      "description": "Укажите `true`, чтобы получить только отправления квантов.\n\nПо умолчанию — `false`, в ответе придут все отправления.\n"
    },
    "order_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор заказа."
    },
    "provider_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "description": "Идентификатор службы доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList).",
      "type": "array"
    },
    "since": {
      "format": "date-time",
      "type": "string",
      "description": "Дата начала периода, за который нужно получить список отправлений.\n\nФормат UTC: ГГГГ-ММ-ДДTЧЧ:ММ:ССZ.\n\nПример: 2019-08-24T14:15:22Z.\n"
    },
    "to": {
      "format": "date-time",
      "type": "string",
      "description": "Дата конца периода, за который нужно получить список отправлений.\n\nФормат UTC: ГГГГ-ММ-ДДTЧЧ:ММ:ССZ.\n\nПример: 2019-08-24T14:15:22Z.\n"
    },
    "status": {
      "type": "string",
      "description": "Статус отправления:\n- `awaiting_registration` — ожидает регистрации,\n- `acceptance_in_progress` — идёт приёмка,\n- `awaiting_approve` — ожидает подтверждения,\n- `awaiting_packaging` — ожидает упаковки,\n- `awaiting_deliver` — ожидает отгрузки,\n- `arbitration` — арбитраж,\n- `client_arbitration` — клиентский арбитраж доставки,\n- `delivering` — доставляется,\n- `driver_pickup` — у водителя,\n- `delivered` — доставлено,\n- `cancelled` — отменено,\n- `not_accepted` — не принят на сортировочном центре,\n- `sent_by_seller` – отправлено продавцом.\n"
    },
    "warehouse_id": {
      "items": {
        "format": "int64",
        "type": "string"
      },
      "type": "array",
      "description": "Идентификатор склада. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList)."
    },
    "last_changed_status_date": {
      "$ref": "#/components/schemas/postinglistV3status"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр."
}
```
