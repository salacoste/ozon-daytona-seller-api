import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { ListBrandCertificationsRequest, ListBrandCertificationsResponse, BrandCertification } from './types';
export declare class BrandAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listBrandCertifications(params: ListBrandCertificationsRequest): Promise<IHttpResponse<ListBrandCertificationsResponse>>;
    iterateBrandCertifications(params: Omit<ListBrandCertificationsRequest, 'page'>): AsyncGenerator<BrandCertification[], void, unknown>;
    getCertificationSummary(): Promise<{
        totalBrands: number;
        complianceRate: number;
        requiresCertification: {
            count: number;
            brands: BrandCertification[];
        };
        compliant: {
            count: number;
            brands: BrandCertification[];
        };
        riskLevel: 'low' | 'medium' | 'high' | 'critical';
        recommendations: string[];
    }>;
    checkBrandCertifications(brandNames: string[]): Promise<Array<{
        brandName: string;
        found: boolean;
        brand?: BrandCertification;
        requiresCertification?: boolean;
    }>>;
}
export type * from './types';
