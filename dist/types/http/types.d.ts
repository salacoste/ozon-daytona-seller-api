export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
export interface IHttpRequestConfig {
    readonly url: string;
    readonly method: HttpMethod;
    readonly headers?: Record<string, string>;
    readonly body?: string | Record<string, unknown> | FormData | any;
    readonly timeout?: number;
    readonly signal?: AbortSignal;
}
export interface IHttpResponse<T = unknown> {
    readonly status: number;
    readonly statusText: string;
    readonly headers: Record<string, string>;
    readonly data: T;
    readonly url: string;
}
export type RequestHook = (config: IHttpRequestConfig) => void | Promise<void>;
export type ResponseHook = <T>(response: IHttpResponse<T>) => void | Promise<void>;
export type ErrorHook = (error: Error, config: IHttpRequestConfig) => void | Promise<void>;
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
export interface IHttpClient {
    request<T = unknown>(config: IHttpRequestConfig): Promise<IHttpResponse<T>>;
    get<T = unknown>(url: string, config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    post<T = unknown>(url: string, body?: IHttpRequestConfig['body'], config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    put<T = unknown>(url: string, body?: IHttpRequestConfig['body'], config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    delete<T = unknown>(url: string, config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    patch<T = unknown>(url: string, body?: IHttpRequestConfig['body'], config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
}
