# v2ProductCertificateAccordanceTypesResponseResult

Список типов соответствия требованиям.

## Top-level fields
- `v2ProductCertificateAccordanceTypesResponseResult` (top-level fields):
  - `base`: `array`
  - `hazard`: `array`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "base": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v2ProductCertificateAccordanceTypesResponseType"
      },
      "description": "Основные типы соответствия требованиям."
    },
    "hazard": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/v2ProductCertificateAccordanceTypesResponseType"
      },
      "description": "Типов соответствия требованиям, относящиеся к опасным товарам."
    }
  },
  "description": "Список типов соответствия требованиям."
}
```
