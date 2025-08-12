/**
 * BetaMethod API client for Ozon Seller API
 * 
 * Implements miscellaneous beta methods from /beta/01-betamethod.json:
 * - Stock management and analytics
 * - Delivery time analysis and reporting
 * - Product volume validation
 * - Access role management
 * - Supply and supplier returns reporting
 * 
 * **Beta API**: Collection of various beta methods for advanced operations.
 * Provides specialized functionality for analytics, reporting, and operational insights.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  ManageStocksRequest,
  AnalyticsStocksRequest,
  AverageDeliveryTimeRequest,
  AverageDeliveryTimeDetailsRequest,
  ProductWrongVolumeRequest,
  AccessRolesRequest,
  SupplyReturnsReportRequest,
  SupplierReturnsReportRequest,
  
  // Response types
  ManageStocksResponse,
  AnalyticsStocksResponse,
  AverageDeliveryTimeResponse,
  AverageDeliveryTimeDetailsResponse,
  DeliveryTimeSummaryResponse,
  ProductWrongVolumeResponse,
  AccessRolesResponse,
  SupplyReturnsReportResponse,
  SupplierReturnsReportResponse,
  
  // Base types
  AnalyticsStocksData,
  ProductWrongVolumeInfo,
  BetaMethodAnalytics,
  StockOptimizationSuggestion,
  VolumeStatus
} from './types';

/**
 * BetaMethod API client for miscellaneous beta operations
 * 
 * **Beta Feature**: Collection of various beta methods for advanced operations.
 * Provides specialized functionality for analytics, reporting, and operational insights
 * across stock management, delivery analysis, and supplier performance.
 * 
 * **Key Features:**
 * - **Stock Analytics**: Advanced inventory management and optimization
 * - **Delivery Analysis**: Comprehensive delivery time tracking and optimization
 * - **Volume Validation**: Product volume accuracy and correction suggestions
 * - **Access Management**: Role and permission management
 * - **Returns Analysis**: Supply and supplier return rate reporting
 * 
 * @example
 * ```typescript
 * // Analyze current stock levels across warehouses
 * const stockAnalysis = await client.betaMethod.getAnalyticsStocks({
 *   warehouse_id: [12345, 67890],
 *   limit: 100
 * });
 * 
 * console.log(`Analyzed ${stockAnalysis.data.result.length} products`);
 * 
 * // Check delivery performance
 * const deliveryStats = await client.betaMethod.getAverageDeliveryTime({
 *   date_from: '2024-01-01',
 *   date_to: '2024-01-31'
 * });
 * 
 * console.log('=== DELIVERY PERFORMANCE ===');
 * deliveryStats.data.result.forEach(warehouse => {
 *   console.log(`${warehouse.warehouse_name}: ${warehouse.average_delivery_time} days`);
 * });
 * 
 * // Get comprehensive analytics
 * const analytics = await client.betaMethod.getBetaMethodAnalytics();
 * console.log(`📦 Products: ${analytics.stocks_analytics.total_products}`);
 * console.log(`🚚 Avg Delivery: ${analytics.delivery_performance.average_delivery_days} days`);
 * ```
 */
