# DeliveryMethodListResponseDeliveryMethod

## Top-level fields
- `DeliveryMethodListResponseDeliveryMethod` (top-level fields):
  - `company_id`: `integer`
  - `created_at`: `string`
  - `cutoff`: `string`
  - `id`: `integer`
  - `name`: `string`
  - `provider_id`: `integer`
  - `sla_cut_in`: `integer`
  - `status`: `string`
  - `template_id`: `integer`
  - `updated_at`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "company_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор продавца."
    },
    "created_at": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время создания метода доставки."
    },
    "cutoff": {
      "type": "string",
      "description": "Время, до которого продавцу нужно собрать заказ."
    },
    "id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор метода доставки."
    },
    "name": {
      "type": "string",
      "description": "Название метода доставки."
    },
    "provider_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор службы доставки."
    },
    "sla_cut_in": {
      "format": "int64",
      "type": "integer",
      "description": "Минимальное время на сборку заказа в минутах в соответствии с настройками склада."
    },
    "status": {
      "type": "string",
      "description": "Статус метода доставки:\n  - `NEW` — создан,\n  - `EDITED` — редактируется,\n  - `ACTIVE` — активный,\n  - `DISABLED` — неактивный.\n"
    },
    "template_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор услуги по доставке заказа."
    },
    "updated_at": {
      "format": "date-time",
      "type": "string",
      "description": "Дата и время последнего обновления метода метода доставки."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    }
  },
  "type": "object",
  "title": "object"
}
```
