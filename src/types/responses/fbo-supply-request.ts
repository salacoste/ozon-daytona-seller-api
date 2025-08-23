/**
 * Response types for FBOSupplyRequest API
 * Generated from OZON API documentation
 * FBOSupplyRequest - FBO supply order management
 */

/**
 * Ответ генерации этикеток для грузомест
 * Response for cargo labels generation
 */
export interface FboSupplyRequestCargoesLabelCreateResponse {
  /** 
   * Идентификатор задачи генерации этикеток
   * Label generation task ID
   */
  task_id?: string;
  
  /** 
   * Статус задачи
   * Task status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения статуса этикеток
 * Response for label status
 */
export interface FboSupplyRequestCargoesLabelGetResponse {
  /** 
   * Статус генерации этикеток
   * Label generation status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Идентификатор файла с этикетками
   * Label file ID
   */
  file_guid?: string;
  
  /** 
   * Ссылка на файл с этикетками
   * Label file URL
   */
  file_url?: string;
  
  /** 
   * Сообщение об ошибке (если есть)
   * Error message (if any)
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о грузоместе
 * Cargo information
 */
export interface FboSupplyRequestCargo {
  /** 
   * Идентификатор грузоместа
   * Cargo ID
   */
  cargo_id?: number;
  
  /** 
   * Номер грузоместа
   * Cargo number
   */
  cargo_number?: string;
  
  /** 
   * Вес (кг)
   * Weight (kg)
   */
  weight?: number;
  
  /** 
   * Габариты
   * Dimensions
   */
  dimensions?: {
    /** Длина (см) */
    length?: number;
    /** Ширина (см) */
    width?: number;
    /** Высота (см) */
    height?: number;
  };
  
  /** 
   * Товары в грузоместе
   * Items in cargo
   */
  items?: Array<{
    /** SKU товара */
    sku?: string;
    /** Количество */
    quantity?: number;
    /** Название товара */
    name?: string;
  }>;
  
  /** 
   * Статус грузоместа
   * Cargo status
   */
  status?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ установки грузомест
 * Response for setting cargoes
 */
export interface FboSupplyRequestCargoesCreateResponse {
  /** 
   * Идентификатор задачи установки грузомест
   * Cargoes creation task ID
   */
  task_id?: string;
  
  /** 
   * Статус задачи
   * Task status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации по установке грузомест
 * Response for cargoes creation info
 */
export interface FboSupplyRequestCargoesCreateInfoResponse {
  /** 
   * Статус установки грузомест
   * Cargoes creation status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Созданные грузоместа
   * Created cargoes
   */
  cargoes?: FboSupplyRequestCargo[];
  
