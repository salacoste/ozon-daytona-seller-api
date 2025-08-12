export interface BarcodeAssignment {
    barcode: string;
    sku: number;
}
export interface AddBarcodeError {
    code?: string;
    error?: string;
    barcode?: string;
    sku?: number;
}
export interface GenerateBarcodeError {
    code?: string;
    error?: string;
    barcode?: string;
    product_id?: number;
}
