"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OzonClient = void 0;
const HttpClient_1 = require("../http/HttpClient");
const product_1 = require("./product");
const fbo_1 = require("./fbo");
const fbs_1 = require("./fbs");
const pricesStocks_1 = require("./pricesStocks");
const warehouse_1 = require("./warehouse");
const analytics_1 = require("./analytics");
const fboSupplyRequest_1 = require("./fboSupplyRequest");
const reports_1 = require("./reports");
const finance_1 = require("./finance");
const category_1 = require("./category");
const supplier_1 = require("./supplier");
const chat_1 = require("./chat");
const cancellation_1 = require("./cancellation");
const returns_1 = require("./returns");
const deliveryFbs_1 = require("./deliveryFbs");
const barcode_1 = require("./barcode");
const polygon_1 = require("./polygon");
const rfbsReturns_1 = require("./rfbsReturns");
const sellerRating_1 = require("./sellerRating");
const brand_1 = require("./brand");
const promos_1 = require("./promos");
const deliveryrFbs_1 = require("./deliveryrFbs");
const pass_1 = require("./pass");
const returnApi_1 = require("./returnApi");
const reviewApi_1 = require("./reviewApi");
const digital_1 = require("./digital");
const quants_1 = require("./quants");
const betaMethod_1 = require("./betaMethod");
const questionsAnswers_1 = require("./questionsAnswers");
class OzonClient {
    constructor(config) {
        if (!config.clientId) {
            throw new Error('clientId is required');
        }
        if (!config.apiKey) {
            throw new Error('apiKey is required');
        }
        const httpConfig = {
            baseUrl: config.baseUrl ?? 'https://api-seller.ozon.ru',
            clientId: config.clientId,
            apiKey: config.apiKey,
            timeoutMs: config.timeoutMs ?? 30000,
            maxRetries: config.maxRetries ?? 3,
            retryDelayMs: config.retryDelayMs ?? 1000,
            retryBackoffFactor: config.retryBackoffFactor ?? 2,
            ...(config.rateLimitRps !== undefined && { rateLimitRps: config.rateLimitRps }),
            ...(config.rateLimitBurst !== undefined && { rateLimitBurst: config.rateLimitBurst }),
            ...(config.defaultHeaders !== undefined && { defaultHeaders: config.defaultHeaders }),
            ...(config.onRequest !== undefined && { onRequest: config.onRequest }),
            ...(config.onResponse !== undefined && { onResponse: config.onResponse }),
            ...(config.onError !== undefined && { onError: config.onError }),
            ...(config.onRetry !== undefined && { onRetry: config.onRetry }),
        };
        this.httpClient = new HttpClient_1.HttpClient(httpConfig);
        this.product = new product_1.ProductAPI(this.httpClient);
        this.fbo = new fbo_1.FBOAPI(this.httpClient);
        this.fbs = new fbs_1.FBSAPI(this.httpClient);
        this.fboSupplyRequest = new fboSupplyRequest_1.FboSupplyRequestAPI(this.httpClient);
        this.pricesStocks = new pricesStocks_1.PricesStocksAPI(this.httpClient);
        this.warehouse = new warehouse_1.WarehouseAPI(this.httpClient);
        this.analytics = new analytics_1.AnalyticsAPI(this.httpClient);
        this.reports = new reports_1.ReportsAPI(this.httpClient);
        this.finance = new finance_1.FinanceAPI(this.httpClient);
        this.category = new category_1.CategoryAPI(this.httpClient);
        this.supplier = new supplier_1.SupplierAPI(this.httpClient);
        this.chat = new chat_1.ChatAPI(this.httpClient);
        this.cancellation = new cancellation_1.CancellationAPI(this.httpClient);
        this.returns = new returns_1.ReturnsAPI(this.httpClient);
        this.deliveryFbs = new deliveryFbs_1.DeliveryFbsAPI(this.httpClient);
        this.barcode = new barcode_1.BarcodeAPI(this.httpClient);
        this.polygon = new polygon_1.PolygonAPI(this.httpClient);
        this.rfbsReturns = new rfbsReturns_1.RFBSReturnsAPI(this.httpClient);
        this.sellerRating = new sellerRating_1.SellerRatingAPI(this.httpClient);
        this.brand = new brand_1.BrandAPI(this.httpClient);
        this.promos = new promos_1.PromosAPI(this.httpClient);
        this.deliveryrFbs = new deliveryrFbs_1.DeliveryrFBSAPI(this.httpClient);
        this.pass = new pass_1.PassAPI(this.httpClient);
        this.returnApi = new returnApi_1.ReturnAPI(this.httpClient);
        this.reviewApi = new reviewApi_1.ReviewAPI(this.httpClient);
        this.digital = new digital_1.DigitalAPI(this.httpClient);
        this.quants = new quants_1.QuantsAPI(this.httpClient);
        this.betaMethod = new betaMethod_1.BetaMethodAPI(this.httpClient);
        this.questionsAnswers = new questionsAnswers_1.QuestionsAnswersAPI(this.httpClient);
    }
    getHttpClient() {
        return this.httpClient;
    }
    getConfig() {
        const httpConfig = this.httpClient['config'];
        return {
            baseUrl: httpConfig.baseUrl,
            timeoutMs: httpConfig.timeoutMs ?? 30000,
            maxRetries: httpConfig.maxRetries ?? 3,
            ...(httpConfig.rateLimitRps !== undefined && { rateLimitRps: httpConfig.rateLimitRps }),
        };
    }
    async testConnection() {
        const response = await this.httpClient.get('/');
        if (response.status >= 400) {
            throw new Error(`API connection test failed with status ${response.status}`);
        }
    }
}
exports.OzonClient = OzonClient;
