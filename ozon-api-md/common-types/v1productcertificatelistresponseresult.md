# v1ProductCertificateListResponseResult

Список сертификатов.

## Top-level fields
- `v1ProductCertificateListResponseResult` (top-level fields):
  - `certificates`: `array`
  - `page_count`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "certificates": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1Certificate"
      },
      "description": "Информация о сертификате."
    },
    "page_count": {
      "type": "integer",
      "format": "int32",
      "description": "Количество страниц."
    }
  },
  "description": "Список сертификатов."
}
```
