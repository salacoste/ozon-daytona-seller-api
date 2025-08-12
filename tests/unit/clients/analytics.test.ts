/**
 * Unit tests for AnalyticsAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AnalyticsAPI } from '../../../src/clients/analytics';
import { createMockHttpClient } from '../../mocks';

describe('AnalyticsAPI', () => {
  let analyticsApi: AnalyticsAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    analyticsApi = new AnalyticsAPI(mockHttpClient);
  });

  describe('getDataV1', () => {
    it('should call analytics data endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        dimension: ['sku'],
        metrics: ['hits_view_search', 'ordered_units'],
        limit: 100,
        offset: 0
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            data: [
              {
                dimensions: [{ id: 'sku', value: '148313766' }],
                metrics: [
                  { id: 'hits_view_search', value: 150 },
                  { id: 'ordered_units', value: 25 }
                ]
              }
            ],
            totals: [
              { id: 'hits_view_search', value: 1500 },
              { id: 'ordered_units', value: 250 }
            ]
          },
          timestamp: '2024-01-31T23:59:59Z'
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await analyticsApi.getDataV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/data', params);
      expect(result.status).toBe(200);
      expect(result.data.result.data).toHaveLength(1);
      expect(result.data.result.data[0].dimensions[0].value).toBe('148313766');
      expect(result.data.result.totals).toHaveLength(2);
    });

    it('should handle filters and sorting parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        dimension: ['sku', 'category'],
        metrics: ['revenue'],
        filters: [
          { key: 'sku', op: 'IN', value: '148313766,148313767' }
        ],
        sort: [{ key: 'revenue', order: 'DESC' as const }],
        limit: 50
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            data: [],
            totals: []
          },
          timestamp: '2024-01-31T23:59:59Z'
        }
      });

      const result = await analyticsApi.getDataV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/data', params);
      expect(result.status).toBe(200);
    });
  });

  describe('getStockOnWarehousesV2', () => {
    it('should call stock on warehouses endpoint with correct parameters', async () => {
      const params = {
        skus: [148313766, 148313767],
        warehouse_type: 'ALL'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            rows: [
              {
                sku: 148313766,
                warehouse_type: 'FBO',
                item_code: 'TEST-001',
                item_name: 'Test Product',
                promised_amount: 10,
                present_amount: 8,
                reserved_amount: 2
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await analyticsApi.getStockOnWarehousesV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/analytics/stock_on_warehouses', params);
      expect(result.status).toBe(200);
      expect(result.data.result.rows).toHaveLength(1);
      expect(result.data.result.rows[0].sku).toBe(148313766);
      expect(result.data.result.rows[0].present_amount).toBe(8);
    });

    it('should handle optional warehouse_type parameter', async () => {
      const params = {
        skus: [148313766]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            rows: []
          }
        }
      });

      const result = await analyticsApi.getStockOnWarehousesV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/analytics/stock_on_warehouses', params);
      expect(result.status).toBe(200);
    });
  });

  describe('getStocksTurnoverV1', () => {
    it('should call stocks turnover endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        skus: [148313766],
        limit: 50,
        offset: 0
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            rows: [
              {
                sku: 148313766,
                turnover_days: 15.5,
                avg_daily_sales: 2.5
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await analyticsApi.getStocksTurnoverV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/turnover/stocks', params);
      expect(result.status).toBe(200);
    });

    it('should work with optional parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { rows: [] }
        }
      });

      const result = await analyticsApi.getStocksTurnoverV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/turnover/stocks', params);
      expect(result.status).toBe(200);
    });
  });

  describe('getProductQueriesV1', () => {
    it('should call product queries endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        skus: [148313766],
        limit: 100,
        offset: 0,
        sort: [{ key: 'query_count', order: 'DESC' as const }]
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            rows: [
              {
                sku: 148313766,
                query: 'test product',
                query_count: 45,
                click_count: 12
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await analyticsApi.getProductQueriesV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/product-queries', params);
      expect(result.status).toBe(200);
    });

    it('should work with minimal parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { rows: [] }
        }
      });

      const result = await analyticsApi.getProductQueriesV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/product-queries', params);
      expect(result.status).toBe(200);
    });
  });

  describe('getProductQueriesDetailsV1', () => {
    it('should call product queries details endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        skus: [148313766],
        limit: 100,
        offset: 0,
        sort: [{ key: 'query_count', order: 'DESC' as const }],
        limit_by_sku: 10
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            rows: [
              {
                sku: 148313766,
                query: 'test product details',
                query_count: 25,
                click_count: 8,
                position: 3.2
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await analyticsApi.getProductQueriesDetailsV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/product-queries/details', params);
      expect(result.status).toBe(200);
    });

    it('should work without limit_by_sku parameter', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        skus: [148313766]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { rows: [] }
        }
      });

      const result = await analyticsApi.getProductQueriesDetailsV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/product-queries/details', params);
      expect(result.status).toBe(200);
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid parameters', details: [] }
      });

      const result = await analyticsApi.getDataV1({
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        dimension: ['sku'],
        metrics: ['hits_view_search']
      });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid parameters');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network timeout'));

      await expect(
        analyticsApi.getStockOnWarehousesV2({ skus: [148313766] })
      ).rejects.toThrow('Network timeout');
    });

    it('should handle rate limit errors', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 429,
        statusText: 'Too Many Requests',
        headers: {},
        data: { code: 8, message: 'Rate limit exceeded', details: [] }
      });

      const result = await analyticsApi.getStocksTurnoverV1({
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      });

      expect(result.status).toBe(429);
      expect(result.data.message).toBe('Rate limit exceeded');
    });
  });

  describe('Input Validation Edge Cases', () => {
    it('should handle edge case date ranges', async () => {
      const params = {
        date_from: '2024-12-31',
        date_to: '2024-12-31', // Same day
        dimension: ['date'],
        metrics: ['revenue']
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { data: [], totals: [] },
          timestamp: '2024-12-31T23:59:59Z'
        }
      });

      const result = await analyticsApi.getDataV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/data', params);
      expect(result.status).toBe(200);
    });

    it('should handle large SKU arrays', async () => {
      const params = {
        skus: Array.from({ length: 1000 }, (_, i) => 148313766 + i)
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { rows: [] }
        }
      });

      const result = await analyticsApi.getStockOnWarehousesV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/analytics/stock_on_warehouses', params);
      expect(result.status).toBe(200);
    });

    it('should handle multiple dimensions and metrics', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        dimension: ['sku', 'category', 'date'],
        metrics: [
          'hits_view_search',
          'hits_view',
          'hits_tocart',
          'ordered_units',
          'revenue',
          'postings',
          'returns',
          'cancellations'
        ],
        limit: 1000
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { data: [], totals: [] },
          timestamp: '2024-01-31T23:59:59Z'
        }
      });

      const result = await analyticsApi.getDataV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/analytics/data', params);
      expect(result.status).toBe(200);
    });
  });
});