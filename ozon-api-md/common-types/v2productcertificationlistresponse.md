# v2ProductCertificationListResponse

## Top-level fields
- `v2ProductCertificationListResponse` (top-level fields):
  - `certification`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "certification": {
      "description": "Информация о сертифицируемых категориях.",
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/ProductCertificationListResponseCertificationv2"
      }
    },
    "total": {
      "description": "Всего категорий.",
      "type": "integer",
      "format": "int64"
    }
  }
}
```
