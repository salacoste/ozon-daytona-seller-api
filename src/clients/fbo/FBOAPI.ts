/**
 * FBOAPI client for Ozon Seller API
 * 
 * Handles Fulfillment by Ozon (FBO) operations:
 * - Order management and processing  
 * - Supply order management
 * - Timeslot and warehouse operations
 */

import type { HttpClient } from '../../http/HttpClient';
import { FBOCore } from './core';
import { FBOSupplyOrders } from './supplyOrders';
import { FBOTimeslots } from './timeslots';
import { FBOPasses } from './passes';

// Re-export types for convenience
export type {
  IPostingGetFboPostingListRequest,
  IV2FboPostingListResponse,
  IPostingGetFboPostingRequest,
  IV2FboPostingResponse,
  IV1CancelReasonListResponse,
  IV1SupplyOrderStatusCounterResponse,
  IV1GetSupplyOrderBundleRequest,
  IV1GetSupplyOrderBundleResponse,
  IV2GetSupplyOrdersListRequest,
  IV2GetSupplyOrdersListResponse,
  IV2GetSupplyOrdersRequest,
  IV2GetSupplyOrdersResponse,
  IV1GetSupplyOrderTimeslotsRequest,
  IV1GetSupplyOrderTimeslotsResponse,
  IV1UpdateSupplyOrderTimeslotRequest,
  IV1UpdateSupplyOrderTimeslotResponse,
  IV1GetSupplyOrderTimeslotStatusRequest,
  IV1GetSupplyOrderTimeslotStatusResponse,
  IV1SupplyOrderPassCreateRequest,
  IV1SupplyOrderPassCreateResponse,
  IV1SupplyOrderPassStatusRequest,
  IV1SupplyOrderPassStatusResponse,
  IV1SupplierAvailableWarehousesResponse,
} from '../../types/generated/fbo';

/**
 * FBOAPI client
 */
export class FBOAPI {
  private core: FBOCore;
  private supplyOrders: FBOSupplyOrders;
  private timeslots: FBOTimeslots;
  private passes: FBOPasses;

  constructor(private readonly httpClient: HttpClient) {
    this.core = new FBOCore(httpClient);
    this.supplyOrders = new FBOSupplyOrders(httpClient);
    this.timeslots = new FBOTimeslots(httpClient);
    this.passes = new FBOPasses(httpClient);
  }

  // ======= CORE POSTING OPERATIONS (1-3) =======

  /** @see FBOCore.list */
  async getPostingListV2(params: Parameters<FBOCore['list']>[0]) {
    return this.core.list(params);
  }

  /** @see FBOCore.get */
  async getPostingV2(params: Parameters<FBOCore['get']>[0]) {
    return this.core.get(params);
  }

  /** @see FBOCore.getCancelReasons */
  async getPostingCancelReasonListV1() {
    return this.core.getCancelReasons();
  }

  // ======= SUPPLY ORDER OPERATIONS (4-5) =======

  /** @see FBOSupplyOrders.getStatusCounters */
  async getSupplyOrderStatusCounterV1() {
    return this.supplyOrders.getStatusCounters();
  }

  /** @see FBOSupplyOrders.getBundle */
  async getSupplyOrderBundleV1(params: Parameters<FBOSupplyOrders['getBundle']>[0]) {
    return this.supplyOrders.getBundle(params);
  }

  // ======= BACKWARD COMPATIBILITY =======

  /** @deprecated Use getPostingListV2 instead */
  async list(params: Parameters<FBOCore['list']>[0]) {
    return this.getPostingListV2(params);
  }

  /** @deprecated Use getPostingV2 instead */
  async get(params: Parameters<FBOCore['get']>[0]) {
    return this.getPostingV2(params);
  }

  /** @deprecated Use getPostingCancelReasonListV1 instead */
  async getCancelReasons() {
    return this.getPostingCancelReasonListV1();
  }

  /** @deprecated Use getSupplyOrderStatusCounterV1 instead */
  async getSupplyOrderStatusCounters() {
    return this.getSupplyOrderStatusCounterV1();
  }

  /** @deprecated Use getSupplyOrderBundleV1 instead */
  async getSupplyOrderBundle(params: Parameters<FBOSupplyOrders['getBundle']>[0]) {
    return this.getSupplyOrderBundleV1(params);
  }

  // ======= ADDITIONAL SUPPLY ORDER OPERATIONS (11-13) =======

  /** @see FBOSupplyOrders.getList */
  async getSupplyOrdersListV2(params: Parameters<FBOSupplyOrders['getList']>[0]) {
    return this.supplyOrders.getList(params);
  }

  /** @see FBOSupplyOrders.get */
  async getSupplyOrdersV2(params: Parameters<FBOSupplyOrders['get']>[0]) {
    return this.supplyOrders.get(params);
  }

