/**
 * Response types for BetaMethod API
 * Beta features and experimental APIs
 * Ready for manual editing and enhancements
 */

/**
 * Данные кластера для аналитики времени доставки
 * Cluster data for delivery time analytics
 */
export interface BetaMethodDeliveryTimeClusterData {
  /**
   * Идентификатор кластера
   * Cluster identifier
   */
  cluster_id?: number;

  /**
   * Название кластера
   * Cluster name
   */
  cluster_name?: string;

  /**
   * Среднее время доставки (в днях)
   * Average delivery time (in days)
   */
  average_delivery_time?: number;

  /**
   * Количество заказов
   * Orders count
   */
  orders_count?: number;

  /**
   * Доля от общего объёма заказов
   * Share of total orders volume
   */
  orders_share?: number;

  readonly [key: string]: unknown;
}

/**
 * Общие данные по времени доставки
 * Total delivery time data
 */
export interface BetaMethodDeliveryTimeTotal {
  /**
   * Общее среднее время доставки
   * Total average delivery time
   */
  average_delivery_time?: number;

  /**
   * Общее количество заказов
   * Total orders count
   */
  total_orders?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ аналитики по среднему времени доставки
 * Average delivery time analytics response
 */
export interface BetaMethodAverageDeliveryTimeResponse {
  /**
   * Информация о кластерах
   * Cluster information
   */
  data?: BetaMethodDeliveryTimeClusterData[];

  /**
   * Общие данные
   * Total data
   */
  total?: BetaMethodDeliveryTimeTotal;

  readonly [key: string]: unknown;
}

/**
 * Детальные данные по времени доставки
 * Detailed delivery time data
 */
export interface BetaMethodDeliveryTimeDetailData {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  product_name?: string;

  /**
   * Среднее время доставки для товара
   * Average delivery time for product
   */
  average_delivery_time?: number;

  /**
   * Количество заказов товара
   * Product orders count
   */
  orders_count?: number;

  /**
   * Регион доставки
   * Delivery region
   */
  region?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ детальной аналитики по среднему времени доставки
 * Detailed average delivery time analytics response
 */
export interface BetaMethodAverageDeliveryTimeDetailsResponse {
  /**
   * Детальная информация о доставке
   * Detailed delivery information
   */
  data?: BetaMethodDeliveryTimeDetailData[];

  /**
   * Всего записей
   * Total records
   */
  total_rows?: number;

  readonly [key: string]: unknown;
}

/**
 * Тариф для общей аналитики времени доставки
 * Tariff for delivery time summary analytics
 */
export interface BetaMethodDeliveryTimeTariff {
  /**
   * Название тарифа
   * Tariff name
   */
  name?: string;

  /**
   * Стоимость тарифа
   * Tariff cost
   */
  cost?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ общей аналитики по среднему времени доставки
 * Delivery time summary analytics response
 */
export interface BetaMethodAverageDeliveryTimeSummaryResponse {
  /**
   * Среднее время доставки до покупателя
   * Average delivery time to customer
   */
  average_delivery_time?: number;

  /**
   * Рекомендуемое среднее время доставки
   * Recommended average delivery time
   */
  perfect_delivery_time?: number;

  /**
   * Переплата за логистику FBO
   * FBO logistics overpayment
   */
  lost_profit?: number;

  /**
   * Текущий тариф
   * Current tariff
   */
  current_tariff?: BetaMethodDeliveryTimeTariff;

  /**
   * Дата и время последнего обновления
   * Last update date and time
   */
  updated_at?: string;

  readonly [key: string]: unknown;
}

/**
 * Элемент остатков для управления (устаревший)
 * Stock management item (deprecated)
 */
export interface BetaMethodManageStocksItem {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  product_name?: string;

  /**
   * Остаток на складе
   * Warehouse stock
   */
  warehouse_stock?: number;

  /**
   * Зарезервированное количество
   * Reserved quantity
   */
  reserved_quantity?: number;

  /**
   * Доступно к продаже
   * Available for sale
   */
  available_for_sale?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ управления остатками (устаревший)
 * Stock management response (deprecated)
 * @deprecated Будет отключён. Используйте /v1/analytics/stocks
 */
export interface BetaMethodManageStocksResponse {
  /**
   * Список товаров
   * Products list
   */
  items?: BetaMethodManageStocksItem[];

