/**
 * Request types for FBOSupplyRequest API
 * Generated from OZON API documentation
 * FBOSupplyRequest - FBO supply order management
 */

/**
 * Запрос генерации этикеток для грузомест
 * Request for cargo labels generation
 */
export interface FboSupplyRequestCargoesLabelCreateRequest {
  /**
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Список идентификаторов грузомест
   * List of cargo IDs
   */
  cargo_ids?: number[];

  readonly [key: string]: unknown;
}

/**
 * Запрос получения статуса этикеток
 * Request for label status
 */
export interface FboSupplyRequestCargoesLabelGetRequest {
  /**
   * Идентификатор задачи генерации этикеток
   * Label generation task ID
   */
  task_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос установки грузомест
 * Request for setting cargoes
 */
export interface FboSupplyRequestCargoesCreateRequest {
  /**
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Список грузомест
   * List of cargoes
   */
  cargoes?: Array<{
    /** Номер грузоместа */
    cargo_number?: string;
    /** Вес (кг) */
    weight?: number;
    /** Длина (см) */
    length?: number;
    /** Ширина (см) */
    width?: number;
    /** Высота (см) */
    height?: number;
    /** Товары в грузоместе */
    items?: Array<{
      /** SKU товара */
      sku?: string;
      /** Количество */
      quantity?: number;
    }>;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос информации по установке грузомест
 * Request for cargoes creation info
 */
export interface FboSupplyRequestCargoesCreateInfoRequest {
  /**
   * Идентификатор задачи установки грузомест
   * Cargoes creation task ID
   */
  task_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос удаления грузомест
 * Request for cargo deletion
 */
export interface FboSupplyRequestCargoesDeleteRequest {
  /**
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Список идентификаторов грузомест для удаления
   * List of cargo IDs to delete
   */
  cargo_ids?: number[];

  readonly [key: string]: unknown;
}

/**
 * Запрос статуса удаления грузомест
 * Request for cargo deletion status
 */
export interface FboSupplyRequestCargoesDeleteStatusRequest {
  /**
   * Идентификатор задачи удаления
   * Deletion task ID
   */
  task_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос чек-листа по установке грузомест
 * Request for cargo rules checklist
 */
export interface FboSupplyRequestCargoesRulesGetRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о кластерах и складах
 * Request for cluster and warehouse information
 */
export interface FboSupplyRequestClusterListRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос создания черновика заявки на поставку
 * Request for supply draft creation
 */
export interface FboSupplyRequestDraftCreateRequest {
  /**
   * Тип поставки
   * Supply type
   */
  supply_type?: "DIRECT" | "CROSSDOCK";

  /**
   * Идентификатор склада назначения
   * Destination warehouse ID
   */
  warehouse_id?: number;

  /**
   * Товары для поставки
   * Items to supply
   */
  items?: Array<{
    /** SKU товара */
    sku?: string;
    /** Количество */
    quantity?: number;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос информации о черновике заявки
 * Request for draft information
 */
export interface FboSupplyRequestDraftCreateInfoRequest {
  /**
   * Идентификатор черновика
   * Draft ID
   */
  draft_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос создания заявки на поставку по черновику
 * Request for supply order creation from draft
 */
export interface FboSupplyRequestDraftSupplyCreateRequest {
  /**
   * Идентификатор черновика
   * Draft ID
   */
  draft_id?: string;

  /**
   * Идентификатор таймслота
   * Timeslot ID
   */
  timeslot_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос статуса создания заявки на поставку
 * Request for supply order creation status
 */
export interface FboSupplyRequestDraftSupplyCreateStatusRequest {
  /**
   * Идентификатор задачи создания
   * Creation task ID
   */
  task_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос доступных таймслотов
 * Request for available timeslots
 */
export interface FboSupplyRequestDraftTimeslotInfoRequest {
  /**
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;

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
 * Запрос отмены заявки на поставку
 * Request for supply order cancellation
 */
export interface FboSupplyRequestSupplyOrderCancelRequest {
  /**
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Причина отмены
   * Cancellation reason
   */
  reason?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос статуса отмены заявки на поставку
 * Request for supply order cancellation status
 */
export interface FboSupplyRequestSupplyOrderCancelStatusRequest {
  /**
   * Идентификатор задачи отмены
   * Cancellation task ID
   */
  task_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос редактирования товарного состава
 * Request for content update
 */
export interface FboSupplyRequestSupplyOrderContentUpdateRequest {
  /**
   * Идентификатор заявки на поставку
   * Supply order ID
   */
  supply_order_id?: number;

  /**
   * Обновленный товарный состав
   * Updated content
   */
  items?: Array<{
    /** SKU товара */
    sku?: string;
    /** Новое количество */
    quantity?: number;
    /** Операция (add/update/delete) */
    operation?: "add" | "update" | "delete";
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос статуса редактирования товарного состава
 * Request for content update status
 */
export interface FboSupplyRequestSupplyOrderContentUpdateStatusRequest {
  /**
   * Идентификатор задачи редактирования
   * Update task ID
   */
  task_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос поиска точек для отгрузки поставки
 * Request for FBO warehouse list
 */
export interface FboSupplyRequestWarehouseFboListRequest {
  /**
   * Регион поиска
   * Search region
   */
  region?: string;

  /**
   * Тип склада
   * Warehouse type
   */
  warehouse_type?: "DIRECT" | "CROSSDOCK";

  readonly [key: string]: unknown;
}
