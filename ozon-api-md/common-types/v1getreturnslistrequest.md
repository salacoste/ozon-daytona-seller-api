# v1GetReturnsListRequest

## Top-level fields
- `v1GetReturnsListRequest` (top-level fields):
  - `filter` → `$ref` GetReturnsListRequestFilter
  - `limit`: `integer`
  - `last_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/GetReturnsListRequestFilter"
    },
    "limit": {
      "type": "integer",
      "format": "int32",
      "description": "Количество подгружаемых возвратов. Максимальное значение — 500."
    },
    "last_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор последнего подгруженного возврата."
    }
  },
  "required": [
    "limit"
  ]
}
```
