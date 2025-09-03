# v2PostingFBSActListResponse

## Top-level fields
- `v2PostingFBSActListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "type": "array",
      "description": "Результат запроса.",
      "items": {
        "$ref": "#/components/schemas/v2PostingFBSActListResult"
      }
    }
  }
}
```
