# CreateDocumentB2BSalesJSONReportResponseLegalSaleInvoice

## Top-level fields
- `CreateDocumentB2BSalesJSONReportResponseLegalSaleInvoice` (top-level fields):
  - `buyer_info` → `$ref` CreateDocumentB2BSalesJSONReportResponseBuyer
  - `currency`: `string`
  - `currency_code`: `integer`
  - `info` → `$ref` CreateDocumentB2BSalesJSONReportResponseInvoiceInfo
  - `offer_id`: `string`
  - `operations`: `array`
  - `product_name`: `string`
  - `sku`: `integer`
  - `unit_code`: `integer`
  - `unit_name`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "buyer_info": {
      "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseBuyer"
    },
    "currency": {
      "type": "string",
      "description": "Валюта."
    },
    "currency_code": {
      "type": "integer",
      "format": "int32",
      "description": "Код валюты."
    },
    "info": {
      "description": "Информация о счёте-фактуре.",
      "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseInvoiceInfo"
    },
    "offer_id": {
      "type": "string",
      "description": "Идентификатор товара в системе продавца — артикул."
    },
    "operations": {
      "type": "array",
      "description": "Список операций.",
      "items": {
        "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseLegalSaleOperation"
      }
    },
    "product_name": {
      "type": "string",
      "description": "Название товара."
    },
    "sku": {
      "type": "integer",
      "format": "int64",
      "description": "Идентификатор товара в системе Ozon — SKU."
    },
    "unit_code": {
      "type": "integer",
      "format": "int32",
      "description": "Код условного обозначения."
    },
    "unit_name": {
      "type": "string",
      "description": "Условное обозначение."
    }
  }
}
```
