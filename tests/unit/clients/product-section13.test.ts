/**
 * Unit tests for ProductAPI Section 13 methods
 * Tests for getProductListV3, getProductInfoListV3, getProductAttributesV4
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

describe('ProductAPI Section 13', () => {
  let productApi: ProductAPI;

  beforeEach(() => {
    vi.clearAllMocks();
    productApi = new ProductAPI(mockHttpClient);
  });

  describe('getProductListV3', () => {
    it('should call POST /v3/product/list with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            items: [
              {
                id: 123456,
                offer_id: 'TEST-001',
                name: 'Test Product',
                status: { state: 'processed', state_failed: null },
                created_at: '2024-01-01T10:00:00Z'
              }
            ],
            total: 1,
            last_id: 'abc123'
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          visibility: 'VISIBLE' as const
        },
        limit: 50
      };

      const result = await productApi.getProductListV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', params);
      expect(result).toEqual(mockResponse);
    });

    it('should handle pagination with last_id parameter', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK', 
        headers: {},
        data: {
          result: {
            items: [],
            total: 0,
            last_id: null
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          offer_id: ['TEST-001', 'TEST-002']
        },
        limit: 10,
        last_id: 'previous_page_id'
      };

      await productApi.getProductListV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', params);
    });

    it('should iterate through product list pages', async () => {
      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [{ id: 1, offer_id: 'PROD-001', name: 'Product 1' }],
              total: 2,
              last_id: 'page1_id'
            }
          }
        })
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [{ id: 2, offer_id: 'PROD-002', name: 'Product 2' }],
              total: 2,
              last_id: null // End of pagination
            }
          }
        });

      const pages = [];
      for await (const page of productApi.iterateProductListV3({ 
        filter: { visibility: 'VISIBLE' },
        limit: 1 
      })) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
      
      // Check pagination calls
      expect(mockHttpClient.post).toHaveBeenNthCalledWith(1, '/v3/product/list', {
        filter: { visibility: 'VISIBLE' },
        limit: 1
      });
      expect(mockHttpClient.post).toHaveBeenNthCalledWith(2, '/v3/product/list', {
        filter: { visibility: 'VISIBLE' },
        limit: 1,
        last_id: 'page1_id'
      });
    });

    it('should stop iteration when no items returned', async () => {
      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [{ id: 1, offer_id: 'PROD-001', name: 'Product 1' }],
              total: 1,
              last_id: 'page1_id'
            }
          }
        })
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [], // Empty items stops iteration
              total: 1,
              last_id: 'page2_id'
            }
          }
        });

      const pages = [];
      for await (const page of productApi.iterateProductListV3({ limit: 10 })) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });
  });

  describe('getProductInfoListV3', () => {
    it('should call POST /v3/product/info/list with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            items: [
              {
                id: 123456,
                offer_id: 'TEST-001',
                name: 'Test Product',
                description_category_id: 15621,
                images: [
                  { file_name: 'image1.jpg', default: true },
                  { file_name: 'image2.jpg', default: false }
                ],
                sources: [
                  { source: 'fbo', sku: 148313766, status: 'processed' }
                ],
                status: { state: 'processed', state_failed: null }
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          product_id: [123456, 789012],
          visibility: 'VISIBLE' as const
        },
        limit: 100
      };

      const result = await productApi.getProductInfoListV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/info/list', params);
      expect(result).toEqual(mockResponse);
    });

    it('should handle filter by offer_id', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            items: [
              {
                id: 123456,
                offer_id: 'SPECIAL-OFFER-001',
                name: 'Special Product'
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          offer_id: ['SPECIAL-OFFER-001', 'SPECIAL-OFFER-002']
        },
        limit: 50
      };

      await productApi.getProductInfoListV3(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/info/list', params);
    });

    it('should handle error responses', async () => {
      const errorResponse = {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: {
          code: 3,
          message: 'Invalid request parameters',
          details: []
        }
      };

      mockHttpClient.post.mockRejectedValueOnce(new Error('API Error'));

      const params = {
        filter: {
          product_id: []
        },
        limit: 10
      };

      await expect(productApi.getProductInfoListV3(params)).rejects.toThrow('API Error');
    });
  });

  describe('getProductAttributesV4', () => {
    it('should call POST /v4/product/info/attributes with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            items: [
              {
                id: 123456,
                offer_id: 'ATTR-TEST-001',
                attributes: [
                  {
                    attribute_id: 85,
                    complex_id: 0,
                    values: [
                      {
                        dictionary_value_id: 5060050,
                        value: 'Samsung'
                      }
                    ]
                  },
                  {
                    attribute_id: 5076,
                    complex_id: 0,
                    values: [
                      {
                        value: 'Smartphone'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          product_id: [123456],
          visibility: 'VISIBLE' as const
        },
        limit: 100,
        sort_dir: 'ASC' as const
      };

      const result = await productApi.getProductAttributesV4(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v4/product/info/attributes', params);
      expect(result).toEqual(mockResponse);
    });

    it('should handle filter by offer_id and sku', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            items: [
              {
                id: 789012,
                offer_id: 'MULTI-FILTER-001',
                sku: 148313766,
                attributes: []
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          offer_id: ['MULTI-FILTER-001'],
          sku: [148313766]
        },
        limit: 50,
        sort_dir: 'DESC' as const
      };

      await productApi.getProductAttributesV4(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v4/product/info/attributes', params);
    });

    it('should handle complex attributes with defaults', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            items: [
              {
                id: 555666,
                offer_id: 'COMPLEX-ATTR-001',
                attributes: [
                  {
                    attribute_id: 9048,
                    complex_id: 100001,
                    values: [
                      {
                        dictionary_value_id: 971082156,
                        value: 'Черный'
                      }
                    ]
                  }
                ],
                attributes_with_defaults: [
                  {
                    attribute_id: 4180,
                    values: [
                      {
                        value: 'Default manufacturer value'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const params = {
        filter: {
          product_id: [555666]
        },
        limit: 1
      };

      const result = await productApi.getProductAttributesV4(params);

      expect(result.data.result?.items?.[0]?.attributes_with_defaults).toBeDefined();
      expect(result.data.result?.items?.[0]?.attributes_with_defaults?.[0]?.attribute_id).toBe(4180);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors in getProductListV3', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(productApi.getProductListV3({ limit: 10 })).rejects.toThrow('Network error');
    });

    it('should handle network errors in getProductInfoListV3', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(productApi.getProductInfoListV3({ 
        filter: { product_id: [123] },
        limit: 10 
      })).rejects.toThrow('Network error');
    });

    it('should handle network errors in getProductAttributesV4', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(productApi.getProductAttributesV4({ 
        filter: { product_id: [123] },
        limit: 10 
      })).rejects.toThrow('Network error');
    });
  });

  describe('Iterator configuration', () => {
    it('should respect maxPages configuration', async () => {
      // Setup infinite-like pagination
      mockHttpClient.post.mockImplementation(() => 
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [{ id: 1, offer_id: 'PROD-001', name: 'Product' }],
              total: 999,
              last_id: 'continue_id'
            }
          }
        })
      );

      const pages = [];
      for await (const page of productApi.iterateProductListV3(
        { limit: 1 }, 
        { maxPages: 2 }
      )) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });

    it('should respect delayBetweenPages configuration', async () => {
      const startTime = Date.now();

      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [{ id: 1, offer_id: 'PROD-001', name: 'Product 1' }],
              total: 2,
              last_id: 'page1_id'
            }
          }
        })
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              items: [{ id: 2, offer_id: 'PROD-002', name: 'Product 2' }],
              total: 2,
              last_id: null
            }
          }
        });

      const pages = [];
      for await (const page of productApi.iterateProductListV3(
        { limit: 1 }, 
        { delayBetweenPages: 100 } // 100ms delay
      )) {
        pages.push(page);
      }

      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeGreaterThanOrEqual(100); // Should take at least 100ms
      expect(pages).toHaveLength(2);
    });
  });
});