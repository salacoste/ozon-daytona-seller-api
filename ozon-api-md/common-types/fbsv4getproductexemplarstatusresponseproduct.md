# fbsv4GetProductExemplarStatusResponseProduct

## Top-level fields
- `fbsv4GetProductExemplarStatusResponseProduct` (top-level fields):
  - `exemplars`: `object`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "exemplars": {
      "description": "Информация об экземплярах.",
      "items": {
        "$ref": "#/components/schemas/fbsv4GetProductExemplarStatusResponseProductExemplar"
      }
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  }
}
```
