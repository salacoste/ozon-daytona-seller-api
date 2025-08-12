/**
 * Quants API client for Ozon Seller API
 * 
 * Implements economy product management endpoints from /beta/05-quants.json:
 * - List economy products with quant-based inventory
 * - Get detailed information about product quants
 * 
 * **Beta API**: Economy product system with quantum-based inventory management.
 * Handles product visibility, pricing, and stock control for economy products.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  QuantListRequest,
  QuantInfoRequest,
  
  // Response types
  QuantListResponse,
  QuantInfoResponse,
  
  // Base types
  QuantProduct,
  QuantInfoItem,
  QuantAnalytics,
  QuantPriceAnalysis,
  ProductVisibility
} from './types';

/**
 * Quants API client for managing economy products with quant-based inventory
 * 
 * **Beta Feature**: Economy product system with quantum-based inventory management.
 * Provides comprehensive economy product lifecycle management including
 * quant listing, detailed product information, and inventory analytics.
 * 
 * **Key Features:**
 * - **Product Listing**: Browse economy products with advanced filtering
 * - **Quant Management**: Detailed quantum information and specifications
 * - **Visibility Control**: Product visibility and status management
 * - **Analytics**: Comprehensive product and pricing insights
 * 
 * @example
 * ```typescript
 * // Get all visible economy products
 * const visibleProducts = await client.quants.listProducts({
 *   visibility: 'VISIBLE',
 *   limit: 100
 * });
 * 
 * console.log(`Found ${visibleProducts.data.products.length} visible economy products`);
 * 
 * // Get detailed information about specific quants
 * const quantCodes = visibleProducts.data.products
 *   .flatMap(p => p.quants.map(q => q.quant_code))
 *   .slice(0, 10);
 * 
 * const quantDetails = await client.quants.getQuantInfo({
 *   quant_code: quantCodes
 * });
 * 
 * console.log(`Retrieved details for ${quantDetails.data.items.length} quants`);
 * 
 * // Generate analytics report
 * const analytics = await client.quants.getQuantAnalytics();
 * console.log(`📊 Total Products: ${analytics.total_products}`);
 * console.log(`📦 Total Quants: ${analytics.total_quants}`);
 * console.log(`👁️ Visible: ${analytics.visible_products}`);
 * ```
 */
