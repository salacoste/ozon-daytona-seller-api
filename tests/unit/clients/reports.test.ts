/**
 * Unit tests for ReportsAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReportsAPI } from '../../../src/clients/reports';
import { createMockHttpClient } from '../../mocks';

describe('ReportsAPI', () => {
  let reportsApi: ReportsAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    reportsApi = new ReportsAPI(mockHttpClient);
  });

  describe('getReportInfoV1', () => {
    it('should call report info endpoint with correct parameters', async () => {
      const params = {
        code: 'REPORT_seller_products_924336_1720170405_a9ea2f27-a473-4b13-99f9-d0cfcb5b1a69'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: params.code,
            status: 'success' as const,
            file: 'https://files.ozon.ru/report.csv'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.getReportInfoV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/info', params);
      expect(result.status).toBe(200);
      expect(result.data.result.status).toBe('success');
      expect(result.data.result.file).toBe('https://files.ozon.ru/report.csv');
    });

    it('should handle processing status', async () => {
      const params = {
        code: 'REPORT_processing_123'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: params.code,
            status: 'processing' as const
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.getReportInfoV1(params);

      expect(result.data.result.status).toBe('processing');
      expect(result.data.result.file).toBeUndefined();
    });

    it('should handle failed status with error', async () => {
      const params = {
        code: 'REPORT_failed_456'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: params.code,
            status: 'failed' as const,
            error: 'Invalid date range'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.getReportInfoV1(params);

      expect(result.data.result.status).toBe('failed');
      expect(result.data.result.error).toBe('Invalid date range');
    });
  });

  describe('getReportListV1', () => {
    it('should call report list endpoint with parameters', async () => {
      const params = {
        limit: 50,
        offset: 0,
        report_type: 'seller_products'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            reports: [
              {
                code: 'REPORT_123',
                name: 'Products Report',
                status: 'success' as const,
                created_at: '2024-01-15T10:30:00Z'
              },
              {
                code: 'REPORT_456',
                name: 'Returns Report',
                status: 'processing' as const,
                created_at: '2024-01-15T11:00:00Z'
              }
            ],
            has_next: true
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.getReportListV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result.reports).toHaveLength(2);
      expect(result.data.result.has_next).toBe(true);
    });

    it('should work with default parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            reports: [],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.getReportListV1();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/list', {});
      expect(result.data.result.reports).toHaveLength(0);
      expect(result.data.result.has_next).toBe(false);
    });
  });

  describe('createProductsReportV1', () => {
    it('should create products report with SKU filter', async () => {
      const params = {
        filter: {
          sku: [148313766, 148313767]
        }
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_products_789'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.createProductsReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/products/create', params);
      expect(result.data.result.code).toBe('REPORT_products_789');
    });

    it('should create products report with offer_id filter', async () => {
      const params = {
        filter: {
          offer_id: ['OFFER-001', 'OFFER-002']
        }
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_products_101112'
          }
        }
      });

      const result = await reportsApi.createProductsReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/products/create', params);
      expect(result.data.result.code).toBe('REPORT_products_101112');
    });
  });

  describe('createReturnsReportV2', () => {
    it('should create returns report with date range', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        statuses: ['returned', 'cancelled']
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_returns_131415'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.createReturnsReportV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/report/returns/create', params);
      expect(result.data.result.code).toBe('REPORT_returns_131415');
    });

    it('should work without status filter', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_returns_161718'
          }
        }
      });

      const result = await reportsApi.createReturnsReportV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/report/returns/create', params);
      expect(result.data.result.code).toBe('REPORT_returns_161718');
    });
  });

  describe('createPostingsReportV1', () => {
    it('should create postings report with language', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        language: 'DEFAULT'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_postings_192021'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.createPostingsReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/postings/create', params);
      expect(result.data.result.code).toBe('REPORT_postings_192021');
    });
  });

  describe('createDiscountedReportV1', () => {
    it('should create discounted report', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_discounted_222324'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.createDiscountedReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/discounted/create', params);
      expect(result.data.result.code).toBe('REPORT_discounted_222324');
    });
  });

  describe('createStockByWarehouseReportV1', () => {
    it('should create stock by warehouse report with language', async () => {
      const params = {
        language: 'DEFAULT'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_stock_252627'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await reportsApi.createStockByWarehouseReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/warehouse/stock', params);
      expect(result.data.result.code).toBe('REPORT_stock_252627');
    });

    it('should work with default parameters', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_stock_282930'
          }
        }
      });

      const result = await reportsApi.createStockByWarehouseReportV1();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/warehouse/stock', {});
      expect(result.data.result.code).toBe('REPORT_stock_282930');
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid report code', details: [] }
      });

      const result = await reportsApi.getReportInfoV1({
        code: 'INVALID_CODE'
      });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid report code');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network timeout'));

      await expect(
        reportsApi.createProductsReportV1({
          filter: { sku: [123] }
        })
      ).rejects.toThrow('Network timeout');
    });

    it('should handle rate limit errors for discounted reports', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 429,
        statusText: 'Too Many Requests',
        headers: {},
        data: { code: 8, message: 'Rate limit exceeded', details: [] }
      });

      const result = await reportsApi.createDiscountedReportV1({
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      });

      expect(result.status).toBe(429);
      expect(result.data.message).toBe('Rate limit exceeded');
    });
  });

  describe('Input Validation Edge Cases', () => {
    it('should handle long report codes', async () => {
      const longCode = 'REPORT_seller_products_924336_1720170405_a9ea2f27-a473-4b13-99f9-d0cfcb5b1a69_extra_long_suffix';
      
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: longCode,
            status: 'processing' as const
          }
        }
      });

      const result = await reportsApi.getReportInfoV1({ code: longCode });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/info', { code: longCode });
      expect(result.status).toBe(200);
    });

    it('should handle large filter arrays', async () => {
      const params = {
        filter: {
          sku: Array.from({ length: 1000 }, (_, i) => 148313766 + i)
        }
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_large_filter_123'
          }
        }
      });

      const result = await reportsApi.createProductsReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/products/create', params);
      expect(result.status).toBe(200);
    });

    it('should handle edge case date ranges', async () => {
      const params = {
        date_from: '2024-12-31',
        date_to: '2024-12-31' // Same day
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            code: 'REPORT_same_day_456'
          }
        }
      });

      const result = await reportsApi.createPostingsReportV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/report/postings/create', params);
      expect(result.status).toBe(200);
    });
  });
});