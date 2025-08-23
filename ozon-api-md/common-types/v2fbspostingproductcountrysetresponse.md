# v2FbsPostingProductCountrySetResponse

## Top-level fields
- `v2FbsPostingProductCountrySetResponse` (top-level fields):
  - `product_id`: `integer`
  - `is_gtd_needed`: `boolean`

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
    "is_gtd_needed": {
      "type": "boolean",
      "description": "Признак того, что необходимо передать номер грузовой таможенной декларации (ГТД) для продукта и отправления."
    }
  }
}
```
