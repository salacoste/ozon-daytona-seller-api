/**
 * Response types for DeliveryrFBS API
 * Generated from OZON API documentation
 * DeliveryrFBS - Return FBS delivery operations
 */

/**
 * Ответ на уточнение даты отгрузки отправления
 * Response for posting shipment date clarification
 */
export interface DeliveryRfbsSetCutoffResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: 'success' | 'error';
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Информация об ограничениях переноса доставки
 * Delivery rescheduling restrictions information
 */
export interface DeliveryRfbsTimeslotChangeRestrictions {
  /** 
   * Доступные даты для переноса
   * Available dates for rescheduling
   */
  available_dates?: string[];
  
  /** 
   * Количество доступных переносов
   * Available reschedules count
   */
  available_reschedules?: number;
  
  /** 
   * Общее количество разрешенных переносов
   * Total allowed reschedules
   */
  max_reschedules?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с доступными датами для переноса доставки
 * Response with available delivery rescheduling dates
 */
export interface DeliveryRfbsTimeslotChangeRestrictionsResponse {
  /** 
   * Информация об ограничениях
   * Restrictions information
   */
  restrictions?: DeliveryRfbsTimeslotChangeRestrictions;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на перенос даты доставки
 * Response for delivery date rescheduling
 */
export interface DeliveryRfbsTimeslotSetResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: 'success' | 'error';
  
  /** 
   * Новая дата доставки
   * New delivery date
   */
  new_timeslot_date?: string;
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на изменение статуса отправления
 * Response for posting status change
 */
export interface DeliveryRfbsPostingMoveStatusResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: 'success' | 'error';
  
  /** 
   * Новый статус отправления
   * New posting status
   */
  status?: string;
  
  /** 
   * Дата изменения статуса
   * Status change date
   */
  status_changed_at?: string;
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на изменение статуса на "Доставлено"
 * Response for status change to "Delivered"
 */
export interface DeliveryRfbsPostingDeliveredResponse extends DeliveryRfbsPostingMoveStatusResponse {
  readonly [key: string]: unknown;
}

/**
 * Ответ на изменение статуса на "Доставляется"
 * Response for status change to "Delivering"
 */
export interface DeliveryRfbsPostingDeliveringResponse extends DeliveryRfbsPostingMoveStatusResponse {
  readonly [key: string]: unknown;
}

/**
 * Ответ на изменение статуса на "Последняя миля"
 * Response for status change to "Last mile"
 */
export interface DeliveryRfbsPostingLastMileResponse extends DeliveryRfbsPostingMoveStatusResponse {
  readonly [key: string]: unknown;
}

/**
 * Ответ на изменение статуса на "Отправлено продавцом"
 * Response for status change to "Sent by seller"
 */
export interface DeliveryRfbsPostingSentBySellerResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: 'success' | 'error';
  
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Новый статус
   * New status
   */
  status?: string;
  
  /** 
   * Дата отправки продавцом
   * Sent by seller date
   */
  sent_by_seller_at?: string;
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Результат добавления трек-номера
 * Tracking number addition result
 */
export interface DeliveryRfbsTrackingNumberResult {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Результат операции
   * Operation result
   */
  result?: 'success' | 'error';
  
  /** 
   * Трек-номер
   * Tracking number
   */
  tracking_number?: string;
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на добавление трек-номеров
 * Response for tracking numbers addition
 */
export interface DeliveryRfbsTrackingNumberSetResponse {
  /** 
   * Результаты добавления трек-номеров
   * Tracking numbers addition results
   */
  results?: DeliveryRfbsTrackingNumberResult[];
  
  readonly [key: string]: unknown;
}