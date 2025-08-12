/**
 * Unit tests for ProductAPI Section 12 methods
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductAPI } from '../../../src/clients/product/index';
import { createMockHttpClient } from '../../mocks';

describe('ProductAPI Section 12 Methods', () => {
  let productApi: ProductAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    productApi = new ProductAPI(mockHttpClient);
  });

  describe('importBySku', () => {
    it('should import product by SKU', async () => {
      const params = {
        items: [
          {
            sku: 148313766,
            name: "New Product Name",
            offer_id: "NEW-OFFER-001",
            price: "999.99",
            old_price: "1199.99",
            currency_code: "RUB"
          }
        ]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            task_id: 123456,
            unmatched_sku_list: []
          }
        }
      });

      const result = await productApi.importBySku(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/import-by-sku', params);
      expect(result.status).toBe(200);
      expect(result.data.result?.task_id).toBe(123456);
    });
  });

  describe('updateAttributes', () => {
    it('should update product attributes', async () => {
      const params = {
        items: [
          {
            offer_id: "PROD-001",
            attributes: [
              {
                id: 85,
                values: [{ dictionary_value_id: 5060050, value: "Samsung" }]
              }
            ]
          }
        ]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            task_id: 789012
          }
        }
      });

      const result = await productApi.updateAttributes(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/attributes/update', params);
      expect(result.status).toBe(200);
      expect(result.data.result?.task_id).toBe(789012);
    });
  });

  describe('importPictures', () => {
    it('should import product pictures', async () => {
      const params = {
        product_id: 123456,
        images: [
          { url: "https://example.com/main-image.jpg", default: true },
          { url: "https://example.com/side-view.jpg" }
        ]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            pictures: [
              { url: "https://example.com/main-image.jpg", state: "uploaded" },
              { url: "https://example.com/side-view.jpg", state: "uploaded" }
            ]
          }
        }
      });

      const result = await productApi.importPictures(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/pictures/import', params);
      expect(result.status).toBe(200);
      expect(result.data.result?.pictures).toHaveLength(2);
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

      const result = await productApi.importBySku({
        items: [{ sku: -1, offer_id: "INVALID" }]
      });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid parameters');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(productApi.updateAttributes({
        items: [{ offer_id: "PROD-001", attributes: [] }]
      })).rejects.toThrow('Connection timeout');
    });
  });
});