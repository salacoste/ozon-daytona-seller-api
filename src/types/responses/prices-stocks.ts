/**
 * Response types for Prices&StocksAPI
 * Price and inventory management
 * Ready for manual editing and enhancements
 */

/**
 * Статус таймера для товара
 * Timer status for product
 */
export interface PricesStocksTimerStatus {
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  product_id?: string;
  
  /** 
   * Статус таймера
   * Timer status
   */
  is_timer_enabled?: boolean;
  
  /** 
   * Время следующего обновления
   * Next update time
   */
  next_update_time?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса таймера актуальности минимальной цены
 * Action timer status response
 */
export interface PricesStocksActionTimerStatusResponse {
  /** 
   * Статусы таймеров для товаров
   * Timer statuses for products
   */
  statuses?: PricesStocksTimerStatus[];
  
  readonly [key: string]: unknown;
}

/**
 * Результат обработки цены товара
 * Product price processing result
 */
export interface PricesStocksPriceResult {
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
   * Статус обновления цены
   * Price update status
   */
  updated?: boolean;
  
  /** 
   * Ошибки обработки
   * Processing errors
   */
  errors?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ обновления цен товаров
 * Product prices update response
 */
export interface PricesStocksImportPricesResponse {
  /** 
   * Результаты обработки запроса
   * Request processing results
   */
  result?: PricesStocksPriceResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация об уценённом товаре
 * Discounted product information
 */
export interface PricesStocksDiscountedProductInfo {
  /** 
   * SKU уценённого товара
   * Discounted product SKU
   */
  discounted_sku?: string;
  
  /** 
   * SKU основного товара
   * Main product SKU
   */
  original_sku?: string;
  
  /** 
   * Состояние товара
   * Product condition
   */
  condition?: string;
  
  /** 
   * Описание дефектов
   * Defects description
   */
  defects?: string[];
  
  /** 
   * Размер скидки
   * Discount size
   */
  discount_percentage?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации об уценённом товаре
 * Discounted product information response
 */
export interface PricesStocksGetDiscountedInfoResponse {
  /** 
   * Информация об уценке и основном товаре
   * Discount and main product information
   */
  items?: PricesStocksDiscountedProductInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Остатки товара на складе
 * Product stock on warehouse
 */
export interface PricesStocksWarehouseStock {
  /** 
   * Идентификатор склада
   * Warehouse identifier
   */
  warehouse_id?: string;
  
  /** 
   * Название склада
   * Warehouse name
   */
  warehouse_name?: string;
  
  /** 
   * Количество в наличии
   * Available quantity
   */
  present?: number;
  
  /** 
   * Зарезервированное количество
   * Reserved quantity
   */
  reserved?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Информация об остатках товара
 * Product stock information
 */
export interface PricesStocksProductStockInfo {
  /** 
   * SKU товара
   * Product SKU
   */
  sku?: string;
  
  /** 
   * Остатки на складах
   * Warehouse stocks
   */
  stocks?: PricesStocksWarehouseStock[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации об остатках на складах FBS
 * FBS warehouse stocks information response
 */
export interface PricesStocksGetStocksByWarehouseFbsResponse {
  /** 
   * Результат работы метода
   * Method result
   */
  result?: PricesStocksProductStockInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ обновления скидки на уценённый товар
 * Update discounted product discount response
 */
export interface PricesStocksUpdateDiscountResponse {
  /** 
   * Результат работы метода
   * Method result
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Результат обработки остатков товара
 * Product stock processing result
 */
export interface PricesStocksStockResult {
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
   * Идентификатор склада
   * Warehouse identifier
   */
  warehouse_id?: number;
  
  /** 
   * Статус обновления остатков
   * Stock update status
   */
  updated?: boolean;
  
  /** 
   * Ошибки обработки
   * Processing errors
   */
  errors?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ обновления остатков товаров
 * Product stocks update response
 */
export interface PricesStocksUpdateStocksResponse {
  /** 
   * Результаты обработки запроса
   * Request processing results
   */
  result?: PricesStocksStockResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация об остатках товара
 * Product stock information
 */
export interface PricesStocksStockItem {
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  offer_id?: string;
  
  /** 
   * Идентификатор товара в системе Ozon
   * Product identifier in Ozon system
   */
  product_id?: string;
  
  /** 
   * SKU товара
   * Product SKU
   */
  sku?: string;
  
  /** 
   * Остатки по складам
   * Warehouse stocks
   */
  stocks?: PricesStocksWarehouseStock[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации о количестве товаров
 * Product quantity information response
 */
export interface PricesStocksGetStocksResponse {
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  /** 
   * Информация о товарах
   * Product information
   */
  items?: PricesStocksStockItem[];
  
  /** 
   * Количество уникальных товаров
   * Number of unique products
   */
  total?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о цене товара
 * Product price information
 */
export interface PricesStocksPriceItem {
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  offer_id?: string;
  
  /** 
   * Идентификатор товара в системе Ozon
   * Product identifier in Ozon system
   */
  product_id?: string;
  
  /** 
   * SKU товара
   * Product SKU
   */
  sku?: string;
  
  /** 
   * Цена товара
   * Product price
   */
  price?: string;
  
  /** 
   * Старая цена
   * Old price
   */
  old_price?: string;
  
  /** 
   * Цена для Premium покупателей
   * Price for Premium buyers
   */
  premium_price?: string;
  
  /** 
   * Рекомендованная цена
   * Recommended price
   */
  recommended_price?: string;
  
  /** 
   * Минимальная цена
   * Minimum price
   */
  min_price?: string;
  
  /** 
   * Максимальная цена
   * Maximum price
   */
  max_price?: string;
  
  /** 
   * Валюта
   * Currency
   */
  currency_code?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации о ценах товаров
 * Product price information response
 */
export interface PricesStocksGetPricesResponse {
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  /** 
   * Список товаров
   * Products list
   */
  items?: PricesStocksPriceItem[];
  
  /** 
   * Количество товаров в списке
   * Number of products in list
   */
  total?: number;
  
  readonly [key: string]: unknown;
}