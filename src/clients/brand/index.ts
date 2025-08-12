/**
 * BrandAPI client for Ozon Seller API
 * 
 * Implements brand certification management from /methods/26-brandapi.json:
 * - List brands requiring certificates
 * - Check certification requirements for seller's brands
 * 
 * Handles brand compliance management for sellers who carry products
 * from brands that require official certification documentation.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import { iterateByOffset } from '../../pagination/iterateByOffset';
import type {
  // Request types
  ListBrandCertificationsRequest,
  
  // Response types
  ListBrandCertificationsResponse,
  BrandCertificationResult,
  
  // Base types
  BrandCertification
} from './types';

/**
 * BrandAPI client for managing brand certification requirements
 * 
 * Provides access to brand certification information for compliance management.
 * Helps sellers identify which brands require official certificates and track
 * their certification status.
 * 
 * **Key Features:**
 * - **Certification Requirements**: Identify which brands require certificates
 * - **Compliance Tracking**: Monitor certification status for your brands
 * - **Dynamic Updates**: Brand list updates when Ozon receives new requirements
 * 
 * **Important Notes:**
 * - Only shows brands that have products in your seller account
 * - Brand certification requirements can change based on brand requests
 * - Certificates must be provided for brands marked as `has_certificate: true`
 * - Missing certificates may affect product visibility or sales
 * 
 * @example
 * ```typescript
 * // Get all brands requiring certificates
 * const result = await client.brand.listBrandCertifications({
 *   page: 1,
 *   page_size: 100
 * });
 * 
 * console.log(`Found ${result.data.result?.total} total brands`);
 * 
 * // Check certification requirements
 * const certifications = result.data.result?.brand_certification || [];
 * const requiresCert = certifications.filter(brand => brand.has_certificate);
 * const noCertNeeded = certifications.filter(brand => !brand.has_certificate);
 * 
 * console.log(`Brands requiring certificates: ${requiresCert.length}`);
 * console.log(`Brands without certificate requirement: ${noCertNeeded.length}`);
 * 
 * // List brands needing attention
 * if (requiresCert.length > 0) {
 *   console.log('\n🚨 ACTION REQUIRED - Provide certificates for:');
 *   requiresCert.forEach(brand => {
 *     console.log(`  - ${brand.brand_name} (ID: ${brand.brand_id})`);
 *   });
 * }
 * 
 * // Process all brands with pagination
 * for await (const brandsPage of client.brand.iterateBrandCertifications({
 *   page_size: 50
 * })) {
 *   console.log(`Processing ${brandsPage.length} brands...`);
 *   
 *   brandsPage.forEach(brand => {
 *     const status = brand.has_certificate ? '📋 Cert Required' : '✅ No Cert Needed';
 *     console.log(`  ${brand.brand_name}: ${status}`);
 *   });
 * }
 * ```
 */
