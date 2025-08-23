# v2ProductCertificationListRequest

## Top-level fields
- `v2ProductCertificationListRequest` (top-level fields):
  - `page`: `integer`
  - `page_size`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "page",
    "page_size"
  ],
  "type": "object",
  "properties": {
    "page": {
      "description": "Номер страницы.",
      "type": "integer",
      "format": "int64"
    },
    "page_size": {
      "description": "Количество элементов на странице.",
      "type": "integer",
      "format": "int64",
      "minimum": 1,
      "maximum": 1000
    }
  }
}
```
