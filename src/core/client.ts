/**
 * Main Ozon Seller API SDK Client
 * Orchestrates all API categories and provides unified interface
 */

import type { OzonConfig, RequestOptions, BaseRequest, BaseResponse } from "./types.js";
import { HttpClient } from "./http.js";
import { AuthManager } from "./auth.js";
import { ConfigurationError } from "./errors.js";
import { ProductApi } from "../categories/product/index.js";
import { AnalyticsApi } from "../categories/analytics/index.js";
import { FinanceApi } from "../categories/finance/index.js";
import { PricingStrategyApi } from "../categories/pricing-strategy/index.js";
import { ReturnsApi } from "../categories/returns/index.js";
import { ReturnApi } from "../categories/return/index.js";
import { QuantsApi } from "../categories/quants/index.js";
import { ReviewApi } from "../categories/review/index.js";
import { ChatApi } from "../categories/chat/index.js";
import { QuestionsAnswersApi } from "../categories/questions-answers/index.js";
import { BrandApi } from "../categories/brand/index.js";
import { CertificationApi } from "../categories/certification/index.js";
import { FbsApi } from "../categories/fbs/index.js";
import { DeliveryFbsApi } from "../categories/delivery-fbs/index.js";
import { DeliveryRfbsApi } from "../categories/delivery-rfbs/index.js";
import { FboApi } from "../categories/fbo/index.js";
import { FbsRfbsMarksApi } from "../categories/fbs-rfbs-marks/index.js";
import { RfbsReturnsApi } from "../categories/rfbs-returns/index.js";
import { SupplierApi } from "../categories/supplier/index.js";
import { WarehouseApi } from "../categories/warehouse/index.js";
import { FboSupplyRequestApi } from "../categories/fbo-supply-request/index.js";
// Story 1.7 APIs
import { ReportApi } from "../categories/report/index.js";
import { PremiumApi } from "../categories/premium/index.js";
import { PricesStocksApi } from "../categories/prices-stocks/index.js";
import { BetaMethodApi } from "../categories/beta-method/index.js";
import { PromosApi } from "../categories/promos/index.js";
import { PassApi } from "../categories/pass/index.js";
import { CancellationApi } from "../categories/cancellation/index.js";
import { CategoryApi } from "../categories/category/index.js";
import { DigitalApi } from "../categories/digital/index.js";
import { BarcodeApi } from "../categories/barcode/index.js";
import { PolygonApi } from "../categories/polygon/index.js";
import { SellerRatingApi } from "../categories/seller-rating/index.js";

export class OzonSellerApiClient {
  private readonly httpClient: HttpClient;
  private readonly authManager: AuthManager;
  public readonly config: OzonConfig;

  // API category modules
  public readonly product: ProductApi;
  public readonly finance: FinanceApi;
  public readonly analytics: AnalyticsApi;
  public readonly pricingStrategy: PricingStrategyApi;
  public readonly returns: ReturnsApi;
  public readonly return: ReturnApi;
  public readonly quants: QuantsApi;
  public readonly review: ReviewApi;
  public readonly chat: ChatApi;
  public readonly questionsAnswers: QuestionsAnswersApi;
  public readonly brand: BrandApi;
  public readonly certification: CertificationApi;
  public readonly fbs: FbsApi;
  public readonly deliveryFbs: DeliveryFbsApi;
  public readonly deliveryRfbs: DeliveryRfbsApi;
  public readonly fbo: FboApi;
  public readonly fbsRfbsMarks: FbsRfbsMarksApi;
  public readonly rfbsReturns: RfbsReturnsApi;
  public readonly supplier: SupplierApi;
  public readonly warehouse: WarehouseApi;
  public readonly fboSupplyRequest: FboSupplyRequestApi;

  // Story 1.7 API categories
  public readonly report: ReportApi;
  public readonly premium: PremiumApi;
  public readonly pricesStocks: PricesStocksApi;
  public readonly betaMethod: BetaMethodApi;
  public readonly promos: PromosApi;
  public readonly pass: PassApi;
  public readonly cancellation: CancellationApi;
  public readonly category: CategoryApi;
  public readonly digital: DigitalApi;
  public readonly barcode: BarcodeApi;
  public readonly polygon: PolygonApi;
  public readonly sellerRating: SellerRatingApi;

