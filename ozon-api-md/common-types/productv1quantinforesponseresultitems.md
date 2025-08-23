# ProductV1QuantInfoResponseResultItems

## Top-level fields
- `ProductV1QuantInfoResponseResultItems` (top-level fields):
  - `offer_id`: `string`
  - `product_id`: `integer`
  - `quant_info` → `$ref` ProductV1QuantInfoResponseResultItemsQuantInfo

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
    "quant_info": {
      "$ref": "#/components/schemas/ProductV1QuantInfoResponseResultItemsQuantInfo"
    }
  }
}
```
