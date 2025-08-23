# v1ProductCertificateProductStatusListResponse

## Top-level fields
- `v1ProductCertificateProductStatusListResponse` (top-level fields):
  - `result`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "result": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v1StatusCodeNamePair"
      },
      "description": "Список статусов товаров."
    }
  }
}
```
