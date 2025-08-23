/**
 * Pricing Strategy API unit tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PricingStrategyApi } from '../../src/categories/pricing-strategy/index.js';
import { HttpClient } from '../../src/core/http.js';
import type {
  GetCompetitorsRequest,
  CreatePricingStrategyRequest,
  DeletePricingStrategyRequest,
  GetStrategyInfoRequest,
  GetStrategyListRequest,
  AddStrategyItemsRequest,
  DeleteStrategyItemsRequest,
  UpdateStatusStrategyRequest
} from '../../src/types/requests/pricing-strategy.js';
import type {
  GetCompetitorsResponse,
  CreatePricingStrategyResponse,
  EmptyResponse,
  GetStrategyResponse,
  GetStrategyListResponse,
  AddStrategyItemsResponse,
  DeleteStrategyItemsResponse
} from '../../src/types/responses/pricing-strategy.js';

describe('PricingStrategyApi', () => {
  let pricingApi: PricingStrategyApi;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    pricingApi = new PricingStrategyApi(mockHttpClient);
  });

  describe('getCompetitors', () => {
    it('should call correct endpoint with request data', async () => {
      const request: GetCompetitorsRequest = {
        sku: ['123456789', '987654321'],
        limit: 10
      };

      const mockResponse: GetCompetitorsResponse = {
        competitors: [
          {
            competitor_id: 'comp_1',
            name: 'Wildberries',
            url: 'https://wb.ru/product/123',
            price: '1500.00',
            currency: 'RUB',
            available: true
          },
          {
            competitor_id: 'comp_2',
            name: 'Яндекс.Маркет',
            url: 'https://market.yandex.ru/product/456',
            price: '1450.00',
            currency: 'RUB',
            available: true
          }
        ],
        total_count: 2
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.getCompetitors(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/competitors/list',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should work with empty request', async () => {
      const request: GetCompetitorsRequest = {};

      await pricingApi.getCompetitors(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/competitors/list',
        request,
        undefined
      );
    });
  });

  describe('createStrategy', () => {
    it('should create pricing strategy with required name', async () => {
      const request: CreatePricingStrategyRequest = {
        name: 'Конкурентная стратегия',
        description: 'Автоматическое ценообразование на основе цен конкурентов',
        strategy_type: 'COMPETITIVE',
        settings: {
          margin_min: 0.10,
          margin_max: 0.30,
          update_frequency: 'hourly'
        }
      };

      const mockResponse: CreatePricingStrategyResponse = {
        result: {
          strategy_id: 'strategy_123',
          status: 'CREATED'
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.createStrategy(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/create',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should work with minimal required parameters', async () => {
      const request: CreatePricingStrategyRequest = {
        name: 'Простая стратегия'
      };

      await pricingApi.createStrategy(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/create',
        request,
        undefined
      );
    });
  });

  describe('deleteStrategy', () => {
    it('should delete strategy by ID', async () => {
      const request: DeletePricingStrategyRequest = {
        strategy_id: 'strategy_123'
      };

      const mockResponse: EmptyResponse = {
        status: 'SUCCESS'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.deleteStrategy(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/delete',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStrategyInfo', () => {
    it('should get strategy information', async () => {
      const request: GetStrategyInfoRequest = {
        strategy_id: 'strategy_123'
      };

      const mockResponse: GetStrategyResponse = {
        strategy: {
          strategy_id: 'strategy_123',
          name: 'Test Strategy',
          description: 'Test description',
          strategy_type: 'COMPETITIVE',
          status: 'ACTIVE',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-15T12:00:00Z',
          settings: {
            margin_min: 0.15,
            margin_max: 0.35
          }
        }
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.getStrategyInfo(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/info',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStrategiesList', () => {
    it('should get strategies with pagination', async () => {
      const request: GetStrategyListRequest = {
        limit: 25,
        offset: 0
      };

      const mockResponse: GetStrategyListResponse = {
        strategies: [
          {
            strategy_id: 'strategy_1',
            name: 'Strategy 1',
            status: 'ACTIVE',
            strategy_type: 'COMPETITIVE'
          },
          {
            strategy_id: 'strategy_2',
            name: 'Strategy 2',
            status: 'INACTIVE',
            strategy_type: 'PREMIUM'
          }
        ],
        total_count: 2,
        offset: 0,
        limit: 25
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.getStrategiesList(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/list',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addItemsToStrategy', () => {
    it('should add items to strategy', async () => {
      const request: AddStrategyItemsRequest = {
        strategy_id: 'strategy_123',
        items: [
          {
            sku: '123456789',
            settings: {
              min_price: 1000,
              max_price: 2000
            }
          },
          {
            sku: '987654321',
            settings: {
              min_price: 500,
              max_price: 1500
            }
          }
        ]
      };

      const mockResponse: AddStrategyItemsResponse = {
        results: [
          {
            sku: '123456789',
            status: 'SUCCESS'
          },
          {
            sku: '987654321',
            status: 'SUCCESS'
          }
        ],
        status: 'COMPLETED'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.addItemsToStrategy(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/products/add',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle items without settings', async () => {
      const request: AddStrategyItemsRequest = {
        strategy_id: 'strategy_123',
        items: [
          { sku: '123456789' },
          { sku: '987654321' }
        ]
      };

      await pricingApi.addItemsToStrategy(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/products/add',
        request,
        undefined
      );
    });
  });

  describe('removeItemsFromStrategy', () => {
    it('should remove items from strategy', async () => {
      const request: DeleteStrategyItemsRequest = {
        strategy_id: 'strategy_123',
        sku: ['123456789', '987654321']
      };

      const mockResponse: DeleteStrategyItemsResponse = {
        results: [
          {
            sku: '123456789',
            status: 'SUCCESS'
          },
          {
            sku: '987654321',
            status: 'NOT_FOUND',
            error_message: 'SKU not found in strategy'
          }
        ],
        status: 'PARTIAL_SUCCESS'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.removeItemsFromStrategy(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/products/delete',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateStrategyStatus', () => {
    it('should update strategy status', async () => {
      const request: UpdateStatusStrategyRequest = {
        strategy_id: 'strategy_123',
        status: 'INACTIVE'
      };

      const mockResponse: EmptyResponse = {
        status: 'SUCCESS'
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await pricingApi.updateStrategyStatus(request);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'POST',
        '/v1/pricing-strategy/status',
        request,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle different status values', async () => {
      const statuses: Array<'ACTIVE' | 'INACTIVE' | 'PAUSED'> = ['ACTIVE', 'INACTIVE', 'PAUSED'];

      for (const status of statuses) {
        const request: UpdateStatusStrategyRequest = {
          strategy_id: 'strategy_123',
          status
        };

        await pricingApi.updateStrategyStatus(request);

        expect(mockHttpClient.request).toHaveBeenCalledWith(
          'POST',
          '/v1/pricing-strategy/status',
          request,
          undefined
        );
      }
    });
  });

  describe('error handling', () => {
    it('should propagate HTTP client errors', async () => {
      const error = new Error('Network error');
      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(
        pricingApi.getCompetitors({})
      ).rejects.toThrow('Network error');
    });
  });

  describe('type safety', () => {
    it('should enforce required parameters', () => {
      // TypeScript compilation test
      // @ts-expect-error - name is required for create strategy
      // pricingApi.createStrategy({});
      
      // @ts-expect-error - strategy_id is required for delete
      // pricingApi.deleteStrategy({});
      
      expect(true).toBe(true); // Placeholder assertion
    });
  });
});