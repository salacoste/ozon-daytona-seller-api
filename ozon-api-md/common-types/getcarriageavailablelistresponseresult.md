# GetCarriageAvailableListResponseResult

## Top-level fields
- `GetCarriageAvailableListResponseResult` (top-level fields):
  - `carriage_id`: `integer`
  - `carriage_postings_count`: `integer`
  - `carriage_status`: `string`
  - `cutoff_at`: `string`
  - `delivery_method_id`: `integer`
  - `delivery_method_name`: `string`
  - `errors`: `object`
  - `first_mile_type`: `string`
  - `has_entrusted_acceptance`: `boolean`
  - `mandatory_postings_count`: `integer`
  - `mandatory_packaged_count`: `integer`
  - `recommended_time_local`: `string`
  - `recommended_time_utc_offset_in_minutes`: `number`
  - `tpl_provider_icon_url`: `string`
  - `tpl_provider_name`: `string`
  - `warehouse_city`: `string`
  - `warehouse_id`: `integer`
  - `warehouse_name`: `string`
  - `warehouse_timezone`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "carriage_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор перевозки (также номер задания на формирование документов)."
    },
    "carriage_postings_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество отправлений в перевозке."
    },
    "carriage_status": {
      "type": "string",
      "description": "Статус перевозки для запрашиваемого метода доставки и даты отгрузки."
    },
    "cutoff_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время, до которых нужно собрать отправление."
    },
    "delivery_method_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор метода доставки."
    },
    "delivery_method_name": {
      "type": "string",
      "description": "Название метода доставки."
    },
    "errors": {
      "description": "Список ошибок.",
      "items": {
        "$ref": "#/components/schemas/ResultError"
      }
    },
    "first_mile_type": {
      "type": "string",
      "description": "Тип первой мили."
    },
    "has_entrusted_acceptance": {
      "type": "boolean",
      "description": "Признак доверительной приёмки. `true`, если доверительная приёмка включена на складе."
    },
    "mandatory_postings_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество отправлений, которые нужно собрать."
    },
    "mandatory_packaged_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество собранных отправлений."
    },
    "recommended_time_local": {
      "type": "string",
      "description": "Рекомендуемое местное время отгрузки на пункт приёма заказов."
    },
    "recommended_time_utc_offset_in_minutes": {
      "type": "number",
      "format": "int32",
      "description": "Смещение часового пояса рекомендуемого времени отгрузки от UTC-0 в минутах."
    },
    "tpl_provider_icon_url": {
      "type": "string",
      "description": "Ссылка на иконку службы доставки."
    },
    "tpl_provider_name": {
      "type": "string",
      "description": "Название службы доставки."
    },
    "warehouse_city": {
      "type": "string",
      "description": "Город склада."
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада."
    },
    "warehouse_name": {
      "type": "string",
      "description": "Название склада."
    },
    "warehouse_timezone": {
      "type": "string",
      "description": "Часовой пояс, в котором находится склад."
    }
  }
}
```
