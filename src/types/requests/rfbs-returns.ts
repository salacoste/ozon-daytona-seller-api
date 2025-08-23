/**
 * Request types for RFBSReturnsAPI
 * Generated from OZON API documentation
 * RFBSReturnsAPI - RFBS return processing
 */

/**
 * Запрос на передачу доступных действий для rFBS возвратов
 * Request to set available actions for rFBS returns
 */
export interface RfbsReturnsActionSetRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  /** 
   * Действие для возврата
   * Return action
   */
  action?: 'approve' | 'reject' | 'compensate' | 'return_money' | 'receive_return';
  
  /** 
   * Комментарий к действию
   * Action comment
   */
  comment?: string;
  
  /** 
   * Сумма компенсации (для действия compensate)
   * Compensation amount (for compensate action)
   */
  compensation_amount?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на частичную компенсацию стоимости товара
 * Request for partial product cost compensation
 */
export interface RfbsReturnsCompensateRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  /** 
   * Сумма компенсации
   * Compensation amount
   */
  compensation_amount?: number;
  
  /** 
   * Причина компенсации
   * Compensation reason
   */
  reason?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о заявке на возврат
 * Request for return application information
 */
export interface RfbsReturnsGetRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка заявок на возврат
 * Request for returns list
 */
export interface RfbsReturnsListRequest {
  /** 
   * Фильтр по статусу
   * Status filter
   */
  filter?: {
    /** Статусы возвратов */
    status?: string[];
    /** Дата создания от */
    created_since?: string;
    /** Дата создания до */
    created_to?: string;
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

/**
 * Запрос подтверждения получения товара на проверку
 * Request to confirm product receipt for inspection
 */
export interface RfbsReturnsReceiveReturnRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  /** 
   * Дата получения товара
   * Product receipt date
   */
  received_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос отклонения заявки на возврат
 * Request to reject return application
 */
export interface RfbsReturnsRejectRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  /** 
   * Причина отклонения
   * Rejection reason
   */
  comment?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос возврата денег покупателю
 * Request to return money to customer
 */
export interface RfbsReturnsReturnMoneyRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  /** 
   * Возвращается ли полная стоимость
   * Whether full amount is returned
   */
  full_amount?: boolean;
  
  /** 
   * Сумма к возврату (если не полная)
   * Return amount (if not full)
   */
  return_amount?: number;
  
  /** 
   * Возмещать ли стоимость пересылки
   * Whether to compensate shipping cost
   */
  compensate_shipping?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос одобрения заявки на возврат
 * Request to approve return application
 */
export interface RfbsReturnsVerifyRequest {
  /** 
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;
  
  /** 
   * Комментарий к одобрению
   * Approval comment
   */
  comment?: string;
  
  readonly [key: string]: unknown;
}