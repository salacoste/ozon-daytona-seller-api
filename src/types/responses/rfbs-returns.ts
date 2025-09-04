/**
 * Response types for RFBSReturnsAPI
 * Generated from OZON API documentation
 * RFBSReturnsAPI - RFBS return processing
 */

/**
 * Ответ на передачу доступных действий для rFBS возвратов
 * Response for setting available actions for rFBS returns
 */
export interface RfbsReturnsActionSetResponse {
  /**
   * Результат операции
   * Operation result
   */
  result?: "success" | "error";

  /**
   * Сообщение об ошибке
   * Error message
   */
  error?: string;

  readonly [key: string]: unknown;
}

/**
 * Пустой ответ
 * Empty response
 */
export interface RfbsReturnsEmptyResponse {
  readonly [key: string]: unknown;
}

/**
 * Информация о товаре в возврате
 * Product information in return
 */
export interface RfbsReturnProduct {
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
   * Общая стоимость
   * Total amount
   */
  total_amount?: number;

  /**
   * Причина возврата
   * Return reason
   */
  return_reason?: string;

  readonly [key: string]: unknown;
}

/**
 * Информация о заявке на возврат
 * Return application information
 */
export interface RfbsReturn {
  /**
   * Идентификатор возврата
   * Return ID
   */
  return_id?: number;

  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Статус возврата
   * Return status
   */
  status?: string;

  /**
   * Дата создания заявки
   * Application creation date
   */
  created_at?: string;

  /**
   * Дата обновления
   * Update date
   */
  updated_at?: string;

  /**
   * Причина возврата от покупателя
   * Customer return reason
   */
  customer_reason?: string;

  /**
   * Комментарий покупателя
   * Customer comment
   */
  customer_comment?: string;

  /**
   * Товары в возврате
   * Products in return
   */
  products?: RfbsReturnProduct[];

  /**
   * Общая сумма возврата
   * Total return amount
   */
  total_amount?: number;

  /**
   * Доступные действия
   * Available actions
   */
  available_actions?: string[];

  /**
   * Комментарий продавца
   * Seller comment
   */
  seller_comment?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о заявке на возврат
 * Response with return application information
 */
export interface RfbsReturnsGetResponse {
  /**
   * Информация о возврате
   * Return information
   */
  return?: RfbsReturn;

  readonly [key: string]: unknown;
}

/**
 * Ответ со списком заявок на возврат
 * Response with returns list
 */
export interface RfbsReturnsListResponse {
  /**
   * Список возвратов
   * List of returns
   */
  returns?: RfbsReturn[];

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
