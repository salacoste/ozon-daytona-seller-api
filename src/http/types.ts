/**
 * HTTP client types and interfaces
 */

/**
 * HTTP methods supported by the client
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * HTTP request configuration
 */
export interface IHttpRequestConfig {
  readonly url: string;
  readonly method: HttpMethod;
  readonly headers?: Record<string, string>;
  readonly body?: string | Record<string, unknown> | FormData | any;
  readonly timeout?: number;
  readonly signal?: AbortSignal;
}

/**
 * HTTP response interface
 */
export interface IHttpResponse<T = unknown> {
  readonly status: number;
  readonly statusText: string;
  readonly headers: Record<string, string>;
  readonly data: T;
  readonly url: string;
}

/**
 * Request hook - called before sending request
 */
export type RequestHook = (config: IHttpRequestConfig) => void | Promise<void>;

/**
 * Response hook - called after receiving response
 */
export type ResponseHook = <T>(response: IHttpResponse<T>) => void | Promise<void>;

/**
 * Error hook - called when request fails
 */
export type ErrorHook = (error: Error, config: IHttpRequestConfig) => void | Promise<void>;

/**
 * HTTP client configuration
 */
export interface IHttpClientConfig {
  readonly baseUrl: string;
  readonly clientId: string;
  readonly apiKey: string;
  readonly timeoutMs?: number;
  readonly defaultHeaders?: Record<string, string>;
  readonly maxRetries?: number;
  readonly retryDelayMs?: number;
  readonly retryBackoffFactor?: number;
  readonly rateLimitRps?: number;
  readonly rateLimitBurst?: number;
  readonly onRequest?: RequestHook;
  readonly onResponse?: ResponseHook;
  readonly onError?: ErrorHook;
  readonly onRetry?: (attempt: number, error: Error) => void | Promise<void>;
}

/**
 * HTTP client interface
 */
export interface IHttpClient {
  /**
   * Perform HTTP request
   */
  request<T = unknown>(config: IHttpRequestConfig): Promise<IHttpResponse<T>>;

  /**
   * Perform GET request
   */
  get<T = unknown>(url: string, config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;

  /**
   * Perform POST request
   */
  post<T = unknown>(
    url: string,
    body?: IHttpRequestConfig['body'],
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>>;

  /**
   * Perform PUT request
   */
  put<T = unknown>(
    url: string,
    body?: IHttpRequestConfig['body'],
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>>;

  /**
   * Perform DELETE request
   */
  delete<T = unknown>(
    url: string,
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>>;

  /**
   * Perform PATCH request
   */
  patch<T = unknown>(
    url: string,
    body?: IHttpRequestConfig['body'],
    config?: Partial<IHttpRequestConfig>
  ): Promise<IHttpResponse<T>>;
}