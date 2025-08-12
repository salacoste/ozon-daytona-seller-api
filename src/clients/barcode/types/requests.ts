/**
 * BarcodeAPI request types
 */

import type { BarcodeAssignment } from './base';

/**
 * Add barcode request
 */
export interface AddBarcodeRequest {
  /** List of barcodes and products (max 100 items) */
  barcodes: BarcodeAssignment[];
}

/**
 * Generate barcode request
 */
export interface GenerateBarcodeRequest {
  /** Product IDs to generate barcodes for (max 100 items) */
  product_ids: string[];
}