  readonly [key: string]: unknown;
}

/**
 * Элемент аналитики остатков
 * Stock analytics item
 */
export interface BetaMethodStocksAnalyticsItem {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  product_name?: string;

  /**
   * Остаток на складе
   * Warehouse stock
   */
  warehouse_stock?: number;

  /**
   * Статус ликвидности
   * Turnover status
   */
  turnover_grade?: string;

  /**
   * Тег товара
   * Product tag
   */
  item_tag?: string;

  /**
   * Кластер
   * Cluster
   */
  cluster_id?: string;

  /**
   * Идентификатор склада
   * Warehouse identifier
   */
  warehouse_id?: string;

  /**
   * Прогноз продаж
   * Sales forecast
   */
  sales_forecast?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ аналитики по остаткам
 * Stock analytics response
 */
export interface BetaMethodAnalyticsStocksResponse {
  /**
   * Информация о товарах
   * Products information
   */
  items?: BetaMethodStocksAnalyticsItem[];

  readonly [key: string]: unknown;
}

/**
 * Товар с некорректными ОВХ
 * Product with wrong volume characteristics
 */
export interface BetaMethodWrongVolumeProduct {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  product_name?: string;

  /**
   * Текущие ОВХ
   * Current volume characteristics
   */
  current_volume?: {
    /**
     * Длина (см)
     * Length (cm)
     */
    length?: number;

    /**
     * Ширина (см)
     * Width (cm)
     */
    width?: number;

    /**
     * Высота (см)
     * Height (cm)
     */
    height?: number;

    /**
     * Вес (г)
     * Weight (g)
     */
    weight?: number;
  };

  /**
   * Рекомендуемые ОВХ
   * Recommended volume characteristics
   */
  recommended_volume?: {
    /**
     * Длина (см)
     * Length (cm)
     */
    length?: number;

    /**
     * Ширина (см)
     * Width (cm)
     */
    width?: number;

    /**
     * Высота (см)
     * Height (cm)
     */
    height?: number;

    /**
     * Вес (г)
     * Weight (g)
     */
    weight?: number;
  };

  readonly [key: string]: unknown;
}

/**
 * Ответ списка товаров с некорректными ОВХ
 * Wrong volume products list response
 */
export interface BetaMethodProductInfoWrongVolumeResponse {
  /**
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;

  /**
   * Список товаров
   * Products list
   */
  products?: BetaMethodWrongVolumeProduct[];

  readonly [key: string]: unknown;
}

/**
 * Строка отчёта по вывозу и утилизации
 * Removal and disposal report row
 */
export interface BetaMethodRemovalReportRow {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  product_name?: string;

  /**
   * Количество товара
   * Product quantity
   */
  quantity?: number;

  /**
   * Тип операции (вывоз/утилизация)
   * Operation type (removal/disposal)
   */
  operation_type?: string;

  /**
   * Дата операции
   * Operation date
   */
  operation_date?: string;

  /**
   * Стоимость операции
   * Operation cost
   */
  operation_cost?: number;

  /**
   * Статус операции
   * Operation status
   */
  status?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ отчёта по вывозу и утилизации
 * Removal and disposal report response
 */
export interface BetaMethodRemovalReportResponse {
  /**
   * Идентификатор последнего значения для пагинации
   * Last value identifier for pagination
   */
  last_id?: string;

  /**
   * Информация о товарах
   * Products information
   */
  returns_summary_report_rows?: BetaMethodRemovalReportRow[];

  readonly [key: string]: unknown;
}

/**
 * Информация о роли API-ключа
 * API key role information
 */
export interface BetaMethodApiRole {
  /**
   * Название роли
   * Role name
   */
  name?: string;

  /**
   * Описание роли
   * Role description
   */
  description?: string;

  /**
   * Список доступных методов
   * Available methods list
   */
  methods?: string[];

  readonly [key: string]: unknown;
}

/**
 * Ответ списка ролей по API-ключу
 * API key roles list response
 */
export interface BetaMethodRolesByTokenResponse {
  /**
   * Информация о доступных ролях и методах
   * Available roles and methods information
   */
  roles?: BetaMethodApiRole[];

  readonly [key: string]: unknown;
}
