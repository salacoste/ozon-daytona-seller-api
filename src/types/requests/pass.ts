/**
 * Request types for Pass API
 * Arrival pass and warehouse access management
 * Ready for manual editing and enhancements
 */

/**
 * Информация о пропуске для перевозки
 * Carriage pass information
 */
export interface PassCarriagePassInfo {
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
   * Комментарий
   * Comment
   */
  comment?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания пропуска для перевозки
 * Create carriage pass request
 */
export interface PassCreateCarriagePassRequest {
  /** 
   * Идентификатор перевозки
   * Carriage identifier
   */
  carriage_id: number;
  
  /** 
   * Список пропусков
   * Passes list
   */
  arrival_passes: PassCarriagePassInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления пропуска для перевозки
 * Delete carriage pass request
 */
export interface PassDeleteCarriagePassRequest {
  /** 
   * Идентификатор перевозки
   * Carriage identifier
   */
  carriage_id: number;
  
  /** 
   * Идентификаторы пропусков для удаления
   * Pass identifiers to delete
   */
  arrival_pass_ids: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о пропуске для обновления перевозки
 * Carriage pass update information
 */
export interface PassCarriagePassUpdateInfo {
  /** 
   * Идентификатор пропуска
   * Pass identifier
   */
  arrival_pass_id?: string;
  
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
   * Комментарий
   * Comment
   */
  comment?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления пропуска для перевозки
 * Update carriage pass request
 */
export interface PassUpdateCarriagePassRequest {
  /** 
   * Идентификатор перевозки
   * Carriage identifier
   */
  carriage_id: number;
  
  /** 
   * Список пропусков для обновления
   * Passes list to update
   */
  arrival_passes: PassCarriagePassUpdateInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Фильтр для списка пропусков
 * Filter for passes list
 */
export interface PassListFilter {
  /** 
   * Идентификатор перевозки
   * Carriage identifier
   */
  carriage_id?: number;
  
  /** 
   * Статус пропуска
   * Pass status
   */
  status?: string;
  
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
 * Запрос списка пропусков
 * Pass list request
 */
export interface PassListRequest {
  /** 
   * Ограничение по количеству записей в ответе (максимум 1000)
   * Response records limit (maximum 1000)
   */
  limit: number;
  
  /** 
   * Указатель для выборки следующих данных
   * Cursor for next data selection
   */
  cursor?: string;
  
  /** 
   * Фильтр
   * Filter
   */
  filter?: PassListFilter;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о пропуске для возврата
 * Return pass information
 */
export interface PassReturnPassInfo {
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
   * Комментарий
   * Comment
   */
  comment?: string;
  
  /** 
   * Номер отправления для возврата
   * Return posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания пропуска для возврата
 * Create return pass request
 */
export interface PassCreateReturnPassRequest {
  /** 
   * Список пропусков для возврата
   * Return passes list
   */
  arrival_passes: PassReturnPassInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления пропуска для возврата
 * Delete return pass request
 */
export interface PassDeleteReturnPassRequest {
  /** 
   * Идентификаторы пропусков для удаления
   * Pass identifiers to delete
   */
  arrival_pass_ids: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о пропуске для обновления возврата
 * Return pass update information
 */
export interface PassReturnPassUpdateInfo {
  /** 
   * Идентификатор пропуска
   * Pass identifier
   */
  arrival_pass_id?: string;
  
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
   * Комментарий
   * Comment
   */
  comment?: string;
  
  /** 
   * Номер отправления для возврата
   * Return posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос обновления пропуска для возврата
 * Update return pass request
 */
export interface PassUpdateReturnPassRequest {
  /** 
   * Список пропусков для обновления
   * Passes list to update
   */
  arrival_passes: PassReturnPassUpdateInfo[];
  
  readonly [key: string]: unknown;
}