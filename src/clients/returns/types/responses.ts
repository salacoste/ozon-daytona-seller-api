/**
 * ReturnsAPI response types
 */

import type { MoneyAmount, ReturnPlace, VisualStatus, ReturnSchema, ReturnType } from './base';

/**
 * Return exemplar information
 */
export interface ReturnExemplar {
  /** Exemplar identifier */
  id?: string;
}

/**
 * Return storage information
 */
export interface ReturnStorage {
  /** Storage cost */
  sum?: MoneyAmount;
  /** First tariffication date */
  tariffication_first_date?: string;
  /** Tariffication start date */
  tariffication_start_date?: string;
  /** Arrival moment */
  arrived_moment?: string;
  /** Number of storage days */
  days?: string;
  /** Utilization cost */
  utilization_sum?: MoneyAmount;
  /** Forecast utilization date */
  utilization_forecast_date?: string;
}

/**
 * Return product information
 */
export interface ReturnProduct {
  /** Product SKU */
  sku?: string;
  /** Product offer ID */
  offer_id?: string;
  /** Product name */
  name?: string;
  /** Product price */
  price?: MoneyAmount;
  /** Product price without commission */
  price_without_commission?: MoneyAmount;
  /** Commission percentage */
  commission_percent?: string;
  /** Commission amount */
  commission?: MoneyAmount;
  /** Product quantity */
  quantity?: number;
}

/**
 * Return logistic information
 */
export interface ReturnLogistic {
  /** Technical return moment */
  technical_return_moment?: string;
  /** Final moment */
  final_moment?: string;
  /** Cancelled with compensation moment */
  cancelled_with_compensation_moment?: string;
  /** Return date */
  return_date?: string;
  /** Barcode */
  barcode?: string;
}

/**
 * Return visual status information
 */
export interface ReturnVisual {
  /** Current status */
  status?: VisualStatus;
  /** Status change moment */
  change_moment?: string;
}

/**
 * Additional return information
 */
export interface ReturnAdditionalInfo {
  /** Is package opened */
  is_opened?: boolean;
  /** Is super economy */
  is_super_econom?: boolean;
}

/**
 * Return item information
 */
export interface ReturnItem {
  /** Return exemplars */
  exemplars?: ReturnExemplar[];
  /** Return identifier */
  id?: string;
  /** Company identifier */
  company_id?: string;
  /** Return reason name */
  return_reason_name?: string;
  /** Return type */
  type?: ReturnType;
  /** Return schema */
  schema?: ReturnSchema;
  /** Order identifier */
  order_id?: string;
  /** Order number */
  order_number?: string;
  /** Return place information */
  place?: ReturnPlace;
  /** Target place information */
  target_place?: ReturnPlace;
  /** Storage information */
  storage?: ReturnStorage;
  /** Product information */
  product?: ReturnProduct;
  /** Logistic information */
  logistic?: ReturnLogistic;
  /** Visual status information */
  visual?: ReturnVisual;
  /** Additional information */
  additional_info?: ReturnAdditionalInfo;
  /** Source identifier */
  source_id?: string;
  /** Posting number */
  posting_number?: string;
  /** Clearing identifier */
  clearing_id?: string;
  /** Return clearing identifier */
  return_clearing_id?: string | null;
}

/**
 * Get returns list response
 */
export interface GetReturnsListV1Response {
  /** List of returns */
  returns?: ReturnItem[];
  /** Indicates if there are more results */
  has_next?: boolean;
}