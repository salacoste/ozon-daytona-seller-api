/**
 * Request types for Promos API
 * Promotional campaigns and discount management
 * Ready for manual editing and enhancements
 */

/**
 * Запрос списка доступных/участвующих товаров в акции
 * Request for list of available/participating products in promotion
 */
export interface PromosGetProductsRequest {
  /**
   * Идентификатор акции
   * Promotion identifier
   */
  action_id: number;

  /**
   * Количество ответов на странице (по умолчанию 100)
   * Number of responses per page (default 100)
   */
  limit?: number;

  /**
   * Количество пропускаемых элементов (устарело, используйте last_id)
   * Number of elements to skip (deprecated, use last_id)
   * @deprecated Будет отключён 5 мая 2025. Используйте last_id
   */
  offset?: number;

  /**
   * Идентификатор последнего значения на странице для пагинации
   * Last value identifier on page for pagination
   */
  last_id?: number;

  readonly [key: string]: unknown;
}

/**
 * Статус заявки на скидку
 * Discount task status
 */
export type PromosDiscountTaskStatus = "NEW" | "SEEN" | "APPROVED" | "DECLINED";

/**
 * Запрос списка заявок на скидку
 * Request for discount tasks list
 */
export interface PromosGetDiscountTasksRequest {
  /**
   * Статус заявки
   * Task status
   */
  status: PromosDiscountTaskStatus;

  /**
   * Максимальное количество заявок на странице
   * Maximum number of tasks per page
   */
  limit: number;

  /**
   * Страница для выгрузки списка заявок
   * Page to download tasks list
   */
  page?: number;

  readonly [key: string]: unknown;
}

/**
 * Заявка на согласование скидки
 * Discount approval task
 */
export interface PromosApprovalTask {
  /**
   * Идентификатор заявки
   * Task identifier
   */
  task_id?: string;

  /**
   * Идентификатор товара
   * Product identifier
   */
  product_id?: number;

  /**
   * Размер скидки в процентах
   * Discount percentage
   */
  discount_percentage?: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос согласования заявок на скидку
 * Request to approve discount tasks
 */
export interface PromosApproveDiscountTasksRequest {
  /**
   * Список заявок для согласования
   * List of tasks to approve
   */
  tasks: PromosApprovalTask[];

  readonly [key: string]: unknown;
}

/**
 * Заявка на отклонение скидки
 * Discount decline task
 */
export interface PromosDeclineTask {
  /**
   * Идентификатор заявки
   * Task identifier
   */
  task_id?: string;

  /**
   * Идентификатор товара
   * Product identifier
   */
  product_id?: number;

  /**
   * Причина отклонения
   * Decline reason
   */
  decline_reason?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос отклонения заявок на скидку
 * Request to decline discount tasks
 */
export interface PromosDeclineDiscountTasksRequest {
  /**
   * Список заявок для отклонения
   * List of tasks to decline
   */
  tasks: PromosDeclineTask[];

  readonly [key: string]: unknown;
}

/**
 * Информация о цене товара для акции
 * Product price information for promotion
 */
export interface PromosProductPrice {
  /**
   * Идентификатор товара в системе продавца
   * Product identifier in seller system
   */
  product_id?: number;

  /**
   * Цена товара в акции
   * Product price in promotion
   */
  action_price?: string;

  /**
   * Количество товара для участия в акции
   * Product quantity for promotion participation
   */
  stock?: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос добавления товаров в акцию
 * Request to add products to promotion
 */
export interface PromosActivateProductsRequest {
  /**
   * Идентификатор акции
   * Promotion identifier
   */
  action_id: number;

  /**
   * Список товаров для добавления в акцию
   * List of products to add to promotion
   */
  products: PromosProductPrice[];

  readonly [key: string]: unknown;
}

/**
 * Запрос удаления товаров из акции
 * Request to remove products from promotion
 */
export interface PromosDeactivateProductsRequest {
  /**
   * Идентификатор акции
   * Promotion identifier
   */
  action_id: number;

  /**
   * Список идентификаторов товаров для удаления из акции
   * List of product identifiers to remove from promotion
   */
  product_ids: number[];

  readonly [key: string]: unknown;
}
