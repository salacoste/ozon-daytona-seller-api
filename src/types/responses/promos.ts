/**
 * Response types for Promos API
 * Promotional campaigns and discount management
 * Ready for manual editing and enhancements
 */

/**
 * Информация об акции
 * Promotion information
 */
export interface PromosAction {
  /** 
   * Идентификатор акции
   * Promotion identifier
   */
  id?: number;
  
  /** 
   * Название акции
   * Promotion name
   */
  title?: string;
  
  /** 
   * Описание акции
   * Promotion description
   */
  description?: string;
  
  /** 
   * Дата начала акции
   * Promotion start date
   */
  date_start?: string;
  
  /** 
   * Дата окончания акции
   * Promotion end date
   */
  date_end?: string;
  
  /** 
   * Статус акции
   * Promotion status
   */
  status?: string;
  
  /** 
   * Тип акции
   * Promotion type
   */
  action_type?: string;
  
  /** 
   * Возможность участия
   * Participation availability
   */
  is_participating_available?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка акций
 * Promotions list response
 */
export interface PromosGetActionsResponse {
  /** 
   * Список доступных акций
   * List of available promotions
   */
  result?: PromosAction[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о товаре в акции
 * Product information in promotion
 */
export interface PromosProduct {
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  product_id?: number;
  
  /** 
   * Идентификатор товара в системе Ozon
   * Product identifier in Ozon system
   */
  sku?: number;
  
  /** 
   * Название товара
   * Product name
   */
  name?: string;
  
  /** 
   * Текущая цена товара
   * Current product price
   */
  price?: string;
  
  /** 
   * Цена в акции
   * Price in promotion
   */
  action_price?: string;
  
  /** 
   * Количество товара
   * Product quantity
   */
  stock?: number;
  
  /** 
   * Статус участия в акции
   * Promotion participation status
   */
  is_participating?: boolean;
  
  /** 
   * Может ли участвовать в акции
   * Can participate in promotion
   */
  is_available?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Результат списка товаров в акции
 * Promotion products list result
 */
export interface PromosProductsResult {
  /** 
   * Список товаров
   * Products list
   */
  products?: PromosProduct[];
  
  /** 
   * Общее количество товаров
   * Total products count
   */
  total?: number;
  
  /** 
   * Идентификатор последнего товара для пагинации
   * Last product identifier for pagination
   */
  last_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка товаров в акции
 * Promotion products list response
 */
export interface PromosGetProductsResponse {
  /** 
   * Результат запроса
   * Request result
   */
  result?: PromosProductsResult;
  
  readonly [key: string]: unknown;
}

/**
 * Заявка на скидку
 * Discount task
 */
export interface PromosDiscountTask {
  /** 
   * Идентификатор заявки
   * Task identifier
   */
  task_id?: string;
  
  /** 
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  product_id?: number;
  
  /** 
   * Идентификатор товара в системе Ozon
   * Product identifier in Ozon system
   */
  sku?: number;
  
  /** 
   * Название товара
   * Product name
   */
  product_name?: string;
  
  /** 
   * Текущая цена товара
   * Current product price
   */
  current_price?: string;
  
  /** 
   * Желаемая цена со скидкой
   * Desired discounted price
   */
  desired_price?: string;
  
  /** 
   * Размер скидки в процентах
   * Discount percentage
   */
  discount_percentage?: number;
  
  /** 
   * Статус заявки
   * Task status
   */
  status?: string;
  
  /** 
   * Дата создания заявки
   * Task creation date
   */
  created_at?: string;
  
  /** 
   * Дата обновления заявки
   * Task update date
   */
  updated_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка заявок на скидку
 * Discount tasks list response
 */
export interface PromosGetDiscountTasksResponse {
  /** 
   * Список заявок на скидку
   * List of discount tasks
   */
  result?: PromosDiscountTask[];
  
  readonly [key: string]: unknown;
}

/**
 * Результат обработки заявки
 * Task processing result
 */
export interface PromosTaskProcessingResult {
  /** 
   * Количество успешно обработанных заявок
   * Number of successfully processed tasks
   */
  processed_count?: number;
  
  /** 
   * Количество заявок с ошибками
   * Number of tasks with errors
   */
  error_count?: number;
  
  /** 
   * Список ошибок
   * List of errors
   */
  errors?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ согласования/отклонения заявок на скидку
 * Response for approving/declining discount tasks
 */
export interface PromosProcessDiscountTasksResponse {
  /** 
   * Результат обработки заявок
   * Tasks processing result
   */
  result?: PromosTaskProcessingResult;
  
  readonly [key: string]: unknown;
}

/**
 * Результат обработки товара в акции
 * Product processing result in promotion
 */
export interface PromosProductProcessingResult {
  /** 
   * Идентификатор товара
   * Product identifier
   */
  product_id?: number;
  
  /** 
   * Статус обработки
   * Processing status
   */
  is_updated?: boolean;
  
  /** 
   * Ошибки обработки
   * Processing errors
   */
  errors?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Результат активации товаров в акции
 * Products activation result in promotion
 */
export interface PromosActivationResult {
  /** 
   * Результаты обработки товаров
   * Products processing results
   */
  results?: PromosProductProcessingResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ добавления товаров в акцию
 * Response for adding products to promotion
 */
export interface PromosActivateProductsResponse {
  /** 
   * Результат активации товаров
   * Products activation result
   */
  result?: PromosActivationResult;
  
  readonly [key: string]: unknown;
}

/**
 * Результат деактивации товаров в акции
 * Products deactivation result in promotion
 */
export interface PromosDeactivationResult {
  /** 
   * Результаты обработки товаров
   * Products processing results
   */
  results?: PromosProductProcessingResult[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ удаления товаров из акции
 * Response for removing products from promotion
 */
export interface PromosDeactivateProductsResponse {
  /** 
   * Результат деактивации товаров
   * Products deactivation result
   */
  result?: PromosDeactivationResult;
  
  readonly [key: string]: unknown;
}