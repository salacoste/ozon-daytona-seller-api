export interface MutualSettlementRequest {
    readonly date_from: string;
    readonly date_to: string;
}
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
export interface ProductsBuyoutRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly sku?: number[];
}
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
export interface CompensationRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly compensation_type?: string;
}
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
export interface DecompensationRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly decompensation_type?: string;
}
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
