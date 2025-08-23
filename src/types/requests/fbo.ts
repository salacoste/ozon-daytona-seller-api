/**
 * Request types for FBO API
 * Generated from OZON API documentation
 * FBO - Fulfillment by OZON operations
 */

/**
 * Запрос причин отмены отправлений FBO
 * Request for FBO posting cancel reasons
 */
export interface FboCancelReasonListRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос загруженности складов Ozon
 * Request for Ozon warehouse availability
 */
export interface FboWarehouseAvailabilityRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос состава поставки или заявки на поставку
 * Request for supply order bundle
 */
export interface FboSupplyOrderBundleRequest {
  /** 
   * Идентификатор поставки или черновика заявки
   * Supply order or draft ID
   */
  supply_order_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос данных о водителе и автомобиле
 * Request for driver and vehicle data
 */
export interface FboSupplyOrderPassCreateRequest {
  /** 
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;
  
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
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса ввода данных о водителе и автомобиле
 * Request for driver and vehicle data status
 */
export interface FboSupplyOrderPassStatusRequest {
  /** 
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос количества заявок по статусам
 * Request for supply orders count by status
 */
export interface FboSupplyOrderStatusCounterRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос интервалов поставки
 * Request for supply order timeslots
 */
export interface FboSupplyOrderTimeslotGetRequest {
  /** 
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;
  
  /** 
   * Дата начала периода
   * Period start date
   */
  date_from?: string;
  
  /** 
   * Дата окончания периода
   * Period end date
   */
  date_to?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса интервала поставки
 * Request for supply order timeslot status
 */
export interface FboSupplyOrderTimeslotStatusRequest {
  /** 
   * Идентификатор интервала поставки
   * Timeslot ID
   */
  timeslot_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления интервала поставки
 * Request for supply order timeslot update
 */
export interface FboSupplyOrderTimeslotUpdateRequest {
  /** 
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;
  
  /** 
   * Новый идентификатор интервала поставки
   * New timeslot ID
   */
  timeslot_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации об отправлении FBO
 * Request for FBO posting information
 */
export interface FboPostingGetRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Дополнительные поля для ответа
   * Additional fields for response
   */
  with?: {
    /** Включить аналитические данные */
    analytics_data?: boolean;
    /** Включить информацию о продуктах */
    products?: boolean;
    /** Включить финансовые данные */
    financial_data?: boolean;
  };
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка отправлений FBO
 * Request for FBO postings list
 */
export interface FboPostingListRequest {
  /** 
   * Дата начала периода
   * Period start date
   */
  since?: string;
  
  /** 
   * Дата окончания периода
   * Period end date
   */
  to?: string;
  
  /** 
   * Направление сортировки
   * Sort direction
   */
  dir?: 'ASC' | 'DESC';
  
  /** 
   * Фильтр по статусу
   * Status filter
   */
  filter?: {
    /** Статусы отправлений */
    status?: string[];
    /** Склады отправления */
    warehouse_id?: number[];
  };
  
  /** 
   * Лимит записей
   * Record limit
   */
  limit?: number;
  
  /** 
   * Смещение для пагинации
   * Pagination offset
   */
  offset?: number;
  
  /** 
   * Дополнительные поля для ответа
   * Additional fields for response
   */
  with?: {
    /** Включить аналитические данные */
    analytics_data?: boolean;
    /** Включить информацию о продуктах */
    products?: boolean;
    /** Включить финансовые данные */
    financial_data?: boolean;
  };
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о заявке на поставку
 * Request for supply order information
 */
export interface FboSupplyOrderGetRequest {
  /** 
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка заявок на поставку
 * Request for supply orders list
 */
export interface FboSupplyOrderListRequest {
  /** 
   * Дата начала периода
   * Period start date
   */
  since?: string;
  
  /** 
   * Дата окончания периода
   * Period end date
   */
  to?: string;
  
  /** 
   * Направление сортировки
   * Sort direction
   */
  dir?: 'ASC' | 'DESC';
  
  /** 
   * Фильтр по статусу
   * Status filter
   */
  filter?: {
    /** Статусы заявок */
    status?: string[];
    /** Склады назначения */
    warehouse_id?: number[];
  };
  
  /** 
   * Лимит записей
   * Record limit
   */
  limit?: number;
  
  /** 
   * Смещение для пагинации
   * Pagination offset
   */
  offset?: number;
  
  readonly [key: string]: unknown;
}