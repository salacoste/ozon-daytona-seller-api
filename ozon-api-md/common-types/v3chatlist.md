# v3ChatList

## Top-level fields
- `v3ChatList` (top-level fields):
  - `filter` → `$ref` v3ChatListRequestFilter
  - `limit`: `integer`
  - `cursor`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/v3ChatListRequestFilter"
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество значений в ответе. Значение по умолчанию — 30. Максимальное значение — 1000."
    },
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    }
  }
}
```
