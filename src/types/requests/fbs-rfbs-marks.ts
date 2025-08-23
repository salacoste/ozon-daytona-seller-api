/**
 * Request types for FBS&rFBSMarks API
 * Generated from OZON API documentation
 * FBS&rFBSMarks - Product marking and exemplar management
 */

/**
 * Запрос на загрузку PDF файла маркировки
 * Request for uploading marking PDF file
 */
export interface FbsRfbsMarksProductExemplarCreateRequest {
  /** 
   * Идентификатор товара
   * Product ID
   */
  product_id?: number;
  
  /** 
   * Файл маркировки в формате base64
   * Marking file in base64 format
   */
  file?: string;
  
  /** 
   * Название файла
   * File name
   */
  file_name?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о загруженном файле маркировки
 * Request for uploaded marking file information
 */
export interface FbsRfbsMarksProductExemplarInfoRequest {
  /** 
   * Идентификатор задачи загрузки
   * Upload task ID
   */
  task_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на получение списка образцов
 * Request for exemplar list
 */
export interface FbsRfbsMarksProductExemplarListRequest {
  /** 
   * Идентификатор товара
   * Product ID
   */
  product_id?: number;
  
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
 * Запрос на удаление образца маркировки
 * Request for marking exemplar deletion
 */
export interface FbsRfbsMarksProductExemplarDeleteRequest {
  /** 
   * Идентификатор образца маркировки
   * Marking exemplar ID
   */
  exemplar_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на получение статуса удаления образца
 * Request for exemplar deletion status
 */
export interface FbsRfbsMarksProductExemplarDeleteStatusRequest {
  /** 
   * Идентификатор задачи удаления
   * Deletion task ID
   */
  task_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на валидацию образца маркировки
 * Request for marking exemplar validation
 */
export interface FbsRfbsMarksProductExemplarValidateRequest {
  /** 
   * Идентификатор образца маркировки
   * Marking exemplar ID
   */
  exemplar_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса валидации образца
 * Request for exemplar validation status
 */
export interface FbsRfbsMarksProductExemplarValidateStatusRequest {
  /** 
   * Идентификатор задачи валидации
   * Validation task ID
   */
  task_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на загрузку кодов маркировки для отправления
 * Request for uploading marking codes for posting
 */
export interface FbsRfbsMarksPostingCodesUploadRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Коды маркировки
   * Marking codes
   */
  codes?: Array<{
    /** SKU товара */
    sku?: string;
    /** Код маркировки */
    gtd?: string;
    /** Количество */
    quantity?: number;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса загрузки кодов маркировки
 * Request for marking codes upload status
 */
export interface FbsRfbsMarksPostingCodesUploadStatusRequest {
  /** 
   * Идентификатор задачи загрузки
   * Upload task ID
   */
  task_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на проверку кодов маркировки отправления
 * Request for posting marking codes validation
 */
export interface FbsRfbsMarksPostingCodesValidateRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса проверки кодов маркировки
 * Request for marking codes validation status
 */
export interface FbsRfbsMarksPostingCodesValidateStatusRequest {
  /** 
   * Идентификатор задачи проверки
   * Validation task ID
   */
  task_id?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на получение информации о кодах маркировки отправления
 * Request for posting marking codes information
 */
export interface FbsRfbsMarksPostingCodesInfoRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос на получение списка отправлений с обязательной маркировкой
 * Request for postings with mandatory marking
 */
export interface FbsRfbsMarksPostingListRequest {
  /** 
   * Фильтр по статусу
   * Status filter
   */
  status?: 'awaiting_codes' | 'codes_uploaded' | 'validated' | 'error';
  
  /** 
   * Дата создания от
   * Creation date from
   */
  date_from?: string;
  
  /** 
   * Дата создания до
   * Creation date to
   */
  date_to?: string;
  
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