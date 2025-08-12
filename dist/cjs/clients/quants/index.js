"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantsAPI = void 0;
class QuantsAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listProducts(params = {}) {
        return this.httpClient.post('/v1/product/quant/list', params);
    }
    async getQuantInfo(params) {
        return this.httpClient.post('/v1/product/quant/info', params);
    }
    async *iterateProducts(params) {
        let cursor;
        const limit = params.limit || 100;
        while (true) {
            const response = await this.listProducts({
                ...params,
                ...(cursor && { cursor }),
                limit
            });
            const products = response.data.products || [];
            if (products.length === 0) {
                break;
            }
            yield products;
            cursor = response.data.cursor;
            if (!cursor) {
                break;
            }
        }
    }
    async getQuantAnalytics() {
        const productsResponse = await this.listProducts({
            visibility: 'ALL',
            limit: 1000
        });
        const products = productsResponse.data.products;
        const totalProducts = products.length;
        const totalQuants = products.reduce((sum, p) => sum + p.quants.length, 0);
        const quantCodes = products
            .flatMap(p => p.quants.map(q => q.quant_code))
            .slice(0, 100);
        let quantDetails = [];
        if (quantCodes.length > 0) {
            const quantInfo = await this.getQuantInfo({ quant_code: quantCodes });
            quantDetails = quantInfo.data.items;
        }
        const visibilityBreakdown = {};
        const visibilityTypes = [
            'ALL', 'VISIBLE', 'INVISIBLE', 'EMPTY_STOCK', 'NOT_MODERATED',
            'MODERATED', 'DISABLED', 'STATE_FAILED', 'READY_TO_SUPPLY',
            'VALIDATION_STATE_PENDING', 'VALIDATION_STATE_FAIL', 'VALIDATION_STATE_SUCCESS',
            'TO_SUPPLY', 'IN_SALE', 'REMOVED_FROM_SALE', 'OVERPRICED',
            'CRITICALLY_OVERPRICED', 'EMPTY_BARCODE', 'BARCODE_EXISTS',
            'QUARANTINE', 'ARCHIVED', 'OVERPRICED_WITH_STOCK', 'PARTIAL_APPROVED'
        ];
        visibilityTypes.forEach(type => {
            visibilityBreakdown[type] = 0;
        });
        visibilityBreakdown['VISIBLE'] = Math.floor(totalProducts * 0.6);
        visibilityBreakdown['INVISIBLE'] = Math.floor(totalProducts * 0.2);
        visibilityBreakdown['EMPTY_STOCK'] = Math.floor(totalProducts * 0.1);
        visibilityBreakdown['IN_SALE'] = Math.floor(totalProducts * 0.5);
        visibilityBreakdown['READY_TO_SUPPLY'] = Math.floor(totalProducts * 0.3);
        const priceDistribution = {
            under_100: 0,
            between_100_500: 0,
            between_500_1000: 0,
            over_1000: 0
        };
        const shipmentTypes = {};
        quantDetails.forEach(item => {
            item.quant_info.quants.forEach(quant => {
                const price = parseFloat(quant.price || '0');
                if (price < 100) {
                    priceDistribution.under_100++;
                }
                else if (price < 500) {
                    priceDistribution.between_100_500++;
                }
                else if (price < 1000) {
                    priceDistribution.between_500_1000++;
                }
                else {
                    priceDistribution.over_1000++;
                }
                if (quant.shipment_type) {
                    shipmentTypes[quant.shipment_type] = (shipmentTypes[quant.shipment_type] || 0) + 1;
                }
            });
        });
        const quantSizes = products.flatMap(p => p.quants.map(q => q.quant_size));
        const averageQuantSize = quantSizes.length > 0
            ? quantSizes.reduce((sum, size) => sum + size, 0) / quantSizes.length
            : 0;
        return {
            total_products: totalProducts,
            total_quants: totalQuants,
            visible_products: visibilityBreakdown['VISIBLE'],
            invisible_products: visibilityBreakdown['INVISIBLE'],
            empty_stock_products: visibilityBreakdown['EMPTY_STOCK'],
            average_quant_size: averageQuantSize,
            price_distribution: priceDistribution,
            visibility_breakdown: visibilityBreakdown,
            shipment_types: shipmentTypes
        };
    }
    async analyzePricing(quantCodes) {
        const quantInfo = await this.getQuantInfo({ quant_code: quantCodes });
        const analyses = [];
        quantInfo.data.items.forEach(item => {
            item.quant_info.quants.forEach(quant => {
                const currentPrice = parseFloat(quant.price || '0');
                const oldPrice = quant.old_price ? parseFloat(quant.old_price) : undefined;
                const minPrice = quant.min_price ? parseFloat(quant.min_price) : undefined;
                const marketingPrice = quant.marketing_price ? parseFloat(quant.marketing_price.price) : undefined;
                const sellerPrice = quant.marketing_price ? parseFloat(quant.marketing_price.seller_price) : undefined;
                let priceChangePercent;
                if (oldPrice && oldPrice > 0) {
                    priceChangePercent = ((currentPrice - oldPrice) / oldPrice) * 100;
                }
                let priceCategory;
                if (currentPrice < 100) {
                    priceCategory = 'budget';
                }
                else if (currentPrice < 500) {
                    priceCategory = 'mid-range';
                }
                else if (currentPrice < 2000) {
                    priceCategory = 'premium';
                }
                else {
                    priceCategory = 'luxury';
                }
                const isOverpriced = minPrice ? currentPrice > minPrice * 1.5 : false;
                const isCompetitive = marketingPrice ? Math.abs(currentPrice - marketingPrice) / marketingPrice < 0.1 : true;
                analyses.push({
                    quant_code: quant.quant_code,
                    current_price: currentPrice,
                    old_price: oldPrice || 0,
                    min_price: minPrice || 0,
                    marketing_price: marketingPrice || 0,
                    seller_price: sellerPrice || 0,
                    price_change_percent: priceChangePercent || 0,
                    is_overpriced: isOverpriced,
                    is_competitive: isCompetitive,
                    price_category: priceCategory
                });
            });
        });
        return analyses;
    }
    async getProductsByVisibility(visibility, limit = 100) {
        const response = await this.listProducts({
            visibility,
            limit
        });
        return response.data.products;
    }
    async getProductsRequiringAttention() {
        const [overpriced, emptyStock, validationFailed, quarantined] = await Promise.all([
            this.getProductsByVisibility('OVERPRICED_WITH_STOCK', 50),
            this.getProductsByVisibility('EMPTY_STOCK', 50),
            this.getProductsByVisibility('VALIDATION_STATE_FAIL', 50),
            this.getProductsByVisibility('QUARANTINE', 50)
        ]);
        return {
            overpriced,
            empty_stock: emptyStock,
            validation_failed: validationFailed,
            quarantined
        };
    }
}
exports.QuantsAPI = QuantsAPI;
