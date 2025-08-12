/**
 * ProductAPI unit tests
 */

import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { ProductAPI } from '../../../src/clients/product';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  IV3ImportProductsRequest,
  IV3ImportProductsResponse,
  IV1GetImportProductsInfoResponse,
  IV3GetProductListResponse,
} from '../../../src/types/generated/productapi';

describe('ProductAPI', () => {
  let mockHttpClient: {
    get: MockedFunction<HttpClient['get']>;
    post: MockedFunction<HttpClient['post']>;
    put: MockedFunction<HttpClient['put']>;
    delete: MockedFunction<HttpClient['delete']>;
  };
  let productAPI: ProductAPI;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
    productAPI = new ProductAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('importV3', () => {
    it('should import products successfully', async () => {
      const importRequest: IV3ImportProductsRequest = {
        items: [{
          offer_id: 'TEST-001', name: 'Test Product', description_category_id: 15621, type_id: 97311,
          price: '1299.99', currency_code: 'RUB', images: ['https://example.com/image.jpg'],
          attributes: [{ id: 85, values: [{ dictionary_value_id: 5060050, value: 'Samsung' }] }]
        }]
      };

      const mockResponse: IHttpResponse<IV3ImportProductsResponse> = {
        data: { result: { task_id: 123456 } }, status: 200, headers: {}, request: {}
      };
      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await productAPI.importV3(importRequest);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/import', importRequest);
      expect(result.data.result?.task_id).toBe(123456);
    });

    it('should handle complex attributes', async () => {
      const complexRequest: IV3ImportProductsRequest = {
        items: [{
          offer_id: 'COMPLEX-001', name: 'Complex Product', description_category_id: 15621, type_id: 97311,
          attributes: [{ id: 85, values: [{ value: 'Test Brand' }] }],
          complex_attributes: [{ attributes: [{ complex_id: 100001, id: 21841, values: [{ value: 'https://youtube.com/test' }] }] }]
        }]
      };

      mockHttpClient.post.mockResolvedValueOnce({ data: { result: { task_id: 789012 } }, status: 200, headers: {}, request: {} });

      const result = await productAPI.importV3(complexRequest);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/import', complexRequest);
      expect(result.data.result?.task_id).toBe(789012);
    });

    it('should propagate API errors', async () => {
      const error = new Error('API Error');
      mockHttpClient.post.mockRejectedValueOnce(error);

      await expect(productAPI.importV3({ items: [] })).rejects.toThrow('API Error');
    });
  });

  describe('getImportInfo', () => {
    it('should get import task status successfully', async () => {
      const request = { task_id: 123456 };
      const mockResponse: IHttpResponse<IV1GetImportProductsInfoResponse> = {
        data: { result: { total: 10, processed: 8, errors: [{ offer_id: 'FAILED-001', code: 'VALIDATION_ERROR', state: 'failed', name: 'Product Name', message: 'Invalid category' }] } },
        status: 200, headers: {}, request: {}
      };
      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await productAPI.getImportInfo(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/import/info', request);
      expect(result.data.result?.total).toBe(10);
      expect(result.data.result?.processed).toBe(8);
      expect(result.data.result?.errors).toHaveLength(1);
    });

    it('should handle empty errors array', async () => {
      const request = { task_id: 789012 };
      mockHttpClient.post.mockResolvedValueOnce({ data: { result: { total: 5, processed: 5, errors: [] } }, status: 200, headers: {}, request: {} });

      const result = await productAPI.getImportInfo(request);

      expect(result.data.result?.errors).toEqual([]);
    });
  });

  describe('getList', () => {
    it('should get product list with filter', async () => {
      const request = { filter: { visibility: 'VISIBLE' }, limit: 50 };
      const mockResponse: IHttpResponse<IV3GetProductListResponse> = {
        data: { result: { items: [{ id: 123456, name: 'Test Product', offer_id: 'TEST-001', created_at: '2023-01-01T00:00:00Z', status: { state: 'processed' } }], has_next: false, cursor: 'cursor-123' } },
        status: 200, headers: {}, request: {}
      };
      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await productAPI.getList(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', request);
      expect(result.data.result?.items).toHaveLength(1);
      expect(result.data.result?.has_next).toBe(false);
    });

    it('should get products by offer IDs', async () => {
      const request = { filter: { offer_id: ['PROD-001', 'PROD-002'] }, limit: 10 };
      mockHttpClient.post.mockResolvedValueOnce({ 
        data: { result: { items: [{ id: 111, offer_id: 'PROD-001' }, { id: 222, offer_id: 'PROD-002' }], has_next: true } }, 
        status: 200, headers: {}, request: {} 
      });

      const result = await productAPI.getList(request);

      expect(result.data.result?.items).toHaveLength(2);
      expect(result.data.result?.has_next).toBe(true);
    });
  });

  describe('getInfoList', () => {
    it('should get detailed product info', async () => {
      const request = { filter: { product_id: [123456789], visibility: 'VISIBLE' }, limit: 10 };
      mockHttpClient.post.mockResolvedValueOnce({ 
        data: { result: { items: [{ id: 123456789, name: 'Detailed Product', offer_id: 'DETAIL-001', images: [{ file_name: 'image1.jpg', default: true }] }], has_next: false } },
        status: 200, headers: {}, request: {} 
      });

      const result = await productAPI.getInfoList(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/info/list', request);
      expect(result.data.result?.items).toHaveLength(1);
    });
  });

  describe('getAttributesV4', () => {
    it('should get product attributes', async () => {
      const request = { filter: { product_id: [123456789] }, limit: 50 };
      mockHttpClient.post.mockResolvedValueOnce({ 
        data: { result: { items: [{ id: 123456789, attributes: [{ attribute_id: 85, values: [{ value: 'Samsung' }] }] }] } },
        status: 200, headers: {}, request: {} 
      });

      const result = await productAPI.getAttributesV4(request);

      expect(result.data.result?.items?.[0].attributes?.[0].values?.[0].value).toBe('Samsung');
    });
  });

  describe('getUploadQuota', () => {
    it('should get upload quota information', async () => {
      mockHttpClient.post.mockResolvedValueOnce({ 
        data: { result: { daily_create_limit: 1000, daily_create_usage: 150 } },
        status: 200, headers: {}, request: {} 
      });

      const result = await productAPI.getUploadQuota();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v4/product/info/limit', {});
      expect(result.data.result?.daily_create_limit).toBe(1000);
    });
  });

  describe('archive', () => {
    it('should archive products successfully', async () => {
      const request = { products: [{ offer_id: 'ARCH-001' }, { offer_id: 'ARCH-002' }] };
      mockHttpClient.post.mockResolvedValueOnce({ data: { result: [{ offer_id: 'ARCH-001', updated: true }] }, status: 200, headers: {}, request: {} });

      const result = await productAPI.archive(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/archive', request);
      expect(result.data.result?.[0].updated).toBe(true);
    });

    it('should handle archive errors', async () => {
      const request = { products: [{ offer_id: 'ERROR-ARCH' }] };
      mockHttpClient.post.mockResolvedValueOnce({ data: { result: [{ offer_id: 'ERROR-ARCH', updated: false, errors: [{ code: 'NOT_FOUND', message: 'Product not found' }] }] }, status: 200, headers: {}, request: {} });

      const result = await productAPI.archive(request);

      expect(result.data.result?.[0].updated).toBe(false);
      expect(result.data.result?.[0].errors?.[0].message).toBe('Product not found');
    });
  });

  describe('unarchive', () => {
    it('should unarchive products successfully', async () => {
      const request = { products: [{ offer_id: 'UNARCH-001' }] };
      mockHttpClient.post.mockResolvedValueOnce({ data: { result: [{ offer_id: 'UNARCH-001', updated: true }] }, status: 200, headers: {}, request: {} });

      const result = await productAPI.unarchive(request);

      expect(result.data.result?.[0].updated).toBe(true);
    });
  });

  describe('API endpoint validation', () => {
    it('should use correct endpoints for all methods', async () => {
      const mockResponse = { data: { result: {} }, status: 200, headers: {}, request: {} };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      await productAPI.importV3({ items: [] });
      expect(mockHttpClient.post).toHaveBeenLastCalledWith('/v3/product/import', { items: [] });

      await productAPI.getImportInfo({ task_id: 123 });
      expect(mockHttpClient.post).toHaveBeenLastCalledWith('/v1/product/import/info', { task_id: 123 });

      await productAPI.getUploadQuota();
      expect(mockHttpClient.post).toHaveBeenLastCalledWith('/v4/product/info/limit', {});

      await productAPI.archive({ products: [] });
      expect(mockHttpClient.post).toHaveBeenLastCalledWith('/v1/product/archive', { products: [] });
    });
  });
});