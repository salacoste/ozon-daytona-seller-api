# v1CarriageDeliveryListResponseResult

## Top-level fields
- `v1CarriageDeliveryListResponseResult` (top-level fields):
  - `assembly_list_availability`: `boolean`
  - `can_create_another_carriage`: `boolean`
  - `carriage_postings_count`: `integer`
  - `carriage_quantum_count`: `integer`
  - `carriages`: `array`
  - `cut_in`: `string`
  - `delivery_method_id`: `integer`
  - `delivery_method_name`: `string`
  - `delivery_method_status`: `string`
  - `departure_date`: `string`
  - `dropoff_address`: `string`
  - `dropoff_change_availability`: `string`
  - `dropoff_point_id`: `integer`
  - `dropoff_point_type`: `string`
  - `errors`: `array`
  - `first_mile_changing`: `boolean`
  - `first_mile_type`: `string`
  - `has_entrusted_acceptance`: `boolean`
  - `integration_type`: `string`
  - `is_presort`: `boolean`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "assembly_list_availability": {
      "type": "boolean",
      "description": "`true`, если доступен лист подбора.\n"
    },
    "can_create_another_carriage": {
      "type": "boolean",
      "description": "`true`, если можно создать ещё одну перевозку.\n"
    },
    "carriage_postings_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество отправлений в перевозке."
    },
    "carriage_quantum_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество квантов в перевозке."
    },
    "carriages": {
      "type": "array",
      "items": {
        "type": "string",
        "$ref": "#/components/schemas/v1CarriageDeliveryListResponseResultCarriages"
      },
      "description": "Список перевозок."
    },
    "cut_in": {
      "type": "string",
      "format": "date-time",
      "description": "Время начала сборки и часовой пояс времени склада."
    },
    "delivery_method_id": {
      "type": "integer",
      "description": "Идентификатор метода доставки."
    },
    "delivery_method_name": {
      "type": "string",
      "description": "Название метода доставки."
    },
    "delivery_method_status": {
      "type": "string",
      "description": "Статус метода доставки."
    },
    "departure_date": {
      "type": "string",
      "format": "date-time",
      "description": "Дата отгрузки."
    },
    "dropoff_address": {
      "type": "string",
      "description": "Адрес точки отгрузки."
    },
    "dropoff_change_availability": {
      "type": "string",
      "description": "Статус возможности смены точки отгрузки."
    },
    "dropoff_point_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор точки отгрузки."
    },
    "dropoff_point_type": {
      "type": "string",
      "description": "Способ отгрузки."
    },
    "errors": {
      "items": {
        "$ref": "#/components/schemas/v1CarriageDeliveryListResponseResultErrors"
      },
      "type": "array",
      "description": "Массив ошибок, которые возникли при обработке запроса."
    },
    "first_mile_changing": {
      "type": "boolean",
      "description": "`true`, если точка отгрузки изменилась.\n"
    },
    "first_mile_type": {
      "type": "string",
      "description": "Тип первой мили."
    },
    "has_entrusted_acceptance": {
      "type": "boolean",
      "description": "Признак доверительной приёмки. `true`, если доверительная приёмка включена на складе."
    },
    "integration_type": {
      "type": "string",
      "description": "Тип интеграции со службой доставки."
    },
    "is_presort": {
      "type": "boolean",
      "description": "`true`, если отгрузка с предсортировкой.\n"
    },
    "is_rfbs": {
      "type": "boolean",
      "description": "`true`, если склад работает по схеме rFBS.\n"
    },
    "recommended_time_local": {
      "type": "string",
      "description": "Рекомендуемое местное время отгрузки в пункт приёма заказов."
    },
    "recommended_time_utc_offset_in_minutes": {
      "type": "number",
      "format": "int32",
      "description": "Смещение часового пояса рекомендуемого времени отгрузки от UTC-0 в минутах."
    },
    "cutoff_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата и время, до которых нужно собрать отправление."
    },
    "mandatory_packaged_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество «обязательных» собранных отправлений."
    },
    "mandatory_packaged_quantum_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество «обязательных» собранных квантов."
    },
    "mandatory_postings_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество отправлений, которые нужно собрать."
    },
    "mandatory_quantum_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество квантов, которые нужно собрать."
    },
    "optional_packaged_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество собранных «необязательных» отправлений."
    },
    "postings_for_another_carriage_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество отправлений, которые могут попасть в следующую перевозку."
    },
    "quantum_for_another_carriage_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество квантов, которые могут попасть в следующую перевозку."
    },
    "timeslot_from": {
      "type": "string",
      "format": "date-time",
      "description": "Начало таймслота в точке отгрузки."
    },
    "timeslot_to": {
      "type": "string",
      "format": "date-time",
      "description": "Окончание таймслота в точке отгрузки."
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
    }
  }
}
```
