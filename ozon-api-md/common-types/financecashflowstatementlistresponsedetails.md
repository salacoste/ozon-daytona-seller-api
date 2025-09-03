# FinanceCashFlowStatementListResponseDetails

Детализированная информация.

## Top-level fields
- `FinanceCashFlowStatementListResponseDetails` (top-level fields):
  - `begin_balance_amount`: `number`
  - `delivery` → `$ref` DetailsDeliveryDetails
  - `invoice_transfer`: `number`
  - `loan`: `number`
  - `payments` → `$ref` DetailsPayment
  - `period` → `$ref` v3FinanceCashFlowStatementListResponsePeriod
  - `return` → `$ref` DetailsReturnDetails
  - `rfbs` → `$ref` DetailsRfbsDetails
  - `services` → `$ref` DetailsService
  - `others` → `$ref` DetailsOthers
  - `end_balance_amount`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Детализированная информация.",
  "properties": {
    "begin_balance_amount": {
      "type": "number",
      "format": "double",
      "description": "Баланс на начало периода."
    },
    "delivery": {
      "$ref": "#/components/schemas/DetailsDeliveryDetails",
      "description": "Результат работы метода."
    },
    "invoice_transfer": {
      "type": "number",
      "format": "double",
      "description": "Сумма к выплате за период."
    },
    "loan": {
      "type": "number",
      "format": "double",
      "description": "Перевод по договорам займа."
    },
    "payments": {
      "description": "Выплачено в периоде.",
      "type": "array",
      "items": null,
      "$ref": "#/components/schemas/DetailsPayment"
    },
    "period": {
      "$ref": "#/components/schemas/v3FinanceCashFlowStatementListResponsePeriod",
      "description": "Период."
    },
    "return": {
      "$ref": "#/components/schemas/DetailsReturnDetails"
    },
    "rfbs": {
      "$ref": "#/components/schemas/DetailsRfbsDetails",
      "description": "Перечисления по схеме rFBS."
    },
    "services": {
      "$ref": "#/components/schemas/DetailsService",
      "description": "Услуги."
    },
    "others": {
      "$ref": "#/components/schemas/DetailsOthers",
      "description": "Компенсация и прочие начисления."
    },
    "end_balance_amount": {
      "type": "number",
      "format": "double",
      "description": "Баланс на конец периода."
    }
  }
}
```
