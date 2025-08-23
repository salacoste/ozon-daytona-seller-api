/**
 * Request types for BetaMethod API
 * Beta features and experimental APIs
 * Ready for manual editing and enhancements
 */

/**
 * Схема доставки для аналитики времени доставки
 * Delivery schema for delivery time analytics
 */
export type BetaMethodDeliverySchema = 'FBO' | 'FBS' | 'RFBS';

/**
 * Период поставки для аналитики времени доставки
 * Supply period for delivery time analytics
 */
export interface BetaMethodSupplyPeriod {
  /** 
   * Дата начала периода (YYYY-MM-DD)
   * Period start date (YYYY-MM-DD)
   */
  from: string;
  
  /** 
   * Дата окончания периода (YYYY-MM-DD)
   * Period end date (YYYY-MM-DD)
   */
  to: string;
}

/**
 * Запрос аналитики по среднему времени доставки
 * Average delivery time analytics request
 */
export interface BetaMethodAverageDeliveryTimeRequest {
  /** 
   * Схема доставки
   * Delivery schema
   */
  delivery_schema: BetaMethodDeliverySchema;
  
  /** 
   * Период поставки
   * Supply period
   */
  supply_period: BetaMethodSupplyPeriod;
  
  /** 
   * Идентификаторы товаров SKU (максимум 100)
   * Product SKU identifiers (maximum 100)
   */
  sku?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Фильтры для детальной аналитики времени доставки
 * Filters for detailed delivery time analytics
 */
export interface BetaMethodDeliveryTimeDetailsFilters {
  /** 
   * Фильтр по SKU товаров
   * Filter by product SKUs
   */
  sku?: string[];
  
  /** 
   * Фильтр по регионам
   * Filter by regions
   */
  regions?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос детальной аналитики по среднему времени доставки
 * Detailed average delivery time analytics request
 */
export interface BetaMethodAverageDeliveryTimeDetailsRequest {
  /** 
   * Идентификатор кластера
   * Cluster identifier
   */
  cluster_id: number;
  
  /** 
   * Количество элементов в ответе (максимум 1000)
   * Number of elements in response (maximum 1000)
   */
  limit: number;
  
  /** 
   * Количество пропускаемых элементов
   * Number of elements to skip
   */
  offset: number;
  
  /** 
   * Фильтры
   * Filters
   */
  filters?: BetaMethodDeliveryTimeDetailsFilters;
  
  readonly [key: string]: unknown;
}

/**
 * Фильтр для управления остатками (устаревший)
 * Filter for stock management (deprecated)
 */
export interface BetaMethodManageStocksFilter {
  /** 
   * Фильтр по SKU товаров
   * Filter by product SKUs
   */
  sku?: string[];
  
  /** 
   * Фильтр по статусу товара
   * Filter by product status
   */
  status?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос управления остатками (устаревший)
 * Stock management request (deprecated)
 * @deprecated Будет отключён. Используйте /v1/analytics/stocks
 */
export interface BetaMethodManageStocksRequest {
  /** 
   * Фильтр
   * Filter
   */
  filter?: BetaMethodManageStocksFilter;
  
  /** 
   * Количество значений в ответе (1-1000)
   * Number of values in response (1-1000)
   */
  limit: number;
  
  /** 
   * Количество пропускаемых элементов
   * Number of elements to skip
   */
  offset: number;
  
  readonly [key: string]: unknown;
}

/**
 * Тег товара для аналитики остатков
 * Product tag for stock analytics
 */
export type BetaMethodItemTag = 
  | 'ITEM_ATTRIBUTE_NONE'
  | 'ECONOM'
  | 'NOVEL'
  | 'DISCOUNT'
  | 'FBS_RETURN'
  | 'SUPER';

/**
 * Статус ликвидности товара
 * Product turnover status
 */
export type BetaMethodTurnoverGrade = 
  | 'TURNOVER_GRADE_NONE'
  | 'DEFICIT'
  | 'POPULAR'
  | 'ACTUAL'
  | 'SURPLUS'
  | 'NO_SALES'
  | 'WAS_NO_SALES'
  | 'RESTRICTED_NO_SALES'
  | 'COLLECTING_DATA'
  | 'WAITING_FOR_SUPPLY'
  | 'WAS_DEFICIT'
  | 'WAS_POPULAR'
  | 'WAS_ACTUAL'
  | 'WAS_SURPLUS';

/**
 * Запрос аналитики по остаткам
 * Stock analytics request
 */
export interface BetaMethodAnalyticsStocksRequest {
  /** 
   * Идентификаторы товаров SKU (максимум 100)
   * Product SKU identifiers (maximum 100)
   */
  skus: string[];
  
  /** 
   * Фильтр по идентификаторам кластеров
   * Filter by cluster identifiers
   */
  cluster_ids?: string[];
  
  /** 
   * Фильтр по тегам товара
   * Filter by product tags
   */
  item_tags?: BetaMethodItemTag[];
  
  /** 
   * Фильтр по статусу ликвидности товаров
   * Filter by product turnover status
   */
  turnover_grades?: BetaMethodTurnoverGrade[];
  
  /** 
   * Фильтр по идентификаторам складов
   * Filter by warehouse identifiers
   */
  warehouse_ids?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка товаров с некорректными ОВХ
 * Wrong volume products list request
 */
export interface BetaMethodProductInfoWrongVolumeRequest {
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  /** 
   * Максимальное количество элементов в ответе (1-1000)
   * Maximum number of elements in response (1-1000)
   */
  limit?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос отчёта по вывозу и утилизации
 * Removal and disposal report request
 */
export interface BetaMethodRemovalReportRequest {
  /** 
   * Дата начала отчётного периода (YYYY-MM-DD)
   * Report period start date (YYYY-MM-DD)
   */
  date_from: string;
  
  /** 
   * Дата окончания отчётного периода (YYYY-MM-DD)
   * Report period end date (YYYY-MM-DD)
   */
  date_to: string;
  
  /** 
   * Количество элементов в ответе (1-500)
   * Number of elements in response (1-500)
   */
  limit: number;
  
  /** 
   * Идентификатор последнего значения для пагинации
   * Last value identifier for pagination
   */
  last_id?: string;
  
  readonly [key: string]: unknown;
}