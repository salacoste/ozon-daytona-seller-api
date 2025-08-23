# v1ProductCertificateUnbindRequest

## Top-level fields
- `v1ProductCertificateUnbindRequest` (top-level fields):
  - `certificate_id`: `integer`
  - `product_id`: `array`

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
    "product_id": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "int64",
        "description": "Идентификатор товара в системе продавца — `product_id`."
      },
      "description": "Список идентификаторов товара, которые нужно отвязать от сертификата."
    }
  },
  "required": [
    "certificate_id",
    "product_id"
  ]
}
```
