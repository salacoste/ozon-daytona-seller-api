/**
 * HTTP client implementation for Ozon Seller API SDK
 * Features intelligent retry logic, error handling, and request/response validation
 */

import type { OzonConfig, BaseRequest, BaseResponse, RequestOptions, HttpMethod, RequestId } from "./types.js";
import { ApiError, ConnectionError, TimeoutError, ConfigurationError, isRetryableError, getRetryDelay } from "./errors.js";
import { createRequestId, createIdempotencyKey } from "./types.js";

// Default configuration
const DEFAULT_BASE_URL = "https://api-seller.ozon.ru";
const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_RETRIES = 3;
const DEFAULT_USER_AGENT = "@spacechemical/ozon-seller-api/0.1.0";

export class HttpClient {
  private readonly config: Required<OzonConfig>;
  private readonly baseHeaders: Record<string, string>;

  constructor(config: OzonConfig) {
    this.validateConfig(config);

    this.config = {
      ...config,
      baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
      timeout: config.timeout ?? DEFAULT_TIMEOUT,
      retries: config.retries ?? DEFAULT_RETRIES,
      userAgent: config.userAgent ?? DEFAULT_USER_AGENT,
    };

    this.baseHeaders = {
      "Content-Type": "application/json",
      "User-Agent": this.config.userAgent,
      "Client-Id": this.config.clientId,
      "Api-Key": this.config.apiKey,
    };
  }

  /**
   * Make an HTTP request with automatic retry logic
   */
  public async request<TRequest extends BaseRequest, TResponse extends BaseResponse>(method: HttpMethod, path: string, data?: TRequest, options: RequestOptions = {}): Promise<TResponse> {
    const requestId = createRequestId();
    const url = new URL(path, this.config.baseUrl).toString();

    const requestOptions = {
      timeout: options.timeout ?? this.config.timeout,
      retries: options.retries ?? this.config.retries,
      ...options,
    };

    return this.executeWithRetry(() => this.executeRequest<TRequest, TResponse>(method, url, data, requestOptions, requestId), requestOptions.retries, requestId);
  }

  /**
   * GET request
   */
  public async get<TResponse extends BaseResponse>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<never, TResponse>("GET", path, undefined, options);
  }

  /**
   * POST request
   */
  public async post<TRequest extends BaseRequest, TResponse extends BaseResponse>(path: string, data: TRequest, options?: RequestOptions): Promise<TResponse> {
    return this.request<TRequest, TResponse>("POST", path, data, options);
  }

  /**
   * PUT request
   */
  public async put<TRequest extends BaseRequest, TResponse extends BaseResponse>(path: string, data: TRequest, options?: RequestOptions): Promise<TResponse> {
    return this.request<TRequest, TResponse>("PUT", path, data, options);
  }

  /**
   * DELETE request
   */
  public async delete<TResponse extends BaseResponse>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<never, TResponse>("DELETE", path, undefined, options);
  }

  /**
   * Execute a single HTTP request
   */
  private async executeRequest<TRequest extends BaseRequest, TResponse extends BaseResponse>(method: HttpMethod, url: string, data: TRequest | undefined, options: RequestOptions, requestId: RequestId): Promise<TResponse> {
    const headers: Record<string, string> = {
      ...this.baseHeaders,
      ...options.headers,
      "X-Request-ID": requestId,
    };

    // Add idempotency key for write operations (POST, PUT, PATCH)
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      const idempotencyKey = options.idempotencyKey ?? createIdempotencyKey();
      headers["Idempotency-Key"] = idempotencyKey;
    }

    const fetchOptions: {
      method: HttpMethod;
      headers: Record<string, string>;
      signal: AbortSignal | null;
      body?: string;
    } = {
      method,
      headers,
      signal: options.signal ?? null,
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      fetchOptions.body = JSON.stringify(data);
    }

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new TimeoutError(`Request timeout after ${options.timeout}ms`, options.timeout!, requestId));
        }, options.timeout);
      });

      // Race between fetch and timeout
      const response = await Promise.race([fetch(url, fetchOptions), timeoutPromise]);

      return this.handleResponse<TResponse>(response, requestId);
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw error;
      }

      throw new ConnectionError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`, error instanceof Error ? error : undefined, requestId);
    }
  }

  /**
   * Handle HTTP response and parse result
   */
  private async handleResponse<TResponse extends BaseResponse>(response: Response, requestId: RequestId): Promise<TResponse> {
    let responseData: unknown;

    try {
      const text = await response.text();
      responseData = text ? JSON.parse(text) : {};
    } catch (error) {
      throw new ApiError("Invalid JSON response from server", response.status, "INVALID_JSON", undefined, this.extractHeaders(response), requestId);
    }

    if (!response.ok) {
      const errorData = this.extractErrorData(responseData);
      throw ApiError.fromResponse(response, errorData, requestId);
    }

    return responseData as TResponse;
  }

  /**
   * Execute request with retry logic
   */
  private async executeWithRetry<T>(operation: () => Promise<T>, maxRetries: number, requestId: RequestId, attempt = 0): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= maxRetries || !isRetryableError(error)) {
        throw error;
      }

      const delay = getRetryDelay(error, attempt);

      // Log retry attempt (in production, use proper logging)
      if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "test") {
        // eslint-disable-next-line no-console
        console.warn(`Request ${requestId} failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
      }

      await this.sleep(delay);
      return this.executeWithRetry(operation, maxRetries, requestId, attempt + 1);
    }
  }

  /**
   * Extract error data from response
   */
  private extractErrorData(responseData: unknown): { code?: string; message: string; details?: readonly unknown[] } | undefined {
    if (typeof responseData === "object" && responseData !== null) {
      const data = responseData as Record<string, unknown>;

      if ("error" in data && typeof data["error"] === "object" && data["error"] !== null) {
        const error = data["error"] as Record<string, unknown>;
        return {
          code: typeof error["code"] === "string" ? error["code"] : undefined,
          message: typeof error["message"] === "string" ? error["message"] : "Unknown error",
          details: Array.isArray(error["details"]) ? error["details"] : undefined,
        };
      }

      if ("message" in data && typeof data["message"] === "string") {
        return {
          message: data["message"],
          code: typeof data["code"] === "string" ? data["code"] : undefined,
        };
      }
    }

    return undefined;
  }

  /**
   * Extract headers from response
   */
  private extractHeaders(response: Response): Record<string, string> {
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return headers;
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validate SDK configuration
   */
  private validateConfig(config: OzonConfig): void {
    if (!config.apiKey) {
      throw new ConfigurationError("API key is required");
    }

    if (!config.clientId) {
      throw new ConfigurationError("Client ID is required");
    }

    if (config.timeout !== undefined && (config.timeout < 1000 || config.timeout > 300000)) {
      throw new ConfigurationError("Timeout must be between 1000ms and 300000ms");
    }

    if (config.retries !== undefined && (config.retries < 0 || config.retries > 10)) {
      throw new ConfigurationError("Retries must be between 0 and 10");
    }
  }
}
