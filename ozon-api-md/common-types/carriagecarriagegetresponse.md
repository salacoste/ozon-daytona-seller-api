# carriageCarriageGetResponse

## Top-level fields
- `carriageCarriageGetResponse` (top-level fields):
  - `act_type`: `string`
  - `is_waybill_enabled`: `boolean`
  - `is_econom`: `boolean`
  - `arrival_pass_ids`: `array`
  - `available_actions`: `array`
  - `cancel_availability` → `$ref` carriageCarriageGetResponseCancelAvailability
  - `carriage_id`: `integer`
  - `company_id`: `integer`
  - `containers_count`: `integer`
  - `created_at`: `string`
  - `delivery_method_id`: `integer`
  - `departure_date`: `string`
  - `first_mile_type`: `string`
  - `has_postings_for_next_carriage`: `boolean`
  - `integration_type`: `string`
  - `is_container_label_printed`: `boolean`
  - `is_partial`: `boolean`
  - `partial_num`: `integer`
  - `retry_count`: `integer`
  - `status`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "act_type": {
      "type": "string",
      "description": "Тип акта приёма-передачи. Актуально для продавцов FBS."
    },
    "is_waybill_enabled": {
      "type": "boolean",
      "description": "`true`, если доступна печать транспортной накладной.\n"
    },
    "is_econom": {
      "type": "boolean",
      "description": "`true`, если отгрузка относится к товарам «Суперэконом».\n"
    },
    "arrival_pass_ids": {
      "type": "array",
      "description": "Список идентификаторов пропусков, оформленных на перевозку.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "available_actions": {
      "type": "array",
      "description": "Доступные действия с перевозкой.",
      "items": {
        "type": "string"
      }
    },
    "cancel_availability": {
      "$ref": "#/components/schemas/carriageCarriageGetResponseCancelAvailability"
    },
    "carriage_id": {
      "type": "integer",
      "description": "Идентификатор перевозки.",
      "format": "int64"
    },
    "company_id": {
      "type": "integer",
      "description": "Идентификатор продавца.",
      "format": "int64"
    },
    "containers_count": {
      "type": "integer",
      "description": "Количество грузовых мест.",
      "format": "int32"
    },
    "created_at": {
      "type": "string",
      "description": "Дата создания перевозки.",
      "format": "date-time"
    },
    "delivery_method_id": {
      "type": "integer",
      "description": "Идентификатор метода доставки.",
      "format": "int64"
    },
    "departure_date": {
      "type": "string",
      "description": "Дата выполнения перевозки."
    },
    "first_mile_type": {
      "type": "string",
      "description": "Тип первой мили."
    },
    "has_postings_for_next_carriage": {
      "type": "boolean",
      "description": "`true`, если есть отправления, которые не попали в перевозку, но нужно отгрузить.\n"
    },
    "integration_type": {
      "type": "string",
      "description": "Тип перевозки."
    },
    "is_container_label_printed": {
      "type": "boolean",
      "description": "`true`, если вы уже напечатали этикетки на грузовые места.\n"
    },
    "is_partial": {
      "type": "boolean",
      "description": "`true`, если перевозка частичная.\n"
    },
    "partial_num": {
      "type": "integer",
      "description": "Порядковый номер частичной перевозки.",
      "format": "int64"
    },
    "retry_count": {
      "type": "integer",
      "description": "Количество повторных попыток создания перевозки.",
      "format": "int32"
    },
    "status": {
      "type": "string",
      "description": "Статус перевозки:\n- `received` — идёт приёмка,\n- `closed` — завершена после приёмки,\n- `sended` — отправлена,\n- `cancelled` — отменена.\n"
    },
    "tpl_provider_id": {
      "type": "integer",
      "description": "Идентификатор провайдера доставки.",
      "format": "int64"
    },
    "updated_at": {
      "type": "string",
      "description": "Дата последнего обновления информации о перевозке.",
      "format": "date-time"
    },
    "warehouse_id": {
      "type": "integer",
      "description": "Идентификатор склада.",
      "format": "int64"
    }
  }
}
```
