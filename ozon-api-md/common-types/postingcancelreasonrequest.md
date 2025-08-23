# postingCancelReasonRequest

## Top-level fields
- `postingCancelReasonRequest` (top-level fields):
  - `related_posting_numbers`: `array`

## Full schema (JSON)
```json
{
  "required": [
    "related_posting_numbers"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "related_posting_numbers": {
      "type": "array",
      "description": "Номера отправлений.",
      "items": {
        "type": "string"
      }
    }
  }
}
```
