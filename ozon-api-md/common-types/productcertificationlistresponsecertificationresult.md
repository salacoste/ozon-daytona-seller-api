# ProductCertificationListResponseCertificationResult

Результат запроса.

## Top-level fields
- `ProductCertificationListResponseCertificationResult` (top-level fields):
  - `certification`: `array`
  - `total`: `integer`

## Full schema (JSON)
```json
{
  "properties": {
    "certification": {
      "items": {
        "$ref": "#/components/schemas/ProductCertificationListResponseCertification"
      },
      "type": "array",
      "description": "Информация о сертифицируемых категориях."
    },
    "total": {
      "format": "int64",
      "type": "integer",
      "description": "Всего категорий."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результат запроса."
}
```
