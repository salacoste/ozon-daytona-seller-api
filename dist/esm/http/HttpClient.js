import { createRetryPolicy } from './retry';
import { createRateLimiter, RateLimitError } from './rateLimiter';
import { ErrorFactory } from '../errors';
export class HttpClient {
    constructor(config) {
        this.config = config;
        if (config.maxRetries && config.maxRetries > 0) {
            this.retryPolicy = createRetryPolicy({
                maxRetries: config.maxRetries,
                baseDelayMs: config.retryDelayMs ?? 1000,
                backoffFactor: config.retryBackoffFactor ?? 2,
                ...(config.onRetry && { onRetry: (attempt) => config.onRetry(attempt.attemptNumber, attempt.error) }),
            });
        }
        if (config.rateLimitRps && config.rateLimitRps > 0) {
            this.rateLimiter = createRateLimiter({
                requestsPerSecond: config.rateLimitRps,
                burstCapacity: config.rateLimitBurst ?? config.rateLimitRps * 2,
            });
        }
    }
    async request(requestConfig) {
        if (this.rateLimiter) {
            try {
                await this.rateLimiter.acquire(requestConfig.timeout ?? this.config.timeoutMs ?? 30000);
            }
            catch (error) {
                if (error instanceof RateLimitError) {
                    if (this.config.onError) {
                        await this.config.onError(error, requestConfig);
                    }
                }
                throw error;
            }
        }
        const executeRequest = async () => {
            return this.performRequest(requestConfig);
        };
        if (this.retryPolicy) {
            return this.retryPolicy.execute(executeRequest);
        }
        else {
            return executeRequest();
        }
    }
    async performRequest(requestConfig) {
        const url = this.buildUrl(requestConfig.url);
        const headers = this.buildHeaders(requestConfig.headers);
        const { signal, timeoutId } = this.setupTimeout(requestConfig);
        const finalConfig = {
            ...requestConfig,
            url,
            headers,
            signal,
        };
        try {
            if (this.config.onRequest) {
                await this.config.onRequest(finalConfig);
            }
            const fetchOptions = {
                method: finalConfig.method,
                ...(finalConfig.headers && { headers: finalConfig.headers }),
                ...(finalConfig.signal && { signal: finalConfig.signal }),
            };
            if (finalConfig.body) {
                if (typeof finalConfig.body === 'string') {
                    fetchOptions.body = finalConfig.body;
                }
                else if (finalConfig.body instanceof FormData) {
                    fetchOptions.body = finalConfig.body;
                }
                else {
                    fetchOptions.body = JSON.stringify(finalConfig.body);
                    fetchOptions.headers = {
                        ...fetchOptions.headers,
                        'Content-Type': 'application/json',
                    };
                }
            }
            const response = await fetch(url, fetchOptions);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (!response.ok) {
                const apiError = await ErrorFactory.fromResponse(response, {
                    operationId: finalConfig.headers?.['X-Operation-Id'],
                    url: finalConfig.url,
                });
                throw apiError;
            }
            const responseHeaders = this.parseHeaders(response.headers);
            const data = await this.parseResponseData(response);
            const httpResponse = {
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders,
                data,
                url,
            };
            if (this.config.onResponse) {
                await this.config.onResponse(httpResponse);
            }
            return httpResponse;
        }
        catch (error) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (this.config.onError) {
                await this.config.onError(error, finalConfig);
            }
            throw error;
        }
    }
    async get(url, config) {
        return this.request({
            ...config,
            url,
            method: 'GET',
        });
    }
    async post(url, body, config) {
        return this.request({
            ...config,
            url,
            method: 'POST',
            body,
        });
    }
    async put(url, body, config) {
        return this.request({
            ...config,
            url,
            method: 'PUT',
            body,
        });
    }
    async delete(url, config) {
        return this.request({
            ...config,
            url,
            method: 'DELETE',
        });
    }
    async patch(url, body, config) {
        return this.request({
            ...config,
            url,
            method: 'PATCH',
            body,
        });
    }
    buildUrl(endpoint) {
        const baseUrl = this.config.baseUrl.endsWith('/')
            ? this.config.baseUrl.slice(0, -1)
            : this.config.baseUrl;
        const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return `${baseUrl}${url}`;
    }
    buildHeaders(requestHeaders) {
        const headers = {
            Accept: 'application/json',
            'User-Agent': 'ozon-seller-api-sdk/1.0.0',
            ...this.config.defaultHeaders,
            'Client-Id': this.config.clientId,
            'Api-Key': this.config.apiKey,
            ...requestHeaders,
        };
        return headers;
    }
    setupTimeout(requestConfig) {
        if (requestConfig.signal) {
            return { signal: requestConfig.signal };
        }
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
    parseHeaders(headers) {
        const result = {};
        headers.forEach((value, key) => {
            result[key.toLowerCase()] = value;
        });
        return result;
    }
    async parseResponseData(response) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return (await response.json());
        }
        if (contentType.includes('text/')) {
            return (await response.text());
        }
        const blob = await response.blob();
        return blob;
    }
}
