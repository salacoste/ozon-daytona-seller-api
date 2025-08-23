# GetProductInfoListResponseError

## Top-level fields
- `GetProductInfoListResponseError` (top-level fields):
  - `attribute_id`: `integer`
  - `code`: `string`
  - `field`: `string`
  - `level` → `$ref` ErrorErrorLevel
  - `state`: `string`
  - `texts` → `$ref` ErrorHumanTexts

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "attribute_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор характеристики."
    },
    "code": {
      "type": "string",
      "description": "Код ошибки."
    },
    "field": {
      "type": "string",
      "description": "Поле, в котором найдена ошибка."
    },
    "level": {
      "$ref": "#/components/schemas/ErrorErrorLevel"
    },
    "state": {
      "type": "string",
      "description": "Статус товара, в котором произошла ошибка."
    },
    "texts": {
      "$ref": "#/components/schemas/ErrorHumanTexts"
    }
  }
}
```