  /** 
   * Ошибки при создании
   * Creation errors
   */
  errors?: Array<{
    /** Номер грузоместа */
    cargo_number?: string;
    /** Описание ошибки */
    error_message?: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ удаления грузомест
 * Response for cargo deletion
 */
export interface FboSupplyRequestCargoesDeleteResponse {
  /** 
   * Идентификатор задачи удаления
   * Deletion task ID
   */
  task_id?: string;
  
  /** 
   * Статус задачи
   * Task status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса удаления грузомест
 * Response for cargo deletion status
 */
export interface FboSupplyRequestCargoesDeleteStatusResponse {
  /** 
   * Статус удаления
   * Deletion status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результаты удаления
   * Deletion results
   */
  results?: Array<{
    /** Идентификатор грузоместа */
    cargo_id?: number;
    /** Результат удаления */
    success?: boolean;
    /** Ошибка (если есть) */
    error_message?: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Правило по установке грузомест
 * Cargo rule
 */
export interface FboSupplyRequestCargoRule {
  /** 
   * Тип правила
   * Rule type
   */
  type?: string;
  
  /** 
   * Описание правила
   * Rule description
   */
  description?: string;
  
  /** 
   * Обязательность
   * Is required
   */
  required?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ чек-листа по установке грузомест
 * Response for cargo rules checklist
 */
export interface FboSupplyRequestCargoesRulesGetResponse {
  /** 
   * Список правил
   * List of rules
   */
  rules?: FboSupplyRequestCargoRule[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о складе
 * Warehouse information
 */
export interface FboSupplyRequestWarehouse {
  /** 
   * Идентификатор склада
   * Warehouse ID
   */
  warehouse_id?: number;
  
  /** 
   * Название склада
   * Warehouse name
   */
  name?: string;
  
  /** 
   * Адрес склада
   * Warehouse address
   */
  address?: string;
  
  /** 
   * Тип склада
   * Warehouse type
   */
  type?: 'DIRECT' | 'CROSSDOCK';
  
  /** 
   * Регион
   * Region
   */
  region?: string;
  
  /** 
   * Доступность
   * Availability
   */
  is_available?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о кластере
 * Cluster information
 */
export interface FboSupplyRequestCluster {
  /** 
   * Идентификатор кластера
   * Cluster ID
   */
  cluster_id?: number;
  
  /** 
   * Название кластера
   * Cluster name
   */
  name?: string;
  
  /** 
   * Склады в кластере
   * Warehouses in cluster
   */
  warehouses?: FboSupplyRequestWarehouse[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации о кластерах и складах
 * Response for cluster and warehouse information
 */
export interface FboSupplyRequestClusterListResponse {
  /** 
   * Список кластеров
   * List of clusters
   */
  clusters?: FboSupplyRequestCluster[];
  
  readonly [key: string]: unknown;
}

/**
 * Информация о черновике заявки
 * Draft information
 */
export interface FboSupplyRequestDraft {
  /** 
   * Идентификатор черновика
   * Draft ID
   */
  draft_id?: string;
  
  /** 
   * Тип поставки
   * Supply type
   */
  supply_type?: 'DIRECT' | 'CROSSDOCK';
  
  /** 
   * Склад назначения
   * Destination warehouse
   */
  warehouse?: FboSupplyRequestWarehouse;
  
  /** 
   * Товары
   * Items
   */
  items?: Array<{
    /** SKU товара */
    sku?: string;
    /** Количество */
    quantity?: number;
    /** Название товара */
    name?: string;
  }>;
  
  /** 
   * Статус черновика
   * Draft status
   */
  status?: string;
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ создания черновика заявки на поставку
 * Response for supply draft creation
 */
export interface FboSupplyRequestDraftCreateResponse {
  /** 
   * Информация о созданном черновике
   * Created draft information
   */
  draft?: FboSupplyRequestDraft;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации о черновике заявки
 * Response for draft information
 */
export interface FboSupplyRequestDraftCreateInfoResponse {
  /** 
   * Информация о черновике
   * Draft information
   */
  draft?: FboSupplyRequestDraft;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ создания заявки на поставку по черновику
 * Response for supply order creation from draft
 */
export interface FboSupplyRequestDraftSupplyCreateResponse {
  /** 
   * Идентификатор задачи создания
   * Creation task ID
   */
  task_id?: string;
  
  /** 
   * Статус задачи
   * Task status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса создания заявки на поставку
 * Response for supply order creation status
 */
export interface FboSupplyRequestDraftSupplyCreateStatusResponse {
  /** 
   * Статус создания
   * Creation status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Идентификатор созданной заявки на поставку
   * Created supply order ID
   */
  supply_order_id?: number;
  
  /** 
   * Сообщение об ошибке (если есть)
   * Error message (if any)
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о таймслоте
 * Timeslot information
 */
export interface FboSupplyRequestTimeslot {
  /** 
   * Идентификатор таймслота
   * Timeslot ID
   */
  timeslot_id?: string;
  
  /** 
   * Дата и время начала
   * Start date and time
   */
  start_time?: string;
  
  /** 
   * Дата и время окончания
   * End date and time
   */
  end_time?: string;
  
  /** 
   * Доступность
   * Availability
   */
  is_available?: boolean;
  
  /** 
   * Максимальное количество палет
   * Maximum pallets count
   */
  max_pallets?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ доступных таймслотов
 * Response for available timeslots
 */
export interface FboSupplyRequestDraftTimeslotInfoResponse {
  /** 
   * Список доступных таймслотов
   * List of available timeslots
   */
  timeslots?: FboSupplyRequestTimeslot[];
  
  readonly [key: string]: unknown;
}

/**
 * Ответ отмены заявки на поставку
 * Response for supply order cancellation
 */
export interface FboSupplyRequestSupplyOrderCancelResponse {
  /** 
   * Идентификатор задачи отмены
   * Cancellation task ID
   */
  task_id?: string;
  
  /** 
   * Статус задачи
   * Task status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса отмены заявки на поставку
 * Response for supply order cancellation status
 */
export interface FboSupplyRequestSupplyOrderCancelStatusResponse {
  /** 
   * Статус отмены
   * Cancellation status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результат отмены
   * Cancellation result
   */
  success?: boolean;
  
  /** 
   * Сообщение об ошибке (если есть)
   * Error message (if any)
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ редактирования товарного состава
 * Response for content update
 */
export interface FboSupplyRequestSupplyOrderContentUpdateResponse {
  /** 
   * Идентификатор задачи редактирования
   * Update task ID
   */
  task_id?: string;
  
  /** 
   * Статус задачи
   * Task status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса редактирования товарного состава
 * Response for content update status
 */
export interface FboSupplyRequestSupplyOrderContentUpdateStatusResponse {
  /** 
   * Статус редактирования
   * Update status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результаты редактирования
   * Update results
   */
  results?: Array<{
    /** SKU товара */
    sku?: string;
    /** Операция */
    operation?: 'add' | 'update' | 'delete';
    /** Результат */
    success?: boolean;
    /** Ошибка (если есть) */
    error_message?: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ поиска точек для отгрузки поставки
 * Response for FBO warehouse list
 */
export interface FboSupplyRequestWarehouseFboListResponse {
  /** 
   * Список складов
   * List of warehouses
   */
  warehouses?: FboSupplyRequestWarehouse[];
  
  readonly [key: string]: unknown;
}