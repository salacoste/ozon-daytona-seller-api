import type { AddBarcodeError, GenerateBarcodeError } from './base';
export interface AddBarcodeResponse {
    errors?: AddBarcodeError[];
}
export interface GenerateBarcodeResponse {
    errors?: GenerateBarcodeError[];
}
