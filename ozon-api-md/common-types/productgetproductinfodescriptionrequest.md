# productGetProductInfoDescriptionRequest

## Top-level fields
- `productGetProductInfoDescriptionRequest` (top-level fields):
  - `offer_id`: `string`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "oneOf": [
    {
      "title": "offer_id",
      "required": [
        "offer_id"
      ]
    },
    {
      "title": "product_id",
      "required": [
        "product_id"
      ]
    }
  ],
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "product_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  },
  "type": "object",
  "title": "object"
}
```
