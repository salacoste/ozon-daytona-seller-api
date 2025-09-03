# v2ConditionalCancellationMoveV2Request

## Top-level fields
- `v2ConditionalCancellationMoveV2Request` (top-level fields):
  - `cancellation_id`: `integer`
  - `comment`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "cancellation_id"
  ],
  "type": "object",
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
  }
}
```
