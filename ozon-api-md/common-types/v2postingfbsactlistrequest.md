# v2PostingFBSActListRequest

## Top-level fields
- `v2PostingFBSActListRequest` (top-level fields):
  - `filter` → `$ref` v2PostingFBSActListFilter
  - `limit`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "filter": {
      "$ref": "#/components/schemas/v2PostingFBSActListFilter"
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Максимальное количество актов в ответе."
    }
  },
  "required": [
    "limit"
  ]
}
```
