# productProductCertificateBindRequest

## Top-level fields
- `productProductCertificateBindRequest` (top-level fields):
  - `certificate_id`: `integer`
  - `product_id`: `array`

## Full schema (JSON)
```json
{
  "properties": {
    "certificate_id": {
      "format": "int64",
      "type": "integer",
      "description": "Идентификатор сертификата, который был присвоен при его загрузке."
    },
    "product_id": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Массив идентификаторов товаров, к которым относится этот сертификат."
    }
  },
  "type": "object",
  "title": "object"
}
```
