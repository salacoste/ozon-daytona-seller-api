# v1GetProductInfoDiscountedResponse

## Top-level fields
- `v1GetProductInfoDiscountedResponse` (top-level fields):
  - `items`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "description": "Информация об уценке и основном товаре.",
      "items": {
        "$ref": "#/components/schemas/v1GetProductInfoDiscountedResponseItem"
      }
    }
  }
}
```
