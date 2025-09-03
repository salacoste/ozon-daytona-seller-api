# financev3FinanceTransactionTotalsV3ResponseResult

Результаты запроса.

## Top-level fields
- `financev3FinanceTransactionTotalsV3ResponseResult` (top-level fields):
  - `accruals_for_sale`: `number`
  - `compensation_amount`: `number`
  - `money_transfer`: `number`
  - `others_amount`: `number`
  - `processing_and_delivery`: `number`
  - `refunds_and_cancellations`: `number`
  - `sale_commission`: `number`
  - `services_amount`: `number`

## Full schema (JSON)
```json
{
  "properties": {
    "accruals_for_sale": {
      "format": "double",
      "type": "number",
      "description": "Общая стоимость товаров и возвратов в заданный период."
    },
    "compensation_amount": {
      "format": "double",
      "type": "number",
      "description": "Компенсации."
    },
    "money_transfer": {
      "format": "double",
      "type": "number",
      "description": "Начисления за доставку и возвраты при работе по схеме «Доставка по выбору продавца»."
    },
    "others_amount": {
      "format": "double",
      "type": "number",
      "description": "Прочие начисления."
    },
    "processing_and_delivery": {
      "format": "double",
      "type": "number",
      "description": "Стоимость услуг обработки отправлений, сборки заказов, магистрали и последней мили, а также доставки до введения новых комиссий и тарифов с 1 февраля 2021 года.\n\nМагистраль — доставка товаров между кластерами.\n\nПоследняя миля — доставка товаров покупателю в пункт выдачи заказов, постамат или курьером.\n"
    },
    "refunds_and_cancellations": {
      "format": "double",
      "type": "number",
      "description": "Стоимость обратной магистрали, обработки возвратов, отмен и невыкупа товара, а также возвратов до введения новых комиссий и тарифов с 1 февраля 2021 года.\n\nМагистраль — доставка товаров между кластерами.\n\nПоследняя миля — доставка товаров покупателю в пункт выдачи заказов, постамат или курьером.\n"
    },
    "sale_commission": {
      "format": "double",
      "type": "number",
      "description": "Сумма комиссии, которая была удержана при продаже товара и возвращена при его возврате."
    },
    "services_amount": {
      "format": "double",
      "type": "number",
      "description": "Стоимость дополнительных услуг, не связанных напрямую с доставками и возвратами товаров. Например, продвижения или размещения товаров."
    }
  },
  "type": "object",
  "title": "object",
  "description": "Результаты запроса."
}
```
