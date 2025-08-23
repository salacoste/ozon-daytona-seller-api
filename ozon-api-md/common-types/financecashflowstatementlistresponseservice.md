# FinanceCashFlowStatementListResponseService

Детализация.

## Top-level fields
- `FinanceCashFlowStatementListResponseService` (top-level fields):
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
      "description": "Название операции:\n  - `MarketplaceServiceItemElectronicServiceStencil` — услуга «Трафареты»;\n  - `MarketplaceServiceItemElectronicServicesPromotionInSearch` — услуга «Продвижение в поиске»;\n  - `MarketplaceServiceItemElectronicServicesBrandShelf` — услуга «Брендовая полка»;\n  - `MarketplaceServiceBrandPromotion` и `MarketplaceServiceBrandCommission` — услуга «Продвижение бренда»;\n  - `MarketplaceServiceItemMarketingServices` — маркетинговые услуги; \n  - `MarketplaceServiceItemTechnicalServicesAndOtherServices` — технические и иные услуги;  \n  - `MarketplaceServiceItemOtherElectronicServices` — иные электронные услуги;  \n  - `ItemAgentServiceStarsMembership` — звёздные товары;\n  - `MarketplaceReturnStorageServiceAtThePickupPointFbsItem` — краткосрочное размещение возврата FBS;\n  - `MarketplaceSaleReviewsItem` — приобретение отзывов на платформе;\n  - `MarketplaceServicePremiumCashbackIndividualPoints` — услуга продвижения «Бонусы продавца»;\n  - `OperationMarketplaceServiceStorage` — услуга размещения товаров;\n  - `MarketplaceServiceStockDisposal` — утилизация со стока;\n  - `MarketplaceReturnDisposalServiceFbsItem` — утилизация FBS;\n  - `MarketplaceServiceItemFlexiblePaymentSchedule` — услуга «Гибкий график выплат»;\n  - `MarketplaceServiceProcessingSpoilage` — обработка брака;\n  - `MarketplaceServiceProcessingIdentifiedSurplus` — обработка опознанных излишков;\n  - `MarketplaceServiceProcessingIdentifiedDiscrepancies` — бронирование места для размещения на складе;\n  - `MarketplaceServiceItemInternetSiteAdvertising` — реклама на сайте Ozon;\n  - `MarketplaceServiceItemSubscribtionPremium` — премиум-подписка;\n  - `MarketplaceAgencyFeeAggregator3PLGlobalItem` — агентское вознаграждение Ozon.\n"
    },
    "price": {
      "type": "number",
      "format": "double",
      "description": "Сумма по операции."
    }
  }
}
```
