# v1PostingUnpaidLegalProductListRequest

## Top-level fields
- `v1PostingUnpaidLegalProductListRequest` (top-level fields):
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
      "format": "int32",
      "minimum": 1,
      "maximum": 1000,
      "description": "Количество значений в ответе.\n",
      "required": true
    }
  }
}
```
