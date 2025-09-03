# v1GetTreeResponse

## Top-level fields
- `v1GetTreeResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "type": "array",
      "description": "Список категорий.",
      "items": {
        "$ref": "#/components/schemas/v1GetTreeResponseItem"
      }
    }
  }
}
```
