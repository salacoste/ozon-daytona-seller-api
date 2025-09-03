# v1GetTreeResponseItem

## Top-level fields
- `v1GetTreeResponseItem` (top-level fields):
  - `description_category_id`: `integer`
  - `category_name`: `string`
  - `children`: `array`
  - `disabled`: `boolean`
  - `type_id`: `integer`
  - `type_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "description_category_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор категории."
    },
    "category_name": {
      "type": "string",
      "description": "Название категории."
    },
    "children": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1GetTreeResponseItem"
      },
      "description": "Дерево подкатегорий."
    },
    "disabled": {
      "type": "boolean",
      "description": "`true`, если в категории нельзя создавать товары. `false`, если можно.\n"
    },
    "type_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор типа товара."
    },
    "type_name": {
      "type": "string",
      "description": "Название типа товара."
    }
  }
}
```
