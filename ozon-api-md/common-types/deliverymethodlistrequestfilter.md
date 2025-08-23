# DeliveryMethodListRequestFilter

Фильтр для поиска методов доставки.

## Top-level fields
- `DeliveryMethodListRequestFilter` (top-level fields):
  - `provider_id`: `integer`
  - `status`: `string`
  - `warehouse_id`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "provider_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор службы доставки."
    },
    "status": {
      "type": "string",
      "description": "Статус метода доставки:\n  - `NEW` — создан,\n  - `EDITED` — редактируется,\n  - `ACTIVE` — активный,\n  - `DISABLED` — неактивный.\n"
    },
    "warehouse_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор склада. Можно получить с помощью метода [/v1/warehouse/list ](#operation/WarehouseAPI_WarehouseList)."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр для поиска методов доставки."
}
```
