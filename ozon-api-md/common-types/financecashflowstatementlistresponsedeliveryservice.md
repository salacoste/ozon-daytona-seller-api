# FinanceCashFlowStatementListResponseDeliveryService

Детализация.

## Top-level fields
- `FinanceCashFlowStatementListResponseDeliveryService` (top-level fields):
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
      "description": "Название операции. Возможные значения:\n - `MarketplaceServiceItemDirectFlowLogisticSum` — логистика,\n - `MarketplaceServiceItemDirectFlowLogisticDC` — логистика РЦ,\n - `MarketplaceServiceItemDropoff` — обработка отправления Drop-off,\n - `MarketplaceServiceItemDirectFlowTrans` — магистраль,\n - `MarketplaceServiceDCFlowTrans` — магистраль РЦ,\n - `MarketplaceServiceItemFulfillment` — сборка заказа,\n - `MarketplaceServiceItemDelivToCustomer` — последняя миля.\n"
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Сумма по операции."
    }
  }
}
```
