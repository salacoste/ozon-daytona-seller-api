# FbsPostingProductExemplarSetV6RequestProducts

## Top-level fields
- `FbsPostingProductExemplarSetV6RequestProducts` (top-level fields):
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
        "$ref": "#/components/schemas/FbsPostingProductExemplarSetV6RequestExemplars"
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
