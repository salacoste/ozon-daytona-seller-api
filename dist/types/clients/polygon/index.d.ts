import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { CreatePolygonRequest, CreatePolygonResponse, BindPolygonRequest, BindPolygonResponse } from './types';
export declare class PolygonAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    createPolygon(params: CreatePolygonRequest): Promise<IHttpResponse<CreatePolygonResponse>>;
    bindPolygon(params: BindPolygonRequest): Promise<IHttpResponse<BindPolygonResponse>>;
    validateCoordinates(coordinates: string): {
        isValid: boolean;
        errors: string[];
    };
    createCoordinatesString(points: Array<{
        lat: number;
        lng: number;
    }>): string;
}
export type * from './types';
