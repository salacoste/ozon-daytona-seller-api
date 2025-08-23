# v1ProductUpdateAttributesRequestAttribute

## Top-level fields
- `v1ProductUpdateAttributesRequestAttribute` (top-level fields):
  - `complex_id`: `integer`
  - `id`: `integer`
  - `values`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "complex_id": {
      "description": "Идентификатор характеристики, которая поддерживает вложенные свойства. У каждой из вложенных характеристик может быть несколько вариантов значений.",
      "type": "integer",
      "format": "int64"
    },
    "id": {
      "description": "Идентификатор характеристики.",
      "type": "integer",
      "format": "int64"
    },
    "values": {
      "description": "Массив вложенных значений характеристики.",
      "items": {
        "$ref": "#/components/schemas/v1ProductUpdateAttributesRequestValue"
      }
    }
  }
}
```
