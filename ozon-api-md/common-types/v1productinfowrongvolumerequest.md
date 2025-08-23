# v1ProductInfoWrongVolumeRequest

## Top-level fields
- `v1ProductInfoWrongVolumeRequest` (top-level fields):
  - `cursor`: `string`
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "cursor": {
      "type": "string",
      "description": "Указатель для выборки следующих данных."
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "minimum": 1,
      "maximum": 1000,
      "description": "Максимальное количество элементов в ответе."
    }
  }
}
```
