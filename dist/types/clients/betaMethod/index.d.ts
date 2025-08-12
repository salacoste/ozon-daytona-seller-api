import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { ManageStocksRequest, AnalyticsStocksRequest, AverageDeliveryTimeRequest, AverageDeliveryTimeDetailsRequest, ProductWrongVolumeRequest, AccessRolesRequest, SupplyReturnsReportRequest, SupplierReturnsReportRequest, ManageStocksResponse, AnalyticsStocksResponse, AverageDeliveryTimeResponse, AverageDeliveryTimeDetailsResponse, DeliveryTimeSummaryResponse, ProductWrongVolumeResponse, AccessRolesResponse, SupplyReturnsReportResponse, SupplierReturnsReportResponse, AnalyticsStocksData, ProductWrongVolumeInfo, BetaMethodAnalytics, StockOptimizationSuggestion } from './types';
export declare class BetaMethodAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    manageStocks(params?: ManageStocksRequest): Promise<IHttpResponse<ManageStocksResponse>>;
    getAnalyticsStocks(params?: AnalyticsStocksRequest): Promise<IHttpResponse<AnalyticsStocksResponse>>;
    getAverageDeliveryTime(params: AverageDeliveryTimeRequest): Promise<IHttpResponse<AverageDeliveryTimeResponse>>;
    getAverageDeliveryTimeDetails(params: AverageDeliveryTimeDetailsRequest): Promise<IHttpResponse<AverageDeliveryTimeDetailsResponse>>;
    getDeliveryTimeSummary(): Promise<IHttpResponse<DeliveryTimeSummaryResponse>>;
    getProductsWrongVolume(params?: ProductWrongVolumeRequest): Promise<IHttpResponse<ProductWrongVolumeResponse>>;
    getRolesByToken(params?: AccessRolesRequest): Promise<IHttpResponse<AccessRolesResponse>>;
    getSupplyReturnsReport(params: SupplyReturnsReportRequest): Promise<IHttpResponse<SupplyReturnsReportResponse>>;
    getSupplierReturnsReport(params: SupplierReturnsReportRequest): Promise<IHttpResponse<SupplierReturnsReportResponse>>;
    iterateAnalyticsStocks(params: Omit<AnalyticsStocksRequest, 'last_id'>): AsyncGenerator<AnalyticsStocksData[], void, unknown>;
    iterateProductsWrongVolume(params: Omit<ProductWrongVolumeRequest, 'last_id'>): AsyncGenerator<ProductWrongVolumeInfo[], void, unknown>;
    getBetaMethodAnalytics(): Promise<BetaMethodAnalytics>;
    getStockOptimizationSuggestions(): Promise<StockOptimizationSuggestion[]>;
}
export type * from './types';
