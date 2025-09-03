# v2PostingFBSActListResult

## Top-level fields
- `v2PostingFBSActListResult` (top-level fields):
  - `id`: `int`
  - `delivery_method_id`: `int`
  - `delivery_method_name`: `string`
  - `integration_type`: `string`
  - `containers_count`: `int`
  - `status`: `string`
  - `departure_date`: `string`
  - `created_at`: `string`
  - `updated_at`: `string`
  - `act_type`: `string`
  - `is_partial`: `boolean`
  - `has_postings_for_next_carriage`: `boolean`
  - `partial_num`: `integer`
  - `related_docs` → `$ref` v2PostingFBSActListRelatedDocs

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "int",
      "format": "int64",
      "description": "Идентификатор отгрузки."
    },
    "delivery_method_id": {
      "type": "int",
      "format": "int64",
      "description": "Идентификатор метода доставки."
    },
    "delivery_method_name": {
      "type": "string",
      "description": "Название метода доставки."
    },
    "integration_type": {
      "type": "string",
      "description": "Тип интеграции со службой доставки:\n  - `ozon` — доставка через Ozon логистику.\n  - `3pl` — доставка внешней службой, продавец регистрирует заказ.\n"
    },
    "containers_count": {
      "type": "int",
      "format": "int32",
      "description": "Число грузовых мест."
    },
    "status": {
      "type": "string",
      "description": "Статус отгрузки."
    },
    "departure_date": {
      "type": "string",
      "description": "Дата отгрузки."
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания записи об отгрузке."
    },
    "updated_at": {
      "type": "string",
      "format": "date-time",
      "description": "Дата обновления записи об отгрузке."
    },
    "act_type": {
      "type": "string",
      "description": "Тип акта приёма-передачи для FBS продавцов."
    },
    "is_partial": {
      "type": "boolean",
      "description": "Признак частичной перевозки. `true`, если перевозка частичная.\n\nЧастичная перевозка значит, что отгрузка была разделена на несколько частей и по каждой из частей формируются отдельные акты.\n"
    },
    "has_postings_for_next_carriage": {
      "type": "boolean",
      "description": "Признак наличия подлежащих отгрузке отправлений, которые не попали в текущую перевозку. `true`, если такие отправления есть."
    },
    "partial_num": {
      "type": "integer",
      "format": "int64",
      "description": "Порядковый номер частичной перевозки."
    },
    "related_docs": {
      "$ref": "#/components/schemas/v2PostingFBSActListRelatedDocs"
    }
  }
}
```
