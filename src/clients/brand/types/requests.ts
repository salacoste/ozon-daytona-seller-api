/**
 * BrandAPI request types
 */

/**
 * List brand certifications request
 * 
 * Retrieves a paginated list of brands requiring certificates.
 */
export interface ListBrandCertificationsRequest {
  /** Page number to retrieve (starts from 1) */
  page: number;
  /** Number of items per page */
  page_size: number;
}