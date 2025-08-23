# ProductCertificateProductsListResponseProduct

## Top-level fields
- `ProductCertificateProductsListResponseProduct` (top-level fields):
  - `product_id`: `integer`
  - `product_status_code`: `string`

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
    "product_status_code": {
      "type": "string",
      "description": "Статус обработки товара при привязке к сертификату."
    }
  }
}
```
