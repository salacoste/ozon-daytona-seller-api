# postingv4FbsPostingProductExemplarValidateRequestProduct

## Top-level fields
- `postingv4FbsPostingProductExemplarValidateRequestProduct` (top-level fields):
  - `exemplars`: `object`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "product_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "exemplars": {
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/postingv4FbsPostingProductExemplarValidateRequestProductExemplar"
      }
    },
    "product_id": {
      "description": "Идентификатор товара в системе продавца — `product_id`.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
