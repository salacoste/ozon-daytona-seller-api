# v1ProductGetRelatedSKUResponse

## Top-level fields
- `v1ProductGetRelatedSKUResponse` (top-level fields):
  - `items`: `object`
  - `errors`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "description": "Информация о связанных SKU.",
      "items": {
        "$ref": "#/components/schemas/v1ProductGetRelatedSKUResponseItem"
      }
    },
    "errors": {
      "description": "Ошибки.",
      "items": {
        "$ref": "#/components/schemas/v1ProductGetRelatedSKUResponseError"
      }
    }
  }
}
```
