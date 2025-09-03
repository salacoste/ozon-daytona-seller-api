# FinanceTransactionListV3RequestFilter

Фильтр.

## Top-level fields
- `FinanceTransactionListV3RequestFilter` (top-level fields):
  - `date` → `$ref` FilterPeriod
  - `operation_type`: `array`
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
      "$ref": "#/components/schemas/FilterPeriod"
    },
    "operation_type": {
      "items": {
        "type": "string"
      },
      "type": "array",
      "description": "Тип операции:\n  - `ClientReturnAgentOperation` — получение возврата, отмены, невыкупа от покупателя;\n  - `MarketplaceMarketingActionCostOperation` — услуги продвижения товаров;\n  - `MarketplaceSaleReviewsOperation` — приобретение отзывов на платформе;\n  - `MarketplaceSellerCompensationOperation` — прочие компенсации;\n  - `OperationAgentDeliveredToCustomer` — доставка покупателю;\n  - `OperationAgentDeliveredToCustomerCanceled` — доставка покупателю — исправленное начисление;\n  - `OperationAgentStornoDeliveredToCustomer` — доставка покупателю — отмена начисления;\n  - `OperationClaim` — начисление по претензии;\n  - `OperationCorrectionSeller` — инвентаризация взаиморасчетов;\n  - `OperationDefectiveWriteOff` — компенсация за повреждённый на складе товар;\n  - `OperationItemReturn` — доставка и обработка возврата, отмены, невыкупа;\n  - `OperationLackWriteOff` — компенсация за утерянный на складе товар;\n  - `OperationMarketplaceCrossDockServiceWriteOff` — доставка товаров на склад Ozon (кросс-докинг);\n  - `OperationMarketplaceServiceStorage` — услуга размещения товаров на складе;\n  - `OperationSetOff` — взаимозачёт с другими договорами контрагента;\n  - `MarketplaceSellerReexposureDeliveryReturnOperation` — перечисление за доставку от покупателя;\n  - `OperationReturnGoodsFBSofRMS` — доставка и обработка возврата, отмены, невыкупа;\n  - `ReturnAgentOperationRFBS` — возврат перечисления за доставку покупателю;\n  - `ItemAgentServiceStarsMembership` — вознаграждение за услугу [«Звёздные товары»](https://s.ozon.ru/e7NlR6b);\n  - `MarketplaceSellerShippingCompensationReturnOperation` — компенсация перечисления за доставку;\n  - `OperationMarketplaceServicePremiumCashback` — услуга продвижения Premium;\n  - `MarketplaceServicePremiumPromotion` — услуга продвижения Premium, фиксированная комиссия;\n  - `MarketplaceRedistributionOfAcquiringOperation` — оплата эквайринга;\n  - `MarketplaceReturnStorageServiceAtThePickupPointFbsItem` — краткосрочное размещение возврата FBS;\n  - `MarketplaceReturnStorageServiceInTheWarehouseFbsItem` — долгосрочное размещение возврата FBS;\n  - `MarketplaceServiceItemDeliveryKGT` — доставка КГТ;\n  - `MarketplaceServiceItemDirectFlowLogistic` — логистика;\n  - `MarketplaceServiceItemReturnFlowLogistic` — обратная логистика;\n  - `MarketplaceServicePremiumCashbackIndividualPoints` — услуга продвижения «Бонусы продавца»;\n  - `OperationMarketplaceWithHoldingForUndeliverableGoods` — удержание за недовложение товара;\n  - `MarketplaceServiceItemDirectFlowLogisticVDC` — логистика вРЦ;\n  - `MarketplaceServiceItemDropoffPPZ` — услуга drop-off в пункте приёма заказов;\n  - `MarketplaceServicePremiumCashback` — услуга продвижения Premium;\n  - `MarketplaceServiceItemRedistributionReturnsPVZ` — перевыставление возвратов на пункте выдачи;\n  - `OperationElectronicServiceStencil` — услуга «Трафареты»;\n  - `OperationElectronicServicesPromotionInSearch` — услуга «Продвижение в поиске»;\n  - `OperationMarketplaceServiceItemElectronicServicesBrandShelf` — услуга «Брендовая полка»;\n  - `OperationSubscriptionPremium` — подписка Premium.\n"
    },
    "posting_number": {
      "type": "string",
      "description": "Номер отправления."
    },
    "transaction_type": {
      "type": "string",
      "description": "Тип начисления:\n  - `all` — все,\n  - `orders` — заказы,\n  - `returns` — возвраты и отмены,\n  - `services` — сервисные сборы,\n  - `compensation` — компенсация,\n  - `transferDelivery` — стоимость доставки,\n  - `other` — прочее.\n\nНекоторые операции могут быть разделены во времени. Например, при приёме возврата от покупателя списывается стоимость товара и возвращается комиссия, а когда товар возвращается на склад, взимается стоимость услуга по обработке возврата.\n"
    }
  },
  "type": "object",
  "title": "object",
  "description": "Фильтр."
}
```
