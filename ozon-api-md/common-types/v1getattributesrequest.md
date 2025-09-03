# v1GetAttributesRequest

## Top-level fields
- `v1GetAttributesRequest` (top-level fields):
  - `description_category_id`: `integer`
  - `language` → `$ref` languageLanguage
  - `type_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "description_category_id",
    "type_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "description_category_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор категории. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree)."
    },
    "language": {
      "$ref": "#/components/schemas/languageLanguage"
    },
    "type_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор типа товара. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree)."
    }
  }
}
```
