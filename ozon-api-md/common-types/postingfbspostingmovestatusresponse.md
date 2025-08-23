# postingFbsPostingMoveStatusResponse

## Top-level fields
- `postingFbsPostingMoveStatusResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "result": {
      "description": "Результат работы метода.",
      "items": {
        "$ref": "#/components/schemas/FbsPostingMoveStatusResponseMoveStatus"
      },
      "type": "array"
    }
  },
  "type": "object",
  "title": "object"
}
```
