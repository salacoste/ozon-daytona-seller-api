/**
 * FboSupplyRequest API client
 * 
 * Main client for FBO supply request operations with delegation pattern.
 * Splits 19 endpoints across logical operation groups.
 */

import type { HttpClient } from '../../http/HttpClient';
import { FboSupplyRequestDrafts } from './drafts';
import { FboSupplyRequestSupply } from './supply';
import { FboSupplyRequestCargoes } from './cargoes';
import { FboSupplyRequestOrders } from './orders';

// Re-export types for convenience
export type {
  // Draft Operations
  IV1ClusterType,
  IV1DraftClusterListRequest,
  IV1DraftClusterListResponse,
  IV1CreateType,
  IV1DraftGetWarehouseFboListRequest,
  IV1DraftGetWarehouseFboListResponse,
  IV1DraftCreateRequest,
  IV1DraftCreateResponse,
  IV1DraftCreateInfoRequest,
  IV1DraftCreateInfoResponse,
  IV1DraftTimeslotInfoRequest,
  IV1DraftTimeslotInfoResponse,
  
  // Supply Operations
  IV1DraftSupplyCreateRequest,
  IV1DraftSupplyCreateResponse,
  IV1DraftSupplyCreateStatusRequest,
  IV1DraftSupplyCreateStatusResponse,
  
  // Cargoes Operations
  IV1CargoesCreateRequest,
  IV1CargoesCreateResponse,
  IV1CargoesCreateInfoRequest,
  IV1CargoesCreateInfoResponse,
  IV1CargoesDeleteRequest,
  IV1CargoesDeleteResponse,
  IV1CargoesDeleteStatusRequest,
  IV1CargoesDeleteStatusResponse,
  IV1CargoesRulesGetRequest,
  IV1CargoesRulesGetResponse,
  IV1CargoesLabelCreateRequest,
  IV1CargoesLabelCreateResponse,
  IV1CargoesLabelGetRequest,
  IV1CargoesLabelGetResponse,
  
  // Supply Order Operations
  IV1SupplyOrderCancelRequest,
  IV1SupplyOrderCancelResponse,
  IV1SupplyOrderCancelStatusRequest,
  IV1SupplyOrderCancelStatusResponse,
  IV1SupplyOrderContentUpdateRequest,
  IV1SupplyOrderContentUpdateResponse,
  IV1SupplyOrderContentUpdateStatusRequest,
  IV1SupplyOrderContentUpdateStatusResponse,
} from '../../types/generated/fbosupplyrequest';

/**
 * FBO Supply Request API client with modular architecture
 */
export class FboSupplyRequestAPI {
  private drafts: FboSupplyRequestDrafts;
  private supply: FboSupplyRequestSupply;
  private cargoes: FboSupplyRequestCargoes;
  private orders: FboSupplyRequestOrders;

  constructor(httpClient: HttpClient) {
    this.drafts = new FboSupplyRequestDrafts(httpClient);
    this.supply = new FboSupplyRequestSupply(httpClient);
    this.cargoes = new FboSupplyRequestCargoes(httpClient);
    this.orders = new FboSupplyRequestOrders(httpClient);
  }

  // Draft Operations (5 endpoints)
  
  /** @see FboSupplyRequestDrafts.getClusterList */
  async getClusterList(params: Parameters<FboSupplyRequestDrafts['getClusterList']>[0]) {
    return this.drafts.getClusterList(params);
  }

  /** @see FboSupplyRequestDrafts.getWarehouseFboList */
  async getWarehouseFboList(params: Parameters<FboSupplyRequestDrafts['getWarehouseFboList']>[0]) {
    return this.drafts.getWarehouseFboList(params);
  }

  /** @see FboSupplyRequestDrafts.createDraft */
  async createDraft(params: Parameters<FboSupplyRequestDrafts['createDraft']>[0]) {
    return this.drafts.createDraft(params);
  }

  /** @see FboSupplyRequestDrafts.getDraftCreateInfo */
  async getDraftCreateInfo(params: Parameters<FboSupplyRequestDrafts['getDraftCreateInfo']>[0]) {
    return this.drafts.getDraftCreateInfo(params);
  }

