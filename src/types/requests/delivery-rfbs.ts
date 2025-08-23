/**
 * Request types for DeliveryrFBS API
 * Generated from OZON API documentation
 * DeliveryrFBS - Return FBS delivery operations
 */

/**
 * Запрос на уточнение даты отгрузки отправления
 * Request to clarify posting shipment date
 */
export interface DeliveryRfbsSetCutoffRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Дата отгрузки
   * Shipment date
   */
  cutoff_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос доступных дат для переноса доставки
 * Request for available delivery rescheduling dates
 */
export interface DeliveryRfbsTimeslotChangeRestrictionsRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос переноса даты доставки
 * Request to reschedule delivery date
 */
export interface DeliveryRfbsTimeslotSetRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Новая дата доставки
   * New delivery date
   */
  timeslot_date?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос изменения статуса на "Доставлено"
 * Request to change status to "Delivered"
 */
export interface DeliveryRfbsPostingDeliveredRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Дата доставки
   * Delivery date
   */
  delivered_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос изменения статуса на "Доставляется"
 * Request to change status to "Delivering"
 */
export interface DeliveryRfbsPostingDeliveringRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Дата начала доставки
   * Delivery start date
   */
  delivering_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос изменения статуса на "Последняя миля"
 * Request to change status to "Last mile"
 */
export interface DeliveryRfbsPostingLastMileRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Дата начала последней мили
   * Last mile start date
   */
  last_mile_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос изменения статуса на "Отправлено продавцом"
 * Request to change status to "Sent by seller"
 */
export interface DeliveryRfbsPostingSentBySellerRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Дата отправки продавцом
   * Sent by seller date
   */
  sent_by_seller_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос добавления трек-номеров
 * Request to add tracking numbers
 */
export interface DeliveryRfbsTrackingNumberSetRequest {
  /** 
   * Список отправлений с трек-номерами
   * List of postings with tracking numbers
   */
  tracking_numbers?: Array<{
    /** Номер отправления */
    posting_number?: string;
    /** Трек-номер */
    tracking_number?: string;
    /** Служба доставки */
    delivery_service?: string;
  }>;
  
  readonly [key: string]: unknown;
}