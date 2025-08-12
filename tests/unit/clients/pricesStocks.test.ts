/**
 * Unit tests for PricesStocksAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PricesStocksAPI } from '../../../src/clients/pricesStocks/PricesStocksAPI';
import { createMockHttpClient } from '../../mocks';

describe('PricesStocksAPI', () => {
  let pricesStocksApi: PricesStocksAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    pricesStocksApi = new PricesStocksAPI(mockHttpClient);
  });

  describe('Stock Operations', () => {
    it('should update product stocks', async () => {
      const params = {
        stocks: [
          {
            offer_id: "PH11042",
            product_id: 313455276,
            stock: 100,
            warehouse_id: 22142605386000
          }
        ]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              warehouse_id: 22142605386000,
              product_id: 313455276,
              offer_id: "PH11042",
              updated: true,
              errors: []
            }
          ]
        }
      });

      const result = await pricesStocksApi.updateStocks(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/products/stocks', params);
      expect(result.status).toBe(200);
      expect(result.data.result?.[0]?.updated).toBe(true);
    });

    it('should get stock information with pagination', async () => {
      const params = {
        filter: {
          product_id: ["313455276"],
          visibility: "ALL" as const,
          with_quant: { exists: true }
        },
        limit: 100,
        cursor: ""
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          cursor: "next-cursor",
          items: [
            {
              offer_id: "PH11042",
              product_id: 313455276,
              stocks: [
                {
                  sku: 148313766,
                  type: "FBS",
                  present: 50,
                  reserved: 5,
                  shipment_type: "SHIPMENT_TYPE_GENERAL",
                  warehouse_ids: ["22142605386000"]
                }
              ]
            }
          ],
          total: 1
        }
      });

      const result = await pricesStocksApi.getStockInfo(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v4/product/info/stocks', params);
      expect(result.status).toBe(200);
      expect(result.data.items).toHaveLength(1);
      expect(result.data.cursor).toBe("next-cursor");
    });

    it('should get FBS stocks by warehouse', async () => {
      const params = {
        sku: ["148313766", "148313767"]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              sku: 148313766,
              present: 50,
              product_id: 313455276,
              reserved: 5,
              warehouse_id: 22142605386000,
              warehouse_name: "Moscow Warehouse"
            }
          ]
        }
      });

      const result = await pricesStocksApi.getStocksByWarehouse(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/info/stocks-by-warehouse/fbs', params);
      expect(result.status).toBe(200);
    });
  });

  describe('Price Operations', () => {
    it('should update product prices', async () => {
      const params = {
        prices: [
          {
            product_id: 1386,
            price: "1448",
            old_price: "1600", 
            min_price: "800",
            currency_code: "RUB",
            auto_action_enabled: "ENABLED" as const,
            vat: "0.1"
          }
        ]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            {
              product_id: 1386,
              offer_id: "PH8865",
              updated: true,
              errors: []
            }
          ]
        }
      });

      const result = await pricesStocksApi.updatePrices(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/import/prices', params);
      expect(result.status).toBe(200);
      expect(result.data.result?.[0]?.updated).toBe(true);
    });

    it('should get detailed price information', async () => {
      const params = {
        filter: {
          product_id: ["243686911"],
          visibility: "ALL" as const
        },
        limit: 100,
        cursor: ""
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          cursor: "next-cursor",
          items: [
            {
              product_id: 243686911,
              offer_id: "356792",
              price: {
                price: 499,
                old_price: 579,
                currency_code: "RUB",
                vat: 0.2,
                auto_action_enabled: true,
                min_price: 400
              },
              price_indexes: {
                color_index: "GREEN",
                ozon_index_data: {
                  min_price: "450",
                  price_index_value: 0.85
                }
              },
              acquiring: 15,
              volume_weight: 0.5
            }
          ],
          total: 1
        }
      });

      const result = await pricesStocksApi.getPriceInfo(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v5/product/info/prices', params);
      expect(result.status).toBe(200);
      expect(result.data.items).toBeDefined();
      expect(result.data.cursor).toBe("next-cursor");
    });
  });

  describe('Special Operations', () => {
    it('should update action timer', async () => {
      const params = {
        product_ids: ["123456", "789012"]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {}
      });

      const result = await pricesStocksApi.updateActionTimer(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/action/timer/update', params);
      expect(result.status).toBe(200);
    });

    it('should get action timer status', async () => {
      const params = {
        product_ids: ["123456", "789012"]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          statuses: [
            {
              product_id: 123456,
              expired_at: "2024-12-31T23:59:59Z",
              min_price_for_auto_actions_enabled: true
            }
          ]
        }
      });

      const result = await pricesStocksApi.getActionTimerStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/action/timer/status', params);
      expect(result.status).toBe(200);
      expect(result.data.statuses).toBeDefined();
    });

    it('should get discounted product information', async () => {
      const params = {
        discounted_skus: ["635548518", "789012345"]
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          items: [
            {
              discounted_sku: 635548518,
              sku: 320067758,
              condition_estimation: "4",
              reason_damaged: "Механическое повреждение",
              comment_reason_damaged: "повреждена заводская упаковка",
              defects: "minor scratches",
              condition: "used"
            }
          ]
        }
      });

      const result = await pricesStocksApi.getDiscountedInfo(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/info/discounted', params);
      expect(result.status).toBe(200);
      expect(result.data.items).toBeDefined();
    });

    it('should update discount percentage', async () => {
      const params = {
        product_id: 123456,
        discount: 25
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: true
        }
      });

      const result = await pricesStocksApi.updateDiscount(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/update/discount', params);
      expect(result.status).toBe(200);
      expect(result.data.result).toBe(true);
    });
  });

  describe('Pagination Iterators', () => {
    it('should iterate stock information', async () => {
      // Mock first page
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          cursor: "cursor-2",
          items: [
            { product_id: 1, offer_id: "OFFER1", stocks: [] },
            { product_id: 2, offer_id: "OFFER2", stocks: [] }
          ],
          total: 3
        }
      });

      // Mock second page  
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          cursor: undefined,
          items: [
            { product_id: 3, offer_id: "OFFER3", stocks: [] }
          ],
          total: 3
        }
      });

      const items = [];
      for await (const item of pricesStocksApi.iterateStockInfo({
        filter: { visibility: "ALL" },
        limit: 2
      })) {
        items.push(item);
      }

      expect(items).toHaveLength(3);
      expect(items[0].product_id).toBe(1);
      expect(items[1].product_id).toBe(2);
      expect(items[2].product_id).toBe(3);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });

    it('should iterate price information', async () => {
      // Mock single page response
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          cursor: undefined,
          items: [
            { product_id: 100, offer_id: "PRICE1", price: { price: 1000 } }
          ],
          total: 1
        }
      });

      const items = [];
      for await (const item of pricesStocksApi.iteratePriceInfo({
        filter: { visibility: "ALL" },
        limit: 100
      })) {
        items.push(item);
      }

      expect(items).toHaveLength(1);
      expect(items[0].product_id).toBe(100);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid product_id', details: [] }
      });

      const result = await pricesStocksApi.updateStocks({
        stocks: [{ product_id: -1, stock: 10, warehouse_id: 1 }]
      });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid product_id');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(pricesStocksApi.getPriceInfo({
        filter: { visibility: "ALL" },
        limit: 100
      })).rejects.toThrow('Connection timeout');
    });
  });
});