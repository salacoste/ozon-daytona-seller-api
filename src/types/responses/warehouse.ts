/**
 * Response types for WarehouseAPI
 * Generated from OZON API documentation
 * WarehouseAPI - Warehouse management operations
 */

/**
 * Информация о методе доставки
 * Delivery method information
 */
export interface WarehouseDeliveryMethod {
  /** 
   * Идентификатор метода доставки
   * Delivery method ID
   */
  id?: number;
  
  /** 
   * Название метода доставки
   * Delivery method name
   */
  name?: string;
  
  /** 
   * Тип доставки
   * Delivery type
   */
  type?: 'pickup' | 'courier' | 'post';
  
  /** 
   * Статус активности
   * Active status
   */
  is_active?: boolean;
  
  /** 
   * Стоимость доставки
   * Delivery cost
   */
  cost?: number;
  
  /** 
   * Валюта
   * Currency
   */
  currency?: string;
  
  /** 
   * Минимальная сумма заказа
   * Minimum order amount
   */
  min_order_amount?: number;
  
  /** 
   * Время доставки (дни)
   * Delivery time (days)
   */
  delivery_days?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ со списком методов доставки склада
 * Response with warehouse delivery methods list
 */
export interface WarehouseDeliveryMethodListResponse {
  /** 
   * Список методов доставки
   * List of delivery methods
   */
  delivery_methods?: WarehouseDeliveryMethod[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о складе
 * Warehouse information
 */
export interface Warehouse {
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
   * Адрес склада
   * Warehouse address
   */
  address?: string;
  
  /** 
   * Город
   * City
   */
  city?: string;
  
  /** 
   * Регион
   * Region
   */
  region?: string;
  
  /** 
   * Тип склада
   * Warehouse type
   */
  type?: 'FBS' | 'rFBS' | 'FBO' | 'CROSSDOCK';
  
  /** 
   * Статус работы склада
   * Warehouse operational status
   */
  is_active?: boolean;
  
  /** 
   * Часы работы
   * Working hours
   */
  working_hours?: {
    /** День недели */
    day?: string;
    /** Время открытия */
    open_time?: string;
    /** Время закрытия */
    close_time?: string;
    /** Выходной день */
    is_day_off?: boolean;
  }[];
  
  /** 
   * Контактная информация
   * Contact information
   */
  contact?: {
    /** Телефон */
    phone?: string;
    /** Email */
    email?: string;
  };
  
  /** 
   * Доступные методы доставки
   * Available delivery methods
   */
  delivery_methods?: WarehouseDeliveryMethod[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ со списком складов
 * Response with warehouses list
 */
export interface WarehouseListResponse {
  /** 
   * Список складов
   * List of warehouses
   */
  warehouses?: Warehouse[];
  
  /** 
   * Общее количество
   * Total count
   */
  total?: number;
  
  readonly [key: string]: unknown;
}