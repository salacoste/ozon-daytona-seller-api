# GetReturnsListResponseVisual

Информация о статусе возврата.

## Top-level fields
- `GetReturnsListResponseVisual` (top-level fields):
  - `status` → `$ref` GetReturnsListResponseVisualStatus
  - `change_moment`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Информация о статусе возврата.",
  "properties": {
    "status": {
      "$ref": "#/components/schemas/GetReturnsListResponseVisualStatus"
    },
    "change_moment": {
      "type": "string",
      "description": "Дата изменения статуса возврата.",
      "format": "date-time"
    }
  }
}
```
