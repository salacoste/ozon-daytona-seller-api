# reportCreateCompanyProductsReportRequest

## Top-level fields
- `reportCreateCompanyProductsReportRequest` (top-level fields):
  - `language` → `$ref` reportLanguage
  - `offer_id`: `array`
  - `search`: `string`
  - `sku`: `array`
  - `visibility` → `$ref` reportCreateCompanyProductsReportRequestVisibility

## Full schema (JSON)
```json
{
  "properties": {
    "language": {
      "$ref": "#/components/schemas/reportLanguage"
    },
    "offer_id": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "search": {
      "type": "string",
      "description": "Поиск по содержанию записи, проверяет наличие."
    },
    "sku": {
      "items": {
        "format": "int64",
        "type": "integer"
      },
      "type": "array",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "visibility": {
      "$ref": "#/components/schemas/reportCreateCompanyProductsReportRequestVisibility"
    }
  },
  "title": "CreateCompanyProductsReport",
  "type": "object"
}
```
