# ErrorHumanTexts

Описание ошибок.

## Top-level fields
- `ErrorHumanTexts` (top-level fields):
  - `attribute_name`: `string`
  - `description`: `string`
  - `hint_code`: `string`
  - `message`: `string`
  - `params`: `array`
  - `short_description`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Описание ошибок.",
  "properties": {
    "attribute_name": {
      "type": "string",
      "description": "Название атрибута, в котором произошла ошибка."
    },
    "description": {
      "type": "string",
      "description": "Описание ошибки."
    },
    "hint_code": {
      "description": "Код ошибки в системе Ozon.",
      "type": "string"
    },
    "message": {
      "description": "Текст ошибки.",
      "type": "string"
    },
    "params": {
      "description": "В каких параметрах допущена ошибка.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/HumanTextsParam"
      }
    },
    "short_description": {
      "description": "Краткое описание ошибки.",
      "type": "string"
    }
  }
}
```
