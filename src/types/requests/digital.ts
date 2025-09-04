/**
 * Request types for Digital API
 * Digital product management
 * Ready for manual editing and enhancements
 */

/**
 * Направление сортировки
 * Sort direction
 */
export type DigitalSortDirection = "ASC" | "DESC";

/**
 * Информация о кодах цифрового товара по SKU
 * Digital product codes information by SKU
 */
export interface DigitalPostingCodeExemplar {
  /**
   * Идентификатор товара в системе Ozon — SKU
   * Product identifier in Ozon system — SKU
   */
  sku: number;

  /**
   * Количество кодов цифрового товара для передачи покупателю
   * Number of digital product codes to transfer to buyer
   */
  exemplar_qty: number;

  /**
   * Количество недоступных кодов цифрового товара
   * Number of unavailable digital product codes
   */
  not_available_exemplar_qty: number;

  /**
   * Список кодов цифрового товара
   * List of digital product codes
   */
  exemplar_keys?: string[];

  readonly [key: string]: unknown;
}

/**
 * Запрос загрузки кодов цифровых товаров
 * Upload digital product codes request
 */
export interface DigitalUploadPostingCodesRequest {
  /**
   * Номер отправления
   * Posting number
   */
  posting_number: string;

  /**
   * Данные о кодах цифрового товара по SKU
   * Digital product codes data by SKU
   */
  exemplars_by_sku: DigitalPostingCodeExemplar[];

  readonly [key: string]: unknown;
}

/**
 * Фильтр для поиска отправлений
 * Filter for posting search
 */
export interface DigitalPostingFilter {
  /**
   * Номера отправлений
   * Posting numbers
   */
  posting_number?: string[];

  /**
   * Начало периода (YYYY-MM-DD)
   * Period start (YYYY-MM-DD)
   */
  since?: string;

  /**
   * Конец периода (YYYY-MM-DD)
   * Period end (YYYY-MM-DD)
   */
  to?: string;

  readonly [key: string]: unknown;
}

/**
 * Дополнительные поля для включения в ответ
 * Additional fields to include in response
 */
export interface DigitalPostingWithParams {
  /**
   * Включить данные аналитики
   * Include analytics data
   */
  analytics_data?: boolean;

  /**
   * Включить финансовые данные
   * Include financial data
   */
  financial_data?: boolean;

  /**
   * Включить юридическую информацию
   * Include legal information
   */
  legal_info?: boolean;

  readonly [key: string]: unknown;
}

/**
 * Запрос списка отправлений с цифровыми товарами
 * Digital postings list request
 */
export interface DigitalListPostingCodesRequest {
  /**
   * Фильтр для поиска отправлений
   * Filter for posting search
   */
  filter?: DigitalPostingFilter;

  /**
   * Количество записей в ответе (1-1000)
   * Number of records in response (1-1000)
   */
  limit?: number;

  /**
   * Количество пропускаемых элементов (максимум 20000)
   * Number of elements to skip (maximum 20000)
   */
  offset?: number;

  /**
   * Направление сортировки
   * Sort direction
   */
  dir?: DigitalSortDirection;

  /**
   * Дополнительные поля для включения в ответ
   * Additional fields to include in response
   */
  with?: DigitalPostingWithParams;

  readonly [key: string]: unknown;
}

/**
 * Данные об остатках цифрового товара
 * Digital product stock data
 */
export interface DigitalStockItem {
  /**
   * Идентификатор товара в системе продавца — артикул
   * Product identifier in seller system — offer ID
   */
  offer_id: string;

  /**
   * Количество товара в наличии
   * Product quantity in stock
   */
  stock: number;

  readonly [key: string]: unknown;
}

/**
 * Запрос обновления остатков цифровых товаров
 * Update digital product stocks request
 */
export interface DigitalStocksImportRequest {
  /**
   * Данные об остатках цифровых товаров
   * Digital product stock data
   */
  stocks: DigitalStockItem[];

  readonly [key: string]: unknown;
}
