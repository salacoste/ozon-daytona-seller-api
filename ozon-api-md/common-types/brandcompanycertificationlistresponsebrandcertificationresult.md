# BrandCompanyCertificationListResponseBrandCertificationResult

Результат запроса.

## Top-level fields
- `BrandCompanyCertificationListResponseBrandCertificationResult` (top-level fields):
  - `brand_certification`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "brand_certification": {
      "items": {
        "$ref": "#/components/schemas/BrandCompanyCertificationListResponseBrandCertification"
      },
      "type": "array",
      "description": "Информация о сертифицируемых брендах."
    },
    "total": {
      "format": "int64",
      "type": "integer",
      "description": "Общее количество брендов."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
