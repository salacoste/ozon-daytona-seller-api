# v1GetRealizationReportPostingResponseRow

## Top-level fields
- `v1GetRealizationReportPostingResponseRow` (top-level fields):
  - `commission_ratio`: `number`
  - `delivery_commission` → `$ref` RowItemCommission
  - `item` → `$ref` RowItem
  - `return_commission` → `$ref` RowItemCommissionReturn
  - `row_number`: `integer`
  - `seller_price_per_instance`: `number`
  - `order` → `$ref` RowItemOrder
  - `legal_entity_document` → `$ref` RowItemLegalEntityDocument

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "commission_ratio": {
      "type": "number",
      "format": "double",
      "description": "Доля комиссии за продажу по категории."
    },
    "delivery_commission": {
      "$ref": "#/components/schemas/RowItemCommission"
    },
    "item": {
      "$ref": "#/components/schemas/RowItem"
    },
    "return_commission": {
      "$ref": "#/components/schemas/RowItemCommissionReturn"
    },
    "row_number": {
      "type": "integer",
      "format": "int32",
      "description": "Номер строки в отчёте."
    },
    "seller_price_per_instance": {
      "type": "number",
      "format": "double",
      "description": "Цена продавца с учётом скидки."
    },
    "order": {
      "$ref": "#/components/schemas/RowItemOrder"
    },
    "legal_entity_document": {
      "$ref": "#/components/schemas/RowItemLegalEntityDocument"
    }
  }
}
```
