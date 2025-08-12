/**
 * BarcodeAPI response types
 */

import type { AddBarcodeError, GenerateBarcodeError } from './base';

/**
 * Add barcode response
 */
export interface AddBarcodeResponse {
  /** List of errors for failed barcode assignments */
  errors?: AddBarcodeError[];
}

/**
 * Generate barcode response
 */
export interface GenerateBarcodeResponse {
  /** List of errors for failed barcode generations */
  errors?: GenerateBarcodeError[];
}