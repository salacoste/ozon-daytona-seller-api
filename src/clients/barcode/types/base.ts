/**
 * BarcodeAPI base types
 */

/**
 * Barcode assignment for a product
 */
export interface BarcodeAssignment {
  /** Barcode value (max 100 characters) */
  barcode: string;
  /** Product SKU in Ozon system */
  sku: number;
}

/**
 * Result of adding a barcode
 */
export interface AddBarcodeError {
  /** Error code */
  code?: string;
  /** Error description */
  error?: string;
  /** Barcode that failed to be added */
  barcode?: string;
  /** Product SKU that failed */
  sku?: number;
}

/**
 * Result of generating a barcode
 */
export interface GenerateBarcodeError {
  /** Error code */
  code?: string;
  /** Error description */
  error?: string;
  /** Barcode that failed to be generated */
  barcode?: string;
  /** Product ID that failed */
  product_id?: number;
}