  /** @see FboSupplyRequestDrafts.getDraftTimeslotInfo */
  async getDraftTimeslotInfo(params: Parameters<FboSupplyRequestDrafts['getDraftTimeslotInfo']>[0]) {
    return this.drafts.getDraftTimeslotInfo(params);
  }

  // Supply Operations (2 endpoints)

  /** @see FboSupplyRequestSupply.createSupply */
  async createSupply(params: Parameters<FboSupplyRequestSupply['createSupply']>[0]) {
    return this.supply.createSupply(params);
  }

  /** @see FboSupplyRequestSupply.getSupplyCreateStatus */
  async getSupplyCreateStatus(params: Parameters<FboSupplyRequestSupply['getSupplyCreateStatus']>[0]) {
    return this.supply.getSupplyCreateStatus(params);
  }

  // Cargoes Operations (8 endpoints)

  /** @see FboSupplyRequestCargoes.createCargoes */
  async createCargoes(params: Parameters<FboSupplyRequestCargoes['createCargoes']>[0]) {
    return this.cargoes.createCargoes(params);
  }

  /** @see FboSupplyRequestCargoes.getCargoesCreateInfo */
  async getCargoesCreateInfo(params: Parameters<FboSupplyRequestCargoes['getCargoesCreateInfo']>[0]) {
    return this.cargoes.getCargoesCreateInfo(params);
  }

  /** @see FboSupplyRequestCargoes.deleteCargoes */
  async deleteCargoes(params: Parameters<FboSupplyRequestCargoes['deleteCargoes']>[0]) {
    return this.cargoes.deleteCargoes(params);
  }

  /** @see FboSupplyRequestCargoes.getCargoesDeleteStatus */
  async getCargoesDeleteStatus(params: Parameters<FboSupplyRequestCargoes['getCargoesDeleteStatus']>[0]) {
    return this.cargoes.getCargoesDeleteStatus(params);
  }

  /** @see FboSupplyRequestCargoes.getCargoesRules */
  async getCargoesRules(params: Parameters<FboSupplyRequestCargoes['getCargoesRules']>[0]) {
    return this.cargoes.getCargoesRules(params);
  }

  /** @see FboSupplyRequestCargoes.createCargoesLabel */
  async createCargoesLabel(params: Parameters<FboSupplyRequestCargoes['createCargoesLabel']>[0]) {
    return this.cargoes.createCargoesLabel(params);
  }

  /** @see FboSupplyRequestCargoes.getCargoesLabel */
  async getCargoesLabel(params: Parameters<FboSupplyRequestCargoes['getCargoesLabel']>[0]) {
    return this.cargoes.getCargoesLabel(params);
  }

  /** @see FboSupplyRequestCargoes.getCargoesLabelFile */
  async getCargoesLabelFile(file_guid: string) {
    return this.cargoes.getCargoesLabelFile(file_guid);
  }

  // Supply Order Operations (4 endpoints)

  /** @see FboSupplyRequestOrders.cancelSupplyOrder */
  async cancelSupplyOrder(params: Parameters<FboSupplyRequestOrders['cancelSupplyOrder']>[0]) {
    return this.orders.cancelSupplyOrder(params);
  }

  /** @see FboSupplyRequestOrders.getSupplyOrderCancelStatus */
  async getSupplyOrderCancelStatus(params: Parameters<FboSupplyRequestOrders['getSupplyOrderCancelStatus']>[0]) {
    return this.orders.getSupplyOrderCancelStatus(params);
  }

  /** @see FboSupplyRequestOrders.updateSupplyOrderContent */
  async updateSupplyOrderContent(params: Parameters<FboSupplyRequestOrders['updateSupplyOrderContent']>[0]) {
    return this.orders.updateSupplyOrderContent(params);
  }

  /** @see FboSupplyRequestOrders.getSupplyOrderContentUpdateStatus */
  async getSupplyOrderContentUpdateStatus(params: Parameters<FboSupplyRequestOrders['getSupplyOrderContentUpdateStatus']>[0]) {
    return this.orders.getSupplyOrderContentUpdateStatus(params);
  }
}