# v3GetProductInfoListResponse

## Top-level fields
- `v3GetProductInfoListResponse` (top-level fields):
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "description": "Массив данных.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v3GetProductInfoListResponseItem"
      }
    }
  }
}
```
