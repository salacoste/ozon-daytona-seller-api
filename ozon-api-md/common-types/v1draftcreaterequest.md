# v1DraftCreateRequest

## Top-level fields
- `v1DraftCreateRequest` (top-level fields):
  - `cluster_ids`: `array`
  - `drop_off_point_warehouse_id`: `integer`
  - `items`: `array`
  - `type` → `$ref` v1CreateType

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "DraftCreate messages",
  "properties": {
    "cluster_ids": {
      "type": "array",
      "description": "Идентификаторы кластеров. Можно получить с помощью метода [/v1/cluster/list](#operation/SupplyDraftAPI_DraftClusterList).",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "drop_off_point_warehouse_id": {
      "type": "integer",
      "format": "int64",
      "title": "заполняется только для \"type\": \"crossdock\"",
      "description": "Идентификатор точки отгрузки — пункта выдачи заказов или сортировочного центра. Можно получить с помощью метода [/v1/warehouse/fbo/list](#operation/SupplyDraftAPI_DraftGetWarehouseFboList).\nТолько для типа поставки `type = CREATE_TYPE_CROSSDOCK`.\n"
    },
    "items": {
      "type": "array",
      "description": "Товары.",
      "maxItems": 5000,
      "items": {
        "$ref": "#/components/schemas/DraftCreateRequestItem"
      }
    },
    "type": {
      "$ref": "#/components/schemas/v1CreateType"
    }
  },
  "required": [
    "items",
    "type"
  ]
}
```
