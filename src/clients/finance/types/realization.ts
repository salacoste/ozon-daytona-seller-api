/**
 * Realization report types for FinanceAPI
 */

/**
 * Request for realization report V2
 */
export interface RealizationReportV2Request {
  readonly month: number;
  readonly year: number;
}

/**
 * Response for realization report V2
 */
export interface RealizationReportV2Response {
  result: {
    rows: Array<{
      posting_number: string;
      product_name: string;
      offer_id: string;
      sku: number;
      quantity_shipped: number;
      quantity_returned: number;
      price: number;
      commission: number;
      total_amount: number;
      currency: string;
    }>;
  };
}

/**
 * Request for realization report posting V1
 */
export interface RealizationReportPostingV1Request {
  readonly month: number;
  readonly year: number;
}

/**
 * Response for realization report posting V1
 */
export interface RealizationReportPostingV1Response {
  result: {
    postings: Array<{
      posting_number: string;
      status: string;
      created_at: string;
      delivered_at?: string;
      products: Array<{
        sku: number;
        quantity: number;
        price: number;
        commission: number;
      }>;
    }>;
  };
}

/**
 * Request for realization by day
 */
export interface RealizationByDayRequest {
  readonly month: number;
  readonly year: number;
}

/**
 * Response for realization by day
 */
export interface RealizationByDayResponse {
  result: {
    days: Array<{
      date: string;
      products_sold: number;
      products_returned: number;
      total_revenue: number;
      total_commission: number;
      net_amount: number;
      currency: string;
    }>;
  };
}
