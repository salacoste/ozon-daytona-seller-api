/**
 * Response types for FBO API
 * Generated from OZON API documentation
 * FBO - Fulfillment by OZON operations
 */

/**
 * Причина отмены отправления
 * Posting cancel reason
 */
export interface FboCancelReason {
  /**
   * Идентификатор причины
   * Reason ID
   */
  id?: number;

  /**
   * Название причины
   * Reason name
   */
  name?: string;

  /**
   * Тип причины
   * Reason type
   */
  type?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ со списком причин отмены отправлений FBO
 * Response with FBO posting cancel reasons list
 */
export interface FboCancelReasonListResponse {
  /**
   * Список причин отмены
   * List of cancel reasons
   */
  cancel_reasons?: FboCancelReason[];

  readonly [key: string]: unknown;
}

/**
 * Информация о загруженности склада
 * Warehouse availability information
 */
export interface FboWarehouseAvailability {
  /**
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;

  /**
   * Название склада
   * Warehouse name
   */
  name?: string;

  /**
   * Статус работы склада
   * Warehouse operational status
   */
  is_active?: boolean;

  /**
   * Средняя загруженность (в процентах)
   * Average capacity utilization (percentage)
   */
  capacity_utilization?: number;

  /**
   * Ожидаемое время обработки (дни)
   * Expected processing time (days)
   */
  processing_days?: number;

  /**
   * Регион склада
   * Warehouse region
   */
  region?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о загруженности складов Ozon
 * Response with Ozon warehouse availability information
 */
export interface FboWarehouseAvailabilityResponse {
  /**
   * Список складов с информацией о загруженности
   * List of warehouses with availability information
   */
  warehouses?: FboWarehouseAvailability[];

  readonly [key: string]: unknown;
}

/**
 * Информация о товаре в поставке
 * Product information in supply order
 */
export interface FboSupplyOrderProduct {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  name?: string;

  /**
   * Количество
   * Quantity
   */
  quantity?: number;

  /**
   * Цена за единицу
   * Price per unit
   */
  price?: number;

  /**
   * Валюта
   * Currency
   */
  currency?: string;

  /**
   * Статус товара
   * Product status
   */
  status?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ с составом поставки или заявки на поставку
 * Response with supply order bundle
 */
export interface FboSupplyOrderBundleResponse {
  /**
   * Идентификатор поставки
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Статус поставки
   * Supply order status
   */
  status?: string;

  /**
   * Товары в поставке
   * Products in supply order
   */
  products?: FboSupplyOrderProduct[];

  /**
   * Общее количество товаров
   * Total products count
   */
  total_products?: number;

  /**
   * Общая стоимость
   * Total amount
   */
  total_amount?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ на создание данных о водителе и автомобиле
 * Response for driver and vehicle data creation
 */
export interface FboSupplyOrderPassCreateResponse {
  /**
   * Идентификатор задачи
   * Task ID
   */
  task_id?: string;

  /**
   * Статус задачи
   * Task status
   */
  status?: "pending" | "processing" | "completed" | "error";

  readonly [key: string]: unknown;
}

/**
 * Ответ со статусом ввода данных о водителе и автомобиле
 * Response with driver and vehicle data status
 */
export interface FboSupplyOrderPassStatusResponse {
  /**
   * Статус ввода данных
   * Data entry status
   */
  status?: "not_filled" | "filled" | "approved" | "rejected";

  /**
   * Данные о водителе
   * Driver information
   */
  driver?: {
    /** ФИО водителя */
    name?: string;
    /** Номер телефона */
    phone?: string;
    /** Серия и номер паспорта */
    passport?: string;
  };

  /**
   * Данные об автомобиле
   * Vehicle information
   */
  vehicle?: {
    /** Марка и модель */
    model?: string;
    /** Государственный номер */
    license_plate?: string;
    /** Цвет автомобиля */
    color?: string;
  };

  /**
   * Комментарий к отклонению
   * Rejection comment
   */
  rejection_reason?: string;

  readonly [key: string]: unknown;
}

/**
 * Счетчик заявок по статусу
 * Supply orders counter by status
 */
export interface FboSupplyOrderStatusCounter {
  /**
   * Статус заявок
   * Order status
   */
  status?: string;

  /**
   * Количество заявок
   * Orders count
   */
  count?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ с количеством заявок по статусам
 * Response with supply orders count by status
 */
export interface FboSupplyOrderStatusCounterResponse {
  /**
   * Счетчики по статусам
   * Status counters
   */
  counters?: FboSupplyOrderStatusCounter[];

  /**
   * Общее количество заявок
   * Total orders count
   */
  total?: number;

  readonly [key: string]: unknown;
}

/**
 * Информация об интервале поставки
 * Supply order timeslot information
 */
export interface FboSupplyOrderTimeslot {
  /**
   * Идентификатор интервала
   * Timeslot ID
   */
  timeslot_id?: string;

  /**
   * Дата и время начала
   * Start date and time
   */
  start_time?: string;

  /**
   * Дата и время окончания
   * End date and time
   */
  end_time?: string;

  /**
   * Доступность
   * Availability
   */
  is_available?: boolean;

  /**
   * Максимальное количество паллет
   * Maximum pallets count
   */
  max_pallets?: number;

