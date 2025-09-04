/**
 * Response types for BarcodeAPI
 * Barcode generation and management
 * Ready for manual editing and enhancements
 */

/**
 * Ошибка привязки штрихкода
 * Barcode binding error
 */
export interface BarcodeAddError {
  /**
   * Код ошибки
   * Error code
   */
  code?: string;

  /**
   * Описание ошибки
   * Error description
   */
  error?: string;

  /**
   * Штрихкод, который не удалось привязать
   * Barcode that failed to bind
   */
  barcode?: string;

  /**
   * Идентификатор товара, к которому не удалось привязать штрихкод
   * Product identifier that failed to bind barcode
   */
  sku?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ привязки штрихкодов к товарам
 * Add barcodes to products response
 */
export interface BarcodeAddResponse {
  /**
   * Список ошибок привязки штрихкодов
   * List of barcode binding errors
   */
  errors?: BarcodeAddError[];

  readonly [key: string]: unknown;
}

/**
 * Ошибка создания штрихкода
 * Barcode generation error
 */
export interface BarcodeGenerateError {
  /**
   * Код ошибки
   * Error code
   */
  code?: string;

  /**
   * Описание ошибки
   * Error description
   */
  error?: string;

  /**
   * Штрихкод, при создании которого произошла ошибка
   * Barcode that failed to generate
   */
  barcode?: string;

  /**
   * Идентификатор товара, для которого не удалось создать штрихкод
   * Product identifier that failed to generate barcode
   */
  product_id?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ создания штрихкодов для товаров
 * Generate barcodes for products response
 */
export interface BarcodeGenerateResponse {
  /**
   * Ошибки при создании штрихкодов
   * Errors during barcode generation
   */
  errors?: BarcodeGenerateError[];

  readonly [key: string]: unknown;
}
