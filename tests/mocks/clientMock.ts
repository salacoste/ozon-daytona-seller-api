/**
 * Client mocking utilities for testing OzonClient
 */

import { vi, type MockedFunction } from 'vitest';
import { createMockHttpClient, mockData } from './httpMock';
import { HttpClient } from '../../src/http/HttpClient';

/**
 * Mock OzonClient configuration
 */
export const mockClientConfig = {
  clientId: 'test-client-id',
  apiKey: 'test-api-key',
  baseUrl: 'https://api-seller.ozon.ru',
  timeoutMs: 30000,
  maxRetries: 3,
  retryDelayMs: 1000,
  retryBackoffFactor: 2,
};

/**
 * Setup HttpClient mock for testing
 */
export function setupHttpClientMock() {
  const mockHttpClient = createMockHttpClient();
  
  // Mock the HttpClient constructor
  (HttpClient as unknown as MockedFunction<typeof HttpClient>).mockImplementation(
    (config: any) => {
      mockHttpClient.config = { ...mockHttpClient.config, ...config };
      return mockHttpClient as unknown as HttpClient;
    }
  );

  return mockHttpClient;
}

/**
 * Mock API responses for different endpoints
 */
export function setupApiMocks(httpClient: ReturnType<typeof createMockHttpClient>) {
  // Product API mocks
  httpClient.post.mockImplementation((url: string, data?: any) => {
    switch (url) {
      case '/v3/product/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.paginated([
            mockData.product(),
            mockData.product({ product_id: 23456, offer_id: 'TEST-SKU-002' })
          ], 'next123')
        });

      case '/v3/product/info/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            items: [mockData.product()]
          })
        });

      case '/v3/product/import':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ task_id: 98765 })
        });

      case '/v1/product/import/info':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            total: 1,
            processed: 1,
            errors: []
          })
        });

      // Additional FBS core endpoints  
      case '/v3/posting/fbs/unfulfilled/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            postings: [mockData.fbsPosting()],
            has_next: false,
            total: 1
          })
        });

      case '/v3/posting/fbs/get':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result(mockData.fbsPosting())
        });

      case '/v2/posting/fbs/get-by-barcode':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result(mockData.fbsPosting())
        });

      case '/v3/posting/multiboxqty/set':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ success: true })
        });

      case '/v2/posting/fbs/product/change':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ success: true })
        });

      case '/v2/posting/fbs/product/country/set':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ success: true })
        });

      case '/v1/posting/fbs/restrictions':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            restrictions: [{ type: 'dimension', description: 'Max weight exceeded' }]
          })
        });

      case '/v2/posting/fbs/package-label':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ file_content: 'base64-pdf-content' })
        });

      case '/v1/posting/fbs/package-label/create':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ batch_id: 'batch-123' })
        });

      case '/v2/posting/fbs/package-label/create':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ batch_id: 'batch-456' })
        });

      case '/v1/posting/fbs/package-label/get':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ status: 'completed', file_content: 'base64-pdf' })
        });

      // FBS API mocks
      case '/v3/posting/fbs/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            mockData.fbsPosting(),
            mockData.fbsPosting({ posting_number: 'POST-234567' })
          ])
        });

      case '/v3/posting/fbs/get':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result(mockData.fbsPosting())
        });

      case '/v2/posting/fbs/ship':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            { posting_number: 'POST-123456', status: 'shipped' }
          ])
        });

      case '/v2/posting/fbs/product/country/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            { name: 'Russian Federation', iso_code: 'RU' },
            { name: 'China', iso_code: 'CN' },
            { name: 'United States', iso_code: 'US' }
          ])
        });

      case '/v2/posting/fbs/cancel-reason/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            { id: 400, name: 'Out of stock' },
            { id: 401, name: 'Damaged goods' },
            { id: 402, name: 'Customer request' }
          ])
        });

      case '/v2/posting/fbs/cancel':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            result: true,
            posting_number: data?.posting_number || 'POST-123456'
          })
        });

      // Additional FBS management endpoints
      case '/v1/posting/fbs/cancel-reason':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            id: data?.cancel_reason_id || 400,
            name: 'Out of stock'
          })
        });

      case '/v2/posting/fbs/product/cancel':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ success: true })
        });

      case '/v2/posting/fbs/arbitration':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ success: true })
        });

      case '/v2/posting/fbs/awaiting-delivery':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ success: true })
        });

      case '/v1/posting/fbs/verify-pickup-code':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ verified: true })
        });

      case '/v1/posting/fbs/etgb':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({ document_content: 'base64-etgb-content' })
        });

      case '/v1/posting/unpaid/legal-product-list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            products: [{ product_id: 12345, status: 'unpaid' }],
            has_next: false,
            total: 1
          })
        });

      // FBO API mocks
      case '/v2/posting/fbo/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            mockData.fboPosting(),
            mockData.fboPosting({ posting_number: 'POST-234567' })
          ])
        });

      case '/v2/posting/fbo/get':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result(mockData.fboPosting())
        });
        
      case '/v1/posting/fbo/cancel-reason/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            { reason_id: 400, reason: 'Buyer cancelled' }
          ])
        });
        
      case '/v1/supply-order/status/counter':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            counts: {
              new: 5,
              awaiting_approve: 3,
              approved: 10,
              cancelled: 2
            }
          })
        });
        
      case '/v1/supply-order/bundle':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            supply_order_id: data?.supply_order_id || 123456,
            bundle_items: [
              { sku: 148313766, quantity: 10 }
            ]
          })
        });
        
      case '/v2/supply-order/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            items: [
              {
                supply_order_id: 123456,
                status: 'approved',
                cutoff_from: '2024-01-01T00:00:00Z',
                cutoff_to: '2024-01-02T00:00:00Z'
              }
            ],
            has_next: false,
            last_supply_order_id: 123456
          })
        });

      // Warehouse API mocks
      case '/v1/warehouse/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            mockData.warehouse(),
            mockData.warehouse({ warehouse_id: 456, name: 'Warehouse 2' })
          ])
        });

      case '/v1/delivery-method/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            {
              id: 123456,
              name: 'Standard Delivery',
              company_name: 'Delivery Company',
              provider_id: 123456,
              provider_name: 'Test Provider',
              warehouse_id: 123,
              warehouse_name: 'Test Warehouse',
              status: 'NEW',
              cutoff_time: '16:00',
              working_hours: []
            }
          ])
        });

      // Analytics API mocks
      case '/v2/analytics/stock_on_warehouses':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            rows: [
              {
                sku: 148313766,
                warehouse_type: 'fbo',
                item_code: 'TEST-SKU-001',
                item_name: 'Test Product',
                promised_amount: 12,
                present_amount: 10,
                reserved_amount: 2
              }
            ]
          })
        });

      case '/v1/analytics/data':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: {
              data: [
                {
                  dimensions: [{ id: 'sku', value: '12345' }],
                  metrics: [
                    { id: 'ordered_units', value: 100 },
                    { id: 'revenue', value: 50000 }
                  ]
                }
              ],
              totals: [
                { id: 'ordered_units', value: 100 },
                { id: 'revenue', value: 50000 }
              ]
            },
            timestamp: '2024-01-01T12:00:00Z'
          }
        });

      // Prices & Stocks API mocks
      case '/v5/product/info/prices':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            items: [
              {
                offer_id: 'TEST-SKU-001',
                product_id: 12345,
                price: {
                  price: '1000.00',
                  old_price: '1199.99',
                  premium_price: '899.99'
                },
                vat: '0.20'
              }
            ],
            last_id: 'price123',
            total: 1
          })
        });

      // Reports API mocks
      case '/v1/report/info':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            code: 'REPORT_123',
            status: 'success',
            file: 'https://files.ozon.ru/report.csv'
          })
        });

      case '/v1/report/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            reports: [
              {
                code: 'REPORT_123',
                name: 'Test Report',
                status: 'success',
                created_at: '2024-01-01T00:00:00Z'
              }
            ],
            has_next: false
          })
        });

      case '/v1/report/products/create':
      case '/v2/report/returns/create':
      case '/v1/report/postings/create':
      case '/v1/report/discounted/create':
      case '/v1/report/warehouse/stock':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            code: 'REPORT_NEW_456'
          })
        });

      // Finance API mocks
      case '/v1/finance/cash-flow-statement/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            operations: [
              {
                date: '2024-01-01',
                type: 'sale',
                amount: 1000.00,
                currency: 'RUB',
                description: 'Test operation',
                posting_number: 'ORDER-123'
              }
            ],
            has_next: false
          })
        });

      case '/v2/finance/realization':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            rows: [
              {
                posting_number: 'ORDER-123456',
                product_name: 'Test Product',
                offer_id: 'OFFER-001',
                sku: 148313766,
                quantity_shipped: 5,
                quantity_returned: 1,
                price: 1000.00,
                commission: 150.00,
                total_amount: 4250.00,
                currency: 'RUB'
              }
            ]
          })
        });

      case '/v1/finance/realization/posting':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            postings: [
              {
                posting_number: 'ORDER-789012',
                status: 'delivered',
                created_at: '2024-02-01T10:00:00Z',
                delivered_at: '2024-02-03T14:30:00Z',
                products: [
                  {
                    sku: 148313767,
                    quantity: 2,
                    price: 500.00,
                    commission: 75.00
                  }
                ]
              }
            ]
          })
        });

      case '/v3/finance/transaction/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            transactions: [
              {
                transaction_id: 'TXN-123456',
                date: '2024-01-15',
                type: 'sale',
                amount: 850.00,
                currency: 'RUB',
                description: 'Product sale commission',
                posting_number: 'ORDER-123456'
              }
            ],
            has_next: false
          })
        });

      case '/v3/finance/transaction/totals':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            totals: [
              {
                type: 'sale',
                amount: 15000.00,
                currency: 'RUB',
                count: 25
              }
            ]
          })
        });

      case '/v1/finance/document-b2b-sales':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            documents: [
              {
                document_id: 'DOC-123456',
                document_type: 'invoice',
                created_at: '2024-01-15T10:00:00Z',
                status: 'ready',
                file_url: 'https://files.ozon.ru/doc123456.pdf'
              }
            ]
          })
        });

      case '/v1/finance/document-b2b-sales/json':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            documents: [
              {
                document_id: 'DOC-789012',
                document_type: 'invoice',
                created_at: '2024-01-15T10:00:00Z',
                data: {
                  invoice_number: 'INV-2024-001',
                  total_amount: 5000.00,
                  currency: 'RUB',
                  items: [
                    { sku: 148313766, quantity: 1, price: 5000.00 }
                  ]
                }
              }
            ]
          })
        });

      case '/v1/finance/mutual-settlement':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            settlements: [
              {
                date: '2024-01-15',
                amount: 5000.00,
                currency: 'RUB',
                type: 'mutual_settlement',
                description: 'Monthly settlement adjustment'
              }
            ]
          })
        });

      case '/v1/finance/realization/by-day':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            days: [
              {
                date: '2024-01-15',
                products_sold: 25,
                products_returned: 2,
                total_revenue: 15000.00,
                total_commission: 2250.00,
                net_amount: 12750.00,
                currency: 'RUB'
              },
              {
                date: '2024-01-16',
                products_sold: 18,
                products_returned: 1,
                total_revenue: 12000.00,
                total_commission: 1800.00,
                net_amount: 10200.00,
                currency: 'RUB'
              }
            ]
          })
        });

      case '/v1/finance/products/buyout':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            buyouts: [
              {
                sku: 123456,
                product_name: 'Test Product 1',
                offer_id: 'OFFER-123',
                date: '2024-01-15',
                quantity: 3,
                buyout_price: 1500.00,
                currency: 'RUB',
                reason: 'Damaged in warehouse'
              }
            ]
          })
        });

      case '/v1/finance/compensation':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            compensations: [
              {
                compensation_id: 'COMP-123456',
                date: '2024-01-15',
                type: 'damaged_goods',
                amount: 1000.00,
                currency: 'RUB',
                description: 'Compensation for damaged goods during delivery',
                posting_number: 'ORDER-789012',
                sku: 123456
              }
            ]
          })
        });

      case '/v1/finance/decompensation':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            decompensations: [
              {
                decompensation_id: 'DECOMP-123456',
                date: '2024-01-15',
                type: 'lost_goods',
                amount: 800.00,
                currency: 'RUB',
                description: 'Charge for lost goods in warehouse',
                posting_number: 'ORDER-789012',
                sku: 123456
              }
            ]
          })
        });

      case '/v1/description-category/tree':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            {
              description_category_id: 17027492,
              category_name: 'Канцелярские товары',
              disabled: false,
              children: [
                {
                  description_category_id: 17029016,
                  category_name: 'Печати и штампы',
                  disabled: false,
                  children: [
                    {
                      type_name: 'Пистолет-маркиратор',
                      type_id: 970778135,
                      disabled: false,
                      children: []
                    }
                  ]
                }
              ]
            }
          ])
        });

      case '/v1/description-category/attribute':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            {
              id: 31,
              attribute_complex_id: 0,
              name: 'Бренд в одежде и обуви',
              description: 'Укажите наименование бренда',
              type: 'string',
              is_collection: false,
              is_required: true,
              is_aspect: false,
              max_value_count: 0,
              group_name: '',
              group_id: 0,
              dictionary_id: 28732849,
              category_dependent: true,
              complex_is_collection: true
            },
            {
              id: 85,
              attribute_complex_id: 0,
              name: 'Размер',
              description: 'Укажите размер товара',
              type: 'string',
              is_collection: false,
              is_required: false,
              is_aspect: true,
              max_value_count: 1,
              group_name: 'Основные',
              group_id: 1,
              dictionary_id: 12345,
              category_dependent: true,
              complex_is_collection: false
            }
          ])
        });

      case '/v1/description-category/attribute/values':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: [
              {
                id: 5055881,
                value: 'Sunshine',
                info: '',
                picture: 'https://cdn1.ozone.ru/s3/multimedia-i/6010930878.jpg'
              },
              {
                id: 5056737,
                value: 'Essence',
                info: 'Красота и здоровье',
                picture: 'https://cdn1.ozone.ru/s3/multimedia-v/6088253599.jpg'
              }
            ],
            has_next: true
          }
        });

      case '/v1/description-category/attribute/values/search':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result([
            {
              id: 5055881,
              value: 'Sunshine Brand',
              info: 'Поиск по слову "Name"'
            },
            {
              id: 5056737,
              value: 'Essential Name',
              info: 'Найдено по запросу'
            }
          ])
        });

      // SupplierAPI mocks
      case '/v2/invoice/create-or-update':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result(true)
        });

      case '/v1/invoice/file/upload':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            url: 'https://cdn.ozone.ru/s3/ozon-disk-api/techdoc/seller-api/earsivfatura_uploaded.pdf'
          }
        });

      case '/v2/invoice/get':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            date: '2023-08-01T12:08:44.342Z',
            file_url: 'https://cdn.ozone.ru/s3/ozon-disk-api/techdoc/seller-api/earsivfatura_1690960445.pdf',
            number: '424fdsf234',
            price: 234.34,
            price_currency: 'RUB',
            hs_codes: [
              { sku: 'SKU123', code: '534758761999' },
              { sku: 'SKU456', code: '534758761000' },
              { sku: 'SKU789', code: '534758761777' }
            ]
          })
        });

      case '/v1/invoice/delete':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result(true)
        });

      // ChatAPI mocks
      case '/v1/chat/send/message':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: 'success'
          }
        });

      case '/v1/chat/send/file':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: 'success'
          }
        });

      case '/v1/chat/start':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({
            chat_id: '5969c331-2e64-44b7-8a0e-ff9526762c62'
          })
        });

      case '/v2/chat/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            chats: [
              {
                chat_id: '5e767w03-b400-4y1b-a841-75319ca8a5c8',
                chat_status: 'Opened',
                chat_type: 'Seller_Support',
                created_at: '2022-07-22T08:07:19.581Z',
                first_unread_message_id: '3000000000118021931',
                last_message_id: '30000000001280042740',
                unread_count: 1
              }
            ],
            total_chats_count: 25,
            total_unread_count: 5
          }
        });

      case '/v3/chat/list':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            chats: [
              {
                chat: {
                  created_at: '2022-07-22T08:07:19.581Z',
                  chat_id: '5e767w03-b400-4y1b-a841-75319ca8a5c8',
                  chat_status: 'Opened',
                  chat_type: 'Seller_Support'
                },
                first_unread_message_id: '3000000000118021931',
                last_message_id: '30000000001280042740',
                unread_count: 1
              }
            ],
            total_unread_count: 5,
            cursor: '30000002342123123',
            has_next: true
          }
        });

      case '/v2/chat/history':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            has_next: true,
            messages: [
              {
                message_id: '3000000000817031942',
                user: {
                  id: '115568',
                  type: 'customer'
                },
                created_at: '2022-07-18T20:58:04.528Z',
                is_read: true,
                data: [
                  'Hello, I have a question about your product "Screen protector", article 11223.'
                ]
              }
            ]
          }
        });

      case '/v3/chat/history':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            has_next: true,
            messages: [
              {
                context: {
                  order_number: '123456789',
                  sku: '987654321'
                },
                created_at: '2019-08-24T14:15:22Z',
                data: [
                  'Hello, I have a question about your product "Screen protector", article 11223.'
                ],
                is_image: false,
                is_read: true,
                message_id: '3000000000817031942',
                moderate_image_status: 'SUCCESS',
                user: {
                  id: '115568',
                  type: 'customer'
                }
              }
            ]
          }
        });

      case '/v2/chat/read':
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            unread_count: 2
          }
        });

      // Default response for unmatched URLs
      default:
        console.warn(`No mock defined for URL: ${url}`);
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: mockData.result({})
        });
    }
  });

  // GET requests
  httpClient.get.mockImplementation((url: string) => {
    if (url === '/') {
      // Health check endpoint
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { status: 'ok' }
      });
    }

    return Promise.resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      data: {}
    });
  });
}

/**
 * Create a fully configured mock environment for OzonClient testing
 */
export function setupOzonClientMock() {
  const httpClient = setupHttpClientMock();
  setupApiMocks(httpClient);
  return httpClient;
}