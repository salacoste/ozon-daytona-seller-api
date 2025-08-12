import type { DropOffPoint, ReturnGiveout, FileContent } from './base';
export interface GetFbsReturnsInfoResponse {
    drop_off_points?: DropOffPoint[];
    has_next?: boolean;
}
export interface CheckGiveoutAccessResponse {
    enabled?: boolean;
}
export interface ListGiveoutsResponse {
    giveouts?: ReturnGiveout[];
    has_next?: boolean;
}
export interface GetGiveoutInfoResponse {
    giveout?: ReturnGiveout;
}
export interface GetBarcodeTextResponse {
    barcode?: string;
}
export interface GetBarcodePdfResponse extends FileContent {
}
export interface GetBarcodePngResponse extends FileContent {
}
export interface ResetBarcodeResponse extends FileContent {
}
