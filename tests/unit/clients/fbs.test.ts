/**
 * Unit tests for FBSAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FBSAPI } from '../../../src/clients/fbs/FBSAPI';
import { createMockHttpClient } from '../../mocks';

describe('FBSAPI', () => {
  let fbsApi: FBSAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    fbsApi = new FBSAPI(mockHttpClient);
  });

  describe('Core Operations (Part 1 - Endpoints 1-6)', () => {
    it('should get unfulfilled orders list V3', async () => {
      const params = {
        dir: 'ASC' as const,
        filter: { cutoff_from: '2024-01-01T00:00:00Z', cutoff_to: '2024-01-31T23:59:59Z' },
        limit: 100,
        offset: 0,
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            postings: [{ posting_number: 'POST-123456' }],
            has_next: false,
          },
        },
      });

      const result = await fbsApi.getUnfulfilledV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/fbs/unfulfilled/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result.postings).toHaveLength(1);
    });

    it('should get FBS orders list V3', async () => {
      const params = {
        dir: 'DESC' as const,
        filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z' },
        limit: 50,
        offset: 0,
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            { posting_number: 'POST-123456', status: 'awaiting_packaging' },
            { posting_number: 'POST-789012', status: 'awaiting_deliver' },
          ],
        },
      });

      const result = await fbsApi.listV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/fbs/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result).toHaveLength(2);
    });

    it('should get FBS order details V3', async () => {
      const params = {
        posting_number: 'POST-123456',
        with: { analytics_data: true, barcodes: false, financial_data: true },
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            posting_number: 'POST-123456',
            status: 'awaiting_packaging',
            products: [{ sku: 12345, quantity: 1 }],
          },
        },
      });

      const result = await fbsApi.getV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/fbs/get', params);
      expect(result.status).toBe(200);
      expect(result.data.result.posting_number).toBe('POST-123456');
    });

    it('should get FBS order by barcode', async () => {
      const params = { barcode: '1234567890123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { posting_number: 'POST-123456', status: 'awaiting_packaging' },
        },
      });

      const result = await fbsApi.getByBarcode(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/get-by-barcode', params);
      expect(result.status).toBe(200);
      expect(result.data.result.posting_number).toBe('POST-123456');
    });

    it('should set multi-box quantity', async () => {
      const params = {
        posting_number: 'POST-123456',
        packages: [{ products: [{ product_id: 12345, quantity: 2 }] }],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { success: true } },
      });

      const result = await fbsApi.setMultiBoxQuantity(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/multiboxqty/set', params);
      expect(result.status).toBe(200);
    });

    it('should change product details', async () => {
      const params = {
        posting_number: 'POST-123456',
        products: [{ product_id: 12345, exemplar_info: { is_gtd_absent: true } }],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { success: true } },
      });

      const result = await fbsApi.changeProduct(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/product/change', params);
      expect(result.status).toBe(200);
    });
  });

  describe('Extended Operations (Part 2 - Endpoints 7-13)', () => {
    it('should get available countries list', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            { name: 'Russian Federation', iso_code: 'RU' },
            { name: 'China', iso_code: 'CN' },
          ],
        },
      });

      const result = await fbsApi.getCountryList();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/product/country/list', {});
      expect(result.status).toBe(200);
      expect(result.data.result).toHaveLength(2);
    });

    it('should set product country', async () => {
      const params = {
        posting_number: 'POST-123456',
        products: [{ product_id: 12345, country_iso_code: 'CN' }],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { success: true } },
      });

      const result = await fbsApi.setProductCountry(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/product/country/set', params);
      expect(result.status).toBe(200);
    });

    it('should get restrictions', async () => {
      const params = { posting_number: 'POST-123456' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { restrictions: [{ type: 'dimension', description: 'Max weight exceeded' }] },
        },
      });

      const result = await fbsApi.getRestrictions(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbs/restrictions', params);
      expect(result.status).toBe(200);
    });

    it('should get package labels V2', async () => {
      const params = { posting_number: ['POST-123456', 'POST-789012'] };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { file_content: 'base64-pdf-content' } },
      });

      const result = await fbsApi.getPackageLabelsV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/package-label', params);
      expect(result.status).toBe(200);
      expect(result.data.result.file_content).toBe('base64-pdf-content');
    });

    it('should create label batch V1', async () => {
      const params = { posting_number: ['POST-123456'] };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { batch_id: 'batch-123' } },
      });

      const result = await fbsApi.createLabelBatch(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbs/package-label/create', params);
      expect(result.status).toBe(200);
    });

    it('should create label batch V2', async () => {
      const params = { posting_number: ['POST-123456'], label_type: 'default' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { batch_id: 'batch-456' } },
      });

      const result = await fbsApi.createLabelBatchV2(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/package-label/create', params);
      expect(result.status).toBe(200);
    });

    it('should get label batch', async () => {
      const params = { batch_id: 'batch-123' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { status: 'completed', file_content: 'base64-pdf' } },
      });

      const result = await fbsApi.getLabelBatch(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbs/package-label/get', params);
      expect(result.status).toBe(200);
    });
  });

  describe('Management Operations (Part 3 - Endpoints 14-22)', () => {
    it('should get cancellation reason by ID', async () => {
      const params = { cancel_reason_id: 400 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { id: 400, name: 'Out of stock' } },
      });

      const result = await fbsApi.getCancelReasonById(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbs/cancel-reason', params);
      expect(result.status).toBe(200);
      expect(result.data.result.name).toBe('Out of stock');
    });

    it('should get cancellation reasons list', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            { id: 400, name: 'Out of stock' },
            { id: 401, name: 'Damaged goods' },
          ],
        },
      });

      const result = await fbsApi.getCancelReasonsList();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/cancel-reason/list', {});
      expect(result.status).toBe(200);
      expect(result.data.result).toHaveLength(2);
    });

    it('should cancel posting products', async () => {
      const params = {
        posting_number: 'POST-123456',
        products: [{ product_id: 12345, reason_id: 400 }],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { success: true } },
      });

      const result = await fbsApi.cancelPostingProducts(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/product/cancel', params);
      expect(result.status).toBe(200);
    });

    it('should cancel posting', async () => {
      const params = { posting_number: 'POST-123456', cancel_reason_id: 400 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: true },
      });

      const result = await fbsApi.cancelPosting(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/cancel', params);
      expect(result.status).toBe(200);
    });

    it('should move posting to arbitration', async () => {
      const params = { posting_number: 'POST-123456' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { success: true } },
      });

      const result = await fbsApi.moveToArbitration(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/arbitration', params);
      expect(result.status).toBe(200);
    });

    it('should move posting to awaiting delivery', async () => {
      const params = { posting_number: ['POST-123456'] };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { success: true } },
      });

      const result = await fbsApi.moveToAwaitingDelivery(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/awaiting-delivery', params);
      expect(result.status).toBe(200);
    });

    it('should verify pickup code', async () => {
      const params = { posting_number: 'POST-123456', verification_code: '1234' };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { verified: true } },
      });

      const result = await fbsApi.verifyPickupCode(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbs/pick-up-code/verify', params);
      expect(result.status).toBe(200);
      expect(result.data.result.verified).toBe(true);
    });

    it('should get ETGB document', async () => {
      const params = {
        date: { from: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z' },
        posting_number: ['POST-123456'],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { document_content: 'base64-content' } },
      });

      const result = await fbsApi.getETGB(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/global/etgb', params);
      expect(result.status).toBe(200);
    });

    it('should get unpaid legal products', async () => {
      const params = { limit: 100, offset: 0 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            products: [{ product_id: 12345, status: 'unpaid' }],
            has_next: false,
          },
        },
      });

      const result = await fbsApi.getUnpaidLegalProducts(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/unpaid-legal/product/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result.products).toHaveLength(1);
    });
  });

  describe('Legacy Methods', () => {
    it('should support legacy list method', async () => {
      const params = {
        dir: 'ASC' as const,
        filter: { since: '2024-01-01T00:00:00Z', status: 'awaiting_packaging' },
        limit: 50,
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: [{ posting_number: 'POST-123456' }] },
      });

      const result = await fbsApi.list(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/fbs/list', {
        dir: 'ASC',
        filter: {
          since: '2024-01-01T00:00:00Z',
          status: 'awaiting_packaging',
        },
        limit: 50,
      });
      expect(result.status).toBe(200);
    });

    it('should support legacy get method', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { posting_number: 'POST-123456' } },
      });

      const result = await fbsApi.get('POST-123456');

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/fbs/get', {
        posting_number: 'POST-123456',
        with: { analytics_data: true, barcodes: true, financial_data: false },
      });
      expect(result.status).toBe(200);
    });

    it('should support legacy ship method', async () => {
      const params = {
        posting_number: ['POST-123456'],
        packages: [{ products: [{ product_id: 12345, quantity: 1 }] }],
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: [{ posting_number: 'POST-123456', status: 'shipped' }] },
      });

      const result = await fbsApi.ship(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbs/ship', params);
      expect(result.status).toBe(200);
      expect(result.data.result[0].status).toBe('shipped');
    });
  });

  describe('Pagination Iterators', () => {
    it('should iterate through unfulfilled orders', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { postings: [{ posting_number: 'POST-001' }], has_next: false } },
      });

      const pages = [];
      for await (const page of fbsApi.iterateUnfulfilled({ limit: 100 })) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].value.result).toHaveLength(1);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
    });

    it('should iterate through FBS orders list', async () => {
      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: { result: { postings: [{ posting_number: 'POST-001' }], has_next: false } },
        });

      const pages = [];
      for await (const page of fbsApi.iterateList({ limit: 50 })) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].value.result).toHaveLength(1);
    });

    it('should handle pagination iterator errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      const iterator = fbsApi.iterateUnfulfilled({ limit: 100 });

      await expect(iterator.next()).rejects.toThrow('Network error');
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid parameters', details: [] },
      });

      const result = await fbsApi.listV3({});

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid parameters');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network timeout'));

      await expect(fbsApi.getV3({ posting_number: 'POST-123456' })).rejects.toThrow('Network timeout');
    });
  });
});