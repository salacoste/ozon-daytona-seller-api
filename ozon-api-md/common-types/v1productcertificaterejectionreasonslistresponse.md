# v1ProductCertificateRejectionReasonsListResponse

## Top-level fields
- `v1ProductCertificateRejectionReasonsListResponse` (top-level fields):
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
        "$ref": "#/components/schemas/v1StatusCodeNamePairRejection"
      },
      "description": "Причины отклонения сертификата."
    }
  }
}
```
