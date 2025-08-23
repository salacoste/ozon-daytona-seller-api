# v1GetDiscountTaskListResponse

## Top-level fields
- `v1GetDiscountTaskListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1GetDiscountTaskListResponseTask"
      },
      "description": "Список заявок."
    }
  }
}
```
