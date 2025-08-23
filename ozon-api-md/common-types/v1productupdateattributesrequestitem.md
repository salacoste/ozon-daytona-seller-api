# v1ProductUpdateAttributesRequestItem

## Top-level fields
- `v1ProductUpdateAttributesRequestItem` (top-level fields):
  - `attributes`: `object`
  - `offer_id`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "offer_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "attributes": {
      "description": "Характеристики товара.",
      "items": {
        "$ref": "#/components/schemas/v1ProductUpdateAttributesRequestAttribute"
      }
    },
    "offer_id": {
      "description": "Идентификатор товара в системе продавца — артикул.",
      "type": "string"
    }
  }
}
```
