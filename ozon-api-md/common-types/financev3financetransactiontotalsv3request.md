# financev3FinanceTransactionTotalsV3Request

## Top-level fields
- `financev3FinanceTransactionTotalsV3Request` (top-level fields):
  - `date` → `$ref` FinanceTransactionTotalsV3RequestDate
  - `posting_number`: `string`
  - `transaction_type`: `string`

## Full schema (JSON)
```json
{
  "oneOf": [
    {
      "title": "posting_number",
      "required": [
        "posting_number"
      ]
    },
    {
      "title": "date",
      "required": [
        "date"
      ]
    }
  ],
  "properties": {
    "date": {
      "$ref": "#/components/schemas/FinanceTransactionTotalsV3RequestDate"
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "transaction_type": {
      "type": "string",
      "description": "Тип операции:\n - `all` — все,\n - `orders` — заказы,\n - `returns` — возвраты и отмены,\n - `services` — сервисные сборы,\n - `compensation` — компенсация,\n - `transferDelivery` — стоимость доставки,\n - `other` — прочее.\n"
    }
  },
  "type": "object",
  "title": "object"
}
```
