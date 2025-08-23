# fbsv4SetProductExemplarRequestProduct

## Top-level fields
- `fbsv4SetProductExemplarRequestProduct` (top-level fields):
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
        "$ref": "#/components/schemas/fbsv4SetProductExemplarRequestProductExemplar"
      }
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор FBS товара в системе Ozon — SKU."
    }
  }
}
```