  constructor(config: OzonConfig) {
    this.validateConfig(config);
    this.config = config;

    this.authManager = new AuthManager({
      apiKey: config.apiKey,
      clientId: config.clientId,
    });

    this.httpClient = new HttpClient(config);

    // Initialize API category modules
    this.product = new ProductApi(this.httpClient);
    this.finance = new FinanceApi(this.httpClient);
    this.analytics = new AnalyticsApi(this.httpClient);
    this.pricingStrategy = new PricingStrategyApi(this.httpClient);
    this.returns = new ReturnsApi(this.httpClient);
    this.return = new ReturnApi(this.httpClient);
    this.quants = new QuantsApi(this.httpClient);
    this.review = new ReviewApi(this.httpClient);
    this.chat = new ChatApi(this.httpClient);
    this.questionsAnswers = new QuestionsAnswersApi(this.httpClient);
    this.brand = new BrandApi(this.httpClient);
    this.certification = new CertificationApi(this.httpClient);
    this.fbs = new FbsApi(this.httpClient);
    this.deliveryFbs = new DeliveryFbsApi(this.httpClient);
    this.deliveryRfbs = new DeliveryRfbsApi(this.httpClient);
    this.fbo = new FboApi(this.httpClient);
    this.fbsRfbsMarks = new FbsRfbsMarksApi(this.httpClient);
    this.rfbsReturns = new RfbsReturnsApi(this.httpClient);
    this.supplier = new SupplierApi(this.httpClient);
    this.warehouse = new WarehouseApi(this.httpClient);
    this.fboSupplyRequest = new FboSupplyRequestApi(this.httpClient);

    // Initialize Story 1.7 API categories
    this.report = new ReportApi(this.httpClient);
    this.premium = new PremiumApi(this.httpClient);
    this.pricesStocks = new PricesStocksApi(this.httpClient);
    this.betaMethod = new BetaMethodApi(this.httpClient);
    this.promos = new PromosApi(this.httpClient);
    this.pass = new PassApi(this.httpClient);
    this.cancellation = new CancellationApi(this.httpClient);
    this.category = new CategoryApi(this.httpClient);
    this.digital = new DigitalApi(this.httpClient);
    this.barcode = new BarcodeApi(this.httpClient);
    this.polygon = new PolygonApi(this.httpClient);
    this.sellerRating = new SellerRatingApi(this.httpClient);
  }

  /**
   * Create a new SDK instance with configuration
   */
  public static create(config: OzonConfig): OzonSellerApiClient {
    return new OzonSellerApiClient(config);
  }

  /**
   * Test API connectivity and authentication
   */
  public async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // Try a simple API call to test connectivity
      // This would typically be a lightweight endpoint like getting seller info
      await this.httpClient.get("/v1/seller/info");

      return {
        success: true,
        message: "Connection successful",
      };
    } catch (error) {
      // Handle different error types defensively
      let errorMessage = "Unknown connection error";

      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  /**
   * Get current authentication status
   */
  public getAuthStatus(): { isValid: boolean; maskedCredentials: { clientId: string; apiKey: string } } {
    return {
      isValid: this.authManager.isValid(),
      maskedCredentials: this.authManager.getMaskedCredentials(),
    };
  }

  /**
   * Make a raw API request (for advanced usage)
   */
  public async rawRequest<TResponse extends BaseResponse>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, data?: BaseRequest, options?: RequestOptions): Promise<TResponse> {
    switch (method) {
      case "GET":
        return this.httpClient.get<TResponse>(path, options);
      case "POST":
        return this.httpClient.post<BaseRequest, TResponse>(path, data ?? {}, options);
      case "PUT":
        return this.httpClient.put<BaseRequest, TResponse>(path, data ?? {}, options);
      case "DELETE":
        return this.httpClient.delete<TResponse>(path, options);
      default:
        throw new ConfigurationError(`Unsupported HTTP method: ${method}`);
    }
  }

  /**
   * Get SDK version and configuration info
   */
  public getInfo(): {
    version: string;
    baseUrl: string;
    userAgent: string;
    timeout: number;
    retries: number;
  } {
    return {
      version: "0.1.0",
      baseUrl: this.config.baseUrl ?? "https://api-seller.ozon.ru",
      userAgent: this.config.userAgent ?? "@spacechemical/ozon-seller-api/0.1.0",
      timeout: this.config.timeout ?? 30000,
      retries: this.config.retries ?? 3,
    };
  }

  /**
   * Validate SDK configuration
   */
  private validateConfig(config: OzonConfig): void {
    if (!config) {
      throw new ConfigurationError("Configuration is required");
    }

    if (!config.apiKey) {
      throw new ConfigurationError("API key is required");
    }

    if (!config.clientId) {
      throw new ConfigurationError("Client ID is required");
    }

    if (config.baseUrl && !this.isValidUrl(config.baseUrl)) {
      throw new ConfigurationError("Base URL must be a valid URL");
    }

    if (config.timeout !== undefined && (config.timeout < 1000 || config.timeout > 300000)) {
      throw new ConfigurationError("Timeout must be between 1000ms and 300000ms");
    }

    if (config.retries !== undefined && (config.retries < 0 || config.retries > 10)) {
      throw new ConfigurationError("Retries must be between 0 and 10");
    }
  }

  /**
   * Validate URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
