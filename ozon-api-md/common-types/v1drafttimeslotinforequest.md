# v1DraftTimeslotInfoRequest

## Top-level fields
- `v1DraftTimeslotInfoRequest` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `draft_id`: `integer`
  - `warehouse_ids`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "DraftTimeslotInfo messages",
  "properties": {
    "date_from": {
      "type": "string",
      "format": "date-time",
      "description": "Дата начала нужного периода доступных таймслотов."
    },
    "date_to": {
      "type": "string",
      "format": "date-time",
      "description": "Дата окончания нужного периода доступных таймслотов.\n\nМаксимальный период — 28 дней с текущей даты.\n"
    },
    "draft_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор черновика заявки на поставку."
    },
    "warehouse_ids": {
      "type": "array",
      "description": "Идентификаторы складов, для которых нужно получить таймслоты.",
      "maxItems": 10,
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  },
  "required": [
    "date_from",
    "date_to",
    "draft_id",
    "warehouse_ids"
  ]
}
```
