/**
 * FboSupplyRequest API client module
 * 
 * Exports the main FboSupplyRequestAPI client and related types.
 */

export { FboSupplyRequestAPI } from './FboSupplyRequestAPI';
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
} from './FboSupplyRequestAPI';