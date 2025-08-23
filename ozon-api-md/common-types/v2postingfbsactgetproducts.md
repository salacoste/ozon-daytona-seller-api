# v2PostingFBSActGetProducts

## Top-level fields
- `v2PostingFBSActGetProducts` (top-level fields):
  - `name`: `string`
  - `offer_id`: `string`
  - `price`: `string`
  - `quantity`: `integer`
  - `sku`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
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
      "type": "integer",
      "format": "int32",
      "description": "Количество товара в отправлении."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    }
  }
}
```
