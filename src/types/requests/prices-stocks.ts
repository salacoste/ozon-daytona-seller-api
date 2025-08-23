/**
 * Request types for Prices&StocksAPI
 * Price and inventory management
 * Ready for manual editing and enhancements
 */

/**
 * Запрос статуса таймера актуальности минимальной цены
 * Action timer status request
 */
export interface PricesStocksActionTimerStatusRequest {
  /** 
   * Список идентификаторов товаров в системе продавца (максимум 1000)
   * List of product identifiers in seller system (maximum 1000)
   */
  product_ids?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления таймера актуальности минимальной цены
 * Action timer update request
 */
export interface PricesStocksActionTimerUpdateRequest {
  /** 
   * Список идентификаторов товаров в системе продавца (максимум 1000)
   * List of product identifiers in seller system (maximum 1000)
   */
  product_ids?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о цене товара
 * Product price information
 */
export interface PricesStocksProductPrice {
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  offer_id?: string;
  
  /** 
   * Идентификатор товара в системе Ozon
   * Product identifier in Ozon system
   */
  product_id?: number;
  
  /** 
   * Цена товара
   * Product price
   */
  price?: string;
  
  /** 
   * Старая цена (зачёркнутая цена)
   * Old price (crossed out price)
   */
  old_price?: string;
  
  /** 
   * Цена для покупателей с подпиской Ozon Premium
   * Price for Ozon Premium subscribers
   */
  premium_price?: string;
  
  /** 
   * Валюта цены
   * Price currency
   */
  currency_code?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления цен товаров
 * Product prices update request
 */
export interface PricesStocksImportPricesRequest {
  /** 
   * Информация о ценах товаров (максимум 1000)
   * Product price information (maximum 1000)
   */
  prices: PricesStocksProductPrice[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации об уценённом товаре
 * Discounted product information request
 */
export interface PricesStocksGetDiscountedInfoRequest {
  /** 
   * Список SKU уценённых товаров
   * List of discounted product SKUs
   */
  discounted_skus: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации об остатках на складах FBS
 * FBS warehouse stocks information request
 */
export interface PricesStocksGetStocksByWarehouseFbsRequest {
  /** 
   * Идентификаторы товаров в системе Ozon — SKU
   * Product identifiers in Ozon system - SKU
   */
  sku: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления скидки на уценённый товар
 * Update discounted product discount request
 */
export interface PricesStocksUpdateDiscountRequest {
  /** 
   * Размер скидки (от 3 до 99 процентов)
   * Discount size (from 3 to 99 percent)
   */
  discount: number;
  
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  product_id: number;
  
  readonly [key: string]: unknown;
}

/**
 * Информация об остатках товара на складе
 * Product stock information on warehouse
 */
export interface PricesStocksProductStock {
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  offer_id?: string;
  
  /** 
   * Идентификатор товара в системе Ozon
   * Product identifier in Ozon system
   */
  product_id?: number;
  
  /** 
   * Количество товара
   * Product quantity
   */
  stock?: number;
  
  /** 
   * Идентификатор склада
   * Warehouse identifier
   */
  warehouse_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления остатков товаров
 * Product stocks update request
 */
export interface PricesStocksUpdateStocksRequest {
  /** 
   * Информация о товарах на складах (максимум 100 пар товар-склад)
   * Product warehouse information (maximum 100 product-warehouse pairs)
   */
  stocks: PricesStocksProductStock[];
  
  readonly [key: string]: unknown;
}

/**
 * Фильтр для получения информации об остатках
 * Filter for getting stock information
 */
export interface PricesStocksFilter {
  /** 
   * Идентификаторы товаров в системе продавца
   * Product identifiers in seller system
   */
  offer_id?: string[];
  
  /** 
   * Идентификаторы товаров в системе Ozon
   * Product identifiers in Ozon system
   */
  product_id?: string[];
  
  /** 
   * Видимость товаров
   * Product visibility
   */
  visibility?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о количестве товаров
 * Product quantity information request
 */
export interface PricesStocksGetStocksRequest {
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  /** 
   * Фильтр
   * Filter
   */
  filter: PricesStocksFilter;
  
  /** 
   * Количество значений на странице (1-1000)
   * Number of values per page (1-1000)
   */
  limit: number;
  
  readonly [key: string]: unknown;
}

/**
 * Фильтр для получения информации о ценах
 * Filter for getting price information
 */
export interface PricesStocksPriceFilter {
  /** 
   * Идентификаторы товаров в системе продавца
   * Product identifiers in seller system
   */
  offer_id?: string[];
  
  /** 
   * Идентификаторы товаров в системе Ozon
   * Product identifiers in Ozon system
   */
  product_id?: string[];
  
  /** 
   * Видимость товаров
   * Product visibility
   */
  visibility?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о ценах товаров
 * Product price information request
 */
export interface PricesStocksGetPricesRequest {
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  /** 
   * Фильтр
   * Filter
   */
  filter: PricesStocksPriceFilter;
  
  /** 
   * Количество значений на странице (1-1000)
   * Number of values per page (1-1000)
   */
  limit: number;
  
  readonly [key: string]: unknown;
}