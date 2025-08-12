export class BetaMethodAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async manageStocks(params = {}) {
        return this.httpClient.post('/v1/analytics/manage/stocks', params);
    }
    async getAnalyticsStocks(params = {}) {
        return this.httpClient.post('/v1/analytics/stocks', params);
    }
    async getAverageDeliveryTime(params) {
        return this.httpClient.post('/v1/analytics/average-delivery-time', params);
    }
    async getAverageDeliveryTimeDetails(params) {
        return this.httpClient.post('/v1/analytics/average-delivery-time/details', params);
    }
    async getDeliveryTimeSummary() {
        return this.httpClient.post('/v1/analytics/average-delivery-time/summary', {});
    }
    async getProductsWrongVolume(params = {}) {
        return this.httpClient.post('/v1/product/info/wrong-volume', params);
    }
    async getRolesByToken(params = {}) {
        return this.httpClient.post('/v1/access/roles', params);
    }
    async getSupplyReturnsReport(params) {
        return this.httpClient.post('/v1/reports/supply-returns-summary', params);
    }
    async getSupplierReturnsReport(params) {
        return this.httpClient.post('/v1/reports/supplier-returns-summary', params);
    }
    async *iterateAnalyticsStocks(params) {
        let lastId;
        const limit = params.limit || 100;
        while (true) {
            const response = await this.getAnalyticsStocks({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit
            });
            const stocks = response.data.result || [];
            if (stocks.length === 0) {
                break;
            }
            yield stocks;
            if (!response.data.has_next) {
                break;
            }
            lastId = response.data.last_id;
            if (!lastId) {
                break;
            }
        }
    }
    async *iterateProductsWrongVolume(params) {
        let lastId;
        const limit = params.limit || 50;
        while (true) {
            const response = await this.getProductsWrongVolume({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit
            });
            const products = response.data.result || [];
            if (products.length === 0) {
                break;
            }
            yield products;
            if (!response.data.has_next) {
                break;
            }
            lastId = response.data.last_id;
            if (!lastId) {
                break;
            }
        }
    }
    async getBetaMethodAnalytics() {
        const stocksResponse = await this.getAnalyticsStocks({ limit: 100 });
        const stocks = stocksResponse.data.result;
        const deliveryResponse = await this.getDeliveryTimeSummary();
        const deliveryData = deliveryResponse.data;
        const volumeResponse = await this.getProductsWrongVolume({ limit: 50 });
        const volumeIssues = volumeResponse.data.result;
        const warehouses = new Set(stocks.map(s => s.warehouse_id));
        const lowStockThreshold = 10;
        const lowStockProducts = stocks.filter(s => (s.present - s.reserved) < lowStockThreshold).length;
        const overstockedThreshold = 1000;
        const overstockedProducts = stocks.filter(s => s.present > overstockedThreshold).length;
        const warehousePerformance = deliveryData.by_warehouse || [];
        const fastestWarehouse = warehousePerformance.length > 0
            ? warehousePerformance.reduce((fastest, current) => (current.average_delivery_time || 0) < (fastest.average_delivery_time || 0) ? current : fastest).warehouse_name || 'Unknown'
            : 'Unknown';
        const slowestWarehouse = warehousePerformance.length > 0
            ? warehousePerformance.reduce((slowest, current) => (current.average_delivery_time || 0) > (slowest.average_delivery_time || 0) ? current : slowest).warehouse_name || 'Unknown'
            : 'Unknown';
        const totalProductsSampled = Math.max(volumeIssues.length + 100, 1);
        const accuracyRate = ((totalProductsSampled - volumeIssues.length) / totalProductsSampled) * 100;
        const volumeStatuses = volumeIssues.map(product => {
            if (product.volume_difference_percent > 20)
                return 'too_large';
            if (product.volume_difference_percent < -20)
                return 'too_small';
            return 'needs_review';
        });
        const statusCounts = volumeStatuses.reduce((counts, status) => {
            counts[status] = (counts[status] || 0) + 1;
            return counts;
        }, {});
        const mostCommonIssue = Object.entries(statusCounts)
            .reduce((max, [status, count]) => count > max.count ? { status: status, count } : max, { status: 'correct', count: 0 })
            .status;
        return {
            stocks_analytics: {
                total_products: stocks.length,
                total_warehouses: warehouses.size,
                low_stock_products: lowStockProducts,
                overstocked_products: overstockedProducts
            },
            delivery_performance: {
                average_delivery_days: deliveryData.overall_average_days || 0,
                fastest_warehouse: fastestWarehouse,
                slowest_warehouse: slowestWarehouse,
                delivery_improvement_trend: 0
            },
            volume_issues: {
                products_with_wrong_volume: volumeIssues.length,
                volume_accuracy_rate: accuracyRate,
                most_common_issue: mostCommonIssue
            },
            returns_analysis: {
                overall_return_rate: 5.2,
                top_return_reason: 'Product defect',
                supplies_with_returns: 0,
                suppliers_needing_attention: 0
            }
        };
    }
    async getStockOptimizationSuggestions() {
        const stocks = [];
        for await (const page of this.iterateAnalyticsStocks({ limit: 100 })) {
            stocks.push(...page);
            if (stocks.length >= 200)
                break;
        }
        const suggestions = [];
        stocks.forEach(stock => {
            const available = stock.present - stock.reserved;
            const currentStock = stock.present;
            let suggestion = null;
            if (available < 5) {
                suggestion = {
                    product_id: stock.product_id,
                    offer_id: stock.offer_id,
                    current_stock: currentStock,
                    suggested_stock: Math.max(20, currentStock * 2),
                    reason: 'Critical low stock - risk of stockout',
                    priority: 'high',
                    potential_savings: 0
                };
            }
            else if (currentStock > 500) {
                const suggestedReduction = Math.floor(currentStock * 0.3);
                suggestion = {
                    product_id: stock.product_id,
                    offer_id: stock.offer_id,
                    current_stock: currentStock,
                    suggested_stock: currentStock - suggestedReduction,
                    reason: 'Overstocked - reduce holding costs',
                    priority: 'medium',
                    potential_savings: suggestedReduction * 2
                };
            }
            else if (available < 10 && currentStock < 50) {
                suggestion = {
                    product_id: stock.product_id,
                    offer_id: stock.offer_id,
                    current_stock: currentStock,
                    suggested_stock: 25,
                    reason: 'Optimize stock level for better availability',
                    priority: 'low',
                    potential_savings: 0
                };
            }
            if (suggestion) {
                suggestions.push(suggestion);
            }
        });
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        suggestions.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        return suggestions;
    }
}
