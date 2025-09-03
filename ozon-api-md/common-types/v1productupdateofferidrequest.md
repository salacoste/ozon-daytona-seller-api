# v1ProductUpdateOfferIdRequest

## Top-level fields
- `v1ProductUpdateOfferIdRequest` (top-level fields):
  - `update_offer_id`: `object`

## Full schema (JSON)
```json
{
  "required": [
    "update_offer_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "update_offer_id": {
      "description": "Список пар с новыми и старыми значениями артикулов.",
      "items": {
        "$ref": "#/components/schemas/ProductUpdateOfferIdRequestUpdateOfferId"
      }
    }
  }
}
```
