# SearchAttributeValuesResponseValue

## Top-level fields
- `SearchAttributeValuesResponseValue` (top-level fields):
  - `id`: `integer`
  - `info`: `string`
  - `picture`: `string`
  - `value`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор значения характеристики."
    },
    "info": {
      "type": "string",
      "description": "Дополнительная информация."
    },
    "picture": {
      "type": "string",
      "description": "Ссылка на изображение."
    },
    "value": {
      "type": "string",
      "description": "Значение характеристики товара."
    }
  }
}
```
