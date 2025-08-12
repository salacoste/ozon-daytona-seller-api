/**
 * HTTP client implementation with authentication, timeout, hooks, retry, and rate limiting
 */

import type {
  IHttpClient,
  IHttpClientConfig,
  IHttpRequestConfig,
  IHttpResponse,
} from './types';
import type { RetryPolicy} from './retry';
import { createRetryPolicy } from './retry';
import type { TokenBucketRateLimiter} from './rateLimiter';
import { createRateLimiter, RateLimitError } from './rateLimiter';
import { ErrorFactory } from '../errors';

/**
 * HTTP client for Ozon Seller API
 */
export class HttpClient implements IHttpClient {
  private readonly config: IHttpClientConfig;
  private readonly retryPolicy?: RetryPolicy;
  private readonly rateLimiter?: TokenBucketRateLimiter;

  constructor(config: IHttpClientConfig) {
    this.config = config;

    // Initialize retry policy if configured
    if (config.maxRetries && config.maxRetries > 0) {
      this.retryPolicy = createRetryPolicy({
        maxRetries: config.maxRetries,
        baseDelayMs: config.retryDelayMs ?? 1000,
        backoffFactor: config.retryBackoffFactor ?? 2,
        ...(config.onRetry && { onRetry: (attempt) => config.onRetry!(attempt.attemptNumber, attempt.error) }),
      });
    }

    // Initialize rate limiter if configured
    if (config.rateLimitRps && config.rateLimitRps > 0) {
      this.rateLimiter = createRateLimiter({
        requestsPerSecond: config.rateLimitRps,
        burstCapacity: config.rateLimitBurst ?? config.rateLimitRps * 2,
      });
    }
  }

  /**
   * Perform HTTP request with authentication headers, timeout, hooks, retry, and rate limiting
   */
  async request<T = unknown>(requestConfig: IHttpRequestConfig): Promise<IHttpResponse<T>> {
    // Apply rate limiting if configured
    if (this.rateLimiter) {
      try {
        await this.rateLimiter.acquire(requestConfig.timeout ?? this.config.timeoutMs ?? 30000);
      } catch (error) {
        if (error instanceof RateLimitError) {
          // Call error hook for rate limit errors
          if (this.config.onError) {
            await this.config.onError(error, requestConfig);
          }
        }
        throw error;
      }
    }

    // Build request execution function
    const executeRequest = async (): Promise<IHttpResponse<T>> => {
      return this.performRequest<T>(requestConfig);
    };

    // Apply retry policy if configured
    if (this.retryPolicy) {
      return this.retryPolicy.execute(executeRequest);
    } else {
      return executeRequest();
    }
  }

  /**
   * Perform the actual HTTP request
   */
  private async performRequest<T = unknown>(requestConfig: IHttpRequestConfig): Promise<IHttpResponse<T>> {
    // Build full URL
    const url = this.buildUrl(requestConfig.url);

    // Merge headers with authentication
    const headers = this.buildHeaders(requestConfig.headers);

    // Setup timeout and abort signal
    const { signal, timeoutId } = this.setupTimeout(requestConfig);

    // Build final request config
    const finalConfig: IHttpRequestConfig = {
      ...requestConfig,
      url,
      headers,
      signal,
    };

    try {
      // Call request hook
      if (this.config.onRequest) {
        await this.config.onRequest(finalConfig);
      }

      // Prepare fetch options
      const fetchOptions: RequestInit = {
        method: finalConfig.method,
        ...(finalConfig.headers && { headers: finalConfig.headers }),
        ...(finalConfig.signal && { signal: finalConfig.signal }),
      };

      // Add body if present
      if (finalConfig.body) {
        if (typeof finalConfig.body === 'string') {
          fetchOptions.body = finalConfig.body;
        } else if (finalConfig.body instanceof FormData) {
          fetchOptions.body = finalConfig.body;
        } else {
          fetchOptions.body = JSON.stringify(finalConfig.body);
          fetchOptions.headers = {
            ...fetchOptions.headers,
            'Content-Type': 'application/json',
          };
        }
      }

      // Perform HTTP request
      const response = await fetch(url, fetchOptions);

      // Clear timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Check for HTTP error status and create appropriate error
      if (!response.ok) {
        const apiError = await ErrorFactory.fromResponse(response, {
          operationId: finalConfig.headers?.['X-Operation-Id'] as string,
          url: finalConfig.url,
        });
        throw apiError;
      }

      // Parse response
      const responseHeaders = this.parseHeaders(response.headers);
      const data = await this.parseResponseData<T>(response);

      const httpResponse: IHttpResponse<T> = {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data,
        url,
      };

      // Call response hook
      if (this.config.onResponse) {
        await this.config.onResponse(httpResponse);
      }

      return httpResponse;
    } catch (error) {
      // Clear timeout on error
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Call error hook
      if (this.config.onError) {
        await this.config.onError(error as Error, finalConfig);
      }

      throw error;
    }
  }

  /**
   * Perform GET request
   */
  async get<T = unknown>(
    url: string,
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    });
  }

  /**
   * Perform POST request
   */
  async post<T = unknown>(
    url: string,
    body?: IHttpRequestConfig['body'],
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'POST',
      body,
    });
  }

  /**
   * Perform PUT request
   */
  async put<T = unknown>(
    url: string,
    body?: IHttpRequestConfig['body'],
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'PUT',
      body,
    });
  }

  /**
   * Perform DELETE request
   */
  async delete<T = unknown>(
    url: string,
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'DELETE',
    });
  }

  /**
   * Perform PATCH request
   */
  async patch<T = unknown>(
    url: string,
    body?: IHttpRequestConfig['body'],
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'PATCH',
      body,
    });
  }

  /**
   * Build full URL from base URL and endpoint
   */
  private buildUrl(endpoint: string): string {
    const baseUrl = this.config.baseUrl.endsWith('/')
      ? this.config.baseUrl.slice(0, -1)
      : this.config.baseUrl;
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${url}`;
  }

  /**
   * Build request headers with authentication
   */
  private buildHeaders(requestHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      // Default headers
      Accept: 'application/json',
      'User-Agent': 'ozon-seller-api-sdk/1.0.0',
      ...this.config.defaultHeaders,
      // Authentication headers (Ozon API requirement)
      'Client-Id': this.config.clientId,
      'Api-Key': this.config.apiKey,
      // Request-specific headers
      ...requestHeaders,
    };

    return headers;
  }

  /**
   * Setup request timeout and abort signal
   */
  private setupTimeout(requestConfig: IHttpRequestConfig): {
    signal: AbortSignal;
    timeoutId?: NodeJS.Timeout;
  } {
    // Use existing signal if provided
    if (requestConfig.signal) {
      return { signal: requestConfig.signal };
    }

    // Create new abort controller for timeout
    const abortController = new AbortController();
    const timeout = requestConfig.timeout ?? this.config.timeoutMs ?? 30000;

    const timeoutId = setTimeout(() => {
      abortController.abort(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);

    return {
      signal: abortController.signal,
      timeoutId,
    };
  }

  /**
   * Parse response headers into record
   */
  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key.toLowerCase()] = value;
    });
    return result;
  }

  /**
   * Parse response data based on content type
   */
  private async parseResponseData<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }

    if (contentType.includes('text/')) {
      return (await response.text()) as unknown as T;
    }

    // For other content types, return as blob
    const blob = await response.blob();
    return blob as unknown as T;
  }
}