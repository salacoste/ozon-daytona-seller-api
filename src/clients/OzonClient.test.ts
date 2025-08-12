import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { OzonClient } from './OzonClient';
import { HttpClient } from '../http/HttpClient';

vi.mock('../http/HttpClient');

describe('OzonClient Smoke Tests', () => {
  let mockHttpClient: HttpClient;
  let client: OzonClient;

  beforeEach(() => {
    vi.clearAllMocks();
    (HttpClient as unknown as MockedFunction<typeof HttpClient>).mockImplementation((config: any) => {
      mockHttpClient = {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
        config: config
      } as unknown as HttpClient;
      return mockHttpClient;
    });
    client = new OzonClient({
      clientId: 'test-client-id',
      apiKey: 'test-api-key'
    });
  });

  describe('Client Instantiation', () => {
    it('should create client with required parameters', () => {
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(OzonClient);
    });

    it('should throw error for missing clientId', () => {
      expect(() => {
        new OzonClient({
          clientId: '',
          apiKey: 'test-api-key'
        });
      }).toThrow('clientId is required');
    });

    it('should throw error for missing apiKey', () => {
      expect(() => {
        new OzonClient({
          clientId: 'test-client-id',
          apiKey: ''
        });
      }).toThrow('apiKey is required');
    });

    it('should use default configuration values', () => {
      const client = new OzonClient({
        clientId: 'test-client-id',
        apiKey: 'test-api-key'
      });

      const config = client.getConfig();
      expect(config.baseUrl).toBe('https://api-seller.ozon.ru');
      expect(config.timeoutMs).toBe(30000);
      expect(config.maxRetries).toBe(3);
    });

    it('should use custom configuration values', () => {
      const client = new OzonClient({
        clientId: 'test-client-id',
        apiKey: 'test-api-key',
        baseUrl: 'https://custom-api.example.com',
        timeoutMs: 60000,
        maxRetries: 5,
        rateLimitRps: 10
      });

      const config = client.getConfig();
      expect(config.baseUrl).toBe('https://custom-api.example.com');
      expect(config.timeoutMs).toBe(60000);
      expect(config.maxRetries).toBe(5);
      expect(config.rateLimitRps).toBe(10);
    });
  });

  describe('Sub-client Availability', () => {
    it('should have all P0 sub-clients available', () => {
      expect(client.product).toBeDefined();
      expect(client.fbo).toBeDefined();
      expect(client.fbs).toBeDefined();
      expect(client.pricesStocks).toBeDefined();
      expect(client.warehouse).toBeDefined();
      expect(client.analytics).toBeDefined();
      expect(client.reports).toBeDefined();
      expect(client.finance).toBeDefined();
      expect(client.category).toBeDefined();
    });

    it('should have sub-clients with correct types', () => {
      // Verify that sub-clients have expected methods
      expect(typeof client.product.getList).toBe('function');
      expect(typeof client.product.getInfoList).toBe('function');
      expect(typeof client.product.importV3).toBe('function');

      expect(typeof client.fbo.list).toBe('function');
      expect(typeof client.fbo.get).toBe('function');
      expect(typeof client.fbo.getCancelReasons).toBe('function');

      expect(typeof client.fbs.getUnfulfilledV3).toBe('function');
      expect(typeof client.fbs.getV3).toBe('function');
      expect(typeof client.fbs.listV3).toBe('function');

      expect(typeof client.pricesStocks.getPriceInfo).toBe('function');
      expect(typeof client.analytics.getStockOnWarehousesV2).toBe('function');
      expect(typeof client.pricesStocks.updatePrices).toBe('function');

      expect(typeof client.warehouse.getWarehouseList).toBe('function');
      expect(typeof client.warehouse.getDeliveryMethodList).toBe('function');

      expect(typeof client.analytics.getDataV1).toBe('function');
      expect(typeof client.analytics.getStocksTurnoverV1).toBe('function');
      
      expect(typeof client.reports.getReportInfoV1).toBe('function');
      expect(typeof client.reports.createProductsReportV1).toBe('function');
      
      expect(typeof client.finance.getCashFlowStatementListV1).toBe('function');
      expect(typeof client.finance.getRealizationReportV2).toBe('function');
      expect(typeof client.finance.getTransactionListV3).toBe('function');
      expect(typeof client.finance.getDocumentB2BSalesV1).toBe('function');
      expect(typeof client.finance.getMutualSettlementV1).toBe('function');
      expect(typeof client.finance.getRealizationByDayV1).toBe('function');
      expect(typeof client.finance.getProductsBuyoutV1).toBe('function');
      expect(typeof client.finance.getCompensationV1).toBe('function');
      expect(typeof client.finance.getDecompensationV1).toBe('function');
      
      expect(typeof client.category.getTreeV1).toBe('function');
      expect(typeof client.category.getAttributesV1).toBe('function');
      expect(typeof client.category.getAttributeValuesV1).toBe('function');
      expect(typeof client.category.searchAttributeValuesV1).toBe('function');
    });
  });

  describe('HTTP Client Integration', () => {
    it('should share HttpClient instance across sub-clients', () => {
      (mockHttpClient.post as MockedFunction<typeof mockHttpClient.post>).mockResolvedValue({
        status: 200, statusText: 'OK', headers: {}, data: { result: [] }
      });
      client.product.getList({ filter: { visibility: 'ALL' }, limit: 10 });
      client.fbo.list({ filter: { since: '2024-01-01T00:00:00Z', to: '2024-12-31T23:59:59Z' }, limit: 50 });
      client.fbs.getUnfulfilledV3({});
      expect(mockHttpClient.post).toHaveBeenCalledTimes(3);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', { filter: { visibility: 'ALL' }, limit: 10 });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/list', { filter: { since: '2024-01-01T00:00:00Z', to: '2024-12-31T23:59:59Z' }, limit: 50 });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/posting/fbs/unfulfilled/list', {});
    });

    it('should provide access to underlying HttpClient', () => {
      const httpClient = client.getHttpClient();
      expect(httpClient).toBe(mockHttpClient);
    });
  });

  describe('Utility Methods', () => {
    it('should return configuration information', () => {
      const config = client.getConfig();
      
      expect(config).toEqual({
        baseUrl: 'https://api-seller.ozon.ru',
        timeoutMs: 30000,
        maxRetries: 3
      });
    });

    it('should test connection', async () => {
      // Mock successful response
      (mockHttpClient.get as MockedFunction<typeof mockHttpClient.get>).mockResolvedValue({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {}
      });

      await expect(client.testConnection()).resolves.toBeUndefined();
      expect(mockHttpClient.get).toHaveBeenCalledWith('/');
    });

  });

  describe('Method Parameter Handling', () => {
    beforeEach(() => {
      // Mock successful responses for all methods
      (mockHttpClient.post as MockedFunction<typeof mockHttpClient.post>).mockResolvedValue({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: [] }
      });
    });
    it('should handle product API parameters correctly', async () => {
      await client.product.getList({ filter: { visibility: 'ALL' }, limit: 50, last_id: 'abc123' });
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v3/product/list', {
        filter: { visibility: 'ALL' },
        limit: 50,
        last_id: 'abc123'
      });
    });
    it('should handle FBO API parameters correctly', async () => {
      const params = { dir: 'ASC' as const, filter: { since: '2024-01-01T00:00:00.000Z', status: 'awaiting_deliver' }, limit: 100 };
      await client.fbo.list(params);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/list', params);
    });

  });
});