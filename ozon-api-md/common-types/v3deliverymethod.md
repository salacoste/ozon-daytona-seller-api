# v3DeliveryMethod

Метод доставки.

## Top-level fields
- `v3DeliveryMethod` (top-level fields):
  - `id`: `integer`
  - `name`: `string`
  - `tpl_provider`: `string`
  - `tpl_provider_id`: `integer`
  - `warehouse`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор способа доставки."
    },
    "name": {
      "type": "string",
      "description": "Название способа доставки."
    },
    "tpl_provider": {
      "type": "string",
      "description": "Служба доставки."
    },
    "tpl_provider_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор службы доставки."
    },
    "warehouse": {
      "type": "string",
      "description": "Название склада."
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Метод доставки."
}
```
