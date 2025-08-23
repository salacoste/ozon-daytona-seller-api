# reportCreateCompanyPostingsReportRequestFilter

Фильтр.

## Top-level fields
- `reportCreateCompanyPostingsReportRequestFilter` (top-level fields):
  - `cancel_reason_id`: `array`
  - `delivery_schema`: `array`
  - `offer_id`: `string`
  - `processed_at_from`: `string`
  - `processed_at_to`: `string`
  - `sku`: `array`
  - `status_alias`: `array`
  - `statuses`: `array`
  - `title`: `string`

## Full schema (JSON)
```json
{
  "properties": {
    "cancel_reason_id": {
      "description": "Идентификатор причины отмены.",
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array"
    },
    "delivery_schema": {
      "description": "Схема работы — FBO или FBS.\n\nЗа один запрос вы можете передать только одно значение:\n* `fbo` — чтобы получить отчёт по схеме FBO,\n* `fbs` — чтобы получить отчёт по схеме FBS.\n",
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "offer_id": {
      "description": "Идентификатор товара в системе продавца — артикул.",
      "type": "string"
    },
    "processed_at_from": {
      "format": "date-time",
      "type": "string",
      "description": "Время, когда заказ попал в обработку."
    },
    "processed_at_to": {
      "format": "date-time",
      "type": "string",
      "description": "Время, когда заказ появился в личном кабинете."
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array"
    },
    "status_alias": {
      "description": "Текст статуса.",
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "statuses": {
      "description": "Числовой статус.",
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array"
    },
    "title": {
      "description": "Название товара.",
      "type": "string"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр."
}
```
