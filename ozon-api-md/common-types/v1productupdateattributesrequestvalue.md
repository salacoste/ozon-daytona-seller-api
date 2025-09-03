# v1ProductUpdateAttributesRequestValue

## Top-level fields
- `v1ProductUpdateAttributesRequestValue` (top-level fields):
  - `dictionary_value_id`: `integer`
  - `value`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "dictionary_value_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор характеристики в словаре."
    },
    "value": {
      "type": "string",
      "description": "Значение характеристики товара."
    }
  }
}
```
