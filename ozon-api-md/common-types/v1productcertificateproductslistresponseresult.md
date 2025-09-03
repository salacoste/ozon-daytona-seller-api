# v1ProductCertificateProductsListResponseResult

Товары, привязанные к сертификату.

## Top-level fields
- `v1ProductCertificateProductsListResponseResult` (top-level fields):
  - `items`: `array`
  - `count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ProductCertificateProductsListResponseProduct"
      },
      "description": "Список товаров."
    },
    "count": {
      "type": "integer",
      "format": "int64",
      "description": "Количество найденных товаров."
    }
  },
  "description": "Товары, привязанные к сертификату."
}
```
