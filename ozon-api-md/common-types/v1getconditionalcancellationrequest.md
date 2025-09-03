# v1GetConditionalCancellationRequest

## Top-level fields
- `v1GetConditionalCancellationRequest` (top-level fields):
  - `cancellation_id`: `integer`

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
    }
  },
  "required": [
    "cancellation_id"
  ]
}
```
