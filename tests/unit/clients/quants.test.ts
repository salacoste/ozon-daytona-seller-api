/**
 * @fileoverview Unit tests for QuantsAPI client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { QuantsAPI } from '../../../src/clients/quants';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  QuantListResponse,
  QuantInfoResponse,
  QuantProduct,
  QuantInfoItem,
  ProductVisibility
} from '../../../src/clients/quants/types';

describe('QuantsAPI', () => {
  let quantsAPI: QuantsAPI;
  let mockHttpClient: {
    get: MockInstance;
    post: MockInstance;
    put: MockInstance;
    delete: MockInstance;
  };

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };

    quantsAPI = new QuantsAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('Product Management', () => {
    it('should list economy products successfully', async () => {
      const mockProducts: QuantProduct[] = [
        {
          offer_id: 'ECO_PRODUCT_001',
          product_id: 123456,
          quants: [
            {
              quant_code: 'QUANT_001',
              quant_size: 50
            },
            {
              quant_code: 'QUANT_002', 
              quant_size: 100
            }
          ]
        },
        {
          offer_id: 'ECO_PRODUCT_002',
          product_id: 789012,
          quants: [
            {
              quant_code: 'QUANT_003',
              quant_size: 25
            }
          ]
        }
      ];

      const mockResponse: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: 'next_cursor_token',
          products: mockProducts,
          total_items: 150
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await quantsAPI.listProducts({
        visibility: 'VISIBLE',
        limit: 100
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/quant/list', {
        visibility: 'VISIBLE',
        limit: 100
      });

      expect(result.data.products).toHaveLength(2);
      expect(result.data.products[0].offer_id).toBe('ECO_PRODUCT_001');
      expect(result.data.products[0].quants).toHaveLength(2);
      expect(result.data.products[1].quants).toHaveLength(1);
      expect(result.data.total_items).toBe(150);
      expect(result.data.cursor).toBe('next_cursor_token');
    });

    it('should handle different visibility filters', async () => {
      const mockResponse: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: '',
          products: [],
          total_items: 0
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      await quantsAPI.listProducts({
        visibility: 'OVERPRICED_WITH_STOCK',
        limit: 50
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/quant/list', {
        visibility: 'OVERPRICED_WITH_STOCK',
        limit: 50
      });
    });

    it('should get detailed quant information', async () => {
      const mockQuantInfo: QuantInfoItem[] = [
        {
          offer_id: 'ECO_PRODUCT_001',
          product_id: 123456,
          quant_info: {
            quants: [
              {
                quant_code: 'QUANT_001',
                quant_sice: 50, // Note: API typo
                sku: 987654,
                price: '299.99',
                old_price: '399.99',
                min_price: '250.00',
                marketing_price: {
                  price: '299.99',
                  seller_price: '350.00'
                },
                dimensions: {
                  height: 100,
                  width: 200,
                  depth: 50,
                  weight: 500
                },
                barcodes_extended: [
                  {
                    barcode: '1234567890123',
                    status: 'ACTIVE',
                    error: undefined
                  }
                ],
                statuses: {
                  state_name: 'In Sale',
                  state_sys_name: 'IN_SALE',
                  state_description: 'Product is available for sale',
                  state_tooltip: 'Product is actively listed and available for purchase'
                },
                shipment_type: 'FBO'
              }
            ]
          }
        }
      ];

      const mockResponse: IHttpResponse<QuantInfoResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/info',
        data: {
          items: mockQuantInfo
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await quantsAPI.getQuantInfo({
        quant_code: ['QUANT_001']
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/quant/info', {
        quant_code: ['QUANT_001']
      });

      expect(result.data.items).toHaveLength(1);
      const item = result.data.items[0];
      expect(item.offer_id).toBe('ECO_PRODUCT_001');
      expect(item.quant_info.quants).toHaveLength(1);

      const quant = item.quant_info.quants[0];
      expect(quant.quant_code).toBe('QUANT_001');
      expect(quant.price).toBe('299.99');
      expect(quant.old_price).toBe('399.99');
      expect(quant.dimensions?.weight).toBe(500);
      expect(quant.barcodes_extended?.[0].barcode).toBe('1234567890123');
      expect(quant.statuses?.state_name).toBe('In Sale');
    });
  });

  describe('Pagination', () => {
    it('should iterate through products with cursor pagination', async () => {
      const page1Products: QuantProduct[] = [
        {
          offer_id: 'PRODUCT_1',
          product_id: 1,
          quants: [{ quant_code: 'Q1', quant_size: 10 }]
        },
        {
          offer_id: 'PRODUCT_2', 
          product_id: 2,
          quants: [{ quant_code: 'Q2', quant_size: 20 }]
        }
      ];

      const page2Products: QuantProduct[] = [
        {
          offer_id: 'PRODUCT_3',
          product_id: 3,
          quants: [{ quant_code: 'Q3', quant_size: 30 }]
        }
      ];

      const page1Response: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: 'page2_cursor',
          products: page1Products,
          total_items: 3
        }
      };

      const page2Response: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: '',
          products: page2Products,
          total_items: 3
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(page1Response)
        .mockResolvedValueOnce(page2Response);

      const allProducts = [];
      for await (const page of quantsAPI.iterateProducts({ limit: 2 })) {
        allProducts.push(...page);
      }

      expect(allProducts).toHaveLength(3);
      expect(allProducts[0].offer_id).toBe('PRODUCT_1');
      expect(allProducts[2].offer_id).toBe('PRODUCT_3');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });
  });

  describe('Analytics Methods', () => {
    it('should calculate quant analytics', async () => {
      const mockProducts: QuantProduct[] = [
        {
          offer_id: 'PRODUCT_1',
          product_id: 1,
          quants: [
            { quant_code: 'Q1', quant_size: 10 },
            { quant_code: 'Q2', quant_size: 20 }
          ]
        },
        {
          offer_id: 'PRODUCT_2',
          product_id: 2,
          quants: [
            { quant_code: 'Q3', quant_size: 30 }
          ]
        },
        {
          offer_id: 'PRODUCT_3',
          product_id: 3,
          quants: [
            { quant_code: 'Q4', quant_size: 40 },
            { quant_code: 'Q5', quant_size: 50 }
          ]
        }
      ];

      const mockQuantInfo: QuantInfoItem[] = [
        {
          offer_id: 'PRODUCT_1',
          product_id: 1,
          quant_info: {
            quants: [
              {
                quant_code: 'Q1',
                quant_sice: 10,
                sku: 101,
                price: '50.00',
                shipment_type: 'FBO'
              },
              {
                quant_code: 'Q2', 
                quant_sice: 20,
                sku: 102,
                price: '150.00',
                shipment_type: 'FBS'
              }
            ]
          }
        }
      ];

      const listResponse: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: '',
          products: mockProducts,
          total_items: 3
        }
      };

      const infoResponse: IHttpResponse<QuantInfoResponse> = {
        status: 200,
        statusText: 'OK', 
        headers: {},
        url: '/v1/product/quant/info',
        data: {
          items: mockQuantInfo
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(listResponse)
        .mockResolvedValueOnce(infoResponse);

      const analytics = await quantsAPI.getQuantAnalytics();

      expect(analytics.total_products).toBe(3);
      expect(analytics.total_quants).toBe(5);
      expect(analytics.average_quant_size).toBe(30); // (10+20+30+40+50)/5 = 30
      expect(analytics.visible_products).toBe(1); // 60% of 3 = 1.8 -> floor = 1
      expect(analytics.invisible_products).toBe(0); // 20% of 3 = 0.6 -> floor = 0
      expect(analytics.price_distribution.under_100).toBe(1); // 50.00 only
      expect(analytics.price_distribution.between_100_500).toBe(1); // 150.00
      expect(analytics.shipment_types['FBO']).toBe(1);
      expect(analytics.shipment_types['FBS']).toBe(1);
    });

    it('should analyze pricing for specific quants', async () => {
      const mockQuantInfo: QuantInfoItem[] = [
        {
          offer_id: 'PRODUCT_1',
          product_id: 1,
          quant_info: {
            quants: [
              {
                quant_code: 'Q1',
                quant_sice: 10,
                sku: 101,
                price: '299.99',
                old_price: '399.99',
                min_price: '250.00',
                marketing_price: {
                  price: '299.99',
                  seller_price: '350.00'
                }
              },
              {
                quant_code: 'Q2',
                quant_sice: 20,
                sku: 102,
                price: '50.00',
                old_price: '60.00'
              }
            ]
          }
        }
      ];

      const mockResponse: IHttpResponse<QuantInfoResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/info',
        data: {
          items: mockQuantInfo
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const analyses = await quantsAPI.analyzePricing(['Q1', 'Q2']);

      expect(analyses).toHaveLength(2);
      
      const q1Analysis = analyses.find(a => a.quant_code === 'Q1')!;
      expect(q1Analysis.current_price).toBe(299.99);
      expect(q1Analysis.old_price).toBe(399.99);
      expect(q1Analysis.price_change_percent).toBeCloseTo(-25.0, 1); // (299.99-399.99)/399.99 * 100
      expect(q1Analysis.price_category).toBe('mid-range');
      expect(q1Analysis.is_overpriced).toBe(false); // 299.99 < 250 * 1.5

      const q2Analysis = analyses.find(a => a.quant_code === 'Q2')!;
      expect(q2Analysis.current_price).toBe(50.00);
      expect(q2Analysis.price_category).toBe('budget');
      expect(q2Analysis.price_change_percent).toBeCloseTo(-16.67, 1); // (50-60)/60 * 100
    });

    it('should get products by visibility status', async () => {
      const mockProducts: QuantProduct[] = [
        {
          offer_id: 'OVERPRICED_1',
          product_id: 1,
          quants: [{ quant_code: 'Q1', quant_size: 10 }]
        }
      ];

      const mockResponse: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: '',
          products: mockProducts,
          total_items: 1
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const products = await quantsAPI.getProductsByVisibility('OVERPRICED_WITH_STOCK', 50);

      expect(products).toHaveLength(1);
      expect(products[0].offer_id).toBe('OVERPRICED_1');
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/quant/list', {
        visibility: 'OVERPRICED_WITH_STOCK',
        limit: 50
      });
    });

    it('should get products requiring attention', async () => {
      const mockOverpriced: QuantProduct[] = [
        { offer_id: 'OVERPRICED_1', product_id: 1, quants: [{ quant_code: 'Q1', quant_size: 10 }] }
      ];
      const mockEmptyStock: QuantProduct[] = [
        { offer_id: 'EMPTY_1', product_id: 2, quants: [{ quant_code: 'Q2', quant_size: 20 }] }
      ];
      const mockValidationFailed: QuantProduct[] = [
        { offer_id: 'FAILED_1', product_id: 3, quants: [{ quant_code: 'Q3', quant_size: 30 }] }
      ];
      const mockQuarantined: QuantProduct[] = [
        { offer_id: 'QUARANTINE_1', product_id: 4, quants: [{ quant_code: 'Q4', quant_size: 40 }] }
      ];

      const responses = [
        {
          status: 200,
          statusText: 'OK',
          headers: {},
          url: '/v1/product/quant/list',
          data: { cursor: '', products: mockOverpriced, total_items: 1 }
        },
        {
          status: 200, 
          statusText: 'OK',
          headers: {},
          url: '/v1/product/quant/list',
          data: { cursor: '', products: mockEmptyStock, total_items: 1 }
        },
        {
          status: 200,
          statusText: 'OK', 
          headers: {},
          url: '/v1/product/quant/list',
          data: { cursor: '', products: mockValidationFailed, total_items: 1 }
        },
        {
          status: 200,
          statusText: 'OK',
          headers: {},
          url: '/v1/product/quant/list', 
          data: { cursor: '', products: mockQuarantined, total_items: 1 }
        }
      ];

      mockHttpClient.post
        .mockResolvedValueOnce(responses[0])
        .mockResolvedValueOnce(responses[1])
        .mockResolvedValueOnce(responses[2])
        .mockResolvedValueOnce(responses[3]);

      const attention = await quantsAPI.getProductsRequiringAttention();

      expect(attention.overpriced).toHaveLength(1);
      expect(attention.empty_stock).toHaveLength(1);
      expect(attention.validation_failed).toHaveLength(1);
      expect(attention.quarantined).toHaveLength(1);
      
      expect(attention.overpriced[0].offer_id).toBe('OVERPRICED_1');
      expect(attention.empty_stock[0].offer_id).toBe('EMPTY_1');
      expect(attention.validation_failed[0].offer_id).toBe('FAILED_1');
      expect(attention.quarantined[0].offer_id).toBe('QUARANTINE_1');

      expect(mockHttpClient.post).toHaveBeenCalledTimes(4);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty product list', async () => {
      const mockResponse: IHttpResponse<QuantListResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/list',
        data: {
          cursor: '',
          products: [],
          total_items: 0
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await quantsAPI.listProducts();

      expect(result.data.products).toHaveLength(0);
      expect(result.data.total_items).toBe(0);
    });

    it('should handle quant info request with no results', async () => {
      const mockResponse: IHttpResponse<QuantInfoResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/info',
        data: {
          items: []
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await quantsAPI.getQuantInfo({
        quant_code: ['NONEXISTENT_QUANT']
      });

      expect(result.data.items).toHaveLength(0);
    });

    it('should handle pricing analysis with incomplete data', async () => {
      const mockQuantInfo: QuantInfoItem[] = [
        {
          offer_id: 'PRODUCT_1',
          product_id: 1,
          quant_info: {
            quants: [
              {
                quant_code: 'Q1',
                quant_sice: 10,
                sku: 101,
                price: '100.00'
                // No old_price, min_price, marketing_price
              }
            ]
          }
        }
      ];

      const mockResponse: IHttpResponse<QuantInfoResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/quant/info',
        data: {
          items: mockQuantInfo
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const analyses = await quantsAPI.analyzePricing(['Q1']);

      expect(analyses).toHaveLength(1);
      expect(analyses[0].quant_code).toBe('Q1');
      expect(analyses[0].current_price).toBe(100.00);
      expect(analyses[0].old_price).toBe(0);
      expect(analyses[0].price_change_percent).toBe(0);
      expect(analyses[0].is_overpriced).toBe(false);
      expect(analyses[0].is_competitive).toBe(true);
      expect(analyses[0].price_category).toBe('mid-range');
    });
  });
});