# v1ProductGetRelatedSKUResponseError

## Top-level fields
- `v1ProductGetRelatedSKUResponseError` (top-level fields):
  - `code`: `string`
  - `sku`: `integer`
  - `message`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Код ошибки."
    },
    "sku": {
      "type": "integer",
      "description": "SKU, в котором произошла ошибка."
    },
    "message": {
      "type": "string",
      "description": "Текст ошибки."
    }
  }
}
```
