# v2ProductInfoPicturesResponse

## Top-level fields
- `v2ProductInfoPicturesResponse` (top-level fields):
  - `items`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "type": "array",
      "description": "Изображения товаров.",
      "items": {
        "$ref": "#/components/schemas/v2ProductInfoPicturesResponseItem"
      }
    }
  }
}
```
