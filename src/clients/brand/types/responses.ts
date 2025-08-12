/**
 * BrandAPI response types
 */

import type { BrandCertification } from './base';

/**
 * Brand certifications result
 * 
 * Contains the paginated list of brand certification requirements.
 */
export interface BrandCertificationResult {
  /** Array of brand certification information */
  brand_certification?: BrandCertification[];
  /** Total number of brands requiring certificates */
  total?: number;
}

/**
 * List brand certifications response
 * 
 * Response containing brands that require certificates.
 */
export interface ListBrandCertificationsResponse {
  /** Brand certification results */
  result?: BrandCertificationResult;
}