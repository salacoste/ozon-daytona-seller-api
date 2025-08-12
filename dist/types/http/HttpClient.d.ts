import type { IHttpClient, IHttpClientConfig, IHttpRequestConfig, IHttpResponse } from './types';
export declare class HttpClient implements IHttpClient {
    private readonly config;
    private readonly retryPolicy?;
    private readonly rateLimiter?;
    constructor(config: IHttpClientConfig);
    request<T = unknown>(requestConfig: IHttpRequestConfig): Promise<IHttpResponse<T>>;
    private performRequest;
    get<T = unknown>(url: string, config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    post<T = unknown>(url: string, body?: IHttpRequestConfig['body'], config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    put<T = unknown>(url: string, body?: IHttpRequestConfig['body'], config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    delete<T = unknown>(url: string, config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    patch<T = unknown>(url: string, body?: IHttpRequestConfig['body'], config?: Partial<IHttpRequestConfig>): Promise<IHttpResponse<T>>;
    private buildUrl;
    private buildHeaders;
    private setupTimeout;
    private parseHeaders;
    private parseResponseData;
}
