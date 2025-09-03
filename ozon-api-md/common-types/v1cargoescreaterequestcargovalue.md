# v1CargoesCreateRequestCargoValue

Информация о грузоместе.

## Top-level fields
- `v1CargoesCreateRequestCargoValue` (top-level fields):
  - `items`: `array`
  - `type` → `$ref` ValueCargoType

## Full schema (JSON)
```json
{
  "required": [
    "type"
  ],
  "type": "object",
  "description": "Информация о грузоместе.",
  "properties": {
    "items": {
      "maxItems": 5000,
      "description": "Информация о товарах в грузоместе.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ValueItem"
      }
    },
    "type": {
      "$ref": "#/components/schemas/ValueCargoType"
    }
  }
}
```
