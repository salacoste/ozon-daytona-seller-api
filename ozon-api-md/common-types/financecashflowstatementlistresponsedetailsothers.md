# FinanceCashFlowStatementListResponseDetailsOthers

Детализация.

## Top-level fields
- `FinanceCashFlowStatementListResponseDetailsOthers` (top-level fields):
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
      "description": "Название операции. Возможные значения:\n - `MarketplaceRedistributionOfAcquiringOperation` — оплата эквайринга,\n - `MarketplaceSellerCompensationLossOfGoodsOperation` — компенсация за уничтоженный товар,\n - `MarketplaceSellerCorrectionOperation` — корректировка стоимости услуг,\n - `OperationCorrectionSeller` — инвентаризация взаиморасчётов,\n - `OperationMarketplaceWithHoldingForUndeliverableGoods` — компенсация за недовложение товаров,\n - `OperationClaim` — начисления по претензиям.\n"
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Сумма по операции."
    }
  }
}
```
