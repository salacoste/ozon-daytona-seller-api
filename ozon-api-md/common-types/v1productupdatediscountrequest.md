# v1ProductUpdateDiscountRequest

## Top-level fields
- `v1ProductUpdateDiscountRequest` (top-level fields):
  - `discount`: `integer`
  - `product_id`: `integer`

## Full schema (JSON)
```json
{
  "required": [
    "discount",
    "product_id"
  ],
  "type": "object",
  "title": "object",
  "properties": {
    "discount": {
      "type": "integer",
      "format": "int32",
      "description": "Размер скидки: от 3 до 99 процентов.\n"
    },
    "product_id": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе продавца — `product_id`."
    }
  }
}
```
