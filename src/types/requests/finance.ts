/**
 * Request types for finance API
 * Manually implemented for type safety
 * Ready for manual editing and enhancements
 */

/**
 * Язык отчёта о компенсациях
 * Compensation report language
 */
export type CompensationReportLanguage = "DEFAULT" | "RU" | "EN";

/**
 * Общий язык для отчётов
 * Common language for reports
 */
export type CommonLanguage = "DEFAULT" | "RU" | "EN";

/**
 * Запрос отчёта о компенсациях
 * Compensation report request
 */
export interface GetCompensationReportRequest {
  /** Отчётный период в формате YYYY-MM (обязательный) */
  date: string;
  /** Язык отчёта */
  language?: CompensationReportLanguage;
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта о декомпенсациях
 * Decompensation report request
 */
export interface GetDecompensationReportRequest {
  /** Отчётный период в формате YYYY-MM (обязательный) */
  date: string;
  /** Язык отчёта */
  language?: CompensationReportLanguage;
  readonly [key: string]: unknown;
}

/**
 * Запрос реестра продаж юридическим лицам
 * B2B sales document request
 */
export interface CreateDocumentB2BSalesReportRequest {
  /** Отчётный период в формате YYYY-MM */
  date?: string;
  /** Язык отчёта */
  language?: CommonLanguage;
  readonly [key: string]: unknown;
}

/**
 * Запрос реестра продаж юридическим лицам в JSON
 * B2B sales JSON document request
 */
export interface CreateDocumentB2BSalesJSONReportRequest {
  /** Отчётный период в формате YYYY-MM */
  date?: string;
  /** Язык отчёта */
  language?: CommonLanguage;
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта о взаиморасчётах
 * Mutual settlement report request
 */
export interface CreateMutualSettlementReportRequest {
  /** Отчётный период в формате YYYY-MM */
  date?: string;
  /** Язык отчёта */
  language?: CommonLanguage;
  readonly [key: string]: unknown;
}

/**
 * Период для фильтра транзакций
 * Transaction filter date period
 */
export interface FinanceTransactionDateFilter {
  /** Дата начала периода */
  from?: string;
  /** Дата окончания периода */
  to?: string;
}

/**
 * Фильтр для списка транзакций (строгий по MCP - либо date либо posting_number обязательны)
 * Transaction list filter (strict per MCP - either date or posting_number required)
 */
export interface FinanceTransactionListFilter {
  /** Период дат для фильтра (обязательно если нет posting_number) */
  date?: FinanceTransactionDateFilter;
  /** Номер отправления (обязательно если нет date) */
  posting_number?: string;
  /** Тип операции (строгий перечень из MCP документации) */
  operation_type?: OperationType[];
  /** Тип транзакции */
  transaction_type?: TransactionType;
}

/**
 * Запрос списка транзакций v3
 * Transaction list request v3
 */
export interface FinanceTransactionListV3Request {
  /** Фильтр для запроса */
  filter?: FinanceTransactionListFilter;
  /** Номер страницы (обязательный) */
  page: number;
  /** Количество элементов на странице (обязательный) */
  page_size: number;
  readonly [key: string]: unknown;
}

/**
 * Типы операций из MCP документации
 * Operation types from MCP documentation
 */
export type OperationType =
  | "ClientReturnAgentOperation"
  | "MarketplaceMarketingActionCostOperation"
  | "MarketplaceSaleReviewsOperation"
  | "MarketplaceSellerCompensationOperation"
  | "OperationAgentDeliveredToCustomer"
  | "OperationAgentDeliveredToCustomerCanceled"
  | "OperationAgentStornoDeliveredToCustomer"
  | "OperationClaim"
  | "OperationCorrectionSeller"
  | "OperationDefectiveWriteOff"
  | "OperationItemReturn"
  | "OperationLackWriteOff"
  | "OperationMarketplaceCrossDockServiceWriteOff"
  | "OperationMarketplaceServiceStorage"
  | "OperationSetOff"
  | "MarketplaceSellerReexposureDeliveryReturnOperation"
  | "OperationReturnGoodsFBSofRMS"
  | "ReturnAgentOperationRFBS"
  | "ItemAgentServiceStarsMembership"
  | "MarketplaceSellerShippingCompensationReturnOperation"
  | "OperationMarketplaceServicePremiumCashback"
  | "MarketplaceServicePremiumPromotion"
  | "MarketplaceRedistributionOfAcquiringOperation"
  | "MarketplaceReturnStorageServiceAtThePickupPointFbsItem"
  | "MarketplaceReturnStorageServiceInTheWarehouseFbsItem"
  | "MarketplaceServiceItemDeliveryKGT"
  | "MarketplaceServiceItemDirectFlowLogistic"
  | "MarketplaceServiceItemReturnFlowLogistic"
  | "MarketplaceServicePremiumCashbackIndividualPoints"
  | "OperationMarketplaceWithHoldingForUndeliverableGoods"
  | "MarketplaceServiceItemDirectFlowLogisticVDC"
  | "MarketplaceServiceItemDropoffPPZ"
  | "MarketplaceServicePremiumCashback"
  | "MarketplaceServiceItemRedistributionReturnsPVZ"
  | "OperationElectronicServiceStencil"
  | "OperationElectronicServicesPromotionInSearch"
  | "OperationMarketplaceServiceItemElectronicServicesBrandShelf"
  | "OperationSubscriptionPremium";

/**
 * Типы транзакций для итогов (строгие по MCP документации)
 * Transaction types for totals (strict per MCP documentation)
 */
export type TransactionType = "all" | "orders" | "returns" | "services" | "compensation" | "transferDelivery" | "other";

/**
 * Период дат для итогов транзакций
 * Date period for transaction totals
 */
export interface FinanceTransactionTotalsDateRequest {
  /** Дата начала */
  from?: string;
  /** Дата окончания */
  to?: string;
}

/**
 * Запрос итогов транзакций v3
 * Transaction totals request v3
 */
export interface FinanceTransactionTotalsV3Request {
  /** Период дат (требуется если нет posting_number) */
  date?: FinanceTransactionTotalsDateRequest;
  /** Номер отправления (требуется если нет date) */
  posting_number?: string;
  /** Тип операции */
  transaction_type?: TransactionType;
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта о выкупленных товарах
 * Products buyout report request
 */
export interface GetFinanceProductsBuyoutRequest {
  /** Дата начала периода (обязательная) */
  date_from: string;
  /** Дата окончания периода (обязательная, макс 31 день) */
  date_to: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта о реализации товаров (позаказный)
 * Realization report by posting request
 */
export interface GetRealizationReportPostingRequest {
  /** Дата начала периода */
  date_from?: string;
  /** Дата окончания периода */
  date_to?: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта о реализации товаров v2
 * Realization report v2 request
 */
export interface GetRealizationReportV2Request {
  /** Месяц отчёта в формате YYYY-MM */
  month?: string;
  /** Язык отчёта */
  language?: CommonLanguage;
  readonly [key: string]: unknown;
}
