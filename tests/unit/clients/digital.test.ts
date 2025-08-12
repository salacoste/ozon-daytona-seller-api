/**
 * @fileoverview Unit tests for DigitalAPI client
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { DigitalAPI } from '../../../src/clients/digital';
import type { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpResponse } from '../../../src/http/types';
import type {
  UploadPostingCodesResponse,
  ListPostingCodesResponse,
  DigitalStocksImportResponse,
  DigitalPosting,
  ExemplarBySku
} from '../../../src/clients/digital/types';

describe('DigitalAPI', () => {
  let digitalAPI: DigitalAPI;
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

    digitalAPI = new DigitalAPI(mockHttpClient as unknown as HttpClient);
  });

  describe('Code Management', () => {
    it('should upload posting codes successfully', async () => {
      const mockResponse: IHttpResponse<UploadPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/codes/upload',
        data: {
          exemplars_by_sku: [
            {
              sku: '6605735423',
              uploaded_count: 3,
              not_uploaded_count: 0,
              errors: []
            },
            {
              sku: '7890123456',
              uploaded_count: 1,
              not_uploaded_count: 1,
              errors: [
                {
                  exemplar_key: 'INVALID_CODE',
                  error: 'Invalid code format',
                  error_code: 'FORMAT_ERROR'
                }
              ]
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const exemplars: ExemplarBySku[] = [
        {
          sku: '6605735423',
          exemplar_qty: 3,
          not_available_exemplar_qty: 0,
          exemplar_keys: ['CODE123', 'CODE456', 'CODE789']
        },
        {
          sku: '7890123456',
          exemplar_qty: 1,
          not_available_exemplar_qty: 1,
          exemplar_keys: ['INVALID_CODE']
        }
      ];

      const result = await digitalAPI.uploadPostingCodes({
        posting_number: '33920151-0719-1',
        exemplars_by_sku: exemplars
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/digital/codes/upload', {
        posting_number: '33920151-0719-1',
        exemplars_by_sku: exemplars
      });

      expect(result.data.exemplars_by_sku).toHaveLength(2);
      expect(result.data.exemplars_by_sku[0].uploaded_count).toBe(3);
      expect(result.data.exemplars_by_sku[1].not_uploaded_count).toBe(1);
      expect(result.data.exemplars_by_sku[1].errors).toHaveLength(1);
    });

    it('should list posting codes with filters', async () => {
      const mockPostings: DigitalPosting[] = [
        {
          posting_number: '33920151-0719-1',
          status: 'awaiting_deliver',
          created_at: '2024-01-01T10:00:00Z',
          digital_items: [
            {
              sku: '12345',
              quantity: 2,
              required_qty_for_digital_code: 2,
              uploaded_codes_count: 1,
              codes_upload_deadline: '2024-01-02T10:00:00Z',
              product_name: 'Digital Software License'
            }
          ]
        },
        {
          posting_number: '33920151-0719-2',
          status: 'delivered',
          created_at: '2024-01-01T11:00:00Z',
          in_process_at: '2024-01-01T12:00:00Z',
          digital_items: [
            {
              sku: '67890',
              quantity: 1,
              required_qty_for_digital_code: 1,
              uploaded_codes_count: 1,
              product_name: 'Game Activation Key'
            }
          ]
        }
      ];

      const mockResponse: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: mockPostings,
          has_next: false,
          total: 2
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await digitalAPI.listPostingCodes({
        filter: {
          statuses: ['awaiting_deliver', 'delivered'],
          since: '2024-01-01T00:00:00Z'
        },
        limit: 50
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/digital/list', {
        filter: {
          statuses: ['awaiting_deliver', 'delivered'],
          since: '2024-01-01T00:00:00Z'
        },
        limit: 50
      });

      expect(result.data.result).toHaveLength(2);
      expect(result.data.result[0].status).toBe('awaiting_deliver');
      expect(result.data.result[0].digital_items[0].uploaded_codes_count).toBe(1);
      expect(result.data.result[1].status).toBe('delivered');
    });
  });

  describe('Stock Management', () => {
    it('should import digital stocks successfully', async () => {
      const mockResponse: IHttpResponse<DigitalStocksImportResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/product/digital/stocks/import',
        data: {
          result: [
            {
              sku: 'SOFTWARE_LICENSE_A',
              updated: true,
              stock: 150
            },
            {
              sku: 'GAME_KEY_B',
              updated: false,
              errors: ['SKU not found in digital catalog']
            },
            {
              sku: 'EBOOK_C',
              updated: true,
              stock: 1000
            }
          ]
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const result = await digitalAPI.importDigitalStocks({
        stocks: [
          { sku: 'SOFTWARE_LICENSE_A', stock: 150 },
          { sku: 'GAME_KEY_B', stock: 75 },
          { sku: 'EBOOK_C', stock: 1000 }
        ]
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/product/digital/stocks/import', {
        stocks: [
          { sku: 'SOFTWARE_LICENSE_A', stock: 150 },
          { sku: 'GAME_KEY_B', stock: 75 },
          { sku: 'EBOOK_C', stock: 1000 }
        ]
      });

      expect(result.data.result).toHaveLength(3);
      expect(result.data.result[0].updated).toBe(true);
      expect(result.data.result[1].updated).toBe(false);
      expect(result.data.result[1].errors).toContain('SKU not found in digital catalog');
      expect(result.data.result[2].stock).toBe(1000);
    });
  });

  describe('Pagination', () => {
    it('should iterate through postings with pagination', async () => {
      const page1Response: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: [
            {
              posting_number: 'post_1',
              status: 'awaiting_deliver',
              created_at: '2024-01-01T00:00:00Z',
              digital_items: [
                { sku: 'sku1', quantity: 1, required_qty_for_digital_code: 1 }
              ]
            },
            {
              posting_number: 'post_2',
              status: 'delivered',
              created_at: '2024-01-02T00:00:00Z',
              digital_items: [
                { sku: 'sku2', quantity: 2, required_qty_for_digital_code: 2 }
              ]
            }
          ],
          has_next: true
        }
      };

      const page2Response: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: [
            {
              posting_number: 'post_3',
              status: 'awaiting_deliver',
              created_at: '2024-01-03T00:00:00Z',
              digital_items: [
                { sku: 'sku3', quantity: 1, required_qty_for_digital_code: 1 }
              ]
            }
          ],
          has_next: false
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(page1Response)
        .mockResolvedValueOnce(page2Response);

      const allPostings = [];
      for await (const page of digitalAPI.iteratePostingCodes({ limit: 2 })) {
        allPostings.push(...page);
      }

      expect(allPostings).toHaveLength(3);
      expect(allPostings[0].posting_number).toBe('post_1');
      expect(allPostings[2].posting_number).toBe('post_3');
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
    });
  });

  describe('Analytics Methods', () => {
    it('should calculate digital analytics', async () => {
      const mockPostings: DigitalPosting[] = [
        {
          posting_number: 'post_1',
          status: 'awaiting_deliver',
          created_at: '2024-01-01T00:00:00Z',
          digital_items: [
            {
              sku: 'sku1',
              quantity: 2,
              required_qty_for_digital_code: 2,
              uploaded_codes_count: 1,
              exemplars: [
                { exemplar_key: 'code1', status: 'uploaded', uploaded_at: '2024-01-08T00:00:00Z' }
              ]
            }
          ]
        },
        {
          posting_number: 'post_2',
          status: 'delivered',
          created_at: '2024-01-01T00:00:00Z',
          in_process_at: '2024-01-01T02:00:00Z',
          digital_items: [
            {
              sku: 'sku2',
              quantity: 1,
              required_qty_for_digital_code: 1,
              uploaded_codes_count: 1,
              exemplars: [
                { exemplar_key: 'code2', status: 'delivered', uploaded_at: '2024-01-08T00:00:00Z' }
              ]
            }
          ]
        },
        {
          posting_number: 'post_3',
          status: 'delivered',
          created_at: '2024-01-01T00:00:00Z',
          in_process_at: '2024-01-01T01:00:00Z',
          digital_items: [
            {
              sku: 'sku3',
              quantity: 1,
              required_qty_for_digital_code: 1,
              exemplars: [
                { exemplar_key: 'code3', status: 'failed' }
              ]
            }
          ]
        }
      ];

      const mockResponse: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: mockPostings,
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      // Mock today's date for consistent testing
      const today = '2024-01-08';
      const originalDate = Date;
      global.Date = class extends Date {
        constructor(...args: any[]) {
          if (args.length === 0) {
            super(`${today}T00:00:00Z`);
          } else {
            super(...args);
          }
        }
        
        static now() {
          return new originalDate(`${today}T00:00:00Z`).getTime();
        }
        
        toISOString() {
          return super.toISOString();
        }
      } as any;

      const analytics = await digitalAPI.getDigitalAnalytics();

      expect(analytics.total_postings).toBe(3);
      expect(analytics.pending_code_uploads).toBe(1); // post_1 has incomplete uploads
      expect(analytics.delivered_postings).toBe(2);
      expect(analytics.failed_uploads).toBe(1); // post_3 has failed exemplar
      expect(analytics.codes_uploaded_today).toBe(2); // 2 codes uploaded on today's date
      expect(analytics.average_upload_time_hours).toBe(1.5); // (2 + 1) / 2 = 1.5 hours
      expect(analytics.stock_levels.total_skus).toBe(3);

      // Restore original Date
      global.Date = originalDate;
    });

    it('should get urgent code uploads', async () => {
      const now = new Date('2024-01-01T18:00:00Z');
      global.Date.now = vi.fn(() => now.getTime());

      const mockPostings: DigitalPosting[] = [
        {
          posting_number: 'urgent_1',
          status: 'awaiting_deliver',
          created_at: '2024-01-01T12:00:00Z',
          digital_items: [
            {
              sku: 'sku1',
              quantity: 3,
              required_qty_for_digital_code: 3,
              uploaded_codes_count: 1, // 2 codes still needed
              codes_upload_deadline: '2024-01-01T20:00:00Z' // 2 hours left
            }
          ]
        },
        {
          posting_number: 'urgent_2',
          status: 'awaiting_deliver',
          created_at: '2024-01-01T10:00:00Z',
          digital_items: [
            {
              sku: 'sku2',
              quantity: 1,
              required_qty_for_digital_code: 1,
              uploaded_codes_count: 0, // 1 code needed
              codes_upload_deadline: '2024-01-01T23:00:00Z' // 5 hours left
            }
          ]
        }
      ];

      const mockResponse: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: mockPostings,
          has_next: false
        }
      };

      mockHttpClient.post.mockResolvedValueOnce(mockResponse);

      const urgentUploads = await digitalAPI.getUrgentCodeUploads(6);

      expect(urgentUploads).toHaveLength(2);
      expect(urgentUploads[0].posting_number).toBe('urgent_1');
      expect(urgentUploads[0].hours_remaining).toBe(2);
      expect(urgentUploads[0].is_urgent).toBe(true); // < 2 hours
      expect(urgentUploads[1].posting_number).toBe('urgent_2');
      expect(urgentUploads[1].hours_remaining).toBe(5);
      expect(urgentUploads[1].is_urgent).toBe(false);
    });

    it('should bulk upload from inventory', async () => {
      const mockListResponse: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: [
            {
              posting_number: '12345',
              status: 'awaiting_deliver',
              created_at: '2024-01-01T00:00:00Z',
              digital_items: [
                {
                  sku: 'SOFTWARE_A',
                  quantity: 2,
                  required_qty_for_digital_code: 2
                },
                {
                  sku: 'GAME_B',
                  quantity: 1,
                  required_qty_for_digital_code: 1
                }
              ]
            }
          ],
          has_next: false
        }
      };

      const mockUploadResponse: IHttpResponse<UploadPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/codes/upload',
        data: {
          exemplars_by_sku: [
            {
              sku: 'SOFTWARE_A',
              uploaded_count: 2,
              not_uploaded_count: 0
            },
            {
              sku: 'GAME_B',
              uploaded_count: 1,
              not_uploaded_count: 0
            }
          ]
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(mockListResponse)
        .mockResolvedValueOnce(mockUploadResponse);

      const codeInventory = {
        'SOFTWARE_A': ['LIC001', 'LIC002', 'LIC003'],
        'GAME_B': ['GAME001'],
        'MISSING_SKU': ['CODE001'] // This SKU isn't in the order
      };

      const result = await digitalAPI.bulkUploadFromInventory('12345', codeInventory);

      expect(result.success).toBe(true);
      expect(result.missing).toEqual([]); // All required SKUs were available
      expect(result.results.exemplars_by_sku).toHaveLength(2);

      // Verify the upload call was made correctly
      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/digital/codes/upload', {
        posting_number: '12345',
        exemplars_by_sku: [
          {
            sku: 'SOFTWARE_A',
            exemplar_qty: 2,
            not_available_exemplar_qty: 0,
            exemplar_keys: ['LIC001', 'LIC002']
          },
          {
            sku: 'GAME_B',
            exemplar_qty: 1,
            not_available_exemplar_qty: 0,
            exemplar_keys: ['GAME001']
          }
        ]
      });
    });

    it('should handle missing inventory in bulk upload', async () => {
      const mockListResponse: IHttpResponse<ListPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/list',
        data: {
          result: [
            {
              posting_number: '12345',
              status: 'awaiting_deliver',
              created_at: '2024-01-01T00:00:00Z',
              digital_items: [
                {
                  sku: 'SOFTWARE_A',
                  quantity: 3,
                  required_qty_for_digital_code: 3
                },
                {
                  sku: 'MISSING_SKU',
                  quantity: 1,
                  required_qty_for_digital_code: 1
                }
              ]
            }
          ],
          has_next: false
        }
      };

      const mockUploadResponse: IHttpResponse<UploadPostingCodesResponse> = {
        status: 200,
        statusText: 'OK',
        headers: {},
        url: '/v1/posting/digital/codes/upload',
        data: {
          exemplars_by_sku: [
            {
              sku: 'SOFTWARE_A',
              uploaded_count: 1,
              not_uploaded_count: 2
            }
          ]
        }
      };

      mockHttpClient.post
        .mockResolvedValueOnce(mockListResponse)
        .mockResolvedValueOnce(mockUploadResponse);

      const limitedInventory = {
        'SOFTWARE_A': ['LIC001'] // Only 1 code, but 3 needed
        // MISSING_SKU has no codes available
      };

      const result = await digitalAPI.bulkUploadFromInventory('12345', limitedInventory);

      expect(result.success).toBe(true);
      expect(result.missing).toContain('MISSING_SKU');
      
      // Should make 2 calls: list posting codes + upload codes
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
      
      // Should still attempt to upload what's available
      expect(mockHttpClient.post).toHaveBeenNthCalledWith(2, '/v1/posting/digital/codes/upload', {
        posting_number: '12345',
        exemplars_by_sku: [
          {
            sku: 'SOFTWARE_A',
            exemplar_qty: 1,
            not_available_exemplar_qty: 2,
            exemplar_keys: ['LIC001']
          }
        ]
      });
    });
  });
});