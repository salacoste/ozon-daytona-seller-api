/**
 * Request types for BarcodeAPI
 * Barcode generation and management
 * Ready for manual editing and enhancements
 */

/**
 * Штрихкод для привязки к товару
 * Barcode for product binding
 */
export interface BarcodeInfo {
  /** 
   * Идентификатор товара в системе Ozon — SKU
   * Product identifier in Ozon system — SKU
   */
  sku: string;
  
  /** 
   * Значение штрихкода (не более 100 символов)
   * Barcode value (maximum 100 characters)
   */
  barcode: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос привязки штрихкодов к товарам
 * Add barcodes to products request
 */
export interface BarcodeAddRequest {
  /** 
   * Список штрихкодов и товаров (максимум 100)
   * List of barcodes and products (maximum 100)
   */
  barcodes: BarcodeInfo[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания штрихкодов для товаров
 * Generate barcodes for products request
 */
export interface BarcodeGenerateRequest {
  /** 
   * Идентификаторы товаров для создания штрихкодов (максимум 100)
   * Product identifiers for barcode generation (maximum 100)
   */
  product_ids: string[];
  
  readonly [key: string]: unknown;
}