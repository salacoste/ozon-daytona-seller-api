# v1ConditionalCancellationMoveRequest

## Top-level fields
- `v1ConditionalCancellationMoveRequest` (top-level fields):
  - `cancellation_id`: `integer`
  - `comment`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "cancellation_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор заявки на отмену."
    },
    "comment": {
      "type": "string",
      "description": "Комментарий."
    }
  },
  "required": [
    "cancellation_id"
  ]
}
```
