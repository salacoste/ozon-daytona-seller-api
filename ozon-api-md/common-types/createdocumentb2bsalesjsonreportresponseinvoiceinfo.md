# CreateDocumentB2BSalesJSONReportResponseInvoiceInfo

Информация о счёте-фактуре.

## Top-level fields
- `CreateDocumentB2BSalesJSONReportResponseInvoiceInfo` (top-level fields):
  - `date`: `string`
  - `number`: `string`
  - `status`: `string`
  - `type` → `$ref` CreateDocumentB2BSalesJSONReportResponseInvoiceInfoType

## Full schema (JSON)
```json
{
  "type": "object",
  "description": "Информация о счёте-фактуре.",
  "properties": {
    "date": {
      "type": "string",
      "description": "Дата счёта-фактуры продавца в формате `YYYY-MM-DD`."
    },
    "number": {
      "type": "string",
      "description": "Номер счёта-фактуры продавца."
    },
    "status": {
      "type": "string",
      "description": "Статус УКД или УПД."
    },
    "type": {
      "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseInvoiceInfoType"
    }
  }
}
```
