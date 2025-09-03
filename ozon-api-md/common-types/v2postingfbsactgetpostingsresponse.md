# v2PostingFBSActGetPostingsResponse

## Top-level fields
- `v2PostingFBSActGetPostingsResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "type": "array",
      "description": "Информация об отправлениях.",
      "items": {
        "$ref": "#/components/schemas/v2PostingFBSActGetPostingsResult"
      }
    }
  }
}
```
