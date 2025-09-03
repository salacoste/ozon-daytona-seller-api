/**
 * Response types for FBS&rFBSMarks API
 * Generated from OZON API documentation
 * FBS&rFBSMarks - Product marking and exemplar management
 */

/**
 * Ответ на загрузку файла маркировки
 * Response for marking file upload
 */
export interface FbsRfbsMarksProductExemplarCreateResponse {
  /** 
   * Идентификатор задачи загрузки
   * Upload task ID
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
 * Информация об образце маркировки
 * Marking exemplar information
 */
export interface FbsRfbsMarksProductExemplar {
  /** 
   * Идентификатор образца
   * Exemplar ID
   */
  exemplar_id?: string;
  
  /** 
   * Идентификатор товара
   * Product ID
   */
  product_id?: number;
  
  /** 
   * Название файла
   * File name
   */
  file_name?: string;
  
  /** 
   * Размер файла
   * File size
   */
  file_size?: number;
  
  /** 
   * Статус образца
   * Exemplar status
   */
  status?: 'uploaded' | 'validated' | 'rejected' | 'expired';
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  /** 
   * Дата валидации
   * Validation date
   */
  validated_at?: string;
  
  /** 
   * Комментарий к отклонению
   * Rejection comment
   */
  rejection_reason?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о загруженном файле маркировки
 * Response with uploaded marking file information
 */
export interface FbsRfbsMarksProductExemplarInfoResponse {
  /** 
   * Статус загрузки
   * Upload status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Информация об образце
   * Exemplar information
   */
  exemplar?: FbsRfbsMarksProductExemplar;
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ со списком образцов маркировки
 * Response with marking exemplars list
 */
export interface FbsRfbsMarksProductExemplarListResponse {
  /** 
   * Список образцов
   * List of exemplars
   */
  exemplars?: FbsRfbsMarksProductExemplar[];
  
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

/**
 * Ответ на удаление образца маркировки
 * Response for marking exemplar deletion
 */
export interface FbsRfbsMarksProductExemplarDeleteResponse {
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
 * Ответ статуса удаления образца
 * Response for exemplar deletion status
 */
export interface FbsRfbsMarksProductExemplarDeleteStatusResponse {
  /** 
   * Статус удаления
   * Deletion status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результат удаления
   * Deletion result
   */
  success?: boolean;
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на валидацию образца маркировки
 * Response for marking exemplar validation
 */
export interface FbsRfbsMarksProductExemplarValidateResponse {
  /** 
   * Идентификатор задачи валидации
   * Validation task ID
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
 * Ответ статуса валидации образца
 * Response for exemplar validation status
 */
export interface FbsRfbsMarksProductExemplarValidateStatusResponse {
  /** 
   * Статус валидации
   * Validation status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результат валидации
   * Validation result
   */
  is_valid?: boolean;
  
  /** 
   * Причина отклонения
   * Rejection reason
   */
  rejection_reason?: string;
  
  /** 
   * Детальная информация
   * Detailed information
   */
  validation_details?: {
    /** Соответствие формату */
    format_valid?: boolean;
    /** Качество изображения */
    quality_valid?: boolean;
    /** Читаемость кодов */
    codes_readable?: boolean;
  };
  
  readonly [key: string]: unknown;
}

/**
 * Информация о кодах маркировки товара
 * Product marking codes information
 */
export interface FbsRfbsMarksProductCodes {
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
   * Требуемое количество кодов
   * Required codes count
   */
  required_count?: number;
  
  /** 
   * Загружено кодов
   * Uploaded codes count
   */
  uploaded_count?: number;
  
  /** 
   * Валидных кодов
   * Valid codes count
   */
  valid_count?: number;
  
  /** 
   * Статус кодов товара
   * Product codes status
   */
  status?: 'awaiting' | 'uploaded' | 'validated' | 'error';
  
