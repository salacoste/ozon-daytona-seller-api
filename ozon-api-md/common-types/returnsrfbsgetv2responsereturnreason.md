# ReturnsRfbsGetV2ResponseReturnReason

Данные о причине возврата.

## Top-level fields
- `ReturnsRfbsGetV2ResponseReturnReason` (top-level fields):
  - `id`: `integer`
  - `is_defect`: `boolean`
  - `name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Данные о причине возврата.",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор причины."
    },
    "is_defect": {
      "type": "boolean",
      "description": "Признак, является ли товар бракованным."
    },
    "name": {
      "type": "string",
      "description": "Описание причины."
    }
  }
}
```