  /**
   * Текущая загруженность
   * Current occupancy
   */
  current_occupancy?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ с интервалами поставки
 * Response with supply order timeslots
 */
export interface FboSupplyOrderTimeslotGetResponse {
  /**
   * Список интервалов поставки
   * List of supply order timeslots
   */
  timeslots?: FboSupplyOrderTimeslot[];

  readonly [key: string]: unknown;
}

/**
 * Ответ со статусом интервала поставки
 * Response with supply order timeslot status
 */
export interface FboSupplyOrderTimeslotStatusResponse {
  /**
   * Информация об интервале
   * Timeslot information
   */
  timeslot?: FboSupplyOrderTimeslot;

  /**
   * Статус бронирования
   * Booking status
   */
  booking_status?: "available" | "booked" | "expired";

  readonly [key: string]: unknown;
}

/**
 * Ответ на обновление интервала поставки
 * Response for supply order timeslot update
 */
export interface FboSupplyOrderTimeslotUpdateResponse {
  /**
   * Идентификатор задачи
   * Task ID
   */
  task_id?: string;

  /**
   * Статус обновления
   * Update status
   */
  status?: "pending" | "processing" | "completed" | "error";

  readonly [key: string]: unknown;
}

/**
 * Информация о товаре в отправлении FBO
 * Product information in FBO posting
 */
export interface FboPostingProduct {
  /**
   * SKU товара
   * Product SKU
   */
  sku?: string;

  /**
   * Название товара
   * Product name
   */
  name?: string;

  /**
   * Количество
   * Quantity
   */
  quantity?: number;

  /**
   * Цена за единицу
   * Price per unit
   */
  price?: number;

  /**
   * Валюта
   * Currency
   */
  currency?: string;

  readonly [key: string]: unknown;
}

/**
 * Информация об отправлении FBO
 * FBO posting information
 */
export interface FboPosting {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Статус отправления
   * Posting status
   */
  status?: string;

  /**
   * Дата создания
   * Creation date
   */
  created_at?: string;

  /**
   * Дата отгрузки
   * Shipment date
   */
  shipped_at?: string;

  /**
   * Дата доставки
   * Delivery date
   */
  delivered_at?: string;

  /**
   * Склад отправления
   * Origin warehouse
   */
  warehouse_id?: number;

  /**
   * Товары в отправлении
   * Products in posting
   */
  products?: FboPostingProduct[];

  /**
   * Аналитические данные
   * Analytics data
   */
  analytics_data?: {
    /** Регион доставки */
    delivery_region?: string;
    /** Способ доставки */
    delivery_method?: string;
    /** Стоимость доставки */
    delivery_cost?: number;
  };

  /**
   * Финансовые данные
   * Financial data
   */
  financial_data?: {
    /** Общая стоимость товаров */
    products_total?: number;
    /** Комиссия OZON */
    commission?: number;
    /** К выплате продавцу */
    payout_amount?: number;
  };

  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией об отправлении FBO
 * Response with FBO posting information
 */
export interface FboPostingGetResponse {
  /**
   * Информация об отправлении
   * Posting information
   */
  posting?: FboPosting;

  readonly [key: string]: unknown;
}

/**
 * Ответ со списком отправлений FBO
 * Response with FBO postings list
 */
export interface FboPostingListResponse {
  /**
   * Список отправлений
   * List of postings
   */
  postings?: FboPosting[];

  /**
   * Общее количество
   * Total count
   */
  total?: number;

  /**
   * Есть ли еще записи
   * Has more records
   */
  has_next?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Информация о заявке на поставку
 * Supply order information
 */
export interface FboSupplyOrder {
  /**
   * Идентификатор заявки
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Статус заявки
   * Supply order status
   */
  status?: string;

  /**
   * Дата создания
   * Creation date
   */
  created_at?: string;

  /**
   * Плановая дата поставки
   * Planned delivery date
   */
  planned_delivery_date?: string;

  /**
   * Фактическая дата поставки
   * Actual delivery date
   */
  actual_delivery_date?: string;

  /**
   * Склад назначения
   * Destination warehouse
   */
  warehouse_id?: number;

  /**
   * Интервал поставки
   * Delivery timeslot
   */
  timeslot?: FboSupplyOrderTimeslot;

  /**
   * Товары в заявке
   * Products in supply order
   */
  products?: FboSupplyOrderProduct[];

  /**
   * Общее количество товаров
   * Total products count
   */
  total_products?: number;

  /**
   * Общая стоимость
   * Total amount
   */
  total_amount?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о заявке на поставку
 * Response with supply order information
 */
export interface FboSupplyOrderGetResponse {
  /**
   * Информация о заявке
   * Supply order information
   */
  supply_order?: FboSupplyOrder;

  readonly [key: string]: unknown;
}

/**
 * Ответ со списком заявок на поставку
 * Response with supply orders list
 */
export interface FboSupplyOrderListResponse {
  /**
   * Список заявок на поставку
   * List of supply orders
   */
  supply_orders?: FboSupplyOrder[];

  /**
   * Общее количество
   * Total count
   */
  total?: number;

  /**
   * Есть ли еще записи
   * Has more records
   */
  has_next?: boolean;

  readonly [key: string]: unknown;
}
