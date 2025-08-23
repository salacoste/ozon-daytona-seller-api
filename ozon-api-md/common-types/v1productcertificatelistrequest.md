# v1ProductCertificateListRequest

## Top-level fields
- `v1ProductCertificateListRequest` (top-level fields):
  - `offer_id`: `string`
  - `status`: `string`
  - `type`: `string`
  - `page`: `integer`
  - `page_size`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул, привязанный к сертификату. Передайте параметр, если нужны сертификаты, к которым привязаны определённые товары."
    },
    "status": {
      "type": "string",
      "description": "Статус сертификата. Передайте параметр, если нужны сертификаты с определённым статусом."
    },
    "type": {
      "type": "string",
      "description": "Тип сертификата. Передайте параметр, если нужны сертификаты с определённым типом."
    },
    "page": {
      "type": "integer",
      "format": "int32",
      "description": "Страница, с которой следует выводить список. Минимальное значение — 1."
    },
    "page_size": {
      "type": "integer",
      "format": "int32",
      "description": "Количество объектов на странице. Значение — от 1 до 1000."
    }
  },
  "required": [
    "page",
    "page_size"
  ]
}
```
