# GetProductAttributesV4ResponseAttribute

## Top-level fields
- `GetProductAttributesV4ResponseAttribute` (top-level fields):
  - `id`: `integer`
  - `complex_id`: `integer`
  - `values`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор характеристики."
    },
    "complex_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор характеристики, которая поддерживает вложенные свойства. Например, у характеристики «Процессор» есть вложенные характеристики «Производитель» и «L2 Cache». У каждой из вложенных характеристик может быть несколько вариантов значений."
    },
    "values": {
      "items": {
        "$ref": "#/components/schemas/GetProductAttributesV3ResponseDictionaryValue"
      },
      "type": "array",
      "description": "Массив значений характеристик."
    }
  },
  "type": "object",
  "title": "object"
}
```
