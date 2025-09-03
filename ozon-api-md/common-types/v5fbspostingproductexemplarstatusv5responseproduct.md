# v5FbsPostingProductExemplarStatusV5ResponseProduct

## Top-level fields
- `v5FbsPostingProductExemplarStatusV5ResponseProduct` (top-level fields):
  - `exemplars`: `array`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "exemplars": {
      "type": "array",
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/v5FbsPostingProductExemplarStatusV5ResponseProductExemplar"
      }
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
