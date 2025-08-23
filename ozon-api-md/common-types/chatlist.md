# ChatList

## Top-level fields
- `ChatList` (top-level fields):
  - `filter` → `$ref` ChatListRequestFilter
  - `limit`: `integer`
  - `offset`: `integer`

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
      "$ref": "#/components/schemas/ChatListRequestFilter"
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество значений в ответе. Значение по умолчанию — 30. Максимальное значение — 1000."
    },
    "offset": {
      "type": "integer",
      "format": "int64",
      "description": "Количество элементов, которое будет пропущено в ответе. Например, если `offset=10`, ответ начнётся с 11-го найденного элемента."
    }
  }
}
```
