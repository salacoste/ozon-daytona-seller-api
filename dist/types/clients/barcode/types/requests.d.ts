import type { BarcodeAssignment } from './base';
export interface AddBarcodeRequest {
    barcodes: BarcodeAssignment[];
}
export interface GenerateBarcodeRequest {
    product_ids: string[];
}
