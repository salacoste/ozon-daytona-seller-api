/**
 * DeliveryFBS API response types
 */

import type { 
  CarriageInfo, 
  PostingItem, 
  ContainerLabel, 
  ActInfo, 
  ActStatus,
  CarriageStatus,
  DeliveryMethod 
} from './base';

/**
 * Create carriage response
 */
export interface CreateCarriageResponse {
  /** Created carriage information */
  carriage?: CarriageInfo;
}

/**
 * Approve carriage response
 */
export interface ApproveCarriageResponse {
  /** Success status */
  result?: boolean;
}

/**
 * Set postings response
 */
export interface SetPostingsResponse {
  /** Success status */
  result?: boolean;
}

/**
 * Cancel carriage response
 */
export interface CancelCarriageResponse {
  /** Success status */
  result?: boolean;
}

/**
 * Get carriage delivery list response
 */
export interface GetCarriageDeliveryListResponse {
  /** List of delivery methods with carriages */
  methods?: DeliveryMethodWithCarriages[];
}

/**
 * Delivery method with carriages
 */
export interface DeliveryMethodWithCarriages {
  /** Delivery method information */
  delivery_method?: DeliveryMethod;
  /** List of carriages for this method */
  carriages?: CarriageInfo[];
}

/**
 * Create FBS act response
 */
export interface CreateFBSActResponse {
  /** Created acts list */
  acts?: CreatedAct[];
}

/**
 * Created act information
 */
export interface CreatedAct {
  /** Act ID */
  id?: number;
  /** Carriage ID */
  carriage_id?: number;
  /** Container number */
  container_number?: string;
}

/**
 * Get available carriage list response
 */
export interface GetAvailableCarriageListResponse {
  /** List of available carriages */
  carriages?: AvailableCarriage[];
}

/**
 * Available carriage for document generation
 */
export interface AvailableCarriage {
  /** Carriage ID */
  carriage_id?: number;
  /** First mile type */
  first_mile_type?: string;
  /** Delivery method ID */
  delivery_method_id?: number;
  /** Delivery method name */
  delivery_method_name?: string;
  /** Warehouse ID */
  warehouse_id?: number;
  /** Carriage status */
  status?: CarriageStatus;
  /** Timetable information */
  timetable?: string;
  /** Cutoff time */
  cutoff?: string;
}

/**
 * Get carriage response
 */
export interface GetCarriageResponse {
  /** Carriage information */
  carriage?: DetailedCarriage;
}

/**
 * Detailed carriage information
 */
export interface DetailedCarriage {
  /** Carriage ID */
  carriage_id?: number;
  /** Carriage status */
  status?: CarriageStatus;
  /** Delivery method information */
  delivery_method?: DeliveryMethod;
  /** First mile type */
  first_mile_type?: string;
  /** Creation timestamp */
  created_at?: string;
  /** Last update timestamp */
  updated_at?: string;
  /** Departure date */
  departure_date?: string;
}

/**
 * Split FBS posting response
 */
export interface SplitFBSPostingResponse {
  /** Successfully split posting numbers */
  successful_postings?: string[];
  /** Failed posting numbers with errors */
  failed_postings?: FailedPosting[];
}

/**
 * Failed posting split information
 */
export interface FailedPosting {
  /** Posting number that failed */
  posting_number?: string;
  /** Error reason */
  error?: string;
}

/**
 * Get act postings list response
 */
export interface GetActPostingsListResponse {
  /** List of postings in the act */
  postings?: PostingItem[];
}

/**
 * Get container labels response
 */
export interface GetContainerLabelsResponse {
  /** Container labels */
  labels?: ContainerLabel[];
}

/**
 * Get barcode response
 */
export interface GetBarcodeResponse {
  /** Barcode image (base64) */
  barcode?: string;
  /** File type */
  type?: string;
}

/**
 * Get barcode text response
 */
export interface GetBarcodeTextResponse {
  /** Barcode value as text */
  barcode?: string;
}

/**
 * Check digital act status response
 */
export interface CheckDigitalActStatusResponse {
  /** Act status */
  status?: ActStatus;
  /** Additional status information */
  message?: string;
}

/**
 * Get act PDF response
 */
export interface GetActPDFResponse {
  /** PDF file content (base64) */
  file?: string;
  /** File type */
  type?: string;
}

/**
 * Get FBS acts list response
 */
export interface GetFBSActsListResponse {
  /** List of acts */
  acts?: ActInfo[];
  /** Total count of acts */
  total?: number;
  /** Indicates if there are more results */
  has_next?: boolean;
}

/**
 * Get digital act PDF response
 */
export interface GetDigitalActPDFResponse {
  /** PDF file content (base64) */
  file?: string;
  /** File type */
  type?: string;
}

/**
 * Check act status response
 */
export interface CheckActStatusResponse {
  /** Act status */
  status?: ActStatus;
  /** Additional status information */
  message?: string;
}