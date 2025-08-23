# v3GetProductInfoListRequest

## Top-level fields
- `v3GetProductInfoListRequest` (top-level fields):
  - `offer_id`: `array`
  - `product_id`: `array`
  - `sku`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "offer_id": {
      "description": "Идентификатор товара в системе продавца — артикул.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — `product_id`.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    },
    "sku": {
      "description": "Идентификатор товара в системе Ozon — SKU.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64"
      }
    }
  }
}
```
