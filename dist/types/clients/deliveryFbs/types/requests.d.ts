import type { TimeRange, IntegrationType } from './base';
export interface CreateCarriageRequest {
    delivery_method_id: number;
    departure_date?: string;
}
export interface ApproveCarriageRequest {
    carriage_id: number;
}
export interface SetPostingsRequest {
    carriage_id: number;
    posting_number: string[];
}
export interface CancelCarriageRequest {
    carriage_id: number;
}
export interface GetCarriageDeliveryListRequest {
    delivery_method_id?: number;
    date_from?: string;
    date_to?: string;
}
export interface CreateFBSActRequest {
    containers?: ContainerRequest[];
    departure_date?: string;
}
export interface ContainerRequest {
    container_number?: string;
}
export interface GetAvailableCarriageListRequest {
    date?: TimeRange;
}
export interface GetCarriageRequest {
    carriage_id: number;
}
export interface SplitFBSPostingRequest {
    posting_number: string[];
}
export interface GetActPostingsListRequest {
    id: number;
}
export interface GetContainerLabelsRequest {
    container_number: string;
}
export interface GetBarcodeRequest {
    id: number;
}
export interface GetBarcodeTextRequest {
    id: number;
}
export interface CheckDigitalActStatusRequest {
    carriage_id: number;
}
export interface GetActPDFRequest {
    id: number;
}
export interface GetFBSActsListRequest {
    filter: FBSActsFilter;
    limit?: number;
    offset?: number;
}
export interface FBSActsFilter {
    date?: TimeRange;
    status?: string;
    integration_type?: IntegrationType;
}
export interface GetDigitalActPDFRequest {
    carriage_id: number;
}
export interface CheckActStatusRequest {
    id: number;
}
