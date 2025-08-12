export interface ManageStocksData {
    product_id: number;
    offer_id: string;
    stocks: StockInfo[];
}
export interface StockInfo {
    warehouse_id: number;
    reserved: number;
    present: number;
}
export interface AnalyticsStocksData {
    product_id: number;
    offer_id: string;
    sku: number;
    present: number;
    reserved: number;
    warehouse_name: string;
    warehouse_id: number;
}
export interface DeliveryTimeData {
    warehouse_id: number;
    warehouse_name: string;
    average_delivery_time: number;
    delivery_range: {
        min_days: number;
        max_days: number;
    };
}
export interface DeliveryTimeDetails {
    region_name: string;
    delivery_time_hours: number;
    delivery_time_days: number;
    orders_count: number;
}
export interface ProductWrongVolumeInfo {
    product_id: number;
    offer_id: string;
    sku: number;
    name: string;
    current_volume: number;
    suggested_volume: number;
    volume_difference_percent: number;
}
export interface AccessRole {
    role_id: string;
    role_name: string;
    permissions: string[];
    is_active: boolean;
}
export interface SupplyReturnsData {
    supply_id: string;
    total_items: number;
    returned_items: number;
    return_rate: number;
    reasons: ReturnReason[];
}
export interface SupplierReturnsData {
    supplier_id: number;
    supplier_name: string;
    total_supplies: number;
    total_returns: number;
    return_rate: number;
    top_return_reasons: ReturnReason[];
}
export interface ReturnReason {
    reason_code: string;
    reason_name: string;
    count: number;
    percentage: number;
}
export type ReportPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type VolumeStatus = 'correct' | 'too_small' | 'too_large' | 'needs_review';
export interface ManageStocksRequest {
    date?: string;
    warehouse_id?: number[];
    sku?: number[];
    offer_id?: string[];
    visibility?: string;
}
export interface AnalyticsStocksRequest {
    date?: string;
    warehouse_id?: number[];
    sku?: number[];
    offer_id?: string[];
    limit?: number;
    last_id?: string;
}
export interface AverageDeliveryTimeRequest {
    date_from: string;
    date_to: string;
    warehouse_id?: number[];
}
export interface AverageDeliveryTimeDetailsRequest {
    date_from: string;
    date_to: string;
    warehouse_id?: number[];
    region_id?: number[];
}
export interface ProductWrongVolumeRequest {
    limit?: number;
    last_id?: string;
    offer_id?: string[];
}
export interface AccessRolesRequest {
    token?: string;
}
export interface SupplyReturnsReportRequest {
    date_from: string;
    date_to: string;
    supply_id?: string[];
}
export interface SupplierReturnsReportRequest {
    date_from: string;
    date_to: string;
    supplier_id?: number[];
}
export interface ManageStocksResponse {
    result: ManageStocksData[];
}
export interface AnalyticsStocksResponse {
    result: AnalyticsStocksData[];
    last_id?: string;
    has_next: boolean;
}
export interface AverageDeliveryTimeResponse {
    result: DeliveryTimeData[];
}
export interface AverageDeliveryTimeDetailsResponse {
    result: DeliveryTimeDetails[];
}
export interface DeliveryTimeSummaryResponse {
    overall_average_hours: number;
    overall_average_days: number;
    total_deliveries: number;
    by_warehouse: DeliveryTimeData[];
}
export interface ProductWrongVolumeResponse {
    result: ProductWrongVolumeInfo[];
    last_id?: string;
    has_next: boolean;
}
export interface AccessRolesResponse {
    roles: AccessRole[];
}
export interface SupplyReturnsReportResponse {
    result: SupplyReturnsData[];
    summary: {
        total_supplies: number;
        total_returns: number;
        overall_return_rate: number;
    };
}
export interface SupplierReturnsReportResponse {
    result: SupplierReturnsData[];
    summary: {
        total_suppliers: number;
        average_return_rate: number;
        top_performing_suppliers: SupplierReturnsData[];
    };
}
export interface BetaMethodAnalytics {
    stocks_analytics: {
        total_products: number;
        total_warehouses: number;
        low_stock_products: number;
        overstocked_products: number;
    };
    delivery_performance: {
        average_delivery_days: number;
        fastest_warehouse: string;
        slowest_warehouse: string;
        delivery_improvement_trend: number;
    };
    volume_issues: {
        products_with_wrong_volume: number;
        volume_accuracy_rate: number;
        most_common_issue: VolumeStatus;
    };
    returns_analysis: {
        overall_return_rate: number;
        top_return_reason: string;
        supplies_with_returns: number;
        suppliers_needing_attention: number;
    };
}
export interface StockOptimizationSuggestion {
    product_id: number;
    offer_id: string;
    current_stock: number;
    suggested_stock: number;
    reason: string;
    priority: 'high' | 'medium' | 'low';
    potential_savings: number;
}
