/**
 * Generated types for FBS Part 2 endpoints
 * 
 * This file contains types for the second batch of FBS endpoints:
 * - Product country management
 * - Restrictions
 * - Package labels (PDF generation)
 * - Cancel reasons
 * 
 * Generated from: 01-fbs.json (Part 2 of 4)
 * Endpoints: 9 endpoints (7-15)
 */

// Product Country Management Types

/**
 * Request for listing available product countries
 */
export interface IV2FbsPostingProductCountryListRequest {
  /** Filter by country name string */
  readonly name_search?: string;
}

/**
 * Country information item
 */
export interface IV2FbsPostingProductCountryListResponseResult {
  /** Country name in Russian */
  readonly name: string;
  /** Two-letter country ISO code (ISO_3166-1) */
  readonly country_iso_code: string;
}

/**
 * Response for listing available product countries
 */
export interface IV2FbsPostingProductCountryListResponse {
  /** List of available countries and their ISO codes */
  readonly result: IV2FbsPostingProductCountryListResponseResult[];
}

/**
 * Request to set product country of origin
 */
export interface IV2FbsPostingProductCountrySetRequest {
  /** FBS posting number */
  readonly posting_number: string;
  /** Product ID in seller system */
  readonly product_id: number;
  /** Two-letter country ISO code (ISO_3166-1) */
  readonly country_iso_code: string;
}

/**
 * Response for setting product country
 */
export interface IV2FbsPostingProductCountrySetResponse {
  /** Product ID that was updated */
  readonly product_id: number;
  /** Whether GTD (customs declaration) is required for this country */
  readonly is_gtd_needed: boolean;
}

// Restrictions Types

/**
 * Request for getting pickup point restrictions
 */
export interface IV1GetRestrictionsRequest {
  /** FBS posting number */
  readonly posting_number: string;
}

/**
 * Pickup point restrictions data
 */
export interface IV1GetRestrictionsResponseResult {
  /** Posting number */
  readonly posting_number: string;
  /** Maximum posting weight in grams */
  readonly max_posting_weight: number;
  /** Minimum posting weight in grams */
  readonly min_posting_weight: number;
  /** Maximum width in millimeters */
  readonly width: number;
  /** Maximum height in millimeters */
  readonly height: number;
  /** Maximum length in millimeters */
  readonly length: number;
  /** Maximum posting price in rubles */
  readonly max_posting_price: number;
  /** Minimum posting price in rubles */
  readonly min_posting_price: number;
}

/**
 * Response for restrictions request
 */
export interface IV1GetRestrictionsResponse {
  /** Pickup point restrictions */
  readonly result: IV1GetRestrictionsResponseResult;
}

// Package Label Types

/**
 * Request for synchronous PDF label generation
 */
export interface IPostingFBSPackageLabelRequest {
  /** Array of posting numbers (up to 20 items) */
  readonly posting_number: string[];
}

/**
 * Response for PDF label generation (binary content)
 */
export interface IPostingFBSPackageLabelResponse {
  /** PDF file content as binary data */
  readonly content: Uint8Array;
  /** Content type header (should be application/pdf) */
  readonly contentType: string;
  /** Content length */
  readonly contentLength: number;
}

/**
 * Request for creating label batch (V1 - legacy)
 */
export interface IV1CreateLabelBatchRequest {
  /** Array of posting numbers */
  readonly posting_number: string[];
}

/**
 * Response for label batch creation (V1)
 */
export interface IV1CreateLabelBatchResponse {
  /** Batch task ID for tracking */
  readonly task_id: number;
}

/**
 * Request for creating label batch (V2)
 */
export interface IV2CreateLabelBatchRequest {
  /** Array of posting numbers */
  readonly posting_number: string[];
}

/**
 * Label batch task information
 */
export interface IV2CreateLabelBatchResponseTask {
  /** Task ID */
  readonly task_id: number;
  /** Task type (e.g., "big_labels", "small_labels") */
  readonly task_type: string;
}

/**
 * Response for label batch creation (V2)
 */
export interface IV2CreateLabelBatchResponse {
  /** Array of created tasks (can have multiple for different label sizes) */
  readonly tasks: IV2CreateLabelBatchResponseTask[];
}

/**
 * Request for getting label batch status
 */
export interface IV1GetLabelBatchRequest {
  /** Task ID from batch creation */
  readonly task_id: number;
}

/**
 * Label batch status information
 */
export interface IV1GetLabelBatchResponseResult {
  /** Task status: "completed", "processing", "failed" */
  readonly status: string;
  /** File URL when status is "completed" */
  readonly file_url?: string;
  /** Error message when status is "failed" */
  readonly error?: string;
}

/**
 * Response for label batch status
 */
export interface IV1GetLabelBatchResponse {
  /** Batch status information */
  readonly result: IV1GetLabelBatchResponseResult;
}

// Cancel Reason Types

/**
 * Request for getting cancel reasons for specific posting
 */
export interface IPostingCancelReasonRequest {
  /** FBS posting number */
  readonly posting_number: string;
}

/**
 * Cancel reason item
 */
export interface IPostingCancelReasonResponseReason {
  /** Reason ID */
  readonly id: number;
  /** Reason name/description */
  readonly name: string;
  /** Whether this reason is available for the posting */
  readonly is_available: boolean;
}

/**
 * Response for posting-specific cancel reasons
 */
export interface IPostingCancelReasonResponse {
  /** Array of available cancel reasons */
  readonly reasons: IPostingCancelReasonResponseReason[];
}

/**
 * Request for getting all cancel reasons (V2)
 */
export interface IPostingCancelReasonListRequest {
  /** Optional filter parameters */
  readonly filter?: {
    /** Filter by availability */
    readonly is_available?: boolean;
  };
}

/**
 * Cancel reason list item
 */
export interface IPostingCancelReasonListResponseReason {
  /** Reason ID */
  readonly id: number;
  /** Reason name/description */
  readonly name: string;
  /** Whether this reason is generally available */
  readonly is_available: boolean;
  /** Reason type/category */
  readonly type?: string;
}

/**
 * Response for cancel reasons list
 */
export interface IPostingCancelReasonListResponse {
  /** Array of all cancel reasons */
  readonly result: IPostingCancelReasonListResponseReason[];
}