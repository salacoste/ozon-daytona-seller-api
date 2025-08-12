/**
 * @fileoverview Unit tests for BetaMethodAPI client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { BetaMethodAPI } from '../../../src/clients/betaMethod';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  AnalyticsStocksResponse,
  AverageDeliveryTimeResponse,
  DeliveryTimeSummaryResponse,
  ProductWrongVolumeResponse,
  AccessRolesResponse,
  AnalyticsStocksData,
  ProductWrongVolumeInfo,
  DeliveryTimeData,
  AccessRole
} from '../../../src/clients/betaMethod/types';

describe('BetaMethodAPI', () => {
  let betaMethodAPI: BetaMethodAPI;
  let mockHttpClient: {
    get: MockInstance;
    post: MockInstance;
    put: MockInstance;
    delete: MockInstance;
  };

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    betaMethodAPI = new BetaMethodAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('Stock Management', () => {
    it('should get analytics stocks successfully', async () => {
      const mockStocksData: AnalyticsStocksData[] = [
        {
          product_id: 123456,
          offer_id: 'PRODUCT_001',
          sku: 987654,
          present: 150,
          reserved: 25,
          warehouse_name: 'Main Warehouse',
          warehouse_id: 12345
        },
        {
          product_id: 789012,
          offer_id: 'PRODUCT_002',
          sku: 543210,
          present: 75,
          reserved: 10,
          warehouse_name: 'Secondary Warehouse',
          warehouse_id: 67890
        }
      ];

      const mockResponse: IHttpResponse<AnalyticsStocksResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/stocks',
        data: {
          result: mockStocksData,
          last_id: 'next_stocks_token',
          has_next: true
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await betaMethodAPI.getAnalyticsStocks({
        warehouse_id: [12345, 67890],
        limit: 100
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/stocks', {
        warehouse_id: [12345, 67890],
        limit: 100
      });

      expect(result.data.result).toHaveLength(2);
      expect(result.data.result[0].offer_id).toBe('PRODUCT_001');
      expect(result.data.result[0].present - result.data.result[0].reserved).toBe(125); // Available stock
      expect(result.data.has_next).toBe(true);
    });

    it('should handle empty stocks response', async () => {
      const mockResponse: IHttpResponse<AnalyticsStocksResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/stocks',
        data: {
          result: [],
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await betaMethodAPI.getAnalyticsStocks({ limit: 50 });

      expect(result.data.result).toHaveLength(0);
      expect(result.data.has_next).toBe(false);
    });
  });

  describe('Delivery Time Analysis', () => {
    it('should get average delivery time successfully', async () => {
      const mockDeliveryData: DeliveryTimeData[] = [
        {
          warehouse_id: 12345,
          warehouse_name: 'Fast Warehouse',
          average_delivery_time: 2.5,
          delivery_range: {
            min_days: 1,
            max_days: 4
          }
        },
        {
          warehouse_id: 67890,
          warehouse_name: 'Standard Warehouse',
          average_delivery_time: 4.2,
          delivery_range: {
            min_days: 3,
            max_days: 7
          }
        }
      ];

      const mockResponse: IHttpResponse<AverageDeliveryTimeResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/average-delivery-time',
        data: {
          result: mockDeliveryData
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await betaMethodAPI.getAverageDeliveryTime({
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        warehouse_id: [12345, 67890]
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/average-delivery-time', {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        warehouse_id: [12345, 67890]
      });

      expect(result.data.result).toHaveLength(2);
      expect(result.data.result[0].warehouse_name).toBe('Fast Warehouse');
      expect(result.data.result[0].average_delivery_time).toBe(2.5);
      expect(result.data.result[1].delivery_range.max_days).toBe(7);
    });

    it('should get delivery time summary', async () => {
      const mockSummary = {
        overall_average_hours: 78,
        overall_average_days: 3.25,
        total_deliveries: 1250,
        by_warehouse: [
          {
            warehouse_id: 12345,
            warehouse_name: 'Fast Warehouse',
            average_delivery_time: 2.1,
            delivery_range: { min_days: 1, max_days: 3 }
          }
        ]
      };

      const mockResponse: IHttpResponse<DeliveryTimeSummaryResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/average-delivery-time/summary',
        data: mockSummary
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await betaMethodAPI.getDeliveryTimeSummary();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/average-delivery-time/summary', {});
      expect(result.data.overall_average_days).toBe(3.25);
      expect(result.data.total_deliveries).toBe(1250);
      expect(result.data.by_warehouse).toHaveLength(1);
    });
  });

  describe('Product Volume Validation', () => {
    it('should get products with wrong volume', async () => {
      const mockVolumeIssues: ProductWrongVolumeInfo[] = [
        {
          product_id: 123456,
          offer_id: 'VOLUME_ISSUE_001',
          sku: 987654,
          name: 'Test Product with Volume Issue',
          current_volume: 1000,
          suggested_volume: 750,
          volume_difference_percent: -25.0
        },
        {
          product_id: 789012,
          offer_id: 'VOLUME_ISSUE_002', 
          sku: 543210,
          name: 'Another Product',
          current_volume: 500,
          suggested_volume: 800,
          volume_difference_percent: 60.0
        }
      ];

      const mockResponse: IHttpResponse<ProductWrongVolumeResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/info/wrong-volume',
        data: {
          result: mockVolumeIssues,
          last_id: 'volume_token_123',
          has_next: true
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await betaMethodAPI.getProductsWrongVolume({
        limit: 20,
        offer_id: ['VOLUME_ISSUE_001', 'VOLUME_ISSUE_002']
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/info/wrong-volume', {
        limit: 20,
        offer_id: ['VOLUME_ISSUE_001', 'VOLUME_ISSUE_002']
      });

      expect(result.data.result).toHaveLength(2);
      expect(result.data.result[0].volume_difference_percent).toBe(-25.0);
      expect(result.data.result[1].volume_difference_percent).toBe(60.0);
      expect(result.data.has_next).toBe(true);
    });
  });

  describe('Access Management', () => {
    it('should get roles by token', async () => {
      const mockRoles: AccessRole[] = [
        {
          role_id: 'admin_role_123',
          role_name: 'Administrator',
          permissions: ['analytics:read', 'stock:manage', 'reports:generate'],
          is_active: true
        },
        {
          role_id: 'viewer_role_456',
          role_name: 'Viewer',
          permissions: ['analytics:read'],
          is_active: true
        },
        {
          role_id: 'disabled_role_789',
          role_name: 'Disabled Role',
          permissions: [],
          is_active: false
        }
      ];

      const mockResponse: IHttpResponse<AccessRolesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/access/roles',
        data: {
          roles: mockRoles
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await betaMethodAPI.getRolesByToken({ token: 'test_token' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/access/roles', { token: 'test_token' });
      expect(result.data.roles).toHaveLength(3);
      expect(result.data.roles[0].role_name).toBe('Administrator');
      expect(result.data.roles[0].permissions).toContain('stock:manage');
      expect(result.data.roles[2].is_active).toBe(false);
    });
  });

  describe('Pagination Helpers', () => {
    it('should iterate through analytics stocks with pagination', async () => {
      const page1Data: AnalyticsStocksData[] = [
        { product_id: 1, offer_id: 'P1', sku: 101, present: 100, reserved: 10, warehouse_name: 'W1', warehouse_id: 1 },
        { product_id: 2, offer_id: 'P2', sku: 102, present: 200, reserved: 20, warehouse_name: 'W2', warehouse_id: 2 }
      ];

      const page2Data: AnalyticsStocksData[] = [
        { product_id: 3, offer_id: 'P3', sku: 103, present: 150, reserved: 15, warehouse_name: 'W1', warehouse_id: 1 }
      ];

      const page1Response: IHttpResponse<AnalyticsStocksResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/stocks',
        data: { result: page1Data, last_id: 'page2_token', has_next: true }
      };

      const page2Response: IHttpResponse<AnalyticsStocksResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/stocks',
        data: { result: page2Data, has_next: false }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(page1Response)
        .mockResolvedValueOnce(page2Response);

      const allStocks = [];
      for await (const page of betaMethodAPI.iterateAnalyticsStocks({ limit: 2 })) {
        allStocks.push(...page);
      }

      expect(allStocks).toHaveLength(3);
      expect(allStocks[0].offer_id).toBe('P1');
      expect(allStocks[2].offer_id).toBe('P3');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });

    it('should iterate through products with wrong volume', async () => {
      const page1Products: ProductWrongVolumeInfo[] = [
        { product_id: 1, offer_id: 'ISSUE1', sku: 101, name: 'Product 1', current_volume: 100, suggested_volume: 150, volume_difference_percent: 50 }
      ];

      const page1Response: IHttpResponse<ProductWrongVolumeResponse> = {
        status: 200,
        statusText: 'OK', 
        headers: {},
        url: '/v1/product/info/wrong-volume',
        data: { result: page1Products, has_next: false }
      };

      mockHttpClient.post.mockResolvedValueOnce(page1Response);

      const allProducts = [];
      for await (const page of betaMethodAPI.iterateProductsWrongVolume({ limit: 1 })) {
        allProducts.push(...page);
      }

      expect(allProducts).toHaveLength(1);
      expect(allProducts[0].offer_id).toBe('ISSUE1');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Analytics Methods', () => {
    it('should generate comprehensive beta method analytics', async () => {
      const stocksData: AnalyticsStocksData[] = [
        { product_id: 1, offer_id: 'P1', sku: 101, present: 5, reserved: 2, warehouse_name: 'W1', warehouse_id: 1 },
        { product_id: 2, offer_id: 'P2', sku: 102, present: 1500, reserved: 100, warehouse_name: 'W2', warehouse_id: 2 }
      ];

      const deliverySummary = {
        overall_average_hours: 96,
        overall_average_days: 4.0,
        total_deliveries: 500,
        by_warehouse: [
          { warehouse_id: 1, warehouse_name: 'Fast Warehouse', average_delivery_time: 2.0, delivery_range: { min_days: 1, max_days: 3 } },
          { warehouse_id: 2, warehouse_name: 'Slow Warehouse', average_delivery_time: 6.0, delivery_range: { min_days: 4, max_days: 8 } }
        ]
      };

      const volumeIssues: ProductWrongVolumeInfo[] = [
        { product_id: 1, offer_id: 'ISSUE1', sku: 101, name: 'Product 1', current_volume: 100, suggested_volume: 150, volume_difference_percent: 50 }
      ];

      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/analytics/stocks',
          data: { result: stocksData, has_next: false }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/analytics/average-delivery-time/summary',
          data: deliverySummary
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/product/info/wrong-volume',
          data: { result: volumeIssues, has_next: false }
        });

      const analytics = await betaMethodAPI.getBetaMethodAnalytics();

      expect(analytics.stocks_analytics.total_products).toBe(2);
      expect(analytics.stocks_analytics.total_warehouses).toBe(2);
      expect(analytics.stocks_analytics.low_stock_products).toBe(1); // P1 has 3 available (5-2)
      expect(analytics.stocks_analytics.overstocked_products).toBe(1); // P2 has 1500 present

      expect(analytics.delivery_performance.average_delivery_days).toBe(4.0);
      expect(analytics.delivery_performance.fastest_warehouse).toBe('Fast Warehouse');
      expect(analytics.delivery_performance.slowest_warehouse).toBe('Slow Warehouse');

      expect(analytics.volume_issues.products_with_wrong_volume).toBe(1);
      expect(analytics.volume_issues.volume_accuracy_rate).toBeCloseTo(99.0, 1); // (101-1)/101 * 100

      expect(analytics.returns_analysis.overall_return_rate).toBe(5.2);
      expect(analytics.returns_analysis.top_return_reason).toBe('Product defect');
    });

    it('should generate stock optimization suggestions', async () => {
      const stocksData: AnalyticsStocksData[] = [
        { product_id: 1, offer_id: 'LOW_STOCK', sku: 101, present: 3, reserved: 1, warehouse_name: 'W1', warehouse_id: 1 }, // 2 available < 5
        { product_id: 2, offer_id: 'OVERSTOCK', sku: 102, present: 800, reserved: 50, warehouse_name: 'W2', warehouse_id: 2 }, // 800 > 500
        { product_id: 3, offer_id: 'OPTIMIZE', sku: 103, present: 15, reserved: 10, warehouse_name: 'W3', warehouse_id: 3 } // 5 available < 10, 15 < 50
      ];

      const page1Response: IHttpResponse<AnalyticsStocksResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/analytics/stocks',
        data: { result: stocksData, has_next: false }
      };

      mockHttpClient.post.mockResolvedValueOnce(page1Response);

      const suggestions = await betaMethodAPI.getStockOptimizationSuggestions();

      expect(suggestions).toHaveLength(3);
      
      // High priority - critical low stock
      const highPriority = suggestions.find(s => s.priority === 'high')!;
      expect(highPriority.offer_id).toBe('LOW_STOCK');
      expect(highPriority.current_stock).toBe(3);
      expect(highPriority.reason).toContain('Critical low stock');

      // Medium priority - overstock
      const mediumPriority = suggestions.find(s => s.priority === 'medium')!;
      expect(mediumPriority.offer_id).toBe('OVERSTOCK');
      expect(mediumPriority.current_stock).toBe(800);
      expect(mediumPriority.reason).toContain('Overstocked');
      expect(mediumPriority.potential_savings).toBeGreaterThan(0);

      // Low priority - optimization
      const lowPriority = suggestions.find(s => s.priority === 'low')!;
      expect(lowPriority.offer_id).toBe('OPTIMIZE');
      expect(lowPriority.suggested_stock).toBe(25);
    });
  });

  describe('Edge Cases', () => {
    it('should handle API errors gracefully', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(betaMethodAPI.getAnalyticsStocks()).rejects.toThrow('Network error');
    });

    it('should handle empty results in analytics', async () => {
      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/analytics/stocks',
          data: { result: [], has_next: false }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/analytics/average-delivery-time/summary',
          data: { overall_average_hours: 0, overall_average_days: 0, total_deliveries: 0, by_warehouse: [] }
        })
        .mockResolvedValueOnce({
          status: 200, statusText: 'OK', headers: {}, url: '/v1/product/info/wrong-volume',
          data: { result: [], has_next: false }
        });

      const analytics = await betaMethodAPI.getBetaMethodAnalytics();

      expect(analytics.stocks_analytics.total_products).toBe(0);
      expect(analytics.stocks_analytics.total_warehouses).toBe(0);
      expect(analytics.delivery_performance.fastest_warehouse).toBe('Unknown');
      expect(analytics.volume_issues.products_with_wrong_volume).toBe(0);
    });

    it('should handle missing optional fields', async () => {
      const stocksWithMinimalData: AnalyticsStocksData[] = [
        { product_id: 1, offer_id: 'MINIMAL', sku: 101, present: 10, reserved: 2, warehouse_name: 'Basic Warehouse', warehouse_id: 1 }
      ];

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200, statusText: 'OK', headers: {}, url: '/v1/analytics/stocks',
        data: { result: stocksWithMinimalData, has_next: false }
      });

      const result = await betaMethodAPI.getAnalyticsStocks();
      
      expect(result.data.result).toHaveLength(1);
      expect(result.data.result[0].offer_id).toBe('MINIMAL');
    });
  });
});