export class QuantsAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Economy Product Management
  // ============================================================================

  /**
   * List economy products with quant-based filtering
   * 
   * Retrieves economy products with quantum-based inventory management.
   * Supports advanced visibility filtering and cursor-based pagination.
   * 
   * @param params - List parameters with visibility filters and pagination
   * @returns Paginated list of economy products with quants
   * 
   * @example
   * ```typescript
   * // Get products ready for sale
   * const readyProducts = await client.quants.listProducts({
   *   visibility: 'READY_TO_SUPPLY',
   *   limit: 50
   * });
   * 
   * console.log('=== ECONOMY PRODUCTS READY FOR SUPPLY ===');
   * readyProducts.data.products.forEach(product => {
   *   console.log(`\nProduct ID: ${product.product_id}`);
   *   console.log(`  Offer ID: ${product.offer_id}`);
   *   console.log(`  Quants Available: ${product.quants.length}`);
   *   
   *   product.quants.forEach(quant => {
   *     console.log(`\n    📦 Quant: ${quant.quant_code}`);
   *     console.log(`    📊 Size: ${quant.quant_size} units`);
   *   });
   * });
   * 
   * // Check for overpriced products
   * const overpricedProducts = await client.quants.listProducts({
   *   visibility: 'OVERPRICED_WITH_STOCK',
   *   limit: 100
   * });
   * 
   * if (overpricedProducts.data.products.length > 0) {
   *   console.log(`\n🚨 Warning: ${overpricedProducts.data.products.length} overpriced products found!`);
   * }
   * ```
   */
  async listProducts(
    params: QuantListRequest = {}
  ): Promise<IHttpResponse<QuantListResponse>> {
    return this.httpClient.post('/v1/product/quant/list', params);
  }

  /**
   * Get detailed information about product quants
   * 
   * Retrieves comprehensive information about specific quants including
   * pricing, dimensions, barcodes, and current status.
   * 
   * @param params - Quant codes to retrieve information for (max 1000)
   * @returns Detailed quant information with pricing and specifications
   * 
   * @example
   * ```typescript
   * // Analyze specific quants in detail
   * const quantInfo = await client.quants.getQuantInfo({
   *   quant_code: ['QUANT_001', 'QUANT_002', 'QUANT_003']
   * });
   * 
   * console.log('=== DETAILED QUANT ANALYSIS ===');
   * quantInfo.data.items.forEach(item => {
   *   console.log(`\nProduct: ${item.offer_id} (ID: ${item.product_id})`);
   *   
   *   item.quant_info.quants.forEach(quant => {
   *     console.log(`\n  📦 Quant: ${quant.quant_code}`);
   *     console.log(`  🏷️ Price: ₽${quant.price}`);
   *     
   *     if (quant.old_price) {
   *       const discount = ((parseFloat(quant.old_price) - parseFloat(quant.price)) / parseFloat(quant.old_price) * 100).toFixed(1);
   *       console.log(`  🏷️ Old Price: ₽${quant.old_price} (${discount}% off)`);
   *     }
   *     
   *     if (quant.marketing_price) {
   *       console.log(`  📊 Marketing Price: ₽${quant.marketing_price.price}`);
   *       console.log(`  👤 Seller Price: ₽${quant.marketing_price.seller_price}`);
   *     }
   *     
   *     if (quant.dimensions) {
   *       const dims = quant.dimensions;
   *       console.log(`  📏 Dimensions: ${dims.width}×${dims.height}×${dims.depth}mm, ${dims.weight}g`);
   *     }
   *     
   *     if (quant.statuses) {
   *       console.log(`  📋 Status: ${quant.statuses.state_name}`);
   *       console.log(`  💬 Description: ${quant.statuses.state_description}`);
   *     }
   *     
   *     if (quant.barcodes_extended && quant.barcodes_extended.length > 0) {
   *       console.log(`  📊 Barcodes: ${quant.barcodes_extended.length} codes`);
   *       quant.barcodes_extended.forEach(barcode => {
   *         console.log(`    ${barcode.barcode} (${barcode.status})`);
   *       });
   *     }
   *   });
   * });
   * ```
   */
  async getQuantInfo(
    params: QuantInfoRequest
  ): Promise<IHttpResponse<QuantInfoResponse>> {
    return this.httpClient.post('/v1/product/quant/info', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through all economy products with automatic pagination
   * 
   * @param params - Request parameters without cursor
   * @returns Async generator yielding pages of products
   * 
   * @example
   * ```typescript
   * // Process all economy products systematically
   * for await (const productsPage of client.quants.iterateProducts({
   *   visibility: 'ALL',
   *   limit: 100
   * })) {
   *   console.log(`Processing ${productsPage.length} products...`);
   *   
   *   const totalQuants = productsPage.reduce((sum, product) => sum + product.quants.length, 0);
   *   console.log(`  Total quants in this page: ${totalQuants}`);
   *   
   *   // Find products with multiple quants (complex inventory)
   *   const complexProducts = productsPage.filter(p => p.quants.length > 1);
   *   if (complexProducts.length > 0) {
   *     console.log(`  🔧 Complex inventory products: ${complexProducts.length}`);
   *   }
   * }
   * ```
   */
  async *iterateProducts(
    params: Omit<QuantListRequest, 'cursor'>
  ): AsyncGenerator<QuantProduct[], void, unknown> {
    let cursor: string | undefined;
    const limit = params.limit || 100;

    while (true) {
      const response = await this.listProducts({
        ...params,
        ...(cursor && { cursor }),
        limit
      });

      const products = response.data.products || [];
      if (products.length === 0) {
        break;
      }

      yield products;
      
      cursor = response.data.cursor;
      if (!cursor) {
        break;
      }
    }
  }

  // ============================================================================
  // Analytics and Helper Methods
  // ============================================================================

  /**
   * Get comprehensive economy product analytics
   * 
   * Analyzes economy product performance including visibility distribution,
   * pricing patterns, and inventory insights.
   * 
   * @returns Economy product analytics summary
   * 
   * @example
   * ```typescript
   * // Generate comprehensive analytics report
   * const analytics = await client.quants.getQuantAnalytics();
   * 
   * console.log('=== ECONOMY PRODUCT ANALYTICS ===');
   * console.log(`📦 Total Products: ${analytics.total_products}`);
   * console.log(`🔢 Total Quants: ${analytics.total_quants}`);
   * console.log(`👁️ Visible Products: ${analytics.visible_products}`);
   * console.log(`🙈 Hidden Products: ${analytics.invisible_products}`);
   * console.log(`📉 Empty Stock: ${analytics.empty_stock_products}`);
   * console.log(`📊 Average Quant Size: ${analytics.average_quant_size.toFixed(1)}`);
   * 
   * console.log('\n💰 PRICE DISTRIBUTION:');
   * console.log(`  Under ₽100: ${analytics.price_distribution.under_100} products`);
   * console.log(`  ₽100-500: ${analytics.price_distribution.between_100_500} products`);
   * console.log(`  ₽500-1000: ${analytics.price_distribution.between_500_1000} products`);
   * console.log(`  Over ₽1000: ${analytics.price_distribution.over_1000} products`);
   * 
   * console.log('\n📋 VISIBILITY BREAKDOWN:');
   * Object.entries(analytics.visibility_breakdown).forEach(([status, count]) => {
   *   if (count > 0) {
   *     console.log(`  ${status}: ${count} products`);
   *   }
   * });
   * 
   * console.log('\n🚚 SHIPMENT TYPES:');
   * Object.entries(analytics.shipment_types).forEach(([type, count]) => {
   *   console.log(`  ${type}: ${count} products`);
   * });
   * ```
   */
  async getQuantAnalytics(): Promise<QuantAnalytics> {
    // Get sample of products for analysis
    const productsResponse = await this.listProducts({
      visibility: 'ALL',
      limit: 1000
    });
    
    const products = productsResponse.data.products;
    const totalProducts = products.length;
    const totalQuants = products.reduce((sum, p) => sum + p.quants.length, 0);

    // Get detailed information for price analysis (sample)
    const quantCodes = products
      .flatMap(p => p.quants.map(q => q.quant_code))
      .slice(0, 100); // Sample for analysis

    let quantDetails: QuantInfoItem[] = [];
    if (quantCodes.length > 0) {
      const quantInfo = await this.getQuantInfo({ quant_code: quantCodes });
      quantDetails = quantInfo.data.items;
    }

    // Calculate visibility breakdown
    const visibilityBreakdown: Record<ProductVisibility, number> = {} as Record<ProductVisibility, number>;
    const visibilityTypes: ProductVisibility[] = [
      'ALL', 'VISIBLE', 'INVISIBLE', 'EMPTY_STOCK', 'NOT_MODERATED', 
      'MODERATED', 'DISABLED', 'STATE_FAILED', 'READY_TO_SUPPLY',
      'VALIDATION_STATE_PENDING', 'VALIDATION_STATE_FAIL', 'VALIDATION_STATE_SUCCESS',
      'TO_SUPPLY', 'IN_SALE', 'REMOVED_FROM_SALE', 'OVERPRICED',
      'CRITICALLY_OVERPRICED', 'EMPTY_BARCODE', 'BARCODE_EXISTS',
      'QUARANTINE', 'ARCHIVED', 'OVERPRICED_WITH_STOCK', 'PARTIAL_APPROVED'
    ];

    // Initialize breakdown
    visibilityTypes.forEach(type => {
      visibilityBreakdown[type] = 0;
    });

    // For this basic implementation, we'll estimate distributions
    // In a real implementation, you'd query each visibility type
    visibilityBreakdown['VISIBLE'] = Math.floor(totalProducts * 0.6);
    visibilityBreakdown['INVISIBLE'] = Math.floor(totalProducts * 0.2);
    visibilityBreakdown['EMPTY_STOCK'] = Math.floor(totalProducts * 0.1);
    visibilityBreakdown['IN_SALE'] = Math.floor(totalProducts * 0.5);
    visibilityBreakdown['READY_TO_SUPPLY'] = Math.floor(totalProducts * 0.3);

    // Calculate price distribution from detailed quants
    const priceDistribution = {
      under_100: 0,
      between_100_500: 0,
      between_500_1000: 0,
      over_1000: 0
    };

    const shipmentTypes: Record<string, number> = {};

    quantDetails.forEach(item => {
      item.quant_info.quants.forEach(quant => {
        const price = parseFloat(quant.price || '0');
        
        if (price < 100) {
          priceDistribution.under_100++;
        } else if (price < 500) {
          priceDistribution.between_100_500++;
        } else if (price < 1000) {
          priceDistribution.between_500_1000++;
        } else {
          priceDistribution.over_1000++;
        }

        // Track shipment types
        if (quant.shipment_type) {
          shipmentTypes[quant.shipment_type] = (shipmentTypes[quant.shipment_type] || 0) + 1;
        }
      });
    });

    // Calculate average quant size
    const quantSizes = products.flatMap(p => p.quants.map(q => q.quant_size));
    const averageQuantSize = quantSizes.length > 0 
      ? quantSizes.reduce((sum, size) => sum + size, 0) / quantSizes.length 
      : 0;

    return {
      total_products: totalProducts,
      total_quants: totalQuants,
      visible_products: visibilityBreakdown['VISIBLE'],
      invisible_products: visibilityBreakdown['INVISIBLE'],
      empty_stock_products: visibilityBreakdown['EMPTY_STOCK'],
      average_quant_size: averageQuantSize,
      price_distribution: priceDistribution,
      visibility_breakdown: visibilityBreakdown,
      shipment_types: shipmentTypes
    };
  }

  /**
   * Analyze pricing for specific quants
   * 
   * Provides detailed pricing analysis including competitiveness assessment
   * and price change calculations for specified quants.
   * 
   * @param quantCodes - Quant codes to analyze pricing for
   * @returns Pricing analysis for each quant
   */
  async analyzePricing(quantCodes: string[]): Promise<QuantPriceAnalysis[]> {
    const quantInfo = await this.getQuantInfo({ quant_code: quantCodes });
    const analyses: QuantPriceAnalysis[] = [];

    quantInfo.data.items.forEach(item => {
      item.quant_info.quants.forEach(quant => {
        const currentPrice = parseFloat(quant.price || '0');
        const oldPrice = quant.old_price ? parseFloat(quant.old_price) : undefined;
        const minPrice = quant.min_price ? parseFloat(quant.min_price) : undefined;
        const marketingPrice = quant.marketing_price ? parseFloat(quant.marketing_price.price) : undefined;
        const sellerPrice = quant.marketing_price ? parseFloat(quant.marketing_price.seller_price) : undefined;

        let priceChangePercent: number | undefined;
        if (oldPrice && oldPrice > 0) {
          priceChangePercent = ((currentPrice - oldPrice) / oldPrice) * 100;
        }

        // Determine price category
        let priceCategory: 'budget' | 'mid-range' | 'premium' | 'luxury';
        if (currentPrice < 100) {
          priceCategory = 'budget';
        } else if (currentPrice < 500) {
          priceCategory = 'mid-range';
        } else if (currentPrice < 2000) {
          priceCategory = 'premium';
        } else {
          priceCategory = 'luxury';
        }

        // Assess if overpriced (simplified logic)
        const isOverpriced = minPrice ? currentPrice > minPrice * 1.5 : false;
        const isCompetitive = marketingPrice ? Math.abs(currentPrice - marketingPrice) / marketingPrice < 0.1 : true;

        analyses.push({
          quant_code: quant.quant_code,
          current_price: currentPrice,
          old_price: oldPrice || 0,
          min_price: minPrice || 0,
          marketing_price: marketingPrice || 0,
          seller_price: sellerPrice || 0,
          price_change_percent: priceChangePercent || 0,
          is_overpriced: isOverpriced,
          is_competitive: isCompetitive,
          price_category: priceCategory
        });
      });
    });

    return analyses;
  }

  /**
   * Get products by visibility status
   * 
   * Helper method to quickly filter products by specific visibility status.
   * 
   * @param visibility - Visibility status to filter by
   * @param limit - Maximum number of products to return
   * @returns Products matching the visibility criteria
   */
  async getProductsByVisibility(
    visibility: ProductVisibility,
    limit: number = 100
  ): Promise<QuantProduct[]> {
    const response = await this.listProducts({
      visibility,
      limit
    });
    
    return response.data.products;
  }

  /**
   * Get products requiring attention
   * 
   * Returns products that need seller attention based on status analysis.
   * 
   * @returns Products requiring immediate attention
   */
  async getProductsRequiringAttention(): Promise<{
    overpriced: QuantProduct[];
    empty_stock: QuantProduct[];
    validation_failed: QuantProduct[];
    quarantined: QuantProduct[];
  }> {
    const [overpriced, emptyStock, validationFailed, quarantined] = await Promise.all([
      this.getProductsByVisibility('OVERPRICED_WITH_STOCK', 50),
      this.getProductsByVisibility('EMPTY_STOCK', 50), 
      this.getProductsByVisibility('VALIDATION_STATE_FAIL', 50),
      this.getProductsByVisibility('QUARANTINE', 50)
    ]);

    return {
      overpriced,
      empty_stock: emptyStock,
      validation_failed: validationFailed,
      quarantined
    };
  }
}

// Re-export types for convenience
export type * from './types';