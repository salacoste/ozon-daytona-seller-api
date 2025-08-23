/**
 * Response types for Pass API
 * Arrival pass and warehouse access management
 * Ready for manual editing and enhancements
 */

/**
 * Ответ создания пропуска для перевозки
 * Create carriage pass response
 */
export interface PassCreateCarriagePassResponse {
  /** 
   * Идентификаторы созданных пропусков
   * Created pass identifiers
   */
  arrival_pass_ids?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о пропуске в списке
 * Pass information in list
 */
export interface PassInfo {
  /** 
   * Идентификатор пропуска
   * Pass identifier
   */
  arrival_pass_id?: string;
  
  /** 
   * Идентификатор перевозки
   * Carriage identifier
   */
  carriage_id?: number;
  
  /** 
   * Номер автомобиля
   * Vehicle number
   */
  vehicle_number?: string;
  
  /** 
   * ФИО водителя
   * Driver full name
   */
  driver_name?: string;
  
  /** 
   * Номер водительского удостоверения
   * Driver license number
   */
  driver_license?: string;
  
  /** 
   * Дата и время прибытия
   * Arrival date and time
   */
  arrival_date?: string;
  
  /** 
   * Дата создания пропуска
   * Pass creation date
   */
  created_at?: string;
  
  /** 
   * Дата обновления пропуска
   * Pass update date
   */
  updated_at?: string;
  
  /** 
   * Статус пропуска
   * Pass status
   */
  status?: string;
  
  /** 
   * Комментарий
   * Comment
   */
  comment?: string;
  
  /** 
   * Номер отправления (для пропусков возврата)
   * Posting number (for return passes)
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка пропусков
 * Pass list response
 */
export interface PassListResponse {
  /** 
   * Список пропусков для перевозки
   * Carriage passes list
   */
  arrival_passes?: PassInfo[];
  
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ создания пропуска для возврата
 * Create return pass response
 */
export interface PassCreateReturnPassResponse {
  /** 
   * Идентификаторы созданных пропусков
   * Created pass identifiers
   */
  arrival_pass_ids?: string[];
  
  readonly [key: string]: unknown;
}