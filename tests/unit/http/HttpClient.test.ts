/**
 * Unit tests for HttpClient
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../../../src/http/HttpClient';
import type { IHttpClientConfig, RequestHook, ResponseHook, ErrorHook } from '../../../src/http/types';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('HttpClient', () => {
  let config: IHttpClientConfig;
  let client: HttpClient;
  let onRequestHook: RequestHook;
  let onResponseHook: ResponseHook;
  let onErrorHook: ErrorHook;

  beforeEach(() => {
    onRequestHook = vi.fn();
    onResponseHook = vi.fn();
    onErrorHook = vi.fn();

    config = {
      baseUrl: 'https://api-seller.ozon.ru',
      clientId: 'test-client-id',
      apiKey: 'test-api-key',
      timeoutMs: 5000,
      onRequest: onRequestHook,
      onResponse: onResponseHook,
      onError: onErrorHook,
    };

    client = new HttpClient(config);

    // Reset fetch mock
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Authentication Headers', () => {
    it('should inject Client-Id and Api-Key headers on each request', async () => {
      // Mock successful response
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      await client.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Client-Id': 'test-client-id',
            'Api-Key': 'test-api-key',
          }),
        })
      );
    });

    it('should preserve custom headers while adding auth headers', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      await client.get('/test', {
        headers: { 'Custom-Header': 'custom-value' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Client-Id': 'test-client-id',
            'Api-Key': 'test-api-key',
            'Custom-Header': 'custom-value',
          }),
        })
      );
    });
  });

  describe('Request Timeout', () => {
    it('should implement request timeout via AbortController', async () => {
      // Mock fetch to simulate slow response that gets aborted
      mockFetch.mockImplementation((url, options) => {
        return new Promise((resolve, reject) => {
          const abortHandler = () => reject(new Error('Request timeout after 100ms'));
          options?.signal?.addEventListener('abort', abortHandler);
        });
      });

      const shortTimeoutClient = new HttpClient({
        ...config,
        timeoutMs: 100,
      });

      await expect(shortTimeoutClient.get('/test')).rejects.toThrow();
    });

    it('should respect custom timeout per request', async () => {
      // Mock fetch to simulate slow response that gets aborted
      mockFetch.mockImplementation((url, options) => {
        return new Promise((resolve, reject) => {
          const abortHandler = () => reject(new Error('Request timeout after 100ms'));
          options?.signal?.addEventListener('abort', abortHandler);
        });
      });

      await expect(
        client.get('/test', { timeout: 100 })
      ).rejects.toThrow();
    });

    it('should respect existing AbortSignal', async () => {
      const abortController = new AbortController();
      
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      await client.get('/test', { signal: abortController.signal });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          signal: abortController.signal,
        })
      );
    });
  });

  describe('Request/Response Hooks', () => {
    it('should call onRequest hook before sending request', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      await client.get('/test');

      expect(onRequestHook).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://api-seller.ozon.ru/test',
          method: 'GET',
          headers: expect.objectContaining({
            'Client-Id': 'test-client-id',
            'Api-Key': 'test-api-key',
          }),
        })
      );

      // Verify that onRequestHook was called (order checking is handled by callOrder array above)
      expect(onRequestHook).toHaveBeenCalledTimes(1);
    });

    it('should call onResponse hook after receiving response', async () => {
      const responseData = { success: true };
      
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => responseData,
      });

      await client.get('/test');

      expect(onResponseHook).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 200,
          statusText: 'OK',
          data: responseData,
          url: 'https://api-seller.ozon.ru/test',
          headers: expect.objectContaining({
            'content-type': 'application/json',
          }),
        })
      );
    });

    it('should call onError hook when request fails', async () => {
      const error = new Error('Network error');
      mockFetch.mockRejectedValue(error);

      await expect(client.get('/test')).rejects.toThrow('Network error');

      expect(onErrorHook).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          url: 'https://api-seller.ozon.ru/test',
          method: 'GET',
        })
      );
    });

    it('should call hooks in correct order: onRequest -> fetch -> onResponse', async () => {
      const callOrder: string[] = [];

      const trackingOnRequest = vi.fn(() => callOrder.push('onRequest'));
      const trackingOnResponse = vi.fn(() => callOrder.push('onResponse'));
      
      mockFetch.mockImplementation(() => {
        callOrder.push('fetch');
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          ok: true,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: async () => ({ success: true }),
        });
      });

      const trackingClient = new HttpClient({
        ...config,
        onRequest: trackingOnRequest,
        onResponse: trackingOnResponse,
      });

      await trackingClient.get('/test');

      expect(callOrder).toEqual(['onRequest', 'fetch', 'onResponse']);
    });
  });

  describe('HTTP Methods', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });
    });

    it('should support GET requests', async () => {
      await client.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('should support POST requests with JSON body', async () => {
      const body = { name: 'test' };
      
      await client.post('/test', body);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should support POST requests with string body', async () => {
      const body = 'raw string data';
      
      await client.post('/test', body);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          method: 'POST',
          body,
        })
      );
    });

    it('should support FormData body', async () => {
      const formData = new FormData();
      formData.append('field', 'value');
      
      await client.post('/test', formData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/test',
        expect.objectContaining({
          method: 'POST',
          body: formData,
        })
      );
    });

    it('should support PUT, DELETE, PATCH methods', async () => {
      await client.put('/test', { data: 'put' });
      await client.delete('/test');
      await client.patch('/test', { data: 'patch' });

      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({ method: 'PUT' })
      );
      
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({ method: 'DELETE' })
      );
      
      expect(mockFetch).toHaveBeenNthCalledWith(
        3,
        expect.any(String),
        expect.objectContaining({ method: 'PATCH' })
      );
    });
  });

  describe('URL Building', () => {
    it('should build correct URLs with base URL', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      await client.get('/v1/products');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/v1/products',
        expect.any(Object)
      );
    });

    it('should handle base URL with trailing slash', async () => {
      const clientWithTrailingSlash = new HttpClient({
        ...config,
        baseUrl: 'https://api-seller.ozon.ru/',
      });

      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true }),
      });

      await clientWithTrailingSlash.get('/v1/products');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api-seller.ozon.ru/v1/products',
        expect.any(Object)
      );
    });
  });

  describe('Response Parsing', () => {
    it('should parse JSON responses', async () => {
      const responseData = { id: 1, name: 'test' };
      
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => responseData,
      });

      const response = await client.get('/test');

      expect(response.data).toEqual(responseData);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/json');
    });

    it('should parse text responses', async () => {
      const responseText = 'plain text response';
      
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: async () => responseText,
      });

      const response = await client.get('/test');

      expect(response.data).toBe(responseText);
    });

    it('should handle other content types as blob', async () => {
      const blob = new Blob(['binary data']);
      
      mockFetch.mockResolvedValue({
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: new Headers({ 'content-type': 'application/octet-stream' }),
        blob: async () => blob,
      });

      const response = await client.get('/test');

      expect(response.data).toBe(blob);
    });
  });
});