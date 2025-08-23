# v1ProductCertificateProductsListRequest

## Top-level fields
- `v1ProductCertificateProductsListRequest` (top-level fields):
  - `certificate_id`: `integer`
  - `product_status_code`: `string`
  - `page`: `integer`
  - `page_size`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "certificate_id": {
      "type": "integer",
      "format": "int32",
      "description": "Идентификатор сертификата."
    },
    "product_status_code": {
      "type": "string",
      "description": "Статус проверки товара при привязке к сертификату."
    },
    "page": {
      "type": "integer",
      "format": "int32",
      "description": "Номер страницы, с которой выводить список. Минимальное значение — 1."
    },
    "page_size": {
      "type": "integer",
      "format": "int32",
      "description": "Количество объектов на странице. Значение — от 1 до 1000."
    }
  },
  "required": [
    "certificate_id",
    "page",
    "page_size"
  ]
}
```
