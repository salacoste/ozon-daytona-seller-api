/**
 * FBO Supply Orders operations - endpoints (4-7, 13)
 * 
 * Handles supply order management:
 * - Status counters and bundle composition
 * - Supply order listing and details
 * - Warehouse availability
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  IV1SupplyOrderStatusCounterResponse,
  IV1GetSupplyOrderBundleRequest,
  IV1GetSupplyOrderBundleResponse,
  IV2GetSupplyOrdersListRequest,
  IV2GetSupplyOrdersListResponse,
  IV2GetSupplyOrdersRequest,
  IV2GetSupplyOrdersResponse,
  IV1SupplierAvailableWarehousesResponse,
} from '../../types/generated/fbo';

/**
 * FBO Supply Orders operations class
 */
export class FBOSupplyOrders {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get supply order status counters (endpoint 4)
   * @example const counters = await client.fbo.getSupplyOrderStatusCounters();
   */
  async getStatusCounters(): Promise<IHttpResponse<IV1SupplyOrderStatusCounterResponse>> {
    return this.httpClient.post('/v1/supply-order/status/counter', {});
  }

  /**
   * Get supply order bundle composition (endpoint 5)
   * @param params - Request parameters
   * @example const bundle = await client.fbo.getSupplyOrderBundle({ supply_order_id: 123456 });
   */
  async getBundle(
    params: IV1GetSupplyOrderBundleRequest
  ): Promise<IHttpResponse<IV1GetSupplyOrderBundleResponse>> {
    return this.httpClient.post('/v1/supply-order/bundle', params);
  }

  /**
   * Get supply orders list V2 (endpoint 6)
   * @param params - Query parameters
   * @example const orders = await client.fbo.getSupplyOrdersList({ paging: { page: 1, size: 100 } });
   */
  async getList(
    params: IV2GetSupplyOrdersListRequest
  ): Promise<IHttpResponse<IV2GetSupplyOrdersListResponse>> {
    return this.httpClient.post('/v2/supply-order/list', params);
  }

  /**
   * Get supply order details V2 (endpoint 7)
   * @param params - Request parameters
   * @example const order = await client.fbo.getSupplyOrder({ supply_order_id: 123456 });
   */
  async get(
    params: IV2GetSupplyOrdersRequest
  ): Promise<IHttpResponse<IV2GetSupplyOrdersResponse>> {
    return this.httpClient.post('/v2/supply-order/get', params);
  }

  /**
   * Get available warehouses with capacity info (endpoint 13)
   * @example const warehouses = await client.fbo.getAvailableWarehouses();
   */
  async getAvailableWarehouses(): Promise<IHttpResponse<IV1SupplierAvailableWarehousesResponse>> {
    return this.httpClient.post('/v1/supplier/available_warehouses', {});
  }

  /**
   * Iterate through supply order bundle with last_id pagination (endpoint 5)
   * @param params - Request parameters
   * @param config - Pagination configuration
   * @example for await (const page of client.fbo.iterateSupplyOrderBundleV1({ bundle_ids: ['123456'], limit: 100 })) { ... }
   */
  async *iterateBundle(
    params: IV1GetSupplyOrderBundleRequest,
    config: { maxPages?: number; delayBetweenPages?: number } = {}
  ) {
    const { maxPages = 100, delayBetweenPages = 0 } = config;
    let pageNumber = 1;
    let lastId: string | undefined;

    // Ensure required parameters have defaults
    const baseParams = {
      ...params
    };

    while (pageNumber <= maxPages) {
      const pageParams: IV1GetSupplyOrderBundleRequest = { 
        ...baseParams, 
        ...(lastId ? { last_id: lastId } : {})
      };
      const response = await this.getBundle(pageParams);
      
      yield {
        value: response,
        pageNumber,
        totalFetched: pageNumber,
        done: false,
      };

      // Check if we should continue based on has_next flag
      if (!response.data.has_next) {
        break;
      }

      // Use the last_id from response for next iteration
      lastId = response.data.last_id;
      if (!lastId) {
        break;
      }

      pageNumber++;

      if (delayBetweenPages > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
      }
    }
  }

  /**
   * Iterate through supply orders with automatic pagination
   * @param params - Query parameters
   * @param config - Pagination configuration
   * @example for await (const page of client.fbo.iterateSupplyOrders({ paging: { limit: 100 } })) { ... }
   */
  async *iterateSupplyOrders(
    params: Partial<IV2GetSupplyOrdersListRequest> = {},
    config: { maxPages?: number; delayBetweenPages?: number } = {}
  ) {
    const { maxPages = 100, delayBetweenPages = 0 } = config;
    let pageNumber = 1;
    let fromSupplyOrderId = params.paging?.from_supply_order_id;
    const limit = params.paging?.limit || 100;

    // Ensure required parameters have defaults
    const baseParams = {
      paging: { limit },
      ...params
    };

    while (pageNumber <= maxPages) {
      const pageParams: IV2GetSupplyOrdersListRequest = { 
        ...baseParams, 
        paging: { 
          ...baseParams.paging, 
          ...(fromSupplyOrderId ? { from_supply_order_id: fromSupplyOrderId } : {})
        }
      };
      const response = await this.getList(pageParams);
      
      yield {
        value: response,
        pageNumber,
        totalFetched: pageNumber,
        done: false,
      };

      // Check if we should continue - if no supply_order_id array, we're done
      if (!response.data.supply_order_id?.length) {
        break;
      }

      // Use the last_supply_order_id for next iteration
      fromSupplyOrderId = response.data.last_supply_order_id;
      if (!fromSupplyOrderId) {
        break;
      }

      pageNumber++;

      if (delayBetweenPages > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
      }
    }
  }
}