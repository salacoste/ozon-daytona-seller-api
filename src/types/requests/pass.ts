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
 * Запрос создания пропуска для перевозки (строго по MCP документации)
 * Create carriage pass request (strict per MCP documentation)
 */
export interface PassCreateCarriagePassRequest {
  /** 
   * Идентификатор перевозки (обязательно)
   * Carriage identifier (required)
   */
  carriage_id: number;
  
  /** 
   * Список пропусков (обязательно)
   * Passes list (required)
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
 * Причина въезда для фильтра (строго по MCP документации)
 * Arrival reason for filter (strict per MCP documentation)
 */
export type PassArrivalReason = 'FBS_DELIVERY' | 'FBS_RETURN';

/**
 * Фильтр для списка пропусков (строго по MCP документации)
 * Filter for passes list (strict per MCP documentation)
 */
export interface PassListFilter {
  /** 
   * Фильтр по идентификатору пропуска
   * Filter by pass identifier
   */
  arrival_pass_ids?: string[];
  
  /** 
   * Фильтр по цели въезда (FBS_DELIVERY - отгрузка, FBS_RETURN - вывоз возвратов)
   * Filter by arrival reason (FBS_DELIVERY - shipment, FBS_RETURN - returns)
   */
  arrival_reason?: PassArrivalReason;
  
  /** 
   * Фильтр по точке отгрузки
   * Filter by dropoff point
   */
  dropoff_point_ids?: string[];
  
  /** 
   * true, чтобы получить только активные заявки на пропуск
   * true to get only active pass requests
   */
  only_active_passes?: boolean;
  
  /** 
   * Фильтр по складу продавца
   * Filter by seller warehouse
   */
  warehouse_ids?: string[];
  
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