  /** 
   * Коды маркировки
   * Marking codes
   */
  codes?: Array<{
    /** Код маркировки */
    gtd?: string;
    /** Статус кода */
    status?: 'valid' | 'invalid' | 'duplicate';
    /** Ошибка валидации */
    error?: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на загрузку кодов маркировки
 * Response for marking codes upload
 */
export interface FbsRfbsMarksPostingCodesUploadResponse {
  /** 
   * Идентификатор задачи загрузки
   * Upload task ID
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
 * Ответ статуса загрузки кодов маркировки
 * Response for marking codes upload status
 */
export interface FbsRfbsMarksPostingCodesUploadStatusResponse {
  /** 
   * Статус загрузки
   * Upload status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результат загрузки
   * Upload result
   */
  upload_result?: {
    /** Общее количество загруженных кодов */
    total_uploaded?: number;
    /** Количество валидных кодов */
    valid_codes?: number;
    /** Количество невалидных кодов */
    invalid_codes?: number;
    /** Количество дублирующихся кодов */
    duplicate_codes?: number;
  };
  
  /** 
   * Детали по товарам
   * Product details
   */
  products?: FbsRfbsMarksProductCodes[];
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на проверку кодов маркировки
 * Response for marking codes validation
 */
export interface FbsRfbsMarksPostingCodesValidateResponse {
  /** 
   * Идентификатор задачи проверки
   * Validation task ID
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
 * Ответ статуса проверки кодов маркировки
 * Response for marking codes validation status
 */
export interface FbsRfbsMarksPostingCodesValidateStatusResponse {
  /** 
   * Статус проверки
   * Validation status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Результат валидации
   * Validation result
   */
  validation_result?: {
    /** Все коды валидны */
    all_valid?: boolean;
    /** Процент валидных кодов */
    valid_percentage?: number;
    /** Общее количество ошибок */
    total_errors?: number;
  };
  
  /** 
   * Детали по товарам
   * Product details
   */
  products?: FbsRfbsMarksProductCodes[];
  
  /** 
   * Сообщение об ошибке
   * Error message
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ с информацией о кодах маркировки отправления
 * Response with posting marking codes information
 */
export interface FbsRfbsMarksPostingCodesInfoResponse {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Статус кодов отправления
   * Posting codes status
   */
  status?: 'awaiting_codes' | 'codes_uploaded' | 'validated' | 'error';
  
  /** 
   * Обязательна ли маркировка
   * Is marking required
   */
  marking_required?: boolean;
  
  /** 
   * Детали по товарам
   * Product details
   */
  products?: FbsRfbsMarksProductCodes[];
  
  /** 
   * Общая статистика
   * Overall statistics
   */
  summary?: {
    /** Общее количество товаров */
    total_products?: number;
    /** Товаров с загруженными кодами */
    products_with_codes?: number;
    /** Товаров с валидными кодами */
    products_validated?: number;
  };
  
  readonly [key: string]: unknown;
}

/**
 * Информация об отправлении с маркировкой
 * Posting with marking information
 */
export interface FbsRfbsMarksPosting {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Статус отправления
   * Posting status
   */
  status?: string;
  
  /** 
   * Статус кодов маркировки
   * Marking codes status
   */
  marking_status?: 'awaiting_codes' | 'codes_uploaded' | 'validated' | 'error';
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  /** 
   * Дата обновления кодов
   * Codes update date
   */
  codes_updated_at?: string;
  
  /** 
   * Количество товаров
   * Products count
   */
  products_count?: number;
  
  /** 
   * Товаров с кодами
   * Products with codes
   */
  products_with_codes?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ со списком отправлений с маркировкой
 * Response with postings with marking list
 */
export interface FbsRfbsMarksPostingListResponse {
  /** 
   * Список отправлений
   * List of postings
   */
  postings?: FbsRfbsMarksPosting[];
  
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

// ============ V4 API Methods ============

/**
 * Ответ на обновление данных экземпляров
 * Response for exemplar data update
 */
export interface FbsRfbsMarksProductExemplarUpdateResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на проверку и сохранение данных экземпляров (v4)
 * Response for checking and saving exemplar data (v4)
 */
export interface FbsRfbsMarksProductExemplarSetV4Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса добавления экземпляров (v4)
 * Response for exemplar addition status (v4)
 */
export interface FbsRfbsMarksProductExemplarStatusV4Response {
  /** 
   * Статус добавления экземпляров
   * Exemplar addition status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Данные экземпляров
   * Exemplar data
   */
  exemplars?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Экземпляры товара */
    exemplar_data?: Array<{
      /** Идентификатор экземпляра */
      exemplar_id?: string;
      /** Код маркировки */
      marking_code?: string;
      /** ГТД */
      gtd?: string;
      /** Статус экземпляра */
      status?: 'valid' | 'invalid' | 'pending';
    }>;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ валидации кодов маркировки (v4)
 * Response for marking codes validation (v4)
 */
export interface FbsRfbsMarksProductExemplarValidateV4Response {
  /** 
   * Результат валидации
   * Validation result
   */
  result?: string;
  
  /** 
   * Ошибки валидации
   * Validation errors
   */
  validation_errors?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Код маркировки с ошибкой */
    marking_code?: string;
    /** Описание ошибки */
    error?: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на сборку заказа (v4)
 * Response for order assembly (v4)
 */
export interface FbsRfbsMarksPostingShipV4Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  /** 
   * Созданные отправления
   * Created postings
   */
  postings?: Array<{
    /** Номер отправления */
    posting_number?: string;
    /** Статус отправления */
    status?: string;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на частичную сборку отправления (v4)
 * Response for partial posting assembly (v4)
 */
export interface FbsRfbsMarksPostingShipPackageV4Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  /** 
   * Информация о разделенном отправлении
   * Split posting information
   */
  split_posting?: {
    /** Номер исходного отправления */
    original_posting_number?: string;
    /** Новые номера отправлений */
    new_posting_numbers?: string[];
  };
  
  readonly [key: string]: unknown;
}

// ============ V5 API Methods ============

/**
 * Ответ на получение информации об экземплярах (v5)
 * Response for exemplar information (v5)
 */
export interface FbsRfbsMarksProductExemplarCreateOrGetV5Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  /** 
   * Информация об экземплярах
   * Exemplar information
   */
  exemplars?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Данные экземпляров */
    exemplar_data?: Array<{
      /** Идентификатор экземпляра */
      exemplar_id?: string;
      /** Количество экземпляров */
      quantity?: number;
    }>;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на проверку и сохранение данных экземпляров (v5)
 * Response for checking and saving exemplar data (v5)
 */
export interface FbsRfbsMarksProductExemplarSetV5Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса добавления экземпляров (v5)
 * Response for exemplar addition status (v5)
 */
export interface FbsRfbsMarksProductExemplarStatusV5Response {
  /** 
   * Статус добавления экземпляров
   * Exemplar addition status
   */
  status?: 'pending' | 'processing' | 'completed' | 'error';
  
  /** 
   * Данные экземпляров с расширенной информацией
   * Exemplar data with extended information
   */
  exemplars?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Экземпляры товара */
    exemplar_data?: Array<{
      /** Идентификатор экземпляра */
      exemplar_id?: string;
      /** Код маркировки */
      marking_code?: string;
      /** ГТД */
      gtd?: string;
      /** Дополнительная информация */
      additional_info?: {
        /** Серийный номер */
        serial_number?: string;
        /** Дата производства */
        production_date?: string;
        /** Код EAN */
        ean_code?: string;
      };
      /** Статус экземпляра */
      status?: 'valid' | 'invalid' | 'pending';
    }>;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ валидации кодов маркировки (v5)
 * Response for marking codes validation (v5)
 */
export interface FbsRfbsMarksProductExemplarValidateV5Response {
  /** 
   * Результат валидации
   * Validation result
   */
  result?: string;
  
  /** 
   * Ошибки валидации
   * Validation errors
   */
  validation_errors?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Код маркировки с ошибкой */
    marking_code?: string;
    /** Описание ошибки */
    error?: string;
  }>;
  
  readonly [key: string]: unknown;
}

// ============ V6 API Methods ============

/**
 * Ответ на получение данных созданных экземпляров (v6)
 * Response for created exemplar data (v6)
 */
export interface FbsRfbsMarksProductExemplarCreateOrGetV6Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  /** 
   * Информация об экземплярах с расширенными данными
   * Exemplar information with extended data
   */
  exemplars?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Данные экземпляров */
    exemplar_data?: Array<{
      /** Идентификатор экземпляра */
      exemplar_id?: string;
      /** Количество экземпляров */
      quantity?: number;
      /** Расширенные данные экземпляра */
      extended_data?: {
        /** Серийный номер */
        serial_number?: string;
        /** Дата производства */
        production_date?: string;
        /** Код EAN/GTIN */
        ean_code?: string;
        /** Дополнительные атрибуты */
        attributes?: Record<string, unknown>;
      };
    }>;
  }>;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ на проверку и сохранение данных экземпляров (v6)
 * Response for checking and saving exemplar data (v6)
 */
export interface FbsRfbsMarksProductExemplarSetV6Response {
  /** 
   * Результат операции
   * Operation result
   */
  result?: string;
  
  readonly [key: string]: unknown;
}