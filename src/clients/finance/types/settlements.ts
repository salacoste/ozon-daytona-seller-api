/**
 * Settlement and compensation types for FinanceAPI
 */

/**
 * Request for mutual settlement
 */
export interface MutualSettlementRequest {
  readonly date_from: string;
  readonly date_to: string;
}

/**
 * Response for mutual settlement
 */
export interface MutualSettlementResponse {
  result: {
    settlements: Array<{
      date: string;
      amount: number;
      currency: string;
      type: string;
      description: string;
    }>;
  };
}

/**
 * Request for products buyout
 */
export interface ProductsBuyoutRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly sku?: number[];
}

/**
 * Response for products buyout
 */
export interface ProductsBuyoutResponse {
  result: {
    buyouts: Array<{
      sku: number;
      product_name: string;
      offer_id: string;
      date: string;
      quantity: number;
      buyout_price: number;
      currency: string;
      reason: string;
    }>;
  };
}

/**
 * Request for compensation
 */
export interface CompensationRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly compensation_type?: string;
}

/**
 * Response for compensation
 */
export interface CompensationResponse {
  result: {
    compensations: Array<{
      compensation_id: string;
      date: string;
      type: string;
      amount: number;
      currency: string;
      description: string;
      posting_number?: string;
      sku?: number;
    }>;
  };
}

/**
 * Request for decompensation
 */
export interface DecompensationRequest {
  readonly date_from: string;
  readonly date_to: string;
  readonly decompensation_type?: string;
}

/**
 * Response for decompensation
 */
export interface DecompensationResponse {
  result: {
    decompensations: Array<{
      decompensation_id: string;
      date: string;
      type: string;
      amount: number;
      currency: string;
      description: string;
      posting_number?: string;
      sku?: number;
    }>;
  };
}
