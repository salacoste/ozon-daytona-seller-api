# arrivalpassArrivalPassListRequest

## Top-level fields
- `arrivalpassArrivalPassListRequest` (top-level fields):
  - `cursor`: `string`
  - `filter` → `$ref` ArrivalPassListRequestFilter
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "limit"
  ],
  "type": "object",
  "properties": {
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "filter": {
      "$ref": "#/components/schemas/ArrivalPassListRequestFilter"
    },
    "limit": {
      "type": "integer",
      "description": "Ограничение по количеству записей в ответе.\nПо умолчанию — 1000. Максимум — 1000.\n",
      "format": "int32"
    }
  }
}
```
