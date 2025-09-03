# FinanceCashFlowStatementListResponseCashFlow

## Top-level fields
- `FinanceCashFlowStatementListResponseCashFlow` (top-level fields):
  - `period` → `$ref` v3FinanceCashFlowStatementListResponsePeriod
  - `orders_amount`: `number`
  - `returns_amount`: `number`
  - `commission_amount`: `number`
  - `services_amount`: `number`
  - `item_delivery_and_return_amount`: `number`
  - `currency_code`: `string`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "properties": {
    "period": {
      "$ref": "#/components/schemas/v3FinanceCashFlowStatementListResponsePeriod"
    },
    "orders_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма цен реализованных товаров."
    },
    "returns_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма цен возвращённых товаров."
    },
    "commission_amount": {
      "type": "number",
      "format": "double",
      "description": "Комиссия Ozon за реализацию товаров."
    },
    "services_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма дополнительных услуг."
    },
    "item_delivery_and_return_amount": {
      "type": "number",
      "format": "double",
      "description": "Сумма услуг логистики."
    },
    "currency_code": {
      "type": "string",
      "description": "Код валюты, в которой рассчитываются комиссии."
    }
  }
}
```
