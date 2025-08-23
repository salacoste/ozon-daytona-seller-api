# v1ProductCertificateStatusListResponse

## Top-level fields
- `v1ProductCertificateStatusListResponse` (top-level fields):
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
        "$ref": "#/components/schemas/v1StatusCodeNamePairStatuses"
      },
      "description": "Список возможных статусов сертификатов."
    }
  }
}
```
