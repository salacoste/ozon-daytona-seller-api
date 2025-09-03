# FinanceCashFlowStatementListResponseReturnService

Детализация.

## Top-level fields
- `FinanceCashFlowStatementListResponseReturnService` (top-level fields):
  - `name`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "type": "object",
  "title": "object",
  "description": "Детализация.",
  "properties": {
    "name": {
      "type": "string",
      "description": "Название операции. Возможные значения:\n - `MarketplaceServiceItemReturnAfterDelivToCustomer` — обработка возвратов,\n - `MarketplaceServiceItemReturnPartGoodsCustomer` — обработка частичного невыкупа,\n - `MarketplaceServiceItemReturnNotDelivToCustomer` — обработка отменённых и невостребованных товаров,\n - `MarketplaceServiceItemReturnFlowLogistic` — обратная логистика.\n"
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Сумма по операции."
    }
  }
}
```
