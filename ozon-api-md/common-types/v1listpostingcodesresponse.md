# v1ListPostingCodesResponse

## Top-level fields
- `v1ListPostingCodesResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "result": {
      "description": "Список отправлений.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ListPostingCodesResponsePosting"
      }
    }
  }
}
```
