/**
 * Main OzonClient class - entry point for the SDK
 */

import { HttpClient } from '../http/HttpClient';
import type { IHttpClientConfig } from '../http/types';

// Import sub-clients
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

/**
 * Configuration options for OzonClient
 */
export interface IOzonClientConfig {
  /** Ozon Client ID (required) */
  readonly clientId: string;
  /** Ozon API Key (required) */
  readonly apiKey: string;
  /** Base URL for Ozon Seller API (default: https://api-seller.ozon.ru) */
  readonly baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  readonly timeoutMs?: number;
  /** Maximum number of retry attempts (default: 3) */
  readonly maxRetries?: number;
  /** Retry delay base in milliseconds (default: 1000) */
  readonly retryDelayMs?: number;
  /** Exponential backoff factor for retries (default: 2) */
  readonly retryBackoffFactor?: number;
  /** Rate limiting - requests per second (default: undefined - no rate limiting) */
  readonly rateLimitRps?: number;
  /** Rate limiting - burst capacity (default: rateLimitRps * 2) */
  readonly rateLimitBurst?: number;
  /** Default headers to include in all requests */
  readonly defaultHeaders?: Record<string, string>;
  /** Request hook - called before each request */
  readonly onRequest?: (config: any) => void | Promise<void>;
  /** Response hook - called after each successful response */
  readonly onResponse?: (response: any) => void | Promise<void>;
  /** Error hook - called when request fails */
  readonly onError?: (error: Error, config: any) => void | Promise<void>;
  /** Retry hook - called on each retry attempt */
  readonly onRetry?: (attemptNumber: number, error: Error) => void | Promise<void>;
}

/**
 * Main Ozon Seller API client
 * 
 * Provides access to all Ozon Seller API endpoints through organized sub-clients.
 * Handles authentication, retries, rate limiting, and error handling automatically.
 * 
 * @example
 * ```typescript
 * import { OzonClient } from '@ozon/sdk';
 * 
 * const client = new OzonClient({
 *   clientId: process.env.OZON_CLIENT_ID!,
 *   apiKey: process.env.OZON_API_KEY!,
 *   // Optional configuration
 *   baseUrl: 'https://api-seller.ozon.ru', // production (default)
 *   timeoutMs: 30000,
 *   maxRetries: 3,
 *   rateLimitRps: 10
 * });
 * 
 * // Use sub-clients for different API groups
 * const products = await client.product.list({ limit: 100 });
 * const orders = await client.fbo.list({ limit: 50 });
 * ```
 */
export class OzonClient {
  private readonly httpClient: HttpClient;

  // P0 API group clients
  public readonly product: ProductAPI;
  public readonly fbo: FBOAPI;
  public readonly fbs: FBSAPI;
  public readonly fboSupplyRequest: FboSupplyRequestAPI;
  public readonly pricesStocks: PricesStocksAPI;
  public readonly warehouse: WarehouseAPI;
  public readonly analytics: AnalyticsAPI;
  
  // P1 API group clients  
  public readonly reports: ReportsAPI;
  public readonly finance: FinanceAPI;
  public readonly category: CategoryAPI;
  public readonly supplier: SupplierAPI;
  public readonly chat: ChatAPI;
  public readonly cancellation: CancellationAPI;
  public readonly returns: ReturnsAPI;
  public readonly deliveryFbs: DeliveryFbsAPI;
  public readonly barcode: BarcodeAPI;
  public readonly polygon: PolygonAPI;
  public readonly rfbsReturns: RFBSReturnsAPI;
  public readonly sellerRating: SellerRatingAPI;
  public readonly brand: BrandAPI;
  public readonly promos: PromosAPI;
  public readonly deliveryrFbs: DeliveryrFBSAPI;
  public readonly pass: PassAPI;
  public readonly returnApi: ReturnAPI;
  public readonly reviewApi: ReviewAPI;
  
  // Beta API group clients
  public readonly digital: DigitalAPI;
  public readonly quants: QuantsAPI;
  public readonly betaMethod: BetaMethodAPI;
  public readonly questionsAnswers: QuestionsAnswersAPI;

  /**
   * Create a new OzonClient instance
   * 
   * @param config - Client configuration
   */
  constructor(config: IOzonClientConfig) {
    // Validate required configuration
    if (!config.clientId) {
      throw new Error('clientId is required');
    }
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }

    // Build HTTP client configuration
    const httpConfig: IHttpClientConfig = {
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

    // Create shared HTTP client
    this.httpClient = new HttpClient(httpConfig);

    // Initialize sub-clients
    this.product = new ProductAPI(this.httpClient);
    this.fbo = new FBOAPI(this.httpClient);
    this.fbs = new FBSAPI(this.httpClient);
    this.fboSupplyRequest = new FboSupplyRequestAPI(this.httpClient);
    this.pricesStocks = new PricesStocksAPI(this.httpClient);
    this.warehouse = new WarehouseAPI(this.httpClient);
    this.analytics = new AnalyticsAPI(this.httpClient);
    
    // Initialize P1 sub-clients
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
    
    // Initialize Beta sub-clients
    this.digital = new DigitalAPI(this.httpClient);
    this.quants = new QuantsAPI(this.httpClient);
    this.betaMethod = new BetaMethodAPI(this.httpClient);
    this.questionsAnswers = new QuestionsAnswersAPI(this.httpClient);
  }

  /**
   * Get the underlying HTTP client for advanced usage
   * @internal
   */
  public getHttpClient(): HttpClient {
    return this.httpClient;
  }

  /**
   * Get client configuration information
   */
  public getConfig(): {
    readonly baseUrl: string;
    readonly timeoutMs: number;
    readonly maxRetries: number;
    readonly rateLimitRps?: number;
  } {
    const httpConfig = this.httpClient['config'];
    return {
      baseUrl: httpConfig.baseUrl,
      timeoutMs: httpConfig.timeoutMs ?? 30000,
      maxRetries: httpConfig.maxRetries ?? 3,
      ...(httpConfig.rateLimitRps !== undefined && { rateLimitRps: httpConfig.rateLimitRps }),
    };
  }

  /**
   * Test client connectivity by making a lightweight API call
   * 
   * @returns Promise that resolves if the client can successfully authenticate
   * @example
   * ```typescript
   * try {
   *   await client.testConnection();
   *   console.log('Successfully connected to Ozon API');
   * } catch (error) {
   *   console.error('Failed to connect to Ozon API:', error);
   * }
   * ```
   */
  public async testConnection(): Promise<void> {
    // This will make a simple request to test authentication
    // For now, we'll just test that the HTTP client is configured properly
    const response = await this.httpClient.get('/');
    
    if (response.status >= 400) {
      throw new Error(`API connection test failed with status ${response.status}`);
    }
  }
}