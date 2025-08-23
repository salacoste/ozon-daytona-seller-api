# OperationService

## Top-level fields
- `OperationService` (top-level fields):
  - `name`: `string`
  - `price`: `number`

## Full schema (JSON)
```json
{
  "properties": {
    "name": {
      "type": "string",
      "description": "Название услуги:\n  - `MarketplaceNotDeliveredCostItem` — возврат невостребованного товара от покупателя на склад.\n  - `MarketplaceReturnAfterDeliveryCostItem` — возврат от покупателя на склад после доставки.\n  - `MarketplaceDeliveryCostItem` — доставка товара до покупателя.\n  - `MarketplaceSaleReviewsItem` — приобретение отзывов на платформе.\n  - `ItemAdvertisementForSupplierLogistic` — доставка товаров на склад Ozon — кросс-докинг.\n  - `OperationMarketplaceServiceStorage` — размещения товаров.\n  - `MarketplaceMarketingActionCostItem` — продвижение товаров.\n  - `MarketplaceServiceItemInstallment` — продвижениe и продажа в рассрочку.\n  - `MarketplaceServiceItemMarkingItems` — обязательная маркировка товаров.\n  - `MarketplaceServiceItemFlexiblePaymentSchedule` — гибкий график выплат.\n  - `MarketplaceServiceItemReturnFromStock` — комплектация товаров для вывоза продавцом.\n  - `ItemAdvertisementForSupplierLogisticSeller` — транспортно-экспедиционные услуги.\n  - `ItemAgentServiceStarsMembership` — вознаграждение за услугу [«Звёздные товары»](https://s.ozon.ru/e7NlR6b).\n  - `MarketplaceServiceItemDelivToCustomer` — последняя миля.\n  - `MarketplaceServiceItemDirectFlowTrans` — магистраль.\n  - `MarketplaceServiceItemDropoffFF` — обработка отправления.\n  - `MarketplaceServiceItemDropoffPVZ` — обработка отправления.\n  - `MarketplaceServiceItemDropoffSC` — обработка отправления.\n  - `MarketplaceServiceItemFulfillment` — сборка заказа.\n  - `MarketplaceServiceItemPickup` — выезд транспортного средства по адресу продавца для забора отправлений — Pick-up.\n  - `MarketplaceServiceItemReturnAfterDelivToCustomer` — обработка возврата.\n  - `MarketplaceServiceItemReturnFlowTrans` — обратная магистраль.\n  - `MarketplaceServiceItemReturnNotDelivToCustomer` — обработка отмен.\n  - `MarketplaceServiceItemReturnPartGoodsCustomer` — обработка невыкупа.\n  - `MarketplaceRedistributionOfAcquiringOperation` — оплата эквайринга.\n  - `MarketplaceReturnStorageServiceAtThePickupPointFbsItem` — краткосрочное размещение возврата FBS.\n  - `MarketplaceReturnStorageServiceInTheWarehouseFbsItem` — долгосрочное размещение возврата FBS.\n  - `MarketplaceServiceItemDeliveryKGT` — доставка крупногабаритного товара (КГТ).\n  - `MarketplaceServiceItemDirectFlowLogistic` — логистика.\n  - `MarketplaceServiceItemReturnFlowLogistic` — обратная логистика.\n  - `MarketplaceServicePremiumCashbackIndividualPoints` — услуга продвижения «Бонусы продавца».\n  - `MarketplaceServicePremiumPromotion` — услуга продвижение Premium, фиксированная комиссия.\n  - `OperationMarketplaceWithHoldingForUndeliverableGoods` — удержание за недовложение товара.\n  - `MarketplaceServiceItemDropoffPPZ` — услуга drop-off в пункте приёма заказов.\n  - `MarketplaceServiceItemRedistributionReturnsPVZ` — перевыставление возвратов на ПВЗ.\n  - `OperationMarketplaceAgencyFeeAggregator3PLGlobal` — тарификация агентской услуги Agregator 3PL Global.\n  - `MarketplaceServiceItemDirectFlowLogisticVDC` — логистика вРЦ.\n"
    },
    "price": {
      "format": "double",
      "type": "number",
      "description": "Цена."
    }
  },
  "type": "object",
  "title": "object"
}
```
