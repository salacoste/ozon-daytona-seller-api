/**
 * BrandAPI base types
 */

/**
 * Brand certification information
 * 
 * Contains details about a brand requiring certification.
 */
export interface BrandCertification {
  /** Unique identifier for the brand */
  brand_id?: number;
  /** Name of the brand */
  brand_name?: string;
  /** 
   * Whether certificate is required for this brand.
   * - `true` - Certificate is required
   * - `false` - Certificate is not needed
   */
  has_certificate?: boolean;
}