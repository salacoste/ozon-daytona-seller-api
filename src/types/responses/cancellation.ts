/**
 * Response types for CancellationAPI
 * Order cancellation management
 * Ready for manual editing and enhancements
 */

/**
 * Причина отмены заказа
 * Order cancellation reason
 */
export interface CancellationReason {
  /**
   * Идентификатор причины отмены
   * Cancellation reason identifier
   */
  id?: number;

  /**
   * Название причины отмены
   * Cancellation reason name
   */
  name?: string;

  readonly [key: string]: unknown;
}

/**
 * Статус заявки на отмену
 * Cancellation request status
 */
export interface CancellationStatus {
  /**
   * Идентификатор статуса
   * Status identifier
   */
  id?: number;

  /**
   * Название статуса
   * Status name
   */
  name?: string;

  /**
   * Код статуса заявки
   * Request status code
   */
  state?: "ON_APPROVAL" | "APPROVED" | "REJECTED";

  readonly [key: string]: unknown;
}

/**
 * Информация о заявке на отмену
 * Cancellation request information
 */
export interface CancellationInfo {
  /**
   * Идентификатор заявки на отмену
   * Cancellation request identifier
   */
  cancellation_id?: number;

  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Причина отмены
   * Cancellation reason
   */
  cancellation_reason?: CancellationReason;

  /**
   * Дата создания заявки на отмену
   * Cancellation request creation date
   */
  cancelled_at?: string;

  /**
   * Комментарий к заявке на отмену
   * Cancellation request comment
   */
  cancellation_reason_message?: string;

  /**
   * Тип интеграции со службой доставки
   * Delivery service integration type
   */
  tpl_integration_type?: string;

  /**
   * Статус заявки на отмену
   * Cancellation request status
   */
  state?: CancellationStatus;

  /**
   * Инициатор отмены
   * Cancellation initiator
   */
  cancellation_initiator?: "OZON" | "SELLER" | "CLIENT" | "SYSTEM" | "DELIVERY";

  /**
   * Дата создания заказа
   * Order creation date
   */
  order_date?: string;

  /**
   * Комментарий при подтверждении/отклонении
   * Comment on approval/rejection
   */
  approve_comment?: string;

  /**
   * Дата подтверждения или отклонения
   * Approval or rejection date
   */
  approve_date?: string;

  /**
   * Дата автоматического подтверждения
   * Automatic approval date
   */
  auto_approve_date?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ получения информации о заявке на отмену
 * Get cancellation information response
 */
export interface CancellationGetResponse {
  /**
   * Информация о заявке на отмену
   * Cancellation request information
   */
  result?: CancellationInfo;

  readonly [key: string]: unknown;
}

/**
 * Счётчики заявок в разных статусах
 * Counters for requests in different statuses
 */
export interface CancellationListCounters {
  /**
   * Количество заявок на рассмотрении
   * Number of requests under review
   */
  on_approval?: number;

  /**
   * Количество подтверждённых заявок
   * Number of approved requests
   */
  approved?: number;

  /**
   * Количество отклонённых заявок
   * Number of rejected requests
   */
  rejected?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ списка заявок на отмену (v1)
 * Cancellation requests list response (v1)
 */
export interface CancellationGetListResponse {
  /**
   * Список заявок на отмену
   * List of cancellation requests
   */
  result?: CancellationInfo[];

  /**
   * Общее количество заявок по фильтрам
   * Total number of requests by filters
   */
  total?: number;

  /**
   * Счётчики заявок в разных статусах
   * Counters for requests in different statuses
   */
  counters?: CancellationListCounters;

  readonly [key: string]: unknown;
}

/**
 * Информация о заявке на отмену (v2)
 * Cancellation request information (v2)
 */
export interface CancellationInfoV2 {
  /**
   * Комментарий при подтверждении/отклонении
   * Comment on approval/rejection
   */
  approve_comment?: string;

  /**
   * Дата подтверждения или отклонения
   * Approval or rejection date
   */
  approve_date?: string;

  /**
   * Дата автоматического подтверждения
   * Automatic approval date
   */
  auto_approve_date?: string;

  /**
   * Идентификатор заявки на отмену
   * Cancellation request identifier
   */
  cancellation_id?: number;

  /**
   * Инициатор отмены
   * Cancellation initiator
   */
  cancellation_initiator?: "OZON" | "SELLER" | "CLIENT" | "SYSTEM" | "DELIVERY";

  /**
   * Причина отмены
   * Cancellation reason
   */
  cancellation_reason?: CancellationReason;

  /**
   * Комментарий к заявке на отмену
   * Cancellation request comment
   */
  cancellation_reason_message?: string;

  /**
   * Дата создания заявки на отмену
   * Cancellation request creation date
   */
  cancelled_at?: string;

  /**
   * Дата создания заказа
   * Order creation date
   */
  order_date?: string;

  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Предыдущий идентификатор заявки
   * Previous request identifier
   */
  source_id?: number;

  /**
   * Статус заявки на отмену
   * Cancellation request status
   */
  state?: CancellationStatus;

  /**
   * Тип интеграции со службой доставки
   * Delivery service integration type
   */
  tpl_integration_type?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ списка заявок на отмену (v2)
 * Cancellation requests list response (v2)
 */
export interface CancellationGetListV2Response {
  /**
   * Счётчик заявок в статусе ON_APPROVAL
   * Counter for requests in ON_APPROVAL status
   */
  counter?: number;

  /**
   * Идентификатор последнего элемента на странице
   * Last item ID on page
   */
  last_id?: number;

  /**
   * Информация о заявках на отмену
   * Cancellation requests information
   */
  result?: CancellationInfoV2[];

  readonly [key: string]: unknown;
}
