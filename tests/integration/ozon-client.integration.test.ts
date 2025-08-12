/**
 * Integration tests for OzonClient
 * 
 * These tests verify that all components work together correctly
 * using mocked HTTP transport.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OzonClient } from '../../src/clients/OzonClient';
import { setupOzonClientMock, mockClientConfig } from '../mocks';

// Mock HttpClient at module level
vi.mock('../../src/http/HttpClient');

describe('OzonClient Integration Tests', () => {
  let client: OzonClient;
  let mockHttpClient: ReturnType<typeof setupOzonClientMock>;

  beforeEach(() => {
    // Set up comprehensive mocking
    mockHttpClient = setupOzonClientMock();
    
    // Create client instance
    client = new OzonClient(mockClientConfig);
  });

  describe('Client Initialization', () => {
    it('should initialize all sub-clients correctly', () => {
      expect(client).toBeDefined();
      expect(client.product).toBeDefined();
      expect(client.fbo).toBeDefined();
      expect(client.fbs).toBeDefined();
      expect(client.pricesStocks).toBeDefined();
      expect(client.warehouse).toBeDefined();
      expect(client.analytics).toBeDefined();
      expect(client.reports).toBeDefined();
      expect(client.finance).toBeDefined();
    });

    it('should provide client configuration', () => {
      const config = client.getConfig();
      
      expect(config.baseUrl).toBe('https://api-seller.ozon.ru');
      expect(config.timeoutMs).toBe(30000);
      expect(config.maxRetries).toBe(3);
    });

    it('should test connection successfully', async () => {
      await expect(client.testConnection()).resolves.not.toThrow();
      expect(mockHttpClient.get).toHaveBeenCalledWith('/');
    });
  });

  describe('Product API Integration', () => {
    it('should list products with pagination using getList()', async () => {
      const response = await client.product.getList({ 
        filter: { visibility: 'ALL' },
        limit: 10 
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.items).toHaveLength(2);
      expect(response.data.result.items[0].product_id).toBe(12345);
      expect(response.data.result.last_id).toBe('next123');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', { 
        filter: { visibility: 'ALL' },
        limit: 10 
      });
    });

    it('should get product info using getInfoList()', async () => {
      const response = await client.product.getInfoList({ 
        filter: { product_id: [12345] },
        limit: 10
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.items).toHaveLength(1);
      expect(response.data.result.items[0].product_id).toBe(12345);
      expect(response.data.result.items[0].offer_id).toBe('TEST-SKU-001');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/info/list', { 
        filter: { product_id: [12345] },
        limit: 10
      });
    });

    it('should import products using importV3()', async () => {
      const importParams = {
        items: [{
          offer_id: 'NEW-SKU-001',
          name: 'New Product',
          description_category_id: 123,
          type_id: 97311,
          attributes: [
            { id: 85, values: [{ value: 'Test Brand' }] }
          ],
          images: ['https://example.com/image.jpg']
        }]
      };

      const response = await client.product.importV3(importParams);
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.task_id).toBe(98765);
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/import', importParams);
    });
  });

  describe('FBO API Integration', () => {
    it('should list FBO orders', async () => {
      const response = await client.fbo.list({
        dir: 'ASC',
        filter: { 
          since: '2024-01-01T00:00:00Z',
          to: '2024-12-31T23:59:59Z',
          status: 'awaiting_deliver'
        },
        limit: 50
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result).toHaveLength(2);
      expect(response.data.result[0].posting_number).toBe('POST-123456');
      expect(response.data.result[0].status).toBe('awaiting_deliver');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/list', {
        dir: 'ASC',
        filter: { 
          since: '2024-01-01T00:00:00Z',
          to: '2024-12-31T23:59:59Z',
          status: 'awaiting_deliver'
        },
        limit: 50
      });
    });

    it('should get FBO order details', async () => {
      const response = await client.fbo.get({
        posting_number: 'POST-123456',
        translit: false
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.posting_number).toBe('POST-123456');
      expect(response.data.result.products).toHaveLength(1);
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/get', {
        posting_number: 'POST-123456',
        translit: false
      });
    });

    it('should get FBO cancellation reasons', async () => {
      const response = await client.fbo.getCancelReasons();
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result).toHaveLength(1);
      expect(response.data.result[0].reason_id).toBe(400);
      expect(response.data.result[0].reason).toBe('Buyer cancelled');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbo/cancel-reason/list', {});
    });

    it('should get supply order status counters', async () => {
      const response = await client.fbo.getSupplyOrderStatusCounters();
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.counts).toBeDefined();
      
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/v1/supply-order/status/counter',
        {}
      );
    });

    it('should get supply order bundle', async () => {
      const response = await client.fbo.getSupplyOrderBundle({
        supply_order_id: 123456
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.supply_order_id).toBe(123456);
      
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/v1/supply-order/bundle',
        { supply_order_id: 123456 }
      );
    });

    it('should get supply orders list', async () => {
      const response = await client.fbo.getSupplyOrdersList({
        dir: 'ASC',
        filter: {
          cutoff_from: '2024-01-01T00:00:00Z',
          cutoff_to: '2024-12-31T23:59:59Z'
        },
        limit: 50
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.items).toBeDefined();
      
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/v2/supply-order/list',
        {
          dir: 'ASC',
          filter: {
            cutoff_from: '2024-01-01T00:00:00Z',
            cutoff_to: '2024-12-31T23:59:59Z'
          },
          limit: 50
        }
      );
    });
  });

  describe('Warehouse API Integration', () => {
    it('should list warehouses', async () => {
      const response = await client.warehouse.getWarehouseList();
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result).toHaveLength(2);
      expect(response.data.result[0].warehouse_id).toBe(123);
      expect(response.data.result[0].name).toBe('Test Warehouse');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
    });

    it('should get delivery methods using getDeliveryMethodList()', async () => {
      const response = await client.warehouse.getDeliveryMethodList({
        filter: {
          provider_id: [123456],
          status: ['NEW']
        }
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result[0].name).toBe('Standard Delivery');
      expect(response.data.result[0].id).toBe(123456);
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/delivery-method/list', {
        filter: {
          provider_id: [123456],
          status: ['NEW']
        }
      });
    });
  });

  describe('Prices & Stocks API Integration', () => {
    it('should get product prices using getPriceInfo()', async () => {
      const response = await client.pricesStocks.getPriceInfo({
        filter: {
          offer_id: ['TEST-SKU-001']
        },
        limit: 100
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.items).toHaveLength(1);
      expect(response.data.result.items[0].offer_id).toBe('TEST-SKU-001');
      expect(response.data.result.items[0].price.price).toBe('1000.00');
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v5/product/info/prices', {
        filter: {
          offer_id: ['TEST-SKU-001']
        },
        limit: 100
      });
    });

    it('should get analytics stocks', async () => {
      const response = await client.analytics.getStockOnWarehousesV2({
        skus: [148313766]
      });
      
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.data.result.rows).toHaveLength(1);
      expect(response.data.result.rows[0].sku).toBe(148313766);
      expect(response.data.result.rows[0].present_amount).toBe(10);
      
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/analytics/stock_on_warehouses', {
        skus: [148313766]
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle API errors gracefully', async () => {
      // Mock an error response
      mockHttpClient.post.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(client.product.getList({ 
        filter: { visibility: 'ALL' },
        limit: 10
      })).rejects.toThrow('Network error');
    });

    it('should handle HTTP error responses', async () => {
      // Mock an HTTP error response
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: {
          code: 3,
          message: 'Invalid request parameters',
          details: []
        }
      });
      
      const response = await client.product.getList({ 
        filter: { visibility: 'ALL' },
        limit: 10
      });
      expect(response.status).toBe(400);
      expect(response.data.message).toBe('Invalid request parameters');
    });
  });

  describe('HTTP Client Sharing', () => {
    it('should share HttpClient instance across sub-clients', async () => {
      // Make calls to different sub-clients
      await client.product.getList({ filter: { visibility: 'ALL' }, limit: 10 });
      await client.fbo.list({ filter: { since: '2024-01-01T00:00:00Z', to: '2024-12-31T23:59:59Z' }, limit: 50 });
      await client.warehouse.getWarehouseList();
      
      // All calls should use the same HttpClient instance
      expect(mockHttpClient.post).toHaveBeenCalledTimes(3);
      
      // Verify correct endpoints were called
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', {
        filter: { visibility: 'ALL' },
        limit: 10
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/list', {
        filter: {
          since: '2024-01-01T00:00:00Z',
          to: '2024-12-31T23:59:59Z'
        },
        limit: 50
      });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/warehouse/list', {});
    });

    it('should provide access to underlying HttpClient', () => {
      const httpClient = client.getHttpClient();
      expect(httpClient).toBe(mockHttpClient);
    });
  });
});