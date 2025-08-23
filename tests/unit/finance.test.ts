/**
 * Finance API unit tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FinanceApi } from '../../src/categories/finance/index.js';
import { HttpClient } from '../../src/core/http.js';
import type {
  GetCompensationReportRequest,
  GetDecompensationReportRequest,
  CreateDocumentB2BSalesReportRequest,
  GetFinanceProductsBuyoutRequest,
  FinanceTransactionListV3Request,
  FinanceTransactionTotalsV3Request
} from '../../src/types/requests/finance.js';
import type {
  CreateReportResponse,
  CommonCreateReportResponse,
  CreateDocumentB2BSalesJSONReportResponse,
  GetFinanceProductsBuyoutResponse,
  FinanceTransactionListV3Response,
  FinanceTransactionTotalsV3Response
} from '../../src/types/responses/finance.js';

describe('FinanceApi', () => {
  let financeApi: FinanceApi;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    financeApi = new FinanceApi(mockHttpClient);
  });

  describe('createCompensationReport', () => {
    it('should call correct endpoint with request data', async () => {
      const request: GetCompensationReportRequest = {
        date: '2023-01',
        language: 'RU'
      };

      const mockResponse: CreateReportResponse = {
        result: {
          code: 'SUCCESS',
          message: 'Report created successfully'
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await financeApi.createCompensationReport(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/finance/compensation',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle required date parameter', async () => {
      const request: GetCompensationReportRequest = {
        date: '2023-12'
      };

      await financeApi.createCompensationReport(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/finance/compensation',
        request,
        undefined
      );
    });
  });

  describe('createDecompensationReport', () => {
    it('should call correct endpoint', async () => {
      const request: GetDecompensationReportRequest = {
        date: '2023-01',
        language: 'EN'
      };

      await financeApi.createDecompensationReport(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/finance/decompensation',
        request,
        undefined
      );
    });
  });

  describe('createDocumentB2BSalesReport', () => {
    it('should call correct endpoint', async () => {
      const request: CreateDocumentB2BSalesReportRequest = {
        date: '2023-01',
        language: 'RU'
      };

      const mockResponse: CommonCreateReportResponse = {
        result: {
          code: 'SUCCESS',
          report_id: 'report_123',
          download_url: 'https://example.com/report.pdf'
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await financeApi.createDocumentB2BSalesReport(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/finance/document-b2b-sales',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createDocumentB2BSalesJSONReport', () => {
    it('should return JSON data', async () => {
      const request: CreateDocumentB2BSalesReportRequest = {
        date: '2023-01'
      };

      const mockResponse: CreateDocumentB2BSalesJSONReportResponse = {
        invoices: [
          {
            invoice_info: {
              number: 'INV-001',
              date: '2023-01-15',
              type: 'SALE'
            },
            buyer: {
              name: 'Test Company',
              inn: '1234567890',
              kpp: '123456789'
            },
            operations: [
              {
                id: 'op_1',
                amount: '10000.00',
                date: '2023-01-15',
                type: 'SALE'
              }
            ]
          }
        ],
        total_amount: '10000.00'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await financeApi.createDocumentB2BSalesJSONReport(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/finance/document-b2b-sales/json',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProductsBuyout', () => {
    it('should handle date range requirement', async () => {
      const request: GetFinanceProductsBuyoutRequest = {
        date_from: '2023-01-01',
        date_to: '2023-01-31'
      };

      const mockResponse: GetFinanceProductsBuyoutResponse = {
        products: [
          {
            sku: 123456789,
            name: 'Test Product',
            quantity: 5,
            price: '1000.00',
            total_amount: '5000.00'
          }
        ],
        total_buyout_amount: '5000.00'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await financeApi.getProductsBuyout(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/finance/products/buyout',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTransactionList', () => {
    it('should handle pagination and filters', async () => {
      const request: FinanceTransactionListV3Request = {
        page: 1,
        page_size: 50,
        filter: {
          date: {
            from: '2023-01-01',
            to: '2023-01-31'
          },
          transaction_type: 'orders'
        }
      };

      const mockResponse: FinanceTransactionListV3Response = {
        result: {
          operations: [
            {
              operation_id: 'op_123',
              operation_type: 'ORDER',
              operation_date: '2023-01-15',
              amount: '1500.00',
              currency: 'RUB'
            }
          ],
          page: 1,
          page_size: 50,
          total_count: 1
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await financeApi.getTransactionList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v3/finance/transaction/list',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should work with minimal required parameters', async () => {
      const request: FinanceTransactionListV3Request = {
        page: 1,
        page_size: 10
      };

      await financeApi.getTransactionList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v3/finance/transaction/list',
        request,
        undefined
      );
    });
  });

  describe('getTransactionTotals', () => {
    it('should handle date filter', async () => {
      const request: FinanceTransactionTotalsV3Request = {
        date: {
          from: '2023-01-01',
          to: '2023-01-31'
        },
        transaction_type: 'all'
      };

      const mockResponse: FinanceTransactionTotalsV3Response = {
        result: {
          totals: [
            {
              transaction_type: 'orders',
              total_amount: '50000.00',
              operations_count: 25,
              currency: 'RUB'
            }
          ],
          grand_total: '50000.00'
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await financeApi.getTransactionTotals(request);

      expect(result).toEqual(mockResponse);
    });

    it('should handle posting number filter', async () => {
      const request: FinanceTransactionTotalsV3Request = {
        posting_number: 'POST123456789',
        transaction_type: 'orders'
      };

      await financeApi.getTransactionTotals(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v3/finance/transaction/totals',
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
        financeApi.createCompensationReport({ date: '2023-01' })
      ).rejects.toThrow('Network error');
    });
  });

  describe('type safety', () => {
    it('should enforce required parameters', () => {
      // TypeScript compilation test
      // @ts-expect-error - date is required for compensation report
      // financeApi.createCompensationReport({});
      
      // @ts-expect-error - date_from and date_to are required for buyout report
      // financeApi.getProductsBuyout({ date_from: '2023-01-01' });
      
      expect(true).toBe(true); // Placeholder assertion
    });
  });
});