import type { CarriageInfo, PostingItem, ContainerLabel, ActInfo, ActStatus, CarriageStatus, DeliveryMethod } from './base';
export interface CreateCarriageResponse {
    carriage?: CarriageInfo;
}
export interface ApproveCarriageResponse {
    result?: boolean;
}
export interface SetPostingsResponse {
    result?: boolean;
}
export interface CancelCarriageResponse {
    result?: boolean;
}
export interface GetCarriageDeliveryListResponse {
    methods?: DeliveryMethodWithCarriages[];
}
export interface DeliveryMethodWithCarriages {
    delivery_method?: DeliveryMethod;
    carriages?: CarriageInfo[];
}
export interface CreateFBSActResponse {
    acts?: CreatedAct[];
}
export interface CreatedAct {
    id?: number;
    carriage_id?: number;
    container_number?: string;
}
export interface GetAvailableCarriageListResponse {
    carriages?: AvailableCarriage[];
}
export interface AvailableCarriage {
    carriage_id?: number;
    first_mile_type?: string;
    delivery_method_id?: number;
    delivery_method_name?: string;
    warehouse_id?: number;
    status?: CarriageStatus;
    timetable?: string;
    cutoff?: string;
}
export interface GetCarriageResponse {
    carriage?: DetailedCarriage;
}
export interface DetailedCarriage {
    carriage_id?: number;
    status?: CarriageStatus;
    delivery_method?: DeliveryMethod;
    first_mile_type?: string;
    created_at?: string;
    updated_at?: string;
    departure_date?: string;
}
export interface SplitFBSPostingResponse {
    successful_postings?: string[];
    failed_postings?: FailedPosting[];
}
export interface FailedPosting {
    posting_number?: string;
    error?: string;
}
export interface GetActPostingsListResponse {
    postings?: PostingItem[];
}
export interface GetContainerLabelsResponse {
    labels?: ContainerLabel[];
}
export interface GetBarcodeResponse {
    barcode?: string;
    type?: string;
}
export interface GetBarcodeTextResponse {
    barcode?: string;
}
export interface CheckDigitalActStatusResponse {
    status?: ActStatus;
    message?: string;
}
export interface GetActPDFResponse {
    file?: string;
    type?: string;
}
export interface GetFBSActsListResponse {
    acts?: ActInfo[];
    total?: number;
    has_next?: boolean;
}
export interface GetDigitalActPDFResponse {
    file?: string;
    type?: string;
}
export interface CheckActStatusResponse {
    status?: ActStatus;
    message?: string;
}
