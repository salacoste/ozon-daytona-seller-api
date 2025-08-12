export interface DocumentB2BSalesRequest {
    readonly date_from: string;
    readonly date_to: string;
    readonly document_type?: string;
}
export interface DocumentB2BSalesResponse {
    result: {
        documents: Array<{
            document_id: string;
            document_type: string;
            created_at: string;
            status: string;
            file_url?: string;
        }>;
    };
}
export interface DocumentB2BSalesJsonResponse {
    result: {
        documents: Array<{
            document_id: string;
            document_type: string;
            created_at: string;
            data: {
                [key: string]: any;
            };
        }>;
    };
}
