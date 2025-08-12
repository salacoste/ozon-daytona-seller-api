/**
 * DeliveryFBS API request types
 */

import type { TimeRange, IntegrationType } from './base';

/**
 * Create carriage request
 */
export interface CreateCarriageRequest {
  /** Delivery method ID */
  delivery_method_id: number;
  /** Optional departure date (ISO 8601) */
  departure_date?: string;
}

/**
 * Approve carriage request
 */
export interface ApproveCarriageRequest {
  /** Carriage ID to approve */
  carriage_id: number;
}

/**
 * Set postings for carriage request
 */
export interface SetPostingsRequest {
  /** Carriage ID */
  carriage_id: number;
  /** List of posting numbers to include in carriage */
  posting_number: string[];
}

/**
 * Cancel carriage request
 */
export interface CancelCarriageRequest {
  /** Carriage ID to cancel */
  carriage_id: number;
}

/**
 * Get carriage delivery list request
 */
export interface GetCarriageDeliveryListRequest {
  /** Delivery method ID (optional filter) */
  delivery_method_id?: number;
  /** Date range filter */
  date_from?: string;
  /** Date range filter */
  date_to?: string;
}

/**
 * Create FBS act request (confirm shipment and create documents)
 */
export interface CreateFBSActRequest {
  /** List of container numbers */
  containers?: ContainerRequest[];
  /** Departure date (ISO 8601) */
  departure_date?: string;
}

/**
 * Container for FBS act
 */
export interface ContainerRequest {
  /** Container number */
  container_number?: string;
}

/**
 * Get available carriage list request
 */
export interface GetAvailableCarriageListRequest {
  /** Date range filter */
  date?: TimeRange;
}

/**
 * Get carriage information request
 */
export interface GetCarriageRequest {
  /** Carriage ID */
  carriage_id: number;
}

/**
 * Split FBS posting request
 */
export interface SplitFBSPostingRequest {
  /** Posting numbers to split */
  posting_number: string[];
}

/**
 * Get act postings list request
 */
export interface GetActPostingsListRequest {
  /** Act ID */
  id: number;
}

/**
 * Get container labels request
 */
export interface GetContainerLabelsRequest {
  /** Container number */
  container_number: string;
}

/**
 * Get barcode request
 */
export interface GetBarcodeRequest {
  /** Act ID */
  id: number;
}

/**
 * Get barcode text request
 */
export interface GetBarcodeTextRequest {
  /** Act ID */
  id: number;
}

/**
 * Check digital act status request
 */
export interface CheckDigitalActStatusRequest {
  /** Carriage ID */
  carriage_id: number;
}

/**
 * Get act PDF request
 */
export interface GetActPDFRequest {
  /** Act ID */
  id: number;
}

/**
 * Get FBS acts list request
 */
export interface GetFBSActsListRequest {
  /** Filter parameters */
  filter: FBSActsFilter;
  /** Maximum number of acts to return (1-1000) */
  limit?: number;
  /** Pagination offset */
  offset?: number;
}

/**
 * FBS acts list filter
 */
export interface FBSActsFilter {
  /** Date range for filtering acts */
  date?: TimeRange;
  /** Act status filter */
  status?: string;
  /** Integration type filter */
  integration_type?: IntegrationType;
}

/**
 * Get digital act PDF request
 */
export interface GetDigitalActPDFRequest {
  /** Carriage ID */
  carriage_id: number;
}

/**
 * Check act status request
 */
export interface CheckActStatusRequest {
  /** Act ID */
  id: number;
}