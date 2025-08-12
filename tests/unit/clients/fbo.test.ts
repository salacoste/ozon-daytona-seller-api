/**
 * Unit tests for FBOAPI
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FBOAPI } from '../../../src/clients/fbo/FBOAPI';
import { createMockHttpClient } from '../../mocks';

describe('FBOAPI', () => {
  let fboApi: FBOAPI;
  let mockHttpClient: ReturnType<typeof createMockHttpClient>;

  beforeEach(() => {
    mockHttpClient = createMockHttpClient();
    fboApi = new FBOAPI(mockHttpClient);
  });

  describe('Core Posting Operations (Endpoints 1-3)', () => {
    it('should get FBO orders list', async () => {
      const params = {
        filter: { since: '2024-01-01T00:00:00Z', to: '2024-01-31T23:59:59Z' },
        limit: 100,
        offset: 0,
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            { posting_number: 'FBO-123456', status: 'delivered' },
            { posting_number: 'FBO-789012', status: 'delivering' },
          ],
        },
      });

      const result = await fboApi.list(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result).toHaveLength(2);
    });

    it('should get FBO order details', async () => {
      const params = {
        posting_number: 'FBO-123456',
        with: { analytics_data: true, barcodes: false },
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            posting_number: 'FBO-123456',
            status: 'delivered',
            products: [{ sku: 12345, quantity: 1 }],
          },
        },
      });

      const result = await fboApi.get(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/get', params);
      expect(result.status).toBe(200);
      expect(result.data.result.posting_number).toBe('FBO-123456');
    });

    it('should get FBO cancellation reasons', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: [
            { id: 400, name: 'Out of stock' },
            { id: 401, name: 'Damaged goods' },
          ],
        },
      });

      const result = await fboApi.getCancelReasons();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/posting/fbo/cancel-reason/list', {});
      expect(result.status).toBe(200);
      expect(result.data.result).toHaveLength(2);
    });
  });

  describe('Supply Order Operations (Endpoints 4-7, 13)', () => {
    it('should get supply order status counters', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            awaiting_supply: 5,
            in_processing: 3,
            delivered: 12,
          },
        },
      });

      const result = await fboApi.getSupplyOrderStatusCounters();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/status/counter', {});
      expect(result.status).toBe(200);
      expect(result.data.result.awaiting_supply).toBe(5);
    });

    it('should get supply order bundle composition', async () => {
      const params = { supply_order_id: 123456 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            supply_order_id: 123456,
            products: [{ sku: 12345, quantity: 10, price: '100.00' }],
          },
        },
      });

      const result = await fboApi.getSupplyOrderBundle(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/bundle', params);
      expect(result.status).toBe(200);
      expect(result.data.result.supply_order_id).toBe(123456);
    });

    it('should get supply orders list V2', async () => {
      const params = {
        paging: { page: 1, size: 100 },
        filter: { status: 'awaiting_supply' },
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            supply_orders: [
              { supply_order_id: 123456, status: 'awaiting_supply' },
              { supply_order_id: 789012, status: 'in_processing' },
            ],
            has_next: false,
          },
        },
      });

      const result = await fboApi.getSupplyOrdersList(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/supply-order/list', params);
      expect(result.status).toBe(200);
      expect(result.data.result.supply_orders).toHaveLength(2);
    });

    it('should get supply order details V2', async () => {
      const params = { supply_order_id: 123456 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            supply_order_id: 123456,
            status: 'awaiting_supply',
            warehouse_id: 22204339479000,
            products: [{ sku: 12345, quantity: 10 }],
          },
        },
      });

      const result = await fboApi.getSupplyOrder(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/supply-order/get', params);
      expect(result.status).toBe(200);
      expect(result.data.result.supply_order_id).toBe(123456);
    });

    it('should get available warehouses', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            warehouses: [
              { warehouse_id: 22204339479000, name: 'Moscow Warehouse', capacity: 1000 },
              { warehouse_id: 22204339479001, name: 'SPb Warehouse', capacity: 500 },
            ],
          },
        },
      });

      const result = await fboApi.getAvailableWarehouses();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supplier/available_warehouses', {});
      expect(result.status).toBe(200);
      expect(result.data.result.warehouses).toHaveLength(2);
    });
  });

  describe('Timeslot Operations (Endpoints 8-10)', () => {
    it('should get supply order timeslots', async () => {
      const params = { supply_order_id: 123456 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            timeslots: [
              { timeslot_id: 789, date: '2024-02-01', time_from: '09:00', time_to: '12:00' },
              { timeslot_id: 790, date: '2024-02-01', time_from: '14:00', time_to: '17:00' },
            ],
          },
        },
      });

      const result = await fboApi.getSupplyOrderTimeslots(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/timeslot/get', params);
      expect(result.status).toBe(200);
      expect(result.data.result.timeslots).toHaveLength(2);
    });

    it('should update supply order timeslot', async () => {
      const params = { supply_order_id: 123456, timeslot_id: 789 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: { success: true, updated_timeslot_id: 789 },
        },
      });

      const result = await fboApi.updateSupplyOrderTimeslot(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/timeslot/update', params);
      expect(result.status).toBe(200);
      expect(result.data.result.success).toBe(true);
    });

    it('should get supply order timeslot status', async () => {
      const params = { supply_order_id: 123456 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            supply_order_id: 123456,
            timeslot_status: 'confirmed',
            timeslot_id: 789,
          },
        },
      });

      const result = await fboApi.getSupplyOrderTimeslotStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/timeslot/status', params);
      expect(result.status).toBe(200);
      expect(result.data.result.timeslot_status).toBe('confirmed');
    });
  });

  describe('Pass Operations (Endpoints 11-12)', () => {
    it('should create supply order pass', async () => {
      const params = {
        supply_order_id: 123456,
        driver_name: 'John Doe',
        vehicle_number: 'ABC123',
        phone_number: '+7999123456',
      };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            pass_id: 'pass-789',
            status: 'created',
            qr_code: 'base64-qr-code',
          },
        },
      });

      const result = await fboApi.createSupplyOrderPass(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/pass/create', params);
      expect(result.status).toBe(200);
      expect(result.data.result.pass_id).toBe('pass-789');
    });

    it('should get supply order pass status', async () => {
      const params = { supply_order_id: 123456 };

      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {
          result: {
            supply_order_id: 123456,
            pass_status: 'active',
            pass_id: 'pass-789',
            valid_until: '2024-02-01T17:00:00Z',
          },
        },
      });

      const result = await fboApi.getSupplyOrderPassStatus(params);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/pass/status', params);
      expect(result.status).toBe(200);
      expect(result.data.result.pass_status).toBe('active');
    });
  });

  describe('Pagination Iterators', () => {
    it('should iterate through FBO orders', async () => {
      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: [
              { posting_number: 'FBO-001', status: 'delivered' },
              { posting_number: 'FBO-002', status: 'delivering' },
            ],
          },
        })
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            result: [], // Empty result indicates end
          },
        });

      const pages = [];
      for await (const page of fboApi.iterateOrders({ limit: 2 })) {
        pages.push(page);
        if (pages.length >= 1) break; // Prevent infinite loop in test
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].value.data.result).toHaveLength(2);
      expect(pages[0].pageNumber).toBe(1);
    });

    it('should iterate through supply orders', async () => {
      mockHttpClient.post
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            supply_order_id: ['123456'],
            last_supply_order_id: 123456,
          },
        })
        .mockResolvedValueOnce({
          status: 200,
          statusText: 'OK',
          headers: {},
          data: {
            supply_order_id: ['789012'],
            last_supply_order_id: null, // End of iteration
          },
        });

      const pages = [];
      for await (const page of fboApi.iterateSupplyOrders({ paging: { limit: 1 } })) {
        pages.push(page);
      }

      expect(pages).toHaveLength(2);
      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
      
      // Check the parameters were called correctly
      expect(mockHttpClient.post).toHaveBeenNthCalledWith(1, '/v2/supply-order/list', {
        paging: { limit: 1 }
      });
      expect(mockHttpClient.post).toHaveBeenNthCalledWith(2, '/v2/supply-order/list', {
        paging: { limit: 1, from_supply_order_id: 123456 }
      });
    });

    it('should handle pagination iterator configuration', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { 
          result: {
            supply_orders: [],
            has_next: false
          } 
        },
      });

      const pages = [];
      const config = { maxPages: 1, delayBetweenPages: 50 };
      
      for await (const page of fboApi.iterateSupplyOrders({ paging: { size: 10 } }, config)) {
        pages.push(page);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].totalFetched).toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        data: { code: 3, message: 'Invalid supply_order_id', details: [] },
      });

      const result = await fboApi.getSupplyOrder({ supply_order_id: -1 });

      expect(result.status).toBe(400);
      expect(result.data.message).toBe('Invalid supply_order_id');
    });

    it('should handle network errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(fboApi.list({ filter: { since: '', to: '' } })).rejects.toThrow('Connection timeout');
    });

    it('should handle pagination errors', async () => {
      mockHttpClient.post.mockRejectedValueOnce(new Error('Server error'));

      const iterator = fboApi.iterateOrders({ limit: 100 });

      await expect(iterator.next()).rejects.toThrow('Server error');
    });
  });

  describe('Method Delegation', () => {
    it('should properly delegate core methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: [] },
      });

      await fboApi.list({ filter: { since: '2024-01-01', to: '2024-01-31' } });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/posting/fbo/list', {
        filter: { since: '2024-01-01', to: '2024-01-31' },
      });
    });

    it('should properly delegate supply order methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { supply_orders: [], has_next: false } },
      });

      await fboApi.getSupplyOrdersList({ paging: { page: 1, size: 10 } });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v2/supply-order/list', {
        paging: { page: 1, size: 10 },
      });
    });

    it('should properly delegate timeslot methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { timeslots: [] } },
      });

      await fboApi.getSupplyOrderTimeslots({ supply_order_id: 123 });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/timeslot/get', {
        supply_order_id: 123,
      });
    });

    it('should properly delegate pass methods', async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { result: { pass_status: 'created' } },
      });

      await fboApi.getSupplyOrderPassStatus({ supply_order_id: 123 });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/v1/supply-order/pass/status', {
        supply_order_id: 123,
      });
    });
  });
});