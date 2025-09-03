# v1ProductUpdateAttributesRequest

## Top-level fields
- `v1ProductUpdateAttributesRequest` (top-level fields):
  - `items`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "description": "Товары и характеристики, которые нужно обновить.",
      "items": {
        "$ref": "#/components/schemas/v1ProductUpdateAttributesRequestItem"
      }
    }
  }
}
```
