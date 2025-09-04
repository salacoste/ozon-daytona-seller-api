/**
 * Request types for CancellationAPI
 * Order cancellation management
 * Ready for manual editing and enhancements
 */

/**
 * Инициатор отмены заказа
 * Order cancellation initiator
 */
export type CancellationInitiator = "OZON" | "SELLER" | "CLIENT" | "SYSTEM" | "DELIVERY";

/**
 * Статус заявки на отмену
 * Cancellation request status
 */
export type CancellationState = "ALL" | "ON_APPROVAL" | "APPROVED" | "REJECTED";

/**
 * Фильтры для списка заявок на отмену (v1)
 * Filters for cancellation requests list (v1)
 */
export interface CancellationListRequestFilters {
  /**
   * Инициатор отмены
   * Cancellation initiator
   */
  cancellation_initiator?: CancellationInitiator[];

  /**
   * Номера отправлений
   * Posting numbers
   */
  posting_number?: string[];

  /**
   * Статус заявки на отмену
   * Cancellation request status
   */
  state?: CancellationState;

  readonly [key: string]: unknown;
}

/**
 * Дополнительная информация для запроса списка (v1)
 * Additional information for list request (v1)
 */
export interface CancellationListRequestWith {
  /**
   * Включить счётчики заявок в разных статусах
   * Include counters for requests in different statuses
   */
  counters?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка заявок на отмену (v1)
 * Cancellation requests list request (v1)
 */
export interface CancellationGetListRequest {
  /**
   * Фильтры
   * Filters
   */
  filters?: CancellationListRequestFilters;

  /**
   * Количество заявок в ответе
   * Number of requests in response
   */
  limit: number;

  /**
   * Количество элементов для пропуска
   * Number of elements to skip
   */
  offset?: number;

  /**
   * Дополнительная информация
   * Additional information
   */
  with?: CancellationListRequestWith;

  readonly [key: string]: unknown;
}

/**
 * Запрос информации о заявке на отмену
 * Get cancellation request information
 */
export interface CancellationGetRequest {
  /**
   * Идентификатор заявки на отмену
   * Cancellation request identifier
   */
  cancellation_id: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос подтверждения или отклонения заявки на отмену
 * Request to approve or reject cancellation
 */
export interface CancellationMoveRequest {
  /**
   * Идентификатор заявки на отмену
   * Cancellation request identifier
   */
  cancellation_id: number;

  /**
   * Комментарий
   * Comment
   */
  comment?: string;

  readonly [key: string]: unknown;
}

/**
 * Фильтры для списка заявок на отмену (v2)
 * Filters for cancellation requests list (v2)
 */
export interface CancellationListV2RequestFilters {
  /**
   * Инициатор отмены
   * Cancellation initiator
   */
  cancellation_initiator?: CancellationInitiator[];

  /**
   * Номера отправлений
   * Posting numbers
   */
  posting_number?: string[];

  /**
   * Статус заявки на отмену
   * Cancellation request status
   */
  state?: CancellationState;

  readonly [key: string]: unknown;
}

/**
 * Дополнительная информация для запроса списка (v2)
 * Additional information for list request (v2)
 */
export interface CancellationListV2RequestWith {
  /**
   * Включить счётчик заявок в статусе ON_APPROVAL
   * Include counter for requests in ON_APPROVAL status
   */
  counter?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка заявок на отмену (v2)
 * Cancellation requests list request (v2)
 */
export interface CancellationGetListV2Request {
  /**
   * Фильтры
   * Filters
   */
  filters?: CancellationListV2RequestFilters;

  /**
   * Идентификатор последнего элемента на странице
   * Last item ID on page
   */
  last_id?: number;

  /**
   * Количество заявок в ответе (максимум 500)
   * Number of requests in response (maximum 500)
   */
  limit: number;

  /**
   * Дополнительная информация
   * Additional information
   */
  with?: CancellationListV2RequestWith;

  readonly [key: string]: unknown;
}

/**
 * Запрос подтверждения заявки на отмену (v2)
 * Approve cancellation request (v2)
 */
export interface CancellationApproveV2Request {
  /**
   * Идентификатор заявки на отмену
   * Cancellation request identifier
   */
  cancellation_id: number;

  /**
   * Комментарий
   * Comment
   */
  comment?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос отклонения заявки на отмену (v2)
 * Reject cancellation request (v2)
 */
export interface CancellationRejectV2Request {
  /**
   * Идентификатор заявки на отмену
   * Cancellation request identifier
   */
  cancellation_id: number;

  /**
   * Комментарий с объяснением причины отклонения
   * Comment explaining rejection reason
   */
  comment: string;

  readonly [key: string]: unknown;
}
