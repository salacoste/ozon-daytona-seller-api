# productImportProductsBySKURequest

## Top-level fields
- `productImportProductsBySKURequest` (top-level fields):
  - `items`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "items": {
      "maxItems": 1000,
      "items": {
        "$ref": "#/components/schemas/productImportProductsBySKURequestItem"
      },
      "type": "array",
      "description": "Информация о товарах."
    }
  },
  "type": "object",
  "title": "object"
}
```
