# CreateDocumentB2BSalesJSONReportResponseLegalSaleOperation

## Top-level fields
- `CreateDocumentB2BSalesJSONReportResponseLegalSaleOperation` (top-level fields):
  - `amount`: `number`
  - `cost_without_vat`: `number`
  - `date`: `string`
  - `gtd_number`: `string`
  - `origin_country`: `string`
  - `posting_number`: `string`
  - `price`: `number`
  - `quantity`: `integer`
  - `rnpt_number`: `string`
  - `type` → `$ref` CreateDocumentB2BSalesJSONReportResponseLegalSaleOperationType
  - `vat_amount`: `number`
  - `vat_rate`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "properties": {
    "amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма реализации или возврата."
    },
    "cost_without_vat": {
      "type": "number",
      "format": "double",
      "description": "Стоимость товара без НДС."
    },
    "date": {
      "type": "string",
      "description": "Дата операции в формате `YYYY-MM-DD`."
    },
    "gtd_number": {
      "type": "string",
      "description": "Номер ГТД."
    },
    "origin_country": {
      "type": "string",
      "description": "Страна происхождения товара."
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Цена реализации или возврата в рублях."
    },
    "quantity": {
      "type": "integer",
      "format": "int32",
      "description": "Количество товаров."
    },
    "rnpt_number": {
      "type": "string",
      "description": "РНПТ."
    },
    "type": {
      "$ref": "#/components/schemas/CreateDocumentB2BSalesJSONReportResponseLegalSaleOperationType"
    },
    "vat_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма НДС, которая взимается с покупателя."
    },
    "vat_rate": {
      "type": "number",
      "format": "double",
      "description": "Ставка НДС."
    }
  }
}
```
