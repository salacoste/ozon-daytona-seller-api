/**
 * Unit tests for SupplierAPI
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { SupplierAPI } from '../../../src/clients/supplier';
import { createMockHttpClient } from '../../mocks';

describe('SupplierAPI', () => {
  let supplierApi: SupplierAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    supplierApi = new SupplierAPI(mockHttpClient);
  });

  describe('invoiceCreateOrUpdateV2', () => {
    it('should call create/update invoice endpoint with correct parameters', async () => {
      const params = {
        date: '2023-08-01T12:08:44.342Z',
        posting_number: '33920146-0252-1',
        url: 'https://cdn.ozone.ru/s3/ozon-disk-api/techdoc/seller-api/earsivfatura_1690960445.pdf',
        number: '424fdsf234',
        price: 234.34,
        price_currency: 'RUB' as const,
        hs_codes: [
          { sku: 'SKU123', code: '534758761999' },
          { sku: 'SKU456', code: '534758761000' },
          { sku: 'SKU789', code: '534758761777' }
        ]
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: true
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceCreateOrUpdateV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/invoice/create-or-update', params);
    });

    it('should work with minimal required parameters', async () => {
      const params = {
        date: '2023-08-01T12:08:44.342Z',
        posting_number: '33920146-0252-1',
        url: 'https://cdn.ozone.ru/test-file.pdf'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: true
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceCreateOrUpdateV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/invoice/create-or-update', params);
    });

    it('should handle different currencies', async () => {
      const currencies = ['USD', 'EUR', 'TRY', 'CNY', 'RUB', 'GBP'] as const;

      for (const currency of currencies) {
        const params = {
          date: '2023-08-01T12:08:44.342Z',
          posting_number: '33920146-0252-1',
          url: 'https://cdn.ozone.ru/test-file.pdf',
          price_currency: currency
        };

        const mockResponse = {
          status: 200,
          statusText: 'OK',
          headers: {},
          data: { result: true }
        };

        mockHttpClient.post.mockResolvedValue(mockResponse);

        await supplierApi.invoiceCreateOrUpdateV2(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/invoice/create-or-update', params);
      }
    });
  });

  describe('invoiceFileUploadV1', () => {
    it('should call file upload endpoint with correct parameters', async () => {
      const params = {
        posting_number: '33920146-0252-1',
        base64_content: 'base64-encoded-file-content'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          url: 'https://cdn.ozone.ru/s3/uploaded-file.pdf'
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceFileUploadV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/invoice/file/upload', params);
    });

    it('should handle large base64 content', async () => {
      const params = {
        posting_number: '33920146-0252-1',
        base64_content: 'x'.repeat(10000) // Simulate large file content
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          url: 'https://cdn.ozone.ru/s3/large-file.pdf'
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceFileUploadV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/invoice/file/upload', params);
    });
  });

  describe('invoiceGetV2', () => {
    it('should call get invoice endpoint with correct parameters', async () => {
      const params = {
        posting_number: '33920146-0252-1'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            date: '2023-08-01T12:08:44.342Z',
            file_url: 'https://cdn.ozone.ru/s3/invoice-file.pdf',
            number: '424fdsf234',
            price: 234.34,
            price_currency: 'RUB',
            hs_codes: [
              { sku: 'SKU123', code: '534758761999' },
              { sku: 'SKU456', code: '534758761000' }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceGetV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/invoice/get', params);
    });

    it('should handle invoice not found', async () => {
      const params = {
        posting_number: 'non-existent-posting'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: null
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceGetV2(params);

      expect(result).toEqual(mockResponse);
      expect(result.data.result).toBeNull();
    });
  });

  describe('invoiceDeleteV1', () => {
    it('should call delete invoice endpoint with correct parameters', async () => {
      const params = {
        posting_number: '33920146-0252-1'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: true
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceDeleteV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/invoice/delete', params);
    });

    it('should handle deletion failure', async () => {
      const params = {
        posting_number: 'non-existent-posting'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: false
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceDeleteV1(params);

      expect(result).toEqual(mockResponse);
      expect(result.data.result).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      mockHttpClient.post.mockRejectedValue(mockError);

      await expect(
        supplierApi.invoiceCreateOrUpdateV2({
          date: '2023-08-01T12:08:44.342Z',
          posting_number: '33920146-0252-1',
          url: 'https://cdn.ozone.ru/test.pdf'
        })
      ).rejects.toThrow('API Error');
    });

    it('should handle file upload errors', async () => {
      const mockResponse = {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: {
          code: 3,
          message: 'File size exceeds 10MB limit',
          details: []
        }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceFileUploadV1({
        posting_number: '33920146-0252-1',
        base64_content: 'oversized-file-content'
      });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('File size exceeds 10MB limit');
    });

    it('should handle network timeouts', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      mockHttpClient.post.mockRejectedValue(timeoutError);

      await expect(
        supplierApi.invoiceGetV2({
          posting_number: '33920146-0252-1'
        })
      ).rejects.toThrow('Request timeout');
    });
  });

  describe('Input Validation Edge Cases', () => {
    it('should handle special characters in posting numbers', async () => {
      const params = {
        posting_number: 'POST-123-АБВ-456',
        base64_content: 'test-content'
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { url: 'https://cdn.ozone.ru/special-chars.pdf' }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceFileUploadV1(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/invoice/file/upload', params);
    });

    it('should handle long invoice numbers (up to 50 chars)', async () => {
      const params = {
        date: '2023-08-01T12:08:44.342Z',
        posting_number: '33920146-0252-1',
        url: 'https://cdn.ozone.ru/test.pdf',
        number: '12345678901234567890123456789012345678901234567890' // 50 chars
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: true }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceCreateOrUpdateV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/invoice/create-or-update', params);
    });

    it('should handle empty HS codes array', async () => {
      const params = {
        date: '2023-08-01T12:08:44.342Z',
        posting_number: '33920146-0252-1',
        url: 'https://cdn.ozone.ru/test.pdf',
        hs_codes: []
      };

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: true }
      };

      mockHttpClient.post.mockResolvedValue(mockResponse);

      const result = await supplierApi.invoiceCreateOrUpdateV2(params);

      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/invoice/create-or-update', params);
    });
  });
});