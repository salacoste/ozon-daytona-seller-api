/**
 * DeliveryFBS API base types
 */

/**
 * Money amount with currency
 */
export interface MoneyAmount {
  /** Currency code (e.g., "RUB") */
  currency_code?: string;
  /** Amount value */
  value?: string;
}

/**
 * Time range filter
 */
export interface TimeRange {
  /** Start time (ISO 8601) */
  time_from?: string;
  /** End time (ISO 8601) */
  time_to?: string;
}

/**
 * Carriage status
 */
export type CarriageStatus = 'new' | 'formed' | 'confirmed' | 'cancelled' | 'delivered';

/**
 * Act status for document generation
 */
export type ActStatus = 
  | 'WAIT_CREATION'
  | 'CREATING'
  | 'CREATED'
  | 'FAILED'
  | 'FORMED'
  | 'CONFIRMED'
  | 'CONFIRMED_WITH_MISMATCH';

/**
 * Integration type for shipments
 */
export type IntegrationType = 'API' | 'SELLER_CABINET' | 'ALL';

/**
 * Delivery method information
 */
export interface DeliveryMethod {
  /** Delivery method ID */
  id?: number;
  /** Delivery method name */
  name?: string;
  /** Warehouse ID */
  warehouse_id?: number;
  /** Warehouse name */
  warehouse_name?: string;
  /** Company ID */
  company_id?: number;
  /** Timetable information */
  timetable?: string;
  /** Cutoff time */
  cutoff?: string;
}

/**
 * Carriage information
 */
export interface CarriageInfo {
  /** Carriage ID */
  carriage_id?: number;
  /** Carriage status */
  status?: CarriageStatus;
  /** First mile type */
  first_mile_type?: string;
  /** Delivery method information */
  delivery_method?: DeliveryMethod;
  /** Delivery method ID */
  delivery_method_id?: number;
  /** Mandatory posting count */
  mandatory_postings_count?: number;
  /** Optional posting count */
  optional_postings_count?: number;
  /** Has postings for carriage */
  has_postings_for_carriage?: boolean;
}

/**
 * Posting item for carriage
 */
export interface PostingItem {
  /** Posting number */
  posting_number?: string;
  /** Multi-box quantity */
  multi_box_qty?: number;
  /** Products in posting */
  products?: ProductInPosting[];
}

/**
 * Product in posting
 */
export interface ProductInPosting {
  /** Product SKU */
  sku?: string;
  /** Product quantity */
  quantity?: number;
  /** Product name */
  name?: string;
  /** Product offer ID */
  offer_id?: string;
  /** Product price */
  price?: MoneyAmount;
}

/**
 * Container label information
 */
export interface ContainerLabel {
  /** Label file content (base64) */
  file?: string;
  /** File type (e.g., "PDF") */
  type?: string;
}

/**
 * Act information for documents
 */
export interface ActInfo {
  /** Act ID */
  act_id?: number;
  /** Act status */
  status?: ActStatus;
  /** Carriage ID */
  carriage_id?: number;
  /** Integration type */
  integration_type?: IntegrationType;
  /** Created at timestamp */
  created_at?: string;
  /** Updated at timestamp */
  updated_at?: string;
  /** Additional URL for documents */
  additional_url?: string;
}