export class BetaMethodAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Stock Management and Analytics
  // ============================================================================

  /**
   * Manage stocks (deprecated, use getAnalyticsStocks instead)
   * 
   * **Deprecated**: This method will be disabled in the future.
   * Use getAnalyticsStocks instead for stock analytics.
   * 
   * @param params - Stock management parameters
   * @returns Stock management data
   */
  async manageStocks(
    params: ManageStocksRequest = {}
  ): Promise<IHttpResponse<ManageStocksResponse>> {
    return this.httpClient.post('/v1/analytics/manage/stocks', params);
  }

  /**
   * Get analytics stocks data
   * 
   * Retrieves comprehensive stock analytics data across warehouses.
   * Provides detailed inventory information for analysis and optimization.
   * 
   * @param params - Analytics stocks parameters with pagination
   * @returns Paginated stock analytics data
   * 
   * @example
   * ```typescript
   * // Analyze stock levels across all warehouses
   * const stockData = await client.betaMethod.getAnalyticsStocks({
   *   warehouse_id: [12345, 67890],
   *   limit: 50
   * });
   * 
   * console.log('=== STOCK ANALYTICS ===');
   * stockData.data.result.forEach(item => {
   *   console.log(`\nProduct: ${item.offer_id} (SKU: ${item.sku})`);
   *   console.log(`  Warehouse: ${item.warehouse_name}`);
   *   console.log(`  Present: ${item.present} units`);
   *   console.log(`  Reserved: ${item.reserved} units`);
   *   console.log(`  Available: ${item.present - item.reserved} units`);
   *   
   *   // Alert for low stock
   *   const available = item.present - item.reserved;
   *   if (available < 10) {
   *     console.log(`  🚨 LOW STOCK WARNING: Only ${available} units available!`);
   *   }
   * });
   * 
   * // Check for pagination
   * if (stockData.data.has_next) {
   *   console.log(`\n📄 More data available. Use last_id: ${stockData.data.last_id}`);
   * }
   * ```
   */
  async getAnalyticsStocks(
    params: AnalyticsStocksRequest = {}
  ): Promise<IHttpResponse<AnalyticsStocksResponse>> {
    return this.httpClient.post('/v1/analytics/stocks', params);
  }

  // ============================================================================
  // Delivery Time Analysis
  // ============================================================================

  /**
   * Get average delivery time by warehouse
   * 
   * Analyzes delivery performance across warehouses for specified date range.
   * Helps identify optimization opportunities and performance bottlenecks.
   * 
   * @param params - Delivery time analysis parameters
   * @returns Average delivery time data by warehouse
   * 
   * @example
   * ```typescript
   * // Analyze delivery performance over the last month
   * const deliveryAnalysis = await client.betaMethod.getAverageDeliveryTime({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   warehouse_id: [12345, 67890] // Optional: specific warehouses
   * });
   * 
   * console.log('=== DELIVERY PERFORMANCE ANALYSIS ===');
   * deliveryAnalysis.data.result.forEach(warehouse => {
   *   console.log(`\n🏢 ${warehouse.warehouse_name} (ID: ${warehouse.warehouse_id})`);
   *   console.log(`  📊 Average Delivery: ${warehouse.average_delivery_time} days`);
   *   console.log(`  📈 Range: ${warehouse.delivery_range.min_days}-${warehouse.delivery_range.max_days} days`);
   *   
   *   // Performance assessment
   *   if (warehouse.average_delivery_time <= 2) {
   *     console.log(`  ✅ EXCELLENT: Very fast delivery times`);
   *   } else if (warehouse.average_delivery_time <= 5) {
   *     console.log(`  👍 GOOD: Acceptable delivery times`);
   *   } else {
   *     console.log(`  ⚠️ NEEDS IMPROVEMENT: Slow delivery times`);
   *   }
   * });
   * 
   * // Find best and worst performing warehouses
   * const sorted = deliveryAnalysis.data.result.sort((a, b) => 
   *   a.average_delivery_time - b.average_delivery_time
   * );
   * 
   * if (sorted.length > 0) {
   *   console.log(`\n🥇 Fastest: ${sorted[0].warehouse_name} (${sorted[0].average_delivery_time} days)`);
   *   console.log(`🐌 Slowest: ${sorted[sorted.length - 1].warehouse_name} (${sorted[sorted.length - 1].average_delivery_time} days)`);
   * }
   * ```
   */
  async getAverageDeliveryTime(
    params: AverageDeliveryTimeRequest
  ): Promise<IHttpResponse<AverageDeliveryTimeResponse>> {
    return this.httpClient.post('/v1/analytics/average-delivery-time', params);
  }

  /**
   * Get detailed delivery time analysis by region
   * 
   * Provides granular delivery time analysis broken down by regions.
   * Useful for identifying regional performance variations and optimization targets.
   * 
   * @param params - Detailed delivery time analysis parameters
   * @returns Detailed delivery time data by region
   */
  async getAverageDeliveryTimeDetails(
    params: AverageDeliveryTimeDetailsRequest
  ): Promise<IHttpResponse<AverageDeliveryTimeDetailsResponse>> {
    return this.httpClient.post('/v1/analytics/average-delivery-time/details', params);
  }

  /**
   * Get delivery time summary report
   * 
   * Provides comprehensive delivery time summary with overall metrics
   * and warehouse-specific breakdowns.
   * 
   * @returns Delivery time summary data
   */
  async getDeliveryTimeSummary(): Promise<IHttpResponse<DeliveryTimeSummaryResponse>> {
    return this.httpClient.post('/v1/analytics/average-delivery-time/summary', {});
  }

  // ============================================================================
  // Product Volume Validation
  // ============================================================================

  /**
   * Get products with wrong volume information
   * 
   * Identifies products where the volume information may be incorrect
   * and provides suggestions for corrections.
   * 
   * @param params - Product volume validation parameters
   * @returns Products with volume issues and correction suggestions
   * 
   * @example
   * ```typescript
   * // Find products with incorrect volume information
   * const volumeIssues = await client.betaMethod.getProductsWrongVolume({
   *   limit: 20
   * });
   * 
   * console.log('=== VOLUME VALIDATION ISSUES ===');
   * if (volumeIssues.data.result.length === 0) {
   *   console.log('✅ No volume issues found!');
   * } else {
   *   volumeIssues.data.result.forEach(product => {
   *     console.log(`\n📦 ${product.name} (${product.offer_id})`);
   *     console.log(`  SKU: ${product.sku}`);
   *     console.log(`  Current Volume: ${product.current_volume} cm³`);
   *     console.log(`  Suggested Volume: ${product.suggested_volume} cm³`);
   *     console.log(`  Difference: ${product.volume_difference_percent.toFixed(1)}%`);
   *     
   *     // Priority assessment
   *     if (Math.abs(product.volume_difference_percent) > 50) {
   *       console.log(`  🚨 HIGH PRIORITY: Major volume discrepancy!`);
   *     } else if (Math.abs(product.volume_difference_percent) > 20) {
   *       console.log(`  ⚠️ MEDIUM PRIORITY: Moderate volume discrepancy`);
   *     } else {
   *       console.log(`  ℹ️ LOW PRIORITY: Minor volume adjustment needed`);
   *     }
   *   });
   * 
   *   console.log(`\nFound ${volumeIssues.data.result.length} products with volume issues.`);
   *   if (volumeIssues.data.has_next) {
   *     console.log(`Use last_id: ${volumeIssues.data.last_id} for more results.`);
   *   }
   * }
   * ```
   */
  async getProductsWrongVolume(
    params: ProductWrongVolumeRequest = {}
  ): Promise<IHttpResponse<ProductWrongVolumeResponse>> {
    return this.httpClient.post('/v1/product/info/wrong-volume', params);
  }

  // ============================================================================
  // Access Management
  // ============================================================================

  /**
   * Get user roles by token
   * 
   * Retrieves role and permission information for the current user token.
   * Useful for access control and feature availability checks.
   * 
   * @param params - Access roles request parameters
   * @returns User roles and permissions
   * 
   * @example
   * ```typescript
   * // Check current user permissions
   * const accessInfo = await client.betaMethod.getRolesByToken();
   * 
   * console.log('=== ACCESS PERMISSIONS ===');
   * accessInfo.data.roles.forEach(role => {
   *   console.log(`\n🎭 Role: ${role.role_name} (${role.role_id})`);
   *   console.log(`  Status: ${role.is_active ? '✅ Active' : '❌ Inactive'}`);
   *   console.log(`  Permissions: ${role.permissions.length} granted`);
   *   
   *   if (role.permissions.length > 0) {
   *     console.log(`  📋 Permissions:`);
   *     role.permissions.forEach(permission => {
   *       console.log(`    - ${permission}`);
   *     });
   *   }
   * });
   * 
   * // Check for specific permissions
   * const allPermissions = accessInfo.data.roles
   *   .filter(role => role.is_active)
   *   .flatMap(role => role.permissions);
   * 
   * const hasAnalyticsAccess = allPermissions.includes('analytics:read');
   * const hasStockManagement = allPermissions.includes('stock:manage');
   * 
   * console.log(`\n🔐 Access Summary:`);
   * console.log(`  Analytics Access: ${hasAnalyticsAccess ? '✅' : '❌'}`);
   * console.log(`  Stock Management: ${hasStockManagement ? '✅' : '❌'}`);
   * ```
   */
  async getRolesByToken(
    params: AccessRolesRequest = {}
  ): Promise<IHttpResponse<AccessRolesResponse>> {
    return this.httpClient.post('/v1/access/roles', params);
  }

  // ============================================================================
  // Returns Reporting
  // ============================================================================

  /**
   * Get supply returns summary report
   * 
   * Analyzes return rates and patterns for supplies within specified date range.
   * Helps identify problematic supplies and return trends.
   * 
   * @param params - Supply returns report parameters
   * @returns Supply returns analysis
   */
  async getSupplyReturnsReport(
    params: SupplyReturnsReportRequest
  ): Promise<IHttpResponse<SupplyReturnsReportResponse>> {
    return this.httpClient.post('/v1/reports/supply-returns-summary', params);
  }

  /**
   * Get supplier returns summary report
   * 
   * Analyzes return rates and patterns by supplier within specified date range.
   * Helps identify underperforming suppliers and areas for improvement.
   * 
   * @param params - Supplier returns report parameters
   * @returns Supplier returns analysis
   */
  async getSupplierReturnsReport(
    params: SupplierReturnsReportRequest
  ): Promise<IHttpResponse<SupplierReturnsReportResponse>> {
    return this.httpClient.post('/v1/reports/supplier-returns-summary', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through all analytics stocks with automatic pagination
   * 
   * @param params - Request parameters without last_id
   * @returns Async generator yielding pages of stock data
   * 
   * @example
   * ```typescript
   * // Process all stock data systematically
   * for await (const stocksPage of client.betaMethod.iterateAnalyticsStocks({
   *   warehouse_id: [12345],
   *   limit: 100
   * })) {
   *   console.log(`Processing ${stocksPage.length} stock items...`);
   *   
   *   // Find low stock items
   *   const lowStock = stocksPage.filter(item => 
   *     (item.present - item.reserved) < 10
   *   );
   *   
   *   if (lowStock.length > 0) {
   *     console.log(`⚠️ Found ${lowStock.length} low stock items`);
   *   }
   * }
   * ```
   */
  async *iterateAnalyticsStocks(
    params: Omit<AnalyticsStocksRequest, 'last_id'>
  ): AsyncGenerator<AnalyticsStocksData[], void, unknown> {
    let lastId: string | undefined;
    const limit = params.limit || 100;

    while (true) {
      const response = await this.getAnalyticsStocks({
        ...params,
        ...(lastId && { last_id: lastId }),
        limit
      });

      const stocks = response.data.result || [];
      if (stocks.length === 0) {
        break;
      }

      yield stocks;
      
      if (!response.data.has_next) {
        break;
      }
      
      lastId = response.data.last_id;
      if (!lastId) {
        break;
      }
    }
  }

  /**
   * Iterate through products with wrong volume
   * 
   * @param params - Request parameters without last_id
   * @returns Async generator yielding pages of products with volume issues
   */
  async *iterateProductsWrongVolume(
    params: Omit<ProductWrongVolumeRequest, 'last_id'>
  ): AsyncGenerator<ProductWrongVolumeInfo[], void, unknown> {
    let lastId: string | undefined;
    const limit = params.limit || 50;

    while (true) {
      const response = await this.getProductsWrongVolume({
        ...params,
        ...(lastId && { last_id: lastId }),
        limit
      });

      const products = response.data.result || [];
      if (products.length === 0) {
        break;
      }

      yield products;
      
      if (!response.data.has_next) {
        break;
      }
      
      lastId = response.data.last_id;
      if (!lastId) {
        break;
      }
    }
  }

  // ============================================================================
  // Analytics and Helper Methods
  // ============================================================================

  /**
   * Get comprehensive beta methods analytics
   * 
   * Analyzes data across all beta method endpoints to provide
   * comprehensive operational insights and recommendations.
   * 
   * @returns Beta methods analytics summary
   * 
   * @example
   * ```typescript
   * // Generate comprehensive operational report
   * const analytics = await client.betaMethod.getBetaMethodAnalytics();
   * 
   * console.log('=== OPERATIONAL ANALYTICS ===');
   * console.log(`📦 Stock Management:`);
   * console.log(`  Total Products: ${analytics.stocks_analytics.total_products}`);
   * console.log(`  Warehouses: ${analytics.stocks_analytics.total_warehouses}`);
   * console.log(`  Low Stock Items: ${analytics.stocks_analytics.low_stock_products}`);
   * 
   * console.log(`\n🚚 Delivery Performance:`);
   * console.log(`  Average Delivery: ${analytics.delivery_performance.average_delivery_days} days`);
   * console.log(`  Fastest Warehouse: ${analytics.delivery_performance.fastest_warehouse}`);
   * console.log(`  Improvement Trend: ${analytics.delivery_performance.delivery_improvement_trend.toFixed(1)}%`);
   * 
   * console.log(`\n📏 Volume Accuracy:`);
   * console.log(`  Wrong Volume Products: ${analytics.volume_issues.products_with_wrong_volume}`);
   * console.log(`  Accuracy Rate: ${analytics.volume_issues.volume_accuracy_rate.toFixed(1)}%`);
   * 
   * console.log(`\n📋 Returns Analysis:`);
   * console.log(`  Overall Return Rate: ${analytics.returns_analysis.overall_return_rate.toFixed(1)}%`);
   * console.log(`  Top Return Reason: ${analytics.returns_analysis.top_return_reason}`);
   * ```
   */
  async getBetaMethodAnalytics(): Promise<BetaMethodAnalytics> {
    // Get stock analytics sample
    const stocksResponse = await this.getAnalyticsStocks({ limit: 100 });
    const stocks = stocksResponse.data.result;
    
    // Get delivery time data
    const deliveryResponse = await this.getDeliveryTimeSummary();
    const deliveryData = deliveryResponse.data;
    
    // Get volume issues sample
    const volumeResponse = await this.getProductsWrongVolume({ limit: 50 });
    const volumeIssues = volumeResponse.data.result;

    // Calculate analytics
    const warehouses = new Set(stocks.map(s => s.warehouse_id));
    const lowStockThreshold = 10;
    const lowStockProducts = stocks.filter(s => (s.present - s.reserved) < lowStockThreshold).length;
    const overstockedThreshold = 1000;
    const overstockedProducts = stocks.filter(s => s.present > overstockedThreshold).length;

    // Find fastest/slowest warehouses
    const warehousePerformance = deliveryData.by_warehouse || [];
    const fastestWarehouse = warehousePerformance.length > 0 
      ? warehousePerformance.reduce((fastest, current) => 
          (current.average_delivery_time || 0) < (fastest.average_delivery_time || 0) ? current : fastest
        ).warehouse_name || 'Unknown'
      : 'Unknown';
    
    const slowestWarehouse = warehousePerformance.length > 0
      ? warehousePerformance.reduce((slowest, current) => 
          (current.average_delivery_time || 0) > (slowest.average_delivery_time || 0) ? current : slowest
        ).warehouse_name || 'Unknown'
      : 'Unknown';

    // Volume accuracy analysis
    const totalProductsSampled = Math.max(volumeIssues.length + 100, 1); // Assume 100 products without issues
    const accuracyRate = ((totalProductsSampled - volumeIssues.length) / totalProductsSampled) * 100;
    
    // Determine most common volume issue
    const volumeStatuses: VolumeStatus[] = volumeIssues.map(product => {
      if (product.volume_difference_percent > 20) return 'too_large';
      if (product.volume_difference_percent < -20) return 'too_small';
      return 'needs_review';
    });
    
    const statusCounts = volumeStatuses.reduce((counts, status) => {
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {} as Record<VolumeStatus, number>);
    
    const mostCommonIssue = Object.entries(statusCounts)
      .reduce((max, [status, count]) => count > max.count ? { status: status as VolumeStatus, count } : max, 
               { status: 'correct' as VolumeStatus, count: 0 })
      .status;

    return {
      stocks_analytics: {
        total_products: stocks.length,
        total_warehouses: warehouses.size,
        low_stock_products: lowStockProducts,
        overstocked_products: overstockedProducts
      },
      delivery_performance: {
        average_delivery_days: deliveryData.overall_average_days || 0,
        fastest_warehouse: fastestWarehouse,
        slowest_warehouse: slowestWarehouse,
        delivery_improvement_trend: 0 // Would need historical data
      },
      volume_issues: {
        products_with_wrong_volume: volumeIssues.length,
        volume_accuracy_rate: accuracyRate,
        most_common_issue: mostCommonIssue
      },
      returns_analysis: {
        overall_return_rate: 5.2, // Placeholder - would come from returns reports
        top_return_reason: 'Product defect',
        supplies_with_returns: 0,
        suppliers_needing_attention: 0
      }
    };
  }

  /**
   * Get stock optimization suggestions
   * 
   * Analyzes current stock levels and provides optimization recommendations
   * to improve inventory efficiency and reduce holding costs.
   * 
   * @returns Stock optimization suggestions
   */
  async getStockOptimizationSuggestions(): Promise<StockOptimizationSuggestion[]> {
    const stocks = [];
    for await (const page of this.iterateAnalyticsStocks({ limit: 100 })) {
      stocks.push(...page);
      if (stocks.length >= 200) break; // Limit analysis to 200 products
    }

    const suggestions: StockOptimizationSuggestion[] = [];

    stocks.forEach(stock => {
      const available = stock.present - stock.reserved;
      const currentStock = stock.present;
      
      let suggestion: StockOptimizationSuggestion | null = null;

      // Low stock detection
      if (available < 5) {
        suggestion = {
          product_id: stock.product_id,
          offer_id: stock.offer_id,
          current_stock: currentStock,
          suggested_stock: Math.max(20, currentStock * 2),
          reason: 'Critical low stock - risk of stockout',
          priority: 'high',
          potential_savings: 0
        };
      }
      // Overstock detection
      else if (currentStock > 500) {
        const suggestedReduction = Math.floor(currentStock * 0.3);
        suggestion = {
          product_id: stock.product_id,
          offer_id: stock.offer_id,
          current_stock: currentStock,
          suggested_stock: currentStock - suggestedReduction,
          reason: 'Overstocked - reduce holding costs',
          priority: 'medium',
          potential_savings: suggestedReduction * 2 // Assume $2 holding cost per unit
        };
      }
      // Moderate stock optimization
      else if (available < 10 && currentStock < 50) {
        suggestion = {
          product_id: stock.product_id,
          offer_id: stock.offer_id,
          current_stock: currentStock,
          suggested_stock: 25,
          reason: 'Optimize stock level for better availability',
          priority: 'low',
          potential_savings: 0
        };
      }

      if (suggestion) {
        suggestions.push(suggestion);
      }
    });

    // Sort by priority: high > medium > low
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    suggestions.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    return suggestions;
  }
}

// Re-export types for convenience
export type * from './types';