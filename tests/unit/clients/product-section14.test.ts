/**
 * Unit tests for ProductAPI Section 14 methods
 * Tests for getProductDescriptionV1, getUploadQuotaV4, updateOfferIdV1, archiveV1, unarchiveV1
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductAPI } from '../../../src/clients/product';
import type { HttpClient } from '../../../src/http/HttpClient';

// Mock HttpClient
const mockHttpClient: jest.Mocked<HttpClient> = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
} as any;

describe('ProductAPI Section 14', () => {
  let productApi: ProductAPI;

  beforeEach(() => {
    vi.clearAllMocks();
    productApi = new ProductAPI(mockHttpClient);
  });

  describe('getProductDescriptionV1', () => {
    it('should call POST /v1/product/info/description with product_id', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            id: 123456789,
            name: 'Test Product',
            offer_id: 'TEST-DESCRIPTION-001',
            description: 'This is a detailed description of the test product with features and specifications.',
            description_category_id: 15621,
            type_id: 97311,
            created_at: '2024-01-01T10:00:00Z',
            updated_at: '2024-01-15T15:30:00Z'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        product_id: 123456789
      };

      const result = await productApi.getProductDescriptionV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/info/description', params);
      expect(result).toEqual(mockResponse);
      expect(result.data.result?.name).toBe('Test Product');
      expect(result.data.result?.description).toContain('detailed description');
    });

    it('should call POST /v1/product/info/description with offer_id', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            id: 987654321,
            name: 'Another Test Product',
            offer_id: 'ANOTHER-TEST-001',
            description: 'Another product description for testing.',
            description_category_id: 15622
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        offer_id: 'ANOTHER-TEST-001'
      };

      const result = await productApi.getProductDescriptionV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/info/description', params);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when neither product_id nor offer_id provided', async () => {
      await expect(productApi.getProductDescriptionV1({}))
        .rejects.toThrow('Either product_id or offer_id must be provided');
      
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    });

    it('should throw error when both product_id and offer_id provided', async () => {
      const params = {
        product_id: 123456789,
        offer_id: 'TEST-001'
      };

      await expect(productApi.getProductDescriptionV1(params))
        .rejects.toThrow('Cannot provide both product_id and offer_id - use exactly one');
      
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Product not found'));

      await expect(productApi.getProductDescriptionV1({ product_id: 999999 }))
        .rejects.toThrow('Product not found');
    });
  });

  describe('getUploadQuotaV4', () => {
    it('should call POST /v4/product/info/limit for upload quota', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            daily_create_limit: 1000,
            daily_create_usage: 150,
            daily_update_limit: 5000,
            daily_update_usage: 800,
            total_products_limit: 50000,
            total_products_usage: 12500
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await productApi.getUploadQuotaV4();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v4/product/info/limit', {});
      expect(result).toEqual(mockResponse);
      expect(result.data.result?.daily_create_limit).toBe(1000);
      expect(result.data.result?.daily_create_usage).toBe(150);
    });

    it('should handle quota information correctly', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            daily_create_limit: 500,
            daily_create_usage: 450, // Almost at limit
            daily_update_limit: 2000,
            daily_update_usage: 100
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await productApi.getUploadQuotaV4();

      const remaining = result.data.result!.daily_create_limit - result.data.result!.daily_create_usage;
      expect(remaining).toBe(50); // Should have 50 creates remaining
    });
  });

  describe('updateOfferIdV1', () => {
    it('should call POST /v1/product/update/offer-id with valid parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              product_id: 123456789,
              offer_id: 'OLD-OFFER-001',
              updated: true,
              errors: null
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        update_offer_id: [
          {
            product_id: 123456789,
            offer_id: 'OLD-OFFER-001',
            new_offer_id: 'NEW-OFFER-001'
          }
        ]
      };

      const result = await productApi.updateOfferIdV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/update/offer-id', params);
      expect(result).toEqual(mockResponse);
    });

    it('should handle multiple offer ID updates', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              product_id: 123456789,
              offer_id: 'OLD-OFFER-001',
              updated: true,
              errors: null
            },
            {
              product_id: 987654321,
              offer_id: 'OLD-OFFER-002',
              updated: false,
              errors: [{ message: 'New offer ID already exists' }]
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        update_offer_id: [
          {
            product_id: 123456789,
            offer_id: 'OLD-OFFER-001',
            new_offer_id: 'NEW-OFFER-001'
          },
          {
            product_id: 987654321,
            offer_id: 'OLD-OFFER-002',
            new_offer_id: 'EXISTING-OFFER'
          }
        ]
      };

      const result = await productApi.updateOfferIdV1(params);

      expect(result.data.result).toHaveLength(2);
      expect(result.data.result?.[0].updated).toBe(true);
      expect(result.data.result?.[1].updated).toBe(false);
      expect(result.data.result?.[1].errors).toBeDefined();
    });

    it('should throw error when update_offer_id array is empty', async () => {
      await expect(productApi.updateOfferIdV1({ update_offer_id: [] }))
        .rejects.toThrow('update_offer_id array cannot be empty');
      
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    });

    it('should throw error when product_id is missing', async () => {
      const params = {
        update_offer_id: [
          {
            offer_id: 'OLD-OFFER-001',
            new_offer_id: 'NEW-OFFER-001'
            // Missing product_id
          } as any
        ]
      };

      await expect(productApi.updateOfferIdV1(params))
        .rejects.toThrow('product_id is required for each update item');
    });

    it('should throw error when new_offer_id is missing', async () => {
      const params = {
        update_offer_id: [
          {
            product_id: 123456789,
            offer_id: 'OLD-OFFER-001'
            // Missing new_offer_id
          } as any
        ]
      };

      await expect(productApi.updateOfferIdV1(params))
        .rejects.toThrow('new_offer_id is required for each update item');
    });

    it('should throw error when new_offer_id is same as current offer_id', async () => {
      const params = {
        update_offer_id: [
          {
            product_id: 123456789,
            offer_id: 'SAME-OFFER',
            new_offer_id: 'SAME-OFFER'
          }
        ]
      };

      await expect(productApi.updateOfferIdV1(params))
        .rejects.toThrow('new_offer_id "SAME-OFFER" must be different from current offer_id');
    });
  });

  describe('archiveV1', () => {
    it('should call POST /v1/product/archive with products list', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              offer_id: 'ARCHIVE-TEST-001',
              product_id: 123456789,
              archived: true,
              errors: null
            },
            {
              offer_id: 'ARCHIVE-TEST-002',
              product_id: 987654321,
              archived: true,
              errors: null
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        products: [
          { offer_id: 'ARCHIVE-TEST-001' },
          { offer_id: 'ARCHIVE-TEST-002' }
        ]
      };

      const result = await productApi.archiveV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/archive', params);
      expect(result).toEqual(mockResponse);
      expect(result.data.result).toHaveLength(2);
    });

    it('should handle archive errors for some products', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              offer_id: 'ARCHIVE-SUCCESS',
              product_id: 123456789,
              archived: true,
              errors: null
            },
            {
              offer_id: 'ARCHIVE-FAIL',
              product_id: 987654321,
              archived: false,
              errors: [{ message: 'Product is already archived' }]
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        products: [
          { offer_id: 'ARCHIVE-SUCCESS' },
          { offer_id: 'ARCHIVE-FAIL' }
        ]
      };

      const result = await productApi.archiveV1(params);

      expect(result.data.result?.[0].archived).toBe(true);
      expect(result.data.result?.[1].archived).toBe(false);
      expect(result.data.result?.[1].errors).toBeDefined();
    });
  });

  describe('unarchiveV1', () => {
    it('should call POST /v1/product/unarchive with products list', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              offer_id: 'UNARCHIVE-TEST-001',
              product_id: 123456789,
              unarchived: true,
              errors: null
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        products: [
          { product_id: 123456789 }
        ]
      };

      const result = await productApi.unarchiveV1(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/unarchive', params);
      expect(result).toEqual(mockResponse);
    });

    it('should handle mixed product identifiers', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              offer_id: 'UNARCHIVE-BY-OFFER',
              unarchived: true,
              errors: null
            },
            {
              product_id: 987654321,
              unarchived: true,
              errors: null
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        products: [
          { offer_id: 'UNARCHIVE-BY-OFFER' },
          { product_id: 987654321 }
        ]
      };

      const result = await productApi.unarchiveV1(params);

      expect(result.data.result).toHaveLength(2);
      expect(result.data.result?.[0].unarchived).toBe(true);
      expect(result.data.result?.[1].unarchived).toBe(true);
    });
  });

  describe('Method delegation', () => {
    it('should delegate getProductDescriptionV1 to getProductDescription', async () => {
      const spy = vi.spyOn(productApi, 'getProductDescription').mockResolvedValue({} as any);
      
      const params = { product_id: 123 };
      await productApi.getProductDescriptionV1(params);

      expect(spy).toHaveBeenCalledWith(params);
    });

    it('should delegate getUploadQuotaV4 to getUploadQuota', async () => {
      const spy = vi.spyOn(productApi, 'getUploadQuota').mockResolvedValue({} as any);
      
      await productApi.getUploadQuotaV4();

      expect(spy).toHaveBeenCalledWith();
    });

    it('should delegate updateOfferIdV1 to updateOfferId', async () => {
      const spy = vi.spyOn(productApi, 'updateOfferId').mockResolvedValue({} as any);
      
      const params = { update_offer_id: [{ product_id: 123, offer_id: 'OLD', new_offer_id: 'NEW' }] };
      await productApi.updateOfferIdV1(params);

      expect(spy).toHaveBeenCalledWith(params);
    });

    it('should delegate archiveV1 to archive', async () => {
      const spy = vi.spyOn(productApi, 'archive').mockResolvedValue({} as any);
      
      const params = { products: [{ offer_id: 'TEST' }] };
      await productApi.archiveV1(params);

      expect(spy).toHaveBeenCalledWith(params);
    });

    it('should delegate unarchiveV1 to unarchive', async () => {
      const spy = vi.spyOn(productApi, 'unarchive').mockResolvedValue({} as any);
      
      const params = { products: [{ offer_id: 'TEST' }] };
      await productApi.unarchiveV1(params);

      expect(spy).toHaveBeenCalledWith(params);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors in getProductDescriptionV1', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(productApi.getProductDescriptionV1({ product_id: 123 }))
        .rejects.toThrow('Network error');
    });

    it('should handle network errors in updateOfferIdV1', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      const params = {
        update_offer_id: [
          {
            product_id: 123,
            offer_id: 'OLD',
            new_offer_id: 'NEW'
          }
        ]
      };

      await expect(productApi.updateOfferIdV1(params))
        .rejects.toThrow('Network error');
    });

    it('should handle validation errors before making API calls', async () => {
      // Test that validation errors prevent API calls
      await expect(productApi.getProductDescriptionV1({}))
        .rejects.toThrow();
      
      await expect(productApi.updateOfferIdV1({ update_offer_id: [] }))
        .rejects.toThrow();
        
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    });
  });
});