export interface HsCode {
    code?: string;
    sku?: string;
}
export type InvoiceCurrency = 'USD' | 'EUR' | 'TRY' | 'CNY' | 'RUB' | 'GBP';
export interface InvoiceCreateOrUpdateRequest {
    date: string;
    hs_codes?: HsCode[];
    number?: string;
    posting_number: string;
    price?: number;
    price_currency?: InvoiceCurrency;
    url: string;
}
export interface InvoiceCreateOrUpdateResponse {
    result?: boolean;
}
export interface InvoiceFileUploadRequest {
    base64_content: string;
    posting_number: string;
}
export interface InvoiceFileUploadResponse {
    url?: string;
}
export interface InvoiceGetRequest {
    posting_number: string;
}
export interface InvoiceInfo {
    date?: string;
    file_url?: string;
    hs_codes?: HsCode[];
    number?: string;
    price?: number;
    price_currency?: InvoiceCurrency;
}
export interface InvoiceGetResponse {
    result?: InvoiceInfo;
}
export interface InvoiceDeleteRequest {
    posting_number: string;
}
export interface InvoiceDeleteResponse {
    result?: boolean;
}
