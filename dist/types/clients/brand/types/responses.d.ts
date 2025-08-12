import type { BrandCertification } from './base';
export interface BrandCertificationResult {
    brand_certification?: BrandCertification[];
    total?: number;
}
export interface ListBrandCertificationsResponse {
    result?: BrandCertificationResult;
}
