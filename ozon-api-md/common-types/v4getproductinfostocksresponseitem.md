# v4GetProductInfoStocksResponseItem

## Top-level fields
- `v4GetProductInfoStocksResponseItem` (top-level fields):
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `stocks`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "offer_id": {
      "description": "Идентификатор товара в системе продавца — артикул.",
      "type": "string"
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — `product_id`.",
      "type": "integer",
      "format": "int64"
    },
    "stocks": {
      "description": "Информация об остатках.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/GetProductInfoStocksResponseStock"
      }
    }
  }
}
```
