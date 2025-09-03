# v1CreateDocumentB2BSalesJSONReportResponse

## Top-level fields
- `v1CreateDocumentB2BSalesJSONReportResponse` (top-level fields):
  - `date_from`: `string`
  - `date_to`: `string`
  - `invoices`: `array`
  - `seller_info` → `$ref` CreateDocumentB2BSalesJSONReportResponseSellerInfo

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "date_from": {
      "type": "string",
      "description": "Дата начала отчётного периода в формате `YYYY-MM-DD`."
    },
    "date_to": {
      "type": "string",
      "description": "Дата окончания отчётного периода в формате `YYYY-MM-DD`."
    },
    "invoices": {
      "type": "array",
      "description": "Список счетов-фактур.",
      "items": {
        "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseLegalSaleInvoice"
      }
    },
    "seller_info": {
      "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseSellerInfo"
    }
  }
}
```
