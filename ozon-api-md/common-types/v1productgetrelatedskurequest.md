# v1ProductGetRelatedSKURequest

## Top-level fields
- `v1ProductGetRelatedSKURequest` (top-level fields):
  - `sku`: `object`

## Full schema (JSON)
```json
{
  "required": [
    "sku"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "sku": {
      "description": "Список SKU.",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
