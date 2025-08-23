# v2FbsPostingProduct

## Top-level fields
- `v2FbsPostingProduct` (top-level fields):
  - `name`: `string`
  - `offer_id`: `string`
  - `price`: `string`
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "price": {
      "type": "string",
      "description": "Цена товара."
    },
    "quantity": {
      "format": "int64",
      "type": "integer",
      "description": "Количество товара в отправлении."
    },
    "sku": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  },
  "type": "object",
  "title": "object"
}
```
