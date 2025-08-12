export interface CashFlowStatementListRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly with_details?: boolean;
    readonly limit?: number;
    readonly offset?: number;
}
export interface CashFlowStatementListResponse {
    result: {
        operations: Array<{
            date: string;
            type: string;
            amount: number;
            currency: string;
            description: string;
            posting_number?: string;
            details?: {
                [key: string]: any;
            };
        }>;
        has_next: boolean;
    };
}
