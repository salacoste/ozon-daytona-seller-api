/**
 * Integration test for new APIs in Story 1.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OzonSellerApiClient } from '../../src/core/client.js';
import type { OzonConfig } from '../../src/core/types.js';

// Mock fetch to avoid actual HTTP calls
global.fetch = vi.fn();

describe('Story 1.3: New APIs Integration', () => {
  let client: OzonSellerApiClient;
  const mockConfig: OzonConfig = {
    apiKey: '12345678-1234-5678-9abc-123456789012',
    clientId: '123456',
    baseUrl: 'https://api-seller.ozon.ru'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful responses
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ result: 'ok' }),
      text: async () => JSON.stringify({ result: 'ok' })
    } as Response);

    client = new OzonSellerApiClient(mockConfig);
  });

  describe('Client Integration', () => {
    it('should have all three new API categories available', () => {
      expect(client.analytics).toBeDefined();
      expect(client.finance).toBeDefined();
      expect(client.pricingStrategy).toBeDefined();
    });

    it('should have correct API category types', () => {
      expect(client.analytics.constructor.name).toBe('AnalyticsApi');
      expect(client.finance.constructor.name).toBe('FinanceApi');
      expect(client.pricingStrategy.constructor.name).toBe('PricingStrategyApi');
    });
  });

  describe('Analytics API Integration', () => {
    it('should call analytics stock turnover endpoint', async () => {
      await client.analytics.getStocksTurnover({
        limit: 10,
        sku: ['123456789']
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/analytics/turnover/stocks'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should call analytics warehouse stock endpoint', async () => {
      await client.analytics.getStockOnWarehouses({
        limit: 50,
        warehouse_type: 'ALL'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v2/analytics/stock_on_warehouses'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  describe('Finance API Integration', () => {
    it('should call finance transaction list endpoint', async () => {
      await client.finance.getTransactionList({
        page: 1,
        page_size: 100,
        filter: {
          date: { from: '2023-01-01', to: '2023-01-31' }
        }
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v3/finance/transaction/list'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should call finance compensation report endpoint', async () => {
      await client.finance.createCompensationReport({
        date: '2023-01',
        language: 'RU'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/finance/compensation'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should call finance buyout products endpoint', async () => {
      await client.finance.getProductsBuyout({
        date_from: '2023-01-01',
        date_to: '2023-01-31'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/finance/products/buyout'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  describe('Pricing Strategy API Integration', () => {
    it('should call pricing strategy creation endpoint', async () => {
      await client.pricingStrategy.createStrategy({
        name: 'Test Strategy',
        description: 'Test strategy for integration test'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/pricing-strategy/create'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should call competitors list endpoint', async () => {
      await client.pricingStrategy.getCompetitors({
        sku: ['123456789'],
        limit: 5
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/pricing-strategy/competitors/list'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should call add items to strategy endpoint', async () => {
      await client.pricingStrategy.addItemsToStrategy({
        strategy_id: 'strategy_123',
        items: [
          { sku: '123456789' },
          { sku: '987654321' }
        ]
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/pricing-strategy/products/add'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  describe('Cross-API Workflow Simulation', () => {
    it('should support a complete business analytics and pricing workflow', async () => {
      // 1. Get stock turnover analytics
      await client.analytics.getStocksTurnover({
        limit: 10,
        sku: ['123456789', '987654321']
      });

      // 2. Get financial transaction data
      await client.finance.getTransactionList({
        page: 1,
        page_size: 50,
        filter: {
          date: { from: '2023-01-01', to: '2023-01-31' },
          transaction_type: 'orders'
        }
      });

      // 3. Check competitor prices
      await client.pricingStrategy.getCompetitors({
        sku: ['123456789', '987654321'],
        limit: 10
      });

      // 4. Create pricing strategy
      await client.pricingStrategy.createStrategy({
        name: 'Data-driven Strategy',
        description: 'Strategy based on analytics and competitor data'
      });

      // All APIs should have been called
      expect(global.fetch).toHaveBeenCalledTimes(4);
      
      // Verify correct endpoints were called
      const calls = vi.mocked(global.fetch).mock.calls;
      expect(calls[0][0]).toContain('/v1/analytics/turnover/stocks');
      expect(calls[1][0]).toContain('/v3/finance/transaction/list');
      expect(calls[2][0]).toContain('/v1/pricing-strategy/competitors/list');
      expect(calls[3][0]).toContain('/v1/pricing-strategy/create');
    });
  });

  describe('Error Handling Consistency', () => {
    it('should handle errors consistently across all three APIs', async () => {
      // Mock error response
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 400,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ error: 'Bad Request' }),
        text: async () => JSON.stringify({ error: 'Bad Request' })
      } as Response);

      // All APIs should handle errors consistently
      await expect(client.analytics.getStocksTurnover({})).rejects.toThrow();
      await expect(client.finance.getTransactionList({ page: 1, page_size: 10 })).rejects.toThrow();
      await expect(client.pricingStrategy.createStrategy({ name: 'Test' })).rejects.toThrow();
    });
  });
});