export class BrandAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * List brand certification requirements
   * 
   * Retrieves a paginated list of brands that require certificates.
   * Only includes brands that have products in your seller account.
   * 
   * The brand list is dynamic and may change when:
   * - Ozon receives new certification requirements from brands
   * - You add/remove products from certified brands
   * - Brand certification policies are updated
   * 
   * @param params - Pagination parameters
   * @returns List of brands with certification requirements
   * 
   * @example
   * ```typescript
   * // Get first page of brand certifications
   * const result = await client.brand.listBrandCertifications({
   *   page: 1,
   *   page_size: 50
   * });
   * 
   * const { brand_certification, total } = result.data.result || {};
   * 
   * console.log(`=== BRAND CERTIFICATION REPORT ===`);
   * console.log(`Total brands in account: ${total}`);
   * console.log(`Page size: ${brand_certification?.length || 0}`);
   * console.log();
   * 
   * // Analyze certification requirements
   * const analysis = {
   *   total: total || 0,
   *   requiresCert: 0,
   *   noCertNeeded: 0,
   *   brands: {
   *     withCert: [] as string[],
   *     withoutCert: [] as string[]
   *   }
   * };
   * 
   * brand_certification?.forEach(brand => {
   *   if (brand.has_certificate) {
   *     analysis.requiresCert++;
   *     analysis.brands.withCert.push(brand.brand_name || 'Unknown');
   *   } else {
   *     analysis.noCertNeeded++;
   *     analysis.brands.withoutCert.push(brand.brand_name || 'Unknown');
   *   }
   * });
   * 
   * console.log(`📋 Requiring certificates: ${analysis.requiresCert} brands`);
   * console.log(`✅ No certificate needed: ${analysis.noCertNeeded} brands`);
   * 
   * // Show actionable items
   * if (analysis.requiresCert > 0) {
   *   console.log('\n🚨 IMMEDIATE ACTION REQUIRED:');
   *   console.log('The following brands require official certificates:');
   *   analysis.brands.withCert.forEach(brandName => {
   *     console.log(`  - ${brandName}`);
   *   });
   *   console.log('\n⚠️ Products from these brands may be affected if certificates are not provided.');
   * }
   * 
   * if (analysis.noCertNeeded > 0) {
   *   console.log('\n✅ COMPLIANT BRANDS:');
   *   console.log('These brands do not currently require certificates:');
   *   analysis.brands.withoutCert.slice(0, 10).forEach(brandName => {
   *     console.log(`  - ${brandName}`);
   *   });
   *   if (analysis.brands.withoutCert.length > 10) {
   *     console.log(`  ... and ${analysis.brands.withoutCert.length - 10} more`);
   *   }
   * }
   * ```
   */
  async listBrandCertifications(
    params: ListBrandCertificationsRequest
  ): Promise<IHttpResponse<ListBrandCertificationsResponse>> {
    return this.httpClient.post('/v1/brand/company-certification/list', params);
  }

  /**
   * Iterate through all brand certifications with automatic pagination
   * 
   * Automatically handles pagination to retrieve all brands requiring certificates.
   * Useful for processing large numbers of brands without manual page management.
   * 
   * @param params - Pagination parameters (page_size only, page is managed automatically)
   * @returns Async generator yielding pages of brand certifications
   * 
   * @example
   * ```typescript
   * // Process all brands with automatic pagination
   * let totalBrands = 0;
   * let brandsNeedingCerts = 0;
   * const problemBrands: string[] = [];
   * 
   * for await (const brandsPage of client.brand.iterateBrandCertifications({
   *   page_size: 100
   * })) {
   *   totalBrands += brandsPage.length;
   *   
   *   brandsPage.forEach(brand => {
   *     if (brand.has_certificate) {
   *       brandsNeedingCerts++;
   *       problemBrands.push(brand.brand_name || `Brand ID ${brand.brand_id}`);
   *     }
   *   });
   *   
   *   console.log(`Processed ${totalBrands} brands so far...`);
   * }
   * 
   * console.log('\n=== FINAL CERTIFICATION AUDIT ===');
   * console.log(`Total brands reviewed: ${totalBrands}`);
   * console.log(`Brands requiring certificates: ${brandsNeedingCerts}`);
   * console.log(`Compliance rate: ${((totalBrands - brandsNeedingCerts) / totalBrands * 100).toFixed(1)}%`);
   * 
   * if (problemBrands.length > 0) {
   *   console.log('\n🚨 CERTIFICATION REQUIRED FOR:');
   *   problemBrands.forEach((brandName, index) => {
   *     console.log(`${index + 1}. ${brandName}`);
   *   });
   * }
   * ```
   */
  async *iterateBrandCertifications(
    params: Omit<ListBrandCertificationsRequest, 'page'>
  ): AsyncGenerator<BrandCertification[], void, unknown> {
    let page = 1;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.listBrandCertifications({
        ...params,
        page
      });
      
      const certifications = response.data.result?.brand_certification || [];
      if (certifications.length === 0) {
        hasNext = false;
      } else {
        yield certifications;
        hasNext = certifications.length === params.page_size;
        page++;
      }
    }
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Get certification compliance summary
   * 
   * Provides a comprehensive overview of brand certification compliance
   * across all brands in your seller account.
   * 
   * @returns Certification compliance summary
   * 
   * @example
   * ```typescript
   * const summary = await client.brand.getCertificationSummary();
   * 
   * console.log('=== BRAND CERTIFICATION COMPLIANCE SUMMARY ===');
   * console.log(`Total brands: ${summary.totalBrands}`);
   * console.log(`Compliance rate: ${summary.complianceRate.toFixed(1)}%`);
   * console.log();
   * 
   * console.log(`📋 Requiring certificates: ${summary.requiresCertification.count} brands`);
   * console.log(`✅ Compliant: ${summary.compliant.count} brands`);
   * console.log();
   * 
   * if (summary.requiresCertification.count > 0) {
   *   console.log('🚨 IMMEDIATE ATTENTION NEEDED:');
   *   summary.requiresCertification.brands.forEach(brand => {
   *     console.log(`  - ${brand.brand_name} (ID: ${brand.brand_id})`);
   *   });
   *   console.log();
   *   
   *   console.log('📋 NEXT STEPS:');
   *   console.log('1. Contact each brand to obtain official certificates');
   *   console.log('2. Upload certificates through Ozon Seller Portal');
   *   console.log('3. Monitor for any new certification requirements');
   *   console.log('4. Set up regular compliance checks');
   * }
   * 
   * console.log(`\\n📊 RISK ASSESSMENT: ${summary.riskLevel.toUpperCase()}`);
   * summary.recommendations.forEach(rec => {
   *   console.log(`💡 ${rec}`);
   * });
   * ```
   */
  async getCertificationSummary(): Promise<{
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
  }> {
    const allBrands: BrandCertification[] = [];
    
    // Collect all brands with pagination
    for await (const brandsPage of this.iterateBrandCertifications({
      page_size: 100
    })) {
      allBrands.push(...brandsPage);
    }

    // Analyze certification requirements
    const requiresCertification = allBrands.filter(brand => brand.has_certificate);
    const compliant = allBrands.filter(brand => !brand.has_certificate);
    
    const totalBrands = allBrands.length;
    const complianceRate = totalBrands > 0 ? (compliant.length / totalBrands) * 100 : 100;

    // Assess risk level based on compliance rate
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (complianceRate >= 95) riskLevel = 'low';
    else if (complianceRate >= 85) riskLevel = 'medium';
    else if (complianceRate >= 70) riskLevel = 'high';
    else riskLevel = 'critical';

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (requiresCertification.length > 0) {
      recommendations.push(`Obtain certificates for ${requiresCertification.length} brand(s) immediately`);
      recommendations.push('Set up document tracking system for certificate renewals');
    }
    
    if (complianceRate < 100) {
      recommendations.push('Implement regular compliance monitoring schedule');
      recommendations.push('Create brand certification checklist for new products');
    }
    
    if (totalBrands > 10) {
      recommendations.push('Consider using compliance management software');
    }
    
    if (riskLevel === 'critical') {
      recommendations.push('⚠️  CRITICAL: Address certification gaps to avoid sales disruption');
    }

    recommendations.push('Monitor for changes in brand certification requirements');
    recommendations.push('Maintain direct communication channels with brand representatives');

    return {
      totalBrands,
      complianceRate,
      requiresCertification: {
        count: requiresCertification.length,
        brands: requiresCertification
      },
      compliant: {
        count: compliant.length,
        brands: compliant
      },
      riskLevel,
      recommendations
    };
  }

  /**
   * Check if specific brands require certification
   * 
   * Quickly check certification requirements for specific brand names.
   * Useful for validating compliance before adding new products.
   * 
   * @param brandNames - Array of brand names to check
   * @returns Certification status for each brand
   * 
   * @example
   * ```typescript
   * // Check certification requirements for specific brands
   * const brandStatus = await client.brand.checkBrandCertifications([
   *   'Sea of Spa',
   *   'Nike',
   *   'Apple',
   *   'Samsung'
   * ]);
   * 
   * console.log('=== BRAND CERTIFICATION CHECK ===');
   * brandStatus.forEach(status => {
   *   const icon = status.found ? (status.requiresCertification ? '📋' : '✅') : '❓';
   *   const message = !status.found ? 'Not in your account' :
   *                   status.requiresCertification ? 'Certificate required' :
   *                   'No certificate needed';
   *   
   *   console.log(`${icon} ${status.brandName}: ${message}`);
   * });
   * 
   * // Get summary
   * const summary = {
   *   total: brandStatus.length,
   *   found: brandStatus.filter(s => s.found).length,
   *   needsCerts: brandStatus.filter(s => s.requiresCertification).length,
   *   notFound: brandStatus.filter(s => !s.found).length
   * };
   * 
   * console.log(`\\nSummary: ${summary.found}/${summary.total} brands found in account`);
   * if (summary.needsCerts > 0) {
   *   console.log(`⚠️  ${summary.needsCerts} brand(s) require certificates`);
   * }
   * ```
   */
  async checkBrandCertifications(brandNames: string[]): Promise<Array<{
    brandName: string;
    found: boolean;
    brand?: BrandCertification;
    requiresCertification?: boolean;
  }>> {
    // Get all brand certifications
    const allBrands: BrandCertification[] = [];
    
    for await (const brandsPage of this.iterateBrandCertifications({
      page_size: 100
    })) {
      allBrands.push(...brandsPage);
    }

    // Create lookup map for efficient searching
    const brandMap = new Map<string, BrandCertification>();
    allBrands.forEach(brand => {
      if (brand.brand_name) {
        // Case-insensitive matching
        brandMap.set(brand.brand_name.toLowerCase(), brand);
      }
    });

    // Check each requested brand
    return brandNames.map(brandName => {
      const lowerBrandName = brandName.toLowerCase();
      const brand = brandMap.get(lowerBrandName);
      
      return {
        brandName,
        found: !!brand,
        ...(brand && { brand }),
        requiresCertification: brand?.has_certificate || false
      };
    });
  }
}

// Re-export types for convenience
export type * from './types';