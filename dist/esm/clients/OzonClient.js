import { HttpClient } from '../http/HttpClient';
import { ProductAPI } from './product';
import { FBOAPI } from './fbo';
import { FBSAPI } from './fbs';
import { PricesStocksAPI } from './pricesStocks';
import { WarehouseAPI } from './warehouse';
import { AnalyticsAPI } from './analytics';
import { FboSupplyRequestAPI } from './fboSupplyRequest';
import { ReportsAPI } from './reports';
import { FinanceAPI } from './finance';
import { CategoryAPI } from './category';
import { SupplierAPI } from './supplier';
import { ChatAPI } from './chat';
import { CancellationAPI } from './cancellation';
import { ReturnsAPI } from './returns';
import { DeliveryFbsAPI } from './deliveryFbs';
import { BarcodeAPI } from './barcode';
import { PolygonAPI } from './polygon';
import { RFBSReturnsAPI } from './rfbsReturns';
import { SellerRatingAPI } from './sellerRating';
import { BrandAPI } from './brand';
import { PromosAPI } from './promos';
import { DeliveryrFBSAPI } from './deliveryrFbs';
import { PassAPI } from './pass';
import { ReturnAPI } from './returnApi';
import { ReviewAPI } from './reviewApi';
import { DigitalAPI } from './digital';
import { QuantsAPI } from './quants';
import { BetaMethodAPI } from './betaMethod';
import { QuestionsAnswersAPI } from './questionsAnswers';
export class OzonClient {
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
        this.httpClient = new HttpClient(httpConfig);
        this.product = new ProductAPI(this.httpClient);
        this.fbo = new FBOAPI(this.httpClient);
        this.fbs = new FBSAPI(this.httpClient);
        this.fboSupplyRequest = new FboSupplyRequestAPI(this.httpClient);
        this.pricesStocks = new PricesStocksAPI(this.httpClient);
        this.warehouse = new WarehouseAPI(this.httpClient);
        this.analytics = new AnalyticsAPI(this.httpClient);
        this.reports = new ReportsAPI(this.httpClient);
        this.finance = new FinanceAPI(this.httpClient);
        this.category = new CategoryAPI(this.httpClient);
        this.supplier = new SupplierAPI(this.httpClient);
        this.chat = new ChatAPI(this.httpClient);
        this.cancellation = new CancellationAPI(this.httpClient);
        this.returns = new ReturnsAPI(this.httpClient);
        this.deliveryFbs = new DeliveryFbsAPI(this.httpClient);
        this.barcode = new BarcodeAPI(this.httpClient);
        this.polygon = new PolygonAPI(this.httpClient);
        this.rfbsReturns = new RFBSReturnsAPI(this.httpClient);
        this.sellerRating = new SellerRatingAPI(this.httpClient);
        this.brand = new BrandAPI(this.httpClient);
        this.promos = new PromosAPI(this.httpClient);
        this.deliveryrFbs = new DeliveryrFBSAPI(this.httpClient);
        this.pass = new PassAPI(this.httpClient);
        this.returnApi = new ReturnAPI(this.httpClient);
        this.reviewApi = new ReviewAPI(this.httpClient);
        this.digital = new DigitalAPI(this.httpClient);
        this.quants = new QuantsAPI(this.httpClient);
        this.betaMethod = new BetaMethodAPI(this.httpClient);
        this.questionsAnswers = new QuestionsAnswersAPI(this.httpClient);
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