  /** @see FBOSupplyOrders.getAvailableWarehouses */
  async getSupplierAvailableWarehousesV1() {
    return this.supplyOrders.getAvailableWarehouses();
  }

  /** @deprecated Use getSupplyOrdersListV2 instead */
  async getSupplyOrdersList(params: Parameters<FBOSupplyOrders['getList']>[0]) {
    return this.getSupplyOrdersListV2(params);
  }

  /** @deprecated Use getSupplyOrdersV2 instead */
  async getSupplyOrder(params: Parameters<FBOSupplyOrders['get']>[0]) {
    return this.getSupplyOrdersV2(params);
  }

  /** @deprecated Use getSupplierAvailableWarehousesV1 instead */
  async getAvailableWarehouses() {
    return this.getSupplierAvailableWarehousesV1();
  }

  // ======= TIMESLOT OPERATIONS (6-8) =======

  /** @see FBOTimeslots.get */
  async getSupplyOrderTimeslotsV1(params: Parameters<FBOTimeslots['get']>[0]) {
    return this.timeslots.get(params);
  }

  /** @see FBOTimeslots.update */
  async updateSupplyOrderTimeslotV1(params: Parameters<FBOTimeslots['update']>[0]) {
    return this.timeslots.update(params);
  }

  /** @see FBOTimeslots.getStatus */
  async getSupplyOrderTimeslotStatusV1(params: Parameters<FBOTimeslots['getStatus']>[0]) {
    return this.timeslots.getStatus(params);
  }

  // ======= PASS OPERATIONS (9-10) =======

  /** @see FBOPasses.create */
  async supplyOrderPassCreateV1(params: Parameters<FBOPasses['create']>[0]) {
    return this.passes.create(params);
  }

  /** @see FBOPasses.getStatus */
  async getSupplyOrderPassStatusV1(params: Parameters<FBOPasses['getStatus']>[0]) {
    return this.passes.getStatus(params);
  }

  // ======= BACKWARD COMPATIBILITY - PART 2 =======

  /** @deprecated Use getSupplyOrderTimeslotsV1 instead */
  async getSupplyOrderTimeslots(params: Parameters<FBOTimeslots['get']>[0]) {
    return this.getSupplyOrderTimeslotsV1(params);
  }

  /** @deprecated Use updateSupplyOrderTimeslotV1 instead */
  async updateSupplyOrderTimeslot(params: Parameters<FBOTimeslots['update']>[0]) {
    return this.updateSupplyOrderTimeslotV1(params);
  }

  /** @deprecated Use getSupplyOrderTimeslotStatusV1 instead */
  async getSupplyOrderTimeslotStatus(params: Parameters<FBOTimeslots['getStatus']>[0]) {
    return this.getSupplyOrderTimeslotStatusV1(params);
  }

  /** @deprecated Use supplyOrderPassCreateV1 instead */
  async createSupplyOrderPass(params: Parameters<FBOPasses['create']>[0]) {
    return this.supplyOrderPassCreateV1(params);
  }

  /** @deprecated Use getSupplyOrderPassStatusV1 instead */
  async getSupplyOrderPassStatus(params: Parameters<FBOPasses['getStatus']>[0]) {
    return this.getSupplyOrderPassStatusV1(params);
  }

  // ======= PAGINATION ITERATORS =======

  /** @see FBOCore.iterateOrders */
  iteratePostingListV2(
    params?: Parameters<FBOCore['iterateOrders']>[0],
    config?: Parameters<FBOCore['iterateOrders']>[1]
  ) {
    return this.core.iterateOrders(params, config);
  }

  /** @see FBOSupplyOrders.iterateBundle - for supply order bundle with last_id */
  iterateSupplyOrderBundleV1(
    params: Parameters<FBOSupplyOrders['getBundle']>[0],
    config?: { maxPages?: number; delayBetweenPages?: number }
  ) {
    return this.supplyOrders.iterateBundle(params, config);
  }

  /** @see FBOSupplyOrders.iterateSupplyOrders - for supply order list with last_supply_order_id */
  iterateSupplyOrdersListV2(
    params?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[0],
    config?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[1]
  ) {
    return this.supplyOrders.iterateSupplyOrders(params, config);
  }

  /** @deprecated Use iterateSupplyOrdersListV2 instead */
  iterateSupplyOrders(
    params?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[0],
    config?: Parameters<FBOSupplyOrders['iterateSupplyOrders']>[1]
  ) {
    return this.iterateSupplyOrdersListV2(params, config);
  }

  /** @deprecated Use iteratePostingListV2 instead */
  iterateOrders(
    params?: Parameters<FBOCore['iterateOrders']>[0],
    config?: Parameters<FBOCore['iterateOrders']>[1]
  ) {
    return this.iteratePostingListV2(params, config);
  }
}