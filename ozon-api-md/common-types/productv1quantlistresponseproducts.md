# ProductV1QuantListResponseProducts

## Top-level fields
- `ProductV1QuantListResponseProducts` (top-level fields):
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `quants`: `object`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "quants": {
      "description": "Список квантов товара.",
      "items": {
        "$ref": "#/components/schemas/ProductV1QuantListResponseProductsQuants"
      }
    }
  }
}
```
