/**
 * HTTP transport mocking utilities for testing
 */

import { vi, type MockedFunction } from 'vitest';
import type { IHttpResponse } from '../../src/http/types';

/**
 * Mock HTTP response builder
 */
export class MockHttpResponse {
  private response: Partial<IHttpResponse<any>> = {
    status: 200,
    statusText: 'OK',
    headers: {},
    data: {}
  };

  status(status: number): this {
    this.response.status = status;
    this.response.statusText = this.getStatusText(status);
    return this;
  }

  data(data: any): this {
    this.response.data = data;
    return this;
  }

  headers(headers: Record<string, string>): this {
    this.response.headers = { ...this.response.headers, ...headers };
    return this;
  }

  json(data: any): this {
    return this.headers({ 'content-type': 'application/json' }).data(data);
  }

  error(message: string, code?: number): this {
    const errorData = {
      code: code || 3,
      message,
      details: []
    };
    return this.status(400).json(errorData);
  }

  build(): IHttpResponse<any> {
    return this.response as IHttpResponse<any>;
  }

  private getStatusText(status: number): string {
    const statusTexts: Record<number, string> = {
      200: 'OK',
      201: 'Created', 
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
    };
    return statusTexts[status] || 'Unknown';
  }
}

/**
 * Create a mock HTTP response
 */
export function mockResponse(): MockHttpResponse {
  return new MockHttpResponse();
}

/**
 * Mock HttpClient factory
 */
export function createMockHttpClient() {
  const httpClient = {
    get: vi.fn() as MockedFunction<any>,
    post: vi.fn() as MockedFunction<any>,
    put: vi.fn() as MockedFunction<any>,
    patch: vi.fn() as MockedFunction<any>,
    delete: vi.fn() as MockedFunction<any>,
    config: {
      baseUrl: 'https://api-seller.ozon.ru',
      timeoutMs: 30000,
      maxRetries: 3,
      clientId: 'test-client-id',
      apiKey: 'test-api-key',
    }
  };

  // Set up default successful responses
  httpClient.get.mockResolvedValue(mockResponse().build());
  httpClient.post.mockResolvedValue(mockResponse().build());
  httpClient.put.mockResolvedValue(mockResponse().build());
  httpClient.patch.mockResolvedValue(mockResponse().build());
  httpClient.delete.mockResolvedValue(mockResponse().build());

  return httpClient;
}

/**
 * Ozon API mock data generators
 */
export const mockData = {
  /**
   * Generate mock product data
   */
  product: (overrides: Partial<any> = {}) => ({
    product_id: 12345,
    offer_id: 'TEST-SKU-001',
    name: 'Test Product',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T12:00:00.000Z',
    ...overrides
  }),

  /**
   * Generate mock FBS posting data
   */
  fbsPosting: (overrides: Partial<any> = {}) => ({
    order_id: 67890,
    order_number: 'ORDER-123456',
    posting_number: 'POST-123456',
    status: 'awaiting_packaging',
    created_at: '2024-01-01T10:00:00.000Z',
    in_process_at: '2024-01-01T10:30:00.000Z',
    products: [
      {
        offer_id: 'TEST-SKU-001',
        name: 'Test Product',
        sku: 12345,
        quantity: 1,
        price: '1000.00'
      }
    ],
    addressee: { name: 'Test Customer' },
    delivery_method: {
      id: 1,
      name: 'Pickup',
      warehouse_id: 123,
      warehouse: 'Test Warehouse'
    },
    ...overrides
  }),

  /**
   * Generate mock FBO posting data
   */
  fboPosting: (overrides: Partial<any> = {}) => ({
    order_id: 11111,
    order_number: 'ORDER-123456',
    posting_number: 'POST-123456',
    status: 'awaiting_deliver',
    created_at: '2024-01-01T08:00:00.000Z',
    in_process_at: '2024-01-01T08:15:00.000Z',
    products: [
      {
        offer_id: 'TEST-SKU-FBO',
        name: 'FBO Test Product',
        sku: 54321,
        quantity: 2,
        price: '500.00'
      }
    ],
    analytics_data: {
      region: 'Moscow',
      city: 'Moscow',
      delivery_type: 'Ozon',
      is_premium: false,
      payment_type_group_name: 'Card',
      warehouse_id: 456,
      warehouse_name: 'FBO Warehouse',
      is_legal: false
    },
    ...overrides
  }),

  /**
   * Generate mock warehouse data
   */
  warehouse: (overrides: Partial<any> = {}) => ({
    warehouse_id: 123,
    name: 'Test Warehouse',
    is_rfbs: false,
    can_print_act_in_advance: true,
    working_hours: [
      { day: 1, time_from: '09:00', time_to: '18:00' },
      { day: 2, time_from: '09:00', time_to: '18:00' }
    ],
    has_entrusted_acceptance: false,
    min_working_days: 1,
    cutoff_time: '16:00',
    timezone: 'Europe/Moscow',
    status: 'active',
    ...overrides
  }),

  /**
   * Generate mock stock analytics data
   */
  stockAnalytics: (overrides: Partial<any> = {}) => ({
    items: [
      {
        sku: 12345,
        offer_id: 'TEST-SKU-001',
        product_id: 67890,
        stocks: [
          {
            type: 'fbs',
            present: 10,
            reserved: 2
          },
          {
            type: 'fbo', 
            present: 5,
            reserved: 1
          }
        ]
      }
    ],
    ...overrides
  }),

  /**
   * Generate mock error response
   */
  error: (message: string = 'Test error', code: number = 3) => ({
    code,
    message,
    details: []
  }),

  /**
   * Generate paginated response wrapper
   */
  paginated: (items: any[], lastId?: string, hasNext: boolean = false) => ({
    result: {
      items,
      ...(lastId && { last_id: lastId }),
      ...(typeof hasNext === 'boolean' && { has_next: hasNext }),
      total: items.length
    }
  }),

  /**
   * Generate simple result wrapper
   */
  result: (data: any) => ({
    result: data
  })
};