/**
 * Transaction types for FinanceAPI
 */

/**
 * Request for transaction list V3
 */
export interface TransactionListV3Request {
  readonly date_from: string;
  readonly date_to: string;
  readonly transaction_type?: string;
  readonly limit?: number;
  readonly offset?: number;
}

/**
 * Response for transaction list V3
 */
export interface TransactionListV3Response {
  result: {
    transactions: Array<{
      transaction_id: string;
      date: string;
      type: string;
      amount: number;
      currency: string;
      description: string;
      posting_number?: string;
    }>;
    has_next: boolean;
  };
}

/**
 * Request for transaction totals V3
 */
export interface TransactionTotalsV3Request {
  readonly date_from: string;
  readonly date_to: string;
  readonly transaction_type?: string;
}

/**
 * Response for transaction totals V3
 */
export interface TransactionTotalsV3Response {
  result: {
    totals: Array<{
      type: string;
      amount: number;
      currency: string;
      count: number;
    }>;
  };
}
