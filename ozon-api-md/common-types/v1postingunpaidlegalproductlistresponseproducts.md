# v1PostingUnpaidLegalProductListResponseProducts

## Top-level fields
- `v1PostingUnpaidLegalProductListResponseProducts` (top-level fields):
  - `product_id`: `integer`
  - `offer_id`: `string`
  - `quantity`: `integer`
  - `name`: `string`
  - `image_url`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество экземпляров."
    },
    "name": {
      "type": "string",
      "description": "Название товара."
    },
    "image_url": {
      "type": "string",
      "description": "Ссылка на изображение товара."
    }
  }
}
```
