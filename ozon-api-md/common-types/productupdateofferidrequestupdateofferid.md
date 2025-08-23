# ProductUpdateOfferIdRequestUpdateOfferId

## Top-level fields
- `ProductUpdateOfferIdRequestUpdateOfferId` (top-level fields):
  - `new_offer_id`: `string`
  - `offer_id`: `string`

## Full schema (JSON)
```json
{
  "required": [
    "new_offer_id",
    "offer_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "new_offer_id": {
      "type": "string",
      "description": "Новый артикул.\n\nМаксимальная длина строки — 50 символов.\n"
    },
    "offer_id": {
      "type": "string",
      "description": "Старый артикул."
    }
  }
}
```
