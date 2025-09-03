# postingv3GetFbsPostingUnfulfilledListRequestFilter

Фильтр запроса.

Используйте фильтр либо по времени сборки — `cutoff`, либо по дате передачи отправления в доставку — `delivering_date`.
Если использовать их вместе, в ответе вернётся ошибка.

Чтобы использовать фильтр по времени сборки, заполните поля `cutoff_from` и `cutoff_to`.

Чтобы использовать фильтр по дате передачи отправления в доставку, заполните поля `delivering_date_from` и `delivering_date_to`.


## Top-level fields
- `postingv3GetFbsPostingUnfulfilledListRequestFilter` (top-level fields):
  - `cutoff_from`: `string`
  - `cutoff_to`: `string`
  - `delivering_date_from`: `string`
  - `delivering_date_to`: `string`
  - `delivery_method_id`: `array`
  - `is_quantum`: `boolean`
  - `provider_id`: `array`
  - `status`: `string`
  - `warehouse_id`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "cutoff_from",
    "cutoff_to"
  ],
  "properties": {
    "cutoff_from": {
      "format": "date-time",
      "type": "string",
      "description": "Фильтр по времени, до которого продавцу нужно собрать заказ. Начало периода.\n\nФормат: YYYY-MM-DDThh:mm:ss.mcsZ.\nПример: 2020-03-18T07:34:50.359Z.\n"
    },
    "cutoff_to": {
      "format": "date-time",
      "type": "string",
      "description": "Фильтр по времени, до которого продавцу нужно собрать заказ. Конец периода.\n\nФормат: YYYY-MM-DDThh:mm:ss.mcsZ.\nПример: 2020-03-18T07:34:50.359Z.\n"
    },
    "delivering_date_from": {
      "format": "date-time",
      "type": "string",
      "description": "Минимальная дата передачи отправления в доставку."
    },
    "delivering_date_to": {
      "format": "date-time",
      "type": "string",
      "description": "Максимальная дата передачи отправления в доставку."
    },
    "delivery_method_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Идентификатор способа доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList)."
    },
    "is_quantum": {
      "type": "boolean",
      "description": "Укажите `true`, чтобы получить только отправления квантов.\n\nПо умолчанию — `false`, в ответе придут все отправления.\n"
    },
    "provider_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Идентификатор службы доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList)."
    },
    "status": {
      "type": "string",
      "description": "Статус отправления:\n- `acceptance_in_progress` — идёт приёмка,\n- `awaiting_approve` — ожидает подтверждения,\n- `awaiting_packaging` — ожидает упаковки,\n- `awaiting_registration` — ожидает регистрации,\n- `awaiting_deliver` — ожидает отгрузки,\n- `arbitration` — арбитраж,\n- `client_arbitration` — клиентский арбитраж доставки,\n- `delivering` — доставляется,\n- `driver_pickup` — у водителя,\n- `not_accepted` — не принят на сортировочном центре.\n"
    },
    "warehouse_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Идентификатор склада. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList)."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр запроса.\n\nИспользуйте фильтр либо по времени сборки — `cutoff`, либо по дате передачи отправления в доставку — `delivering_date`.\nЕсли использовать их вместе, в ответе вернётся ошибка.\n\nЧтобы использовать фильтр по времени сборки, заполните поля `cutoff_from` и `cutoff_to`.\n\nЧтобы использовать фильтр по дате передачи отправления в доставку, заполните поля `delivering_date_from` и `delivering_date_to`.\n"
}
```
