# v1SearchAttributeValuesRequest

## Top-level fields
- `v1SearchAttributeValuesRequest` (top-level fields):
  - `attribute_id`: `integer`
  - `description_category_id`: `integer`
  - `limit`: `integer`
  - `type_id`: `integer`
  - `value`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "attribute_id",
    "description_category_id",
    "limit",
    "type_id",
    "value"
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
    "limit": {
      "type": "integer",
      "format": "int64",
      "description": "Количество значений в ответе:\n- максимум — 100,\n- минимум — 1.\n"
    },
    "type_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор типа товара. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree)."
    },
    "value": {
      "type": "string",
      "description": "Значение, по которому система будет искать справочные значения. Минимум — 2 символа."
    }
  }
}
```
