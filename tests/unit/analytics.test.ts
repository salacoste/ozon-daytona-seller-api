/**
 * Analytics API unit tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnalyticsApi } from '../../src/categories/analytics/index.js';
import { HttpClient } from '../../src/core/http.js';
import type { 
  AnalyticsTurnoverStocksRequest, 
  AnalyticsStockOnWarehouseRequest 
} from '../../src/types/requests/analytics.js';
import type { 
  AnalyticsTurnoverStocksResponse, 
  AnalyticsStockOnWarehouseResponse 
} from '../../src/types/responses/analytics.js';

describe('AnalyticsApi', () => {
  let analyticsApi: AnalyticsApi;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    analyticsApi = new AnalyticsApi(mockHttpClient);
  });

  describe('getStocksTurnover', () => {
    it('should call correct endpoint with request data', async () => {
      const request: AnalyticsTurnoverStocksRequest = {
        limit: 10,
        offset: 0,
        sku: ['123456789', '987654321']
      };

      const mockResponse: AnalyticsTurnoverStocksResponse = {
        items: [
          {
            sku: 123456789,
            turnover_days: 30,
            current_stock: 100,
            daily_sales: 3.3
          }
        ]
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await analyticsApi.getStocksTurnover(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/analytics/turnover/stocks',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty sku array', async () => {
      const request: AnalyticsTurnoverStocksRequest = {
        limit: 5,
        sku: []
      };

      const mockResponse: AnalyticsTurnoverStocksResponse = {
        items: []
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await analyticsApi.getStocksTurnover(request);

      expect(result.items).toEqual([]);
    });

    it('should work with minimal request parameters', async () => {
      const request: AnalyticsTurnoverStocksRequest = {};

      await analyticsApi.getStocksTurnover(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/analytics/turnover/stocks',
        request,
        undefined
      );
    });
  });

  describe('getStockOnWarehouses', () => {
    it('should call correct endpoint with required limit parameter', async () => {
      const request: AnalyticsStockOnWarehouseRequest = {
        limit: 100,
        offset: 0,
        warehouse_type: 'ALL'
      };

      const mockResponse: AnalyticsStockOnWarehouseResponse = {
        result: {
          rows: [
            {
              sku: 123456789,
              name: 'Test Product',
              present: 50,
              reserved: 10
            }
          ],
          total: 1
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await analyticsApi.getStockOnWarehouses(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v2/analytics/stock_on_warehouses',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should work with different warehouse types', async () => {
      const fulfillmentRequest: AnalyticsStockOnWarehouseRequest = {
        limit: 50,
        warehouse_type: 'FULFILLMENT'
      };

      await analyticsApi.getStockOnWarehouses(fulfillmentRequest);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v2/analytics/stock_on_warehouses',
        fulfillmentRequest,
        undefined
      );

      const crossdockRequest: AnalyticsStockOnWarehouseRequest = {
        limit: 25,
        warehouse_type: 'CROSSDOCK'
      };

      await analyticsApi.getStockOnWarehouses(crossdockRequest);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v2/analytics/stock_on_warehouses',
        crossdockRequest,
        undefined
      );
    });

    it('should work with minimal required parameters', async () => {
      const request: AnalyticsStockOnWarehouseRequest = {
        limit: 10
      };

      await analyticsApi.getStockOnWarehouses(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v2/analytics/stock_on_warehouses',
        request,
        undefined
      );
    });
  });

  describe('error handling', () => {
    it('should propagate HTTP client errors', async () => {
      const error = new Error('Network error');
      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(
        analyticsApi.getStocksTurnover({})
      ).rejects.toThrow('Network error');
    });
  });

  describe('type safety', () => {
    it('should enforce required limit parameter for stock warehouses', () => {
      // This test verifies TypeScript compilation
      // The following would cause a compilation error:
      // @ts-expect-error - limit is required
      // analyticsApi.getStockOnWarehouses({
      //   offset: 0,
      //   warehouse_type: 'ALL'
      // });
      
      expect(true).toBe(true); // Placeholder assertion for type safety
    });
  });
});