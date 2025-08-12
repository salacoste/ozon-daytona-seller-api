/**
 * Unit tests for FinanceAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FinanceAPI } from '../../../src/clients/finance';
import { createMockHttpClient } from '../../mocks';

describe('FinanceAPI', () => {
  let financeApi: FinanceAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    financeApi = new FinanceAPI(mockHttpClient);
  });

  describe('getCashFlowStatementListV1', () => {
    it('should call cash flow statement endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        with_details: true,
        limit: 100,
        offset: 0
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            operations: [
              {
                date: '2024-01-15',
                type: 'sale',
                amount: 1500.00,
                currency: 'RUB',
                description: 'Sale commission',
                posting_number: 'ORDER-123456',
                details: {
                  commission_rate: 0.15,
                  base_amount: 1764.71
                }
              },
              {
                date: '2024-01-16',
                type: 'refund',
                amount: -200.00,
                currency: 'RUB',
                description: 'Refund processing',
                posting_number: 'RETURN-789012',
                details: {
                  original_amount: 235.29
                }
              }
            ],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/cash-flow-statement/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result.operations).toHaveLength(2);
      expect(result.data.result.operations[0].amount).toBe(1500.00);
      expect(result.data.result.operations[0].details?.commission_rate).toBe(0.15);
      expect(result.data.result.operations[1].amount).toBe(-200.00);
      expect(result.data.result.has_next).toBe(false);
    });

    it('should work without details', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        with_details: false,
        limit: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            operations: [
              {
                date: '2024-01-15',
                type: 'sale',
                amount: 1500.00,
                currency: 'RUB',
                description: 'Sale commission',
                posting_number: 'ORDER-123456'
              }
            ],
            has_next: true
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(result.data.result.operations[0].details).toBeUndefined();
      expect(result.data.result.has_next).toBe(true);
    });

    it('should work with minimal parameters', async () => {
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
            operations: [],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/cash-flow-statement/list', params);
      expect(result.data.result.operations).toHaveLength(0);
      expect(result.data.result.has_next).toBe(false);
    });

    it('should handle different operation types', async () => {
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
            operations: [
              {
                date: '2024-01-01',
                type: 'sale',
                amount: 1000.00,
                currency: 'RUB',
                description: 'Product sale'
              },
              {
                date: '2024-01-02',
                type: 'commission',
                amount: -150.00,
                currency: 'RUB',
                description: 'Platform commission'
              },
              {
                date: '2024-01-03',
                type: 'logistics',
                amount: -50.00,
                currency: 'RUB',
                description: 'Delivery cost'
              },
              {
                date: '2024-01-04',
                type: 'penalty',
                amount: -25.00,
                currency: 'RUB',
                description: 'Late delivery penalty'
              }
            ],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(result.data.result.operations).toHaveLength(4);
      expect(result.data.result.operations.map(op => op.type)).toEqual([
        'sale', 'commission', 'logistics', 'penalty'
      ]);
    });

    it('should handle pagination parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        limit: 10,
        offset: 50
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            operations: [
              {
                date: '2024-01-15',
                type: 'sale',
                amount: 500.00,
                currency: 'RUB',
                description: 'Product sale'
              }
            ],
            has_next: true
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/cash-flow-statement/list', params);
      expect(result.data.result.has_next).toBe(true);
    });
  });

  describe('getRealizationReportV2', () => {
    it('should call realization report V2 endpoint with correct parameters', async () => {
      const params = {
        month: 1,
        year: 2024
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            rows: [
              {
                posting_number: 'ORDER-123456',
                product_name: 'Test Product',
                offer_id: 'OFFER-001',
                sku: 148313766,
                quantity_shipped: 5,
                quantity_returned: 1,
                price: 1000.00,
                commission: 150.00,
                total_amount: 4250.00,
                currency: 'RUB'
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getRealizationReportV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/finance/realization', params);
      expect(result.status).toBe(200);
      expect(result.data.result.rows).toHaveLength(1);
      expect(result.data.result.rows[0].posting_number).toBe('ORDER-123456');
      expect(result.data.result.rows[0].quantity_shipped).toBe(5);
    });
  });

  describe('getRealizationReportPostingV1', () => {
    it('should call realization report posting V1 endpoint with correct parameters', async () => {
      const params = {
        month: 2,
        year: 2024
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            postings: [
              {
                posting_number: 'ORDER-789012',
                status: 'delivered',
                created_at: '2024-02-01T10:00:00Z',
                delivered_at: '2024-02-03T14:30:00Z',
                products: [
                  {
                    sku: 148313767,
                    quantity: 2,
                    price: 500.00,
                    commission: 75.00
                  }
                ]
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getRealizationReportPostingV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/realization/posting', params);
      expect(result.status).toBe(200);
      expect(result.data.result.postings).toHaveLength(1);
      expect(result.data.result.postings[0].status).toBe('delivered');
    });
  });

  describe('getTransactionListV3', () => {
    it('should call transaction list V3 endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        transaction_type: 'sale',
        limit: 50,
        offset: 0
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            transactions: [
              {
                transaction_id: 'TXN-123456',
                date: '2024-01-15',
                type: 'sale',
                amount: 850.00,
                currency: 'RUB',
                description: 'Product sale commission',
                posting_number: 'ORDER-123456'
              },
              {
                transaction_id: 'TXN-789012',
                date: '2024-01-16',
                type: 'refund',
                amount: -100.00,
                currency: 'RUB',
                description: 'Refund processing'
              }
            ],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getTransactionListV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/finance/transaction/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result.transactions).toHaveLength(2);
      expect(result.data.result.transactions[0].type).toBe('sale');
      expect(result.data.result.transactions[1].amount).toBe(-100.00);
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
          result: {
            transactions: [],
            has_next: false
          }
        }
      });

      const result = await financeApi.getTransactionListV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/finance/transaction/list', params);
      expect(result.data.result.transactions).toHaveLength(0);
    });
  });

  describe('getTransactionTotalsV3', () => {
    it('should call transaction totals V3 endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        transaction_type: 'sale'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            totals: [
              {
                type: 'sale',
                amount: 15000.00,
                currency: 'RUB',
                count: 25
              },
              {
                type: 'commission',
                amount: -2250.00,
                currency: 'RUB',
                count: 25
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getTransactionTotalsV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/finance/transaction/totals', params);
      expect(result.status).toBe(200);
      expect(result.data.result.totals).toHaveLength(2);
      expect(result.data.result.totals[0].count).toBe(25);
      expect(result.data.result.totals[1].amount).toBe(-2250.00);
    });
  });

  describe('getDocumentB2BSalesV1', () => {
    it('should call B2B sales document endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        document_type: 'invoice'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            documents: [
              {
                document_id: 'DOC-123456',
                document_type: 'invoice',
                created_at: '2024-01-15T10:00:00Z',
                status: 'ready',
                file_url: 'https://files.ozon.ru/doc123456.pdf'
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getDocumentB2BSalesV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/document-b2b-sales', params);
      expect(result.status).toBe(200);
      expect(result.data.result.documents).toHaveLength(1);
      expect(result.data.result.documents[0].document_type).toBe('invoice');
      expect(result.data.result.documents[0].file_url).toBeDefined();
    });
  });

  describe('getDocumentB2BSalesJsonV1', () => {
    it('should call B2B sales document JSON endpoint with correct parameters', async () => {
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
            documents: [
              {
                document_id: 'DOC-789012',
                document_type: 'invoice',
                created_at: '2024-01-15T10:00:00Z',
                data: {
                  invoice_number: 'INV-2024-001',
                  total_amount: 5000.00,
                  currency: 'RUB',
                  items: [
                    { sku: 148313766, quantity: 1, price: 5000.00 }
                  ]
                }
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getDocumentB2BSalesJsonV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/document-b2b-sales/json', params);
      expect(result.status).toBe(200);
      expect(result.data.result.documents).toHaveLength(1);
      expect(result.data.result.documents[0].data.invoice_number).toBe('INV-2024-001');
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid date range', details: [] }
      });

      const result = await financeApi.getCashFlowStatementListV1({
        date_from: '2024-01-31',
        date_to: '2024-01-01' // Invalid range
      });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid date range');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(
        financeApi.getCashFlowStatementListV1({
          date_from: '2024-01-01',
          date_to: '2024-01-31'
        })
      ).rejects.toThrow('Connection timeout');
    });

    it('should handle unauthorized access', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        data: { code: 16, message: 'Invalid API key', details: [] }
      });

      const result = await financeApi.getCashFlowStatementListV1({
        date_from: '2024-01-01',
        date_to: '2024-01-31'
      });

      expect(result.status).toBe(401);
      expect(result.data.message).toBe('Invalid API key');
    });

    it('should handle rate limit errors', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 429,
        statusText: 'Too Many Requests',
        headers: {},
        data: { code: 8, message: 'Rate limit exceeded', details: [] }
      });

      const result = await financeApi.getCashFlowStatementListV1({
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
        date_to: '2024-12-31' // Same day
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            operations: [],
            has_next: false
          }
        }
      });

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/cash-flow-statement/list', params);
      expect(result.status).toBe(200);
    });

    it('should handle large limit values', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        limit: 1000 // Large limit
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            operations: [],
            has_next: false
          }
        }
      });

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(result.status).toBe(200);
    });

    it('should handle operations with no posting number', async () => {
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
            operations: [
              {
                date: '2024-01-15',
                type: 'adjustment',
                amount: 50.00,
                currency: 'RUB',
                description: 'Manual adjustment'
                // No posting_number
              }
            ],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(result.data.result.operations[0].posting_number).toBeUndefined();
      expect(result.data.result.operations[0].type).toBe('adjustment');
    });

    it('should handle complex details object', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        with_details: true
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            operations: [
              {
                date: '2024-01-15',
                type: 'sale',
                amount: 1000.00,
                currency: 'RUB',
                description: 'Complex sale',
                details: {
                  commission_rate: 0.15,
                  base_amount: 1176.47,
                  taxes: {
                    vat: 176.47,
                    vat_rate: 0.2
                  },
                  breakdown: [
                    { type: 'product', amount: 800 },
                    { type: 'delivery', amount: 200 }
                  ]
                }
              }
            ],
            has_next: false
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await financeApi.getCashFlowStatementListV1(params);

      expect(result.data.result.operations[0].details?.taxes?.vat).toBe(176.47);
      expect(result.data.result.operations[0].details?.breakdown).toHaveLength(2);
    });
  });

  describe('getMutualSettlementV1', () => {
    it('should call mutual settlement endpoint with correct parameters', async () => {
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
            settlements: [
              {
                date: '2024-01-15',
                amount: 5000.00,
                currency: 'RUB',
                type: 'mutual_settlement',
                description: 'Monthly settlement adjustment'
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await financeApi.getMutualSettlementV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/mutual-settlement', params);
    });
  });

  describe('getRealizationByDayV1', () => {
    it('should call realization by day endpoint with correct parameters', async () => {
      const params = {
        month: 1,
        year: 2024
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            days: [
              {
                date: '2024-01-15',
                products_sold: 25,
                products_returned: 2,
                total_revenue: 15000.00,
                total_commission: 2250.00,
                net_amount: 12750.00,
                currency: 'RUB'
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await financeApi.getRealizationByDayV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/realization/by-day', params);
    });
  });

  describe('getProductsBuyoutV1', () => {
    it('should call products buyout endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        sku: [123456, 789012]
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            buyouts: [
              {
                sku: 123456,
                product_name: 'Test Product 1',
                offer_id: 'OFFER-123',
                date: '2024-01-15',
                quantity: 3,
                buyout_price: 1500.00,
                currency: 'RUB',
                reason: 'Damaged in warehouse'
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await financeApi.getProductsBuyoutV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/products/buyout', params);
    });
  });

  describe('getCompensationV1', () => {
    it('should call compensation endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        compensation_type: 'damaged_goods'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            compensations: [
              {
                compensation_id: 'COMP-123456',
                date: '2024-01-15',
                type: 'damaged_goods',
                amount: 1000.00,
                currency: 'RUB',
                description: 'Compensation for damaged goods during delivery',
                posting_number: 'ORDER-789012',
                sku: 123456
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await financeApi.getCompensationV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/compensation', params);
    });
  });

  describe('getDecompensationV1', () => {
    it('should call decompensation endpoint with correct parameters', async () => {
      const params = {
        date_from: '2024-01-01',
        date_to: '2024-01-31',
        decompensation_type: 'lost_goods'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            decompensations: [
              {
                decompensation_id: 'DECOMP-123456',
                date: '2024-01-15',
                type: 'lost_goods',
                amount: 800.00,
                currency: 'RUB',
                description: 'Charge for lost goods in warehouse',
                posting_number: 'ORDER-789012',
                sku: 123456
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await financeApi.getDecompensationV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/finance/decompensation', params);
    });
  });
});