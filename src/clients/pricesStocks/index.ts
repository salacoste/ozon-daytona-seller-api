/**
 * PricesStocksAPI exports
 * 
 * Re-exports the main PricesStocksAPI class and all related types
 */

export { PricesStocksAPI } from './PricesStocksAPI';
export type {
  // Stock Operations
  IProductv2ProductsStocksRequest,
  IProductv2ProductsStocksResponse,
  IV4GetProductInfoStocksRequest,
  IV4GetProductInfoStocksResponse,
  IProductsv1GetProductInfoStocksByWarehouseFbsRequest,
  IProductsv1GetProductInfoStocksByWarehouseFbsResponse,
  // Price Operations
  IProductImportProductsPricesRequest,
  IProductImportProductsPricesResponse,
  IProductv5GetProductInfoPricesV5Request,
  IProductv5GetProductInfoPricesV5Response,
  // Special Operations
  IV1ProductActionTimerUpdateRequest,
  IV1ProductActionTimerUpdateResponse,
  IV1ProductActionTimerStatusRequest,
  IV1ProductActionTimerStatusResponse,
  IV1GetProductInfoDiscountedRequest,
  IV1GetProductInfoDiscountedResponse,
  IV1ProductUpdateDiscountRequest,
  IV1ProductUpdateDiscountResponse,
} from './PricesStocksAPI';