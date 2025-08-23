# v1GetAttributeValuesRequest

## Top-level fields
- `v1GetAttributeValuesRequest` (top-level fields):
  - `attribute_id`: `integer`
  - `description_category_id`: `integer`
  - `language` → `$ref` languageLanguage
  - `last_value_id`: `integer`
  - `limit`: `integer`
  - `type_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "attribute_id",
    "description_category_id",
    "limit",
    "type_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "attribute_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор характеристики. Можно получить с помощью метода [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes)."
    },
    "description_category_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор категории. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree)."
    },
    "language": {
      "$ref": "#/components/schemas/languageLanguage"
    },
    "last_value_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор справочника, с которого нужно начать ответ. Если `last_value_id` — 10, то в ответе будут справочники, начиная с одиннадцатого."
    },
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество значений в ответе:\n- максимум — 2000,\n- минимум — 1.\n"
    },
    "type_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор типа товара. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree)."
    }
  }
}
```
