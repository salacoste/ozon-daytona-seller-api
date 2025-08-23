# v2FboPostingListResponse

## Top-level fields
- `v2FboPostingListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "result": {
      "items": {
        "$ref": "#/components/schemas/v2FboPosting"
      },
      "type": "array",
      "description": "Массив отправлений."
    }
  },
  "type": "object",
  "title": "object"
}
```
