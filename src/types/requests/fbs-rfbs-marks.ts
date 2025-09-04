/**
 * Request types for FBS&rFBSMarks API
 * Generated from MCP documentation: categories/fbs-rfbsmarks
 * FBS&rFBSMarks - Product exemplar management and marking codes
 */

/**
 * Запрос обновления данных экземпляров
 * Request for updating exemplar data
 */
export interface FbsRfbsMarksProductExemplarUpdateRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Данные экземпляров для обновления
   * Exemplar data for update
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Экземпляры товара */
    exemplars?: Array<{
      /** Идентификатор экземпляра */
      exemplar_id?: string;
      /** Код маркировки */
      marking_code?: string;
      /** ГТД (при наличии) */
      gtd?: string;
    }>;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос проверки и сохранения данных экземпляров (v4)
 * Request for checking and saving exemplar data (v4)
 */
export interface FbsRfbsMarksProductExemplarSetV4Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары с экземплярами
   * Products with exemplars
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Экземпляры товара */
    exemplars?: Array<{
      /** Код маркировки */
      marking_code?: string;
      /** ГТД (номер грузовой таможенной декларации) */
      gtd?: string;
      /** Признак отсутствия ГТД */
      is_gtd_absent?: boolean;
    }>;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос статуса добавления экземпляров (v4)
 * Request for exemplar addition status (v4)
 */
export interface FbsRfbsMarksProductExemplarStatusV4Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос валидации кодов маркировки (v4)
 * Request for marking codes validation (v4)
 */
export interface FbsRfbsMarksProductExemplarValidateV4Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары с кодами для валидации
   * Products with codes for validation
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Коды маркировки */
    exemplars?: Array<{
      /** Код маркировки */
      marking_code?: string;
      /** ГТД (при наличии) */
      gtd?: string;
      /** Признак отсутствия ГТД */
      is_gtd_absent?: boolean;
    }>;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос сборки заказа (v4)
 * Request for order assembly (v4)
 */
export interface FbsRfbsMarksPostingShipV4Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Упаковки с товарами
   * Packages with products
   */
  packages?: Array<{
    /** Товары в упаковке */
    products?: Array<{
      /** Идентификатор товара */
      product_id?: number;
      /** Количество */
      quantity?: number;
    }>;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос частичной сборки отправления (v4)
 * Request for partial posting assembly (v4)
 */
export interface FbsRfbsMarksPostingShipPackageV4Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары для частичной сборки
   * Products for partial assembly
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Количество */
    quantity?: number;
  }>;

  readonly [key: string]: unknown;
}

// ============ V5 API Methods ============

/**
 * Запрос получения информации об экземплярах (v5)
 * Request for exemplar information (v5)
 */
export interface FbsRfbsMarksProductExemplarCreateOrGetV5Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары для получения экземпляров
   * Products for exemplar retrieval
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Количество экземпляров */
    quantity?: number;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос проверки и сохранения данных экземпляров (v5)
 * Request for checking and saving exemplar data (v5)
 */
export interface FbsRfbsMarksProductExemplarSetV5Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары с экземплярами
   * Products with exemplars
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Экземпляры товара */
    exemplars?: Array<{
      /** Код маркировки */
      marking_code?: string;
      /** ГТД (номер грузовой таможенной декларации) */
      gtd?: string;
      /** Признак отсутствия ГТД */
      is_gtd_absent?: boolean;
      /** Дополнительная информация */
      additional_info?: {
        /** Серийный номер */
        serial_number?: string;
        /** Дата производства */
        production_date?: string;
        /** Код EAN */
        ean_code?: string;
      };
    }>;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос статуса добавления экземпляров (v5)
 * Request for exemplar addition status (v5)
 */
export interface FbsRfbsMarksProductExemplarStatusV5Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос валидации кодов маркировки (v5)
 * Request for marking codes validation (v5)
 */
export interface FbsRfbsMarksProductExemplarValidateV5Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары с кодами для валидации
   * Products with codes for validation
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Коды маркировки */
    exemplars?: Array<{
      /** Код маркировки */
      marking_code?: string;
      /** ГТД (при наличии) */
      gtd?: string;
      /** Признак отсутствия ГТД */
      is_gtd_absent?: boolean;
    }>;
  }>;

  readonly [key: string]: unknown;
}

// ============ V6 API Methods ============

/**
 * Запрос получения данных созданных экземпляров (v6)
 * Request for created exemplar data (v6)
 */
export interface FbsRfbsMarksProductExemplarCreateOrGetV6Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары для получения экземпляров
   * Products for exemplar retrieval
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Количество экземпляров */
    quantity?: number;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос проверки и сохранения данных экземпляров (v6)
 * Request for checking and saving exemplar data (v6)
 */
export interface FbsRfbsMarksProductExemplarSetV6Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Товары с экземплярами
   * Products with exemplars
   */
  products?: Array<{
    /** Идентификатор товара */
    product_id?: number;
    /** Экземпляры товара */
    exemplars?: Array<{
      /** Код маркировки */
      marking_code?: string;
      /** ГТД (при наличии) */
      gtd?: string;
      /** Признак отсутствия ГТД */
      is_gtd_absent?: boolean;
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
  status?: "awaiting_codes" | "codes_uploaded" | "validated" | "error";

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
