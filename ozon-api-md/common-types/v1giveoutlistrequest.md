# v1GiveoutListRequest

## Top-level fields
- `v1GiveoutListRequest` (top-level fields):
  - `last_id`: `integer`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "type": "object",
  "properties": {
    "last_id": {
      "description": "Идентификатор последнего значения на странице.",
      "type": "integer",
      "format": "int64"
    },
    "limit": {
      "description": "Количество элементов в ответе.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
