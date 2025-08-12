import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { ListPassesRequest, CreateCarriagePassRequest, UpdateCarriagePassRequest, DeleteCarriagePassRequest, CreateReturnPassRequest, UpdateReturnPassRequest, DeleteReturnPassRequest, ListPassesResponse, CreateCarriagePassResponse, UpdateCarriagePassResponse, DeleteCarriagePassResponse, CreateReturnPassResponse, UpdateReturnPassResponse, DeleteReturnPassResponse, ArrivalPass, PassCreateData } from './types';
export declare class PassAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listPasses(params: ListPassesRequest): Promise<IHttpResponse<ListPassesResponse>>;
    createCarriagePass(params: CreateCarriagePassRequest): Promise<IHttpResponse<CreateCarriagePassResponse>>;
    updateCarriagePass(params: UpdateCarriagePassRequest): Promise<IHttpResponse<UpdateCarriagePassResponse>>;
    deleteCarriagePass(params: DeleteCarriagePassRequest): Promise<IHttpResponse<DeleteCarriagePassResponse>>;
    createReturnPass(params: CreateReturnPassRequest): Promise<IHttpResponse<CreateReturnPassResponse>>;
    updateReturnPass(params: UpdateReturnPassRequest): Promise<IHttpResponse<UpdateReturnPassResponse>>;
    deleteReturnPass(params: DeleteReturnPassRequest): Promise<IHttpResponse<DeleteReturnPassResponse>>;
    iteratePasses(params: Omit<ListPassesRequest, 'cursor'>): AsyncGenerator<ArrivalPass[], void, unknown>;
    getActivePassesForWarehouses(warehouseIds: string[]): Promise<ArrivalPass[]>;
    checkPassStatus(passId: string): Promise<ArrivalPass | null>;
    createPassWithValidation(passData: PassCreateData, carriageId?: number): Promise<{
        success: boolean;
        passId?: string;
        error?: string;
    }>;
}
export type * from './types';
