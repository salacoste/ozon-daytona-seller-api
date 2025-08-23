# v1ProductFbsSplit

## Top-level fields
- `v1ProductFbsSplit` (top-level fields):
  - `product_id`: `integer`
  - `quantity`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "PostingFbsSplit",
  "properties": {
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "quantity": {
      "type": "integer",
      "format": "int64",
      "description": "Количество экземпляров."
    }
  },
  "required": [
    "product_id",
    "quantity"
  ]
}
```
