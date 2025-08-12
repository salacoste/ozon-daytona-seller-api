import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { GetPromoActionsRequest, GetPromoProductsRequest, ActivatePromoProductsRequest, DeactivatePromoProductsRequest, GetDiscountTasksRequest, ApproveDiscountTasksRequest, DeclineDiscountTasksRequest, GetPromoActionsResponse, GetPromoProductsResponse, ActivatePromoProductsResponse, DeactivatePromoProductsResponse, GetDiscountTasksResponse, ApproveDiscountTasksResponse, DeclineDiscountTasksResponse, PromoProduct, DiscountTask } from './types';
export declare class PromosAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getPromoActions(params?: GetPromoActionsRequest): Promise<IHttpResponse<GetPromoActionsResponse>>;
    getPromoCandidates(params: GetPromoProductsRequest): Promise<IHttpResponse<GetPromoProductsResponse>>;
    getPromoProducts(params: GetPromoProductsRequest): Promise<IHttpResponse<GetPromoProductsResponse>>;
    activatePromoProducts(params: ActivatePromoProductsRequest): Promise<IHttpResponse<ActivatePromoProductsResponse>>;
    deactivatePromoProducts(params: DeactivatePromoProductsRequest): Promise<IHttpResponse<DeactivatePromoProductsResponse>>;
    getDiscountTasks(params: GetDiscountTasksRequest): Promise<IHttpResponse<GetDiscountTasksResponse>>;
    approveDiscountTasks(params: ApproveDiscountTasksRequest): Promise<IHttpResponse<ApproveDiscountTasksResponse>>;
    declineDiscountTasks(params: DeclineDiscountTasksRequest): Promise<IHttpResponse<DeclineDiscountTasksResponse>>;
    iteratePromoCandidates(params: Omit<GetPromoProductsRequest, 'last_id' | 'offset'>): AsyncGenerator<PromoProduct[], void, unknown>;
    iteratePromoProducts(params: Omit<GetPromoProductsRequest, 'last_id' | 'offset'>): AsyncGenerator<PromoProduct[], void, unknown>;
    iterateDiscountTasks(params: Omit<GetDiscountTasksRequest, 'page'>): AsyncGenerator<DiscountTask[], void, unknown>;
}
export type * from './types';
