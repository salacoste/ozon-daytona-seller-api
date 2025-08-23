# v3ImportProductsRequestAttribute

## Top-level fields
- `v3ImportProductsRequestAttribute` (top-level fields):
  - `complex_id`: `integer`
  - `id`: `integer`
  - `values`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "complex_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор характеристики, которая поддерживает вложенные свойства. Например, у характеристики «Процессор» есть вложенные характеристики «Производитель», «L2 Cache» и другие. У каждой из вложенных характеристик может быть несколько вариантов значений."
    },
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор характеристики."
    },
    "values": {
      "type": "array",
      "description": "Массив вложенных значений характеристики.",
      "items": {
        "$ref": "#/components/schemas/v3ImportProductsRequestDictionaryValue"
      }
    }
  }
}
```
