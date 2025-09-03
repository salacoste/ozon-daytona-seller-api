# DetailsServices

Плата за обработку и доставку.

## Top-level fields
- `DetailsServices` (top-level fields):
  - `total`: `number`
  - `items` → `$ref` FinanceCashFlowStatementListResponseDeliveryService

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Плата за обработку и доставку.",
  "properties": {
    "total": {
      "description": "Общая сумма.",
      "type": "number",
      "format": "double"
    },
    "items": {
      "description": "Детализация.",
      "type": "array",
      "items": null,
      "$ref": "#/components/schemas/FinanceCashFlowStatementListResponseDeliveryService"
    }
  }
}
```
