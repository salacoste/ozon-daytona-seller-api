# postingCancelReasonListResponse

## Top-level fields
- `postingCancelReasonListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "result": {
      "description": "Результат работы метода.",
      "items": {
        "$ref": "#/components/schemas/postingCancelReason"
      },
      "type": "array"
    }
  },
  "type": "object",
  "title": "object"
}
```
