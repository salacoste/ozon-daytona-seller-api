# ReturnsRfbsGetV2ResponseRejectionReason

## Top-level fields
- `ReturnsRfbsGetV2ResponseRejectionReason` (top-level fields):
  - `hint`: `string`
  - `id`: `integer`
  - `is_comment_required`: `boolean`
  - `name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "hint": {
      "type": "string",
      "description": "Подсказка о дальнейших действиях с возвратом."
    },
    "id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор причины."
    },
    "is_comment_required": {
      "type": "boolean",
      "description": "Признак, нужно ли прикладывать комментарий."
    },
    "name": {
      "type": "string",
      "description": "Описание причины."
    }
  }
}
```
