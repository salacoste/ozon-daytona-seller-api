/**
 * ReturnAPI response types
 */

import type { DropOffPoint, ReturnGiveout, FileContent } from './base';

/**
 * Response for FBS returns company information
 */
export interface GetFbsReturnsInfoResponse {
  /** Drop-off points information */
  drop_off_points?: DropOffPoint[];
  /** Whether there are more drop-off points */
  has_next?: boolean;
}

/**
 * Response for giveout access check
 */
export interface CheckGiveoutAccessResponse {
  /** Whether giveout access is enabled */
  enabled?: boolean;
}

/**
 * Response for giveouts list
 */
export interface ListGiveoutsResponse {
  /** List of return giveouts */
  giveouts?: ReturnGiveout[];
  /** Whether there are more giveouts */
  has_next?: boolean;
}

/**
 * Response for giveout information
 */
export interface GetGiveoutInfoResponse {
  /** Giveout information */
  giveout?: ReturnGiveout;
}

/**
 * Response for barcode text value
 */
export interface GetBarcodeTextResponse {
  /** Barcode text value */
  barcode?: string;
}

/**
 * Response for PDF barcode file
 */
export interface GetBarcodePdfResponse extends FileContent {
  // Inherits file content properties
}

/**
 * Response for PNG barcode file
 */
export interface GetBarcodePngResponse extends FileContent {
  // Inherits file content properties
}

/**
 * Response for barcode reset (new PNG)
 */
export interface ResetBarcodeResponse extends FileContent {
  // Inherits file content properties
}