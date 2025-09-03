# v2ReturnsRfbsListRequest

## Top-level fields
- `v2ReturnsRfbsListRequest` (top-level fields):
  - `filter` → `$ref` v2ReturnsRfbsFilter
  - `last_id`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/v2ReturnsRfbsFilter"
    },
    "last_id": {
      "description": "Идентификатор последнего значения на странице. Оставьте это поле пустым при выполнении первого запроса.",
      "type": "integer",
      "format": "int32"
    },
    "limit": {
      "description": "Количество значений в ответе.",
      "type": "integer",
      "format": "int32"
    }
  },
  "required": [
    "limit"
  ]
}
```
