# DraftGetWarehouseFboListResponseSearch

## Top-level fields
- `DraftGetWarehouseFboListResponseSearch` (top-level fields):
  - `address`: `string`
  - `coordinates` → `$ref` DraftGetWarehouseFboListResponseCoordinate
  - `name`: `string`
  - `warehouse_id`: `integer`
  - `warehouse_type` → `$ref` DraftGetWarehouseFboListResponseWarehouseType

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "address": {
      "type": "string",
      "description": "Адрес склада."
    },
    "coordinates": {
      "$ref": "#/components/schemas/DraftGetWarehouseFboListResponseCoordinate"
    },
    "name": {
      "type": "string",
      "description": "Название склада."
    },
    "warehouse_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор склада, пункта выдачи заказов или сортировочного центра."
    },
    "warehouse_type": {
      "$ref": "#/components/schemas/DraftGetWarehouseFboListResponseWarehouseType"
    }
  }
}
```
