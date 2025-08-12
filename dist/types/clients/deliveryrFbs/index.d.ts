import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { SetTrackingNumbersRequest, SetSentBySellerRequest, SetDeliveringRequest, SetLastMileRequest, SetDeliveredRequest, GetTimeslotChangeRestrictionsRequest, SetTimeslotRequest, SetCutoffRequest, SetTrackingNumbersResponse, SetSentBySellerResponse, SetDeliveringResponse, SetLastMileResponse, SetDeliveredResponse, GetTimeslotChangeRestrictionsResponse, SetTimeslotResponse, SetCutoffResponse } from './types';
export declare class DeliveryrFBSAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    setTrackingNumbers(params: SetTrackingNumbersRequest): Promise<IHttpResponse<SetTrackingNumbersResponse>>;
    setSentBySeller(params: SetSentBySellerRequest): Promise<IHttpResponse<SetSentBySellerResponse>>;
    setDelivering(params: SetDeliveringRequest): Promise<IHttpResponse<SetDeliveringResponse>>;
    setLastMile(params: SetLastMileRequest): Promise<IHttpResponse<SetLastMileResponse>>;
    setDelivered(params: SetDeliveredRequest): Promise<IHttpResponse<SetDeliveredResponse>>;
    getTimeslotChangeRestrictions(params: GetTimeslotChangeRestrictionsRequest): Promise<IHttpResponse<GetTimeslotChangeRestrictionsResponse>>;
    setTimeslot(params: SetTimeslotRequest): Promise<IHttpResponse<SetTimeslotResponse>>;
    setCutoff(params: SetCutoffRequest): Promise<IHttpResponse<SetCutoffResponse>>;
    batchUpdateStatus(postingNumbers: string[], status: 'sent' | 'delivering' | 'last_mile' | 'delivered'): Promise<{
        successful: string[];
        failed: Array<{
            posting_number: string;
            error: string;
        }>;
        total: number;
    }>;
    canRescheduleDelivery(postingNumber: string): Promise<{
        canReschedule: boolean;
        remainingChanges: number;
        availablePeriod?: {
            begin: string;
            end: string;
        } | undefined;
    }>;
}
export type * from './types';
