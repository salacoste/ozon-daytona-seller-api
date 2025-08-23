# v1GetAttributesResponse

## Top-level fields
- `v1GetAttributesResponse` (top-level fields):
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
        "$ref": "#/components/schemas/v1GetAttributesResponseAttribute"
      }
    }
  }
}
```
