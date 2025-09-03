# BrandCompanyCertificationListResponseBrandCertification

## Top-level fields
- `BrandCompanyCertificationListResponseBrandCertification` (top-level fields):
  - `brand_name`: `string`
  - `has_certificate`: `boolean`

## Full schema (JSON)
```json
{
  "properties": {
    "brand_name": {
      "type": "string",
      "description": "Название бренда."
    },
    "has_certificate": {
      "type": "boolean",
      "description": "Признак, что требуется сертификат:\n- `true` — требуется сертификат;\n- `false` — сертификат не нужен.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
