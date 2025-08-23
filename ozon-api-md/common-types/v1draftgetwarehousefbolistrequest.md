# v1DraftGetWarehouseFboListRequest

## Top-level fields
- `v1DraftGetWarehouseFboListRequest` (top-level fields):
  - `filter_by_supply_type`: `array`
  - `search`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "DraftGetWarehouseFboList",
  "properties": {
    "filter_by_supply_type": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1CreateType"
      },
      "description": "Тип поставки:\n- `CREATE_TYPE_CROSSDOCK` — кросс-докинг,\n- `CREATE_TYPE_DIRECT` — прямая.\n"
    },
    "search": {
      "type": "string",
      "required": true,
      "description": "Поиск по названию склада. Для поиска пунктов выдачи заказов укажите полное название.",
      "minLength": 4
    }
  },
  "required": [
    "filter_by_supply_type",
    "search"
  ]
}
```
