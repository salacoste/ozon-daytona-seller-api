# v2MovePostingToAwaitingDeliveryRequest

## Top-level fields
- `v2MovePostingToAwaitingDeliveryRequest` (top-level fields):
  - `posting_number`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "posting_number"
  ],
  "properties": {
    "posting_number": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Идентификатор отправления. Максимальное количество в одном запросе — 100."
    }
  },
  "type": "object",
  "title": "object"
}
```
