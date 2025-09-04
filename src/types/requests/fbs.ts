/**
 * Request types for FBS API
 * Generated from OZON API documentation
 * FBS - Fulfillment by Seller operations
 */

/**
 * Запрос для получения причин отмены отправлений
 * Request for getting posting cancellation reasons
 */
export interface FbsCancelReasonRequest {
  /**
   * Номера отправлений
   * Posting numbers
   */
  related_posting_numbers: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос создания задания на формирование этикеток
 * Request for creating label batch task
 */
export interface FbsCreateLabelBatchRequest {
  /**
   * Номера отправлений, для которых нужны этикетки
   * Posting numbers for which labels are needed
   */
  posting_number: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос получения файла с этикетками
 * Request for getting label batch file
 */
export interface FbsGetLabelBatchRequest {
  /**
   * Номер задания на формирование этикеток
   * Label batch task ID
   */
  task_id: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос проверки кода курьера
 * Request for courier code verification
 */
export interface FbsPickupCodeVerifyRequest {
  /**
   * Код курьера для проверки
   * Courier code to verify
   */
  code?: string;

  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос получения ограничений пункта приёма
 * Request for pickup point restrictions
 */
export interface FbsGetRestrictionsRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос перемещения отправления
 * Request for moving posting
 */
export interface FbsMovePostingRequest {
  /**
   * Идентификаторы отправлений
   * Posting identifiers
   */
  posting_number: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос отмены отправления FBS
 * Request for FBS posting cancellation
 */
export interface FbsCancelPostingRequest {
  /**
   * Идентификатор причины отмены отправления
   * Cancellation reason ID
   */
  cancel_reason_id?: number;

  /**
   * Дополнительная информация по отмене
   * Additional cancellation information
   */
  cancel_reason_message?: string;

  /**
   * Идентификатор отправления
   * Posting identifier
   */
  posting_number?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос получения информации об отправлении по штрихкоду
 * Request for getting posting info by barcode
 */
export interface FbsGetPostingByBarcodeRequest {
  /**
   * Штрихкод отправления
   * Posting barcode
   */
  barcode?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос печати этикетки
 * Request for printing label
 */
export interface FbsPackageLabelRequest {
  /**
   * Номера отправлений для печати этикеток
   * Posting numbers for label printing
   */
  posting_number?: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос отмены товаров в отправлении
 * Request for cancelling products in posting
 */
export interface FbsProductCancelRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Данные отменяемых товаров
   * Cancelled products data
   */
  products?: Array<{
    /** SKU товара */
    sku?: string;
    /** Количество */
    quantity?: number;
    /** Причина отмены */
    cancel_reason_id?: number;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос изменения товаров в отправлении
 * Request for changing products in posting
 */
export interface FbsProductChangeRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Данные изменяемых товаров
   * Changed products data
   */
  products?: Array<{
    /** SKU товара */
    sku?: string;
    /** Новое количество */
    quantity?: number;
    /** Вес товара */
    weight?: number;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка стран-изготовителей
 * Request for product countries list
 */
export interface FbsProductCountryListRequest {
  readonly [key: string]: unknown;
}

/**
 * Запрос установки страны-изготовителя товара
 * Request for setting product country
 */
export interface FbsProductCountrySetRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Данные товаров со странами-изготовителями
   * Products with country data
   */
  products?: Array<{
    /** SKU товара */
    sku?: string;
    /** ISO код страны-изготовителя */
    country_iso_code?: string;
  }>;

  readonly [key: string]: unknown;
}

/**
 * Запрос получения информации об отправлении v3
 * Request for getting posting info v3
 */
export interface FbsGetPostingV3Request {
  /**
   * Идентификатор отправления
   * Posting identifier
   */
  posting_number?: string;

  /**
   * Данные для транслитерации
   * Transliteration options
   */
  translit?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Фильтр для списка отправлений
 * Filter for postings list
 */
export interface FbsPostingFilter {
  /**
   * Дата создания от
   * Created from date
   */
  since?: string;

  /**
   * Дата создания до
   * Created to date
   */
  to?: string;

  /**
   * Статус отправления
   * Posting status
   */
  status?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка отправлений v3
 * Request for postings list v3
 */
export interface FbsGetPostingListV3Request {
  /**
   * Фильтр
   * Filter
   */
  filter?: FbsPostingFilter;

  /**
   * Направление сортировки
   * Sort direction
   */
  dir?: "ASC" | "DESC";

  /**
   * Количество значений в ответе
   * Number of values in response
   */
  limit?: number;

  /**
   * Смещение относительно первого элемента
   * Offset from first element
   */
  offset?: number;

  /**
   * Данные для транслитерации
   * Transliteration options
   */
  translit?: boolean;

  /**
   * Дополнительные поля в ответе
   * Additional fields in response
   */
  with?: {
    /** Аналитические данные */
    analytics_data?: boolean;
    /** Финансовые данные */
    financial_data?: boolean;
  };

  readonly [key: string]: unknown;
}

/**
 * Запрос списка необработанных отправлений v3
 * Request for unfulfilled postings list v3
 */
export interface FbsGetUnfulfilledListV3Request {
  /**
   * Фильтр
   * Filter
   */
  filter?: FbsPostingFilter;

  /**
   * Направление сортировки
   * Sort direction
   */
  dir?: "ASC" | "DESC";

  /**
   * Количество значений в ответе
   * Number of values in response
   */
  limit?: number;

  /**
   * Смещение относительно первого элемента
   * Offset from first element
   */
  offset?: number;

  /**
   * Данные для транслитерации
   * Transliteration options
   */
  translit?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Запрос установки количества коробок для многокоробочных отправлений
 * Request for setting multi-box quantity
 */
export interface FbsMultiBoxQtySetV3Request {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number?: string;

  /**
   * Количество коробок
   * Number of boxes
   */
  multi_box_qty?: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос получения таможенных деклараций ETGB
 * Request for ETGB customs declarations
 */
export interface FbsGetEtgbRequest {
  /**
   * Номера отправлений
   * Posting numbers
   */
  posting_number?: string[];

  /**
   * Тип документа
   * Document type
   */
  doc_type?: string;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка неоплаченных товаров юридических лиц
 * Request for unpaid legal products list
 */
export interface FbsUnpaidLegalProductListRequest {
  /**
   * Количество значений в ответе
   * Number of values in response
   */
  limit?: number;

  /**
   * Смещение относительно первого элемента
   * Offset from first element
   */
  offset?: number;

  readonly [key: string]: unknown;
}
