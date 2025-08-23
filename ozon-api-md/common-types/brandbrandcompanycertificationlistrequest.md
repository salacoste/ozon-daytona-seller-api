# brandBrandCompanyCertificationListRequest

## Top-level fields
- `brandBrandCompanyCertificationListRequest` (top-level fields):
  - `page`: `integer`
  - `page_size`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "page",
    "page_size"
  ],
  "properties": {
    "page": {
      "format": "int32",
      "type": "integer",
      "description": "Номер страницы, возвращаемой в запросе."
    },
    "page_size": {
      "format": "int32",
      "type": "integer",
      "description": "Количество элементов на странице."
    }
  },
  "type": "object",
  "title": "object"
}
```
