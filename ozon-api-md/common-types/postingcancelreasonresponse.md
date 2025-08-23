# postingCancelReasonResponse

## Top-level fields
- `postingCancelReasonResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "description": "Результат запроса.",
      "items": {
        "$ref": "#/components/schemas/relatedPostingCancelReason"
      },
      "type": "array"
    }
  }
}
```
