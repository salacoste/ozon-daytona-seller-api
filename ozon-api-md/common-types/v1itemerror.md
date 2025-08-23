# v1ItemError

## Top-level fields
- `v1ItemError` (top-level fields):
  - `code`: `string`
  - `message`: `string`
  - `state`: `string`
  - `level`: `string`
  - `description`: `string`
  - `field`: `string`
  - `attribute_id`: `integer`
  - `attribute_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Код ошибки."
    },
    "message": {
      "type": "string",
      "description": "Техническое описание ошибки."
    },
    "state": {
      "type": "string",
      "description": "Состояние товара, в котором произошла ошибка."
    },
    "level": {
      "type": "string",
      "description": "Уровень ошибки."
    },
    "description": {
      "type": "string",
      "description": "Описание ошибки."
    },
    "field": {
      "type": "string",
      "description": "Поле, в котором произошла ошибка."
    },
    "attribute_id": {
      "type": "integer",
      "format": "int64",
      "description": "Атрибут, в котором произошла ошибка."
    },
    "attribute_name": {
      "type": "string",
      "description": "Название атрибута, в котором произошла ошибка."
    }
  }
}
```
