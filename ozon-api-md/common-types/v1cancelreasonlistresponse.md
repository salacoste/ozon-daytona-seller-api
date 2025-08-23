# v1CancelReasonListResponse

## Top-level fields
- `v1CancelReasonListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "description": "Результат работы метода.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/CancelReasonListResponseCancelReason"
      }
    }
  }
}
```
