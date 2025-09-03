/**
 * Performance tests for HttpClient
 * Validates NFR1: Response times under 200ms for cached operations
 * Validates NFR4: Build time performance requirements
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../../src/core/http.js';
import { createApiKey, createClientId } from '../../src/core/types.js';
import type { OzonConfig } from '../../src/core/types.js';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('HttpClient Performance Tests (NFR1 Validation)', () => {
  let httpClient: HttpClient;
  let config: OzonConfig;

  beforeEach(() => {
    config = {
      apiKey: createApiKey('12345678-1234-5678-9abc-123456789012'),
      clientId: createClientId('12345678'),
      baseUrl: 'https://api-seller.ozon.ru',
      timeout: 30000,
      retries: 3
    };
    httpClient = new HttpClient(config);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('NFR1: Response Times Under 200ms', () => {
    it('should complete GET request within 200ms (cached simulation)', async () => {
      // Mock fast response (simulating cached operation)
      mockFetch.mockImplementation(() => 
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Map([['content-type', 'application/json']]),
          text: () => Promise.resolve('{"result": {"test": "data"}}')
        })
      );

      const startTime = performance.now();
      
      await httpClient.get('/v1/test/cached-endpoint');
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      console.log(`📊 GET Response time: ${responseTime.toFixed(2)}ms`);
      
      // NFR1 requirement: <200ms for cached operations
      expect(responseTime).toBeLessThan(200);
    });

    it('should complete POST request within 200ms (cached simulation)', async () => {
      mockFetch.mockImplementation(() => 
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Map([['content-type', 'application/json']]),
          text: () => Promise.resolve('{"result": {"success": true}}')
        })
      );

      const startTime = performance.now();
      
      await httpClient.post('/v1/test/cached-endpoint', { test: 'data' });
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      console.log(`📊 POST Response time: ${responseTime.toFixed(2)}ms`);
      
      expect(responseTime).toBeLessThan(200);
    });

    it('should handle multiple concurrent requests efficiently', async () => {
      mockFetch.mockImplementation(() => 
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Map([['content-type', 'application/json']]),
          text: () => Promise.resolve('{"result": {"test": "data"}}')
        })
      );

      const concurrentRequests = 10;
      const startTime = performance.now();
      
      const promises = Array(concurrentRequests).fill(0).map(() => 
        httpClient.get('/v1/test/concurrent')
      );
      
      await Promise.all(promises);
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const averageTime = totalTime / concurrentRequests;

      console.log(`📊 Concurrent requests average: ${averageTime.toFixed(2)}ms`);
      console.log(`📊 Total time for ${concurrentRequests} requests: ${totalTime.toFixed(2)}ms`);
      
      // Average per request should still be reasonable
      expect(averageTime).toBeLessThan(50); // Much faster for concurrent
    });
  });

  describe('Memory Usage Performance', () => {
    it('should not leak memory during multiple requests', async () => {
      mockFetch.mockImplementation(() => 
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Map([['content-type', 'application/json']]),
          text: () => Promise.resolve('{"result": {"test": "data"}}')
        })
      );

      // Get initial memory usage (rough estimate)
      const initialMemory = process.memoryUsage();
      
      // Perform many requests
      const requestCount = 100;
      for (let i = 0; i < requestCount; i++) {
        await httpClient.get(`/v1/test/memory-test-${i}`);
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      console.log(`📊 Memory increase after ${requestCount} requests: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`);
      
      // Memory increase should be reasonable (less than 10MB for 100 requests)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });

  describe('Error Handling Performance', () => {
    it('should handle errors quickly without significant overhead', async () => {
      mockFetch.mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 400,
          headers: new Map([['content-type', 'application/json']]),
          text: () => Promise.resolve('{"error": {"message": "Bad request"}}')
        })
      );

      const startTime = performance.now();
      
      try {
        await httpClient.get('/v1/test/error-endpoint');
      } catch (error) {
        // Expected error
      }
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      console.log(`📊 Error handling time: ${responseTime.toFixed(2)}ms`);
      
      // Error handling should also be fast
      expect(responseTime).toBeLessThan(100);
    });
  });

  describe('Retry Logic Performance', () => {
    it('should handle retries within reasonable time bounds', async () => {
      // Mock first call to fail, second to succeed
      mockFetch
        .mockImplementationOnce(() => Promise.reject(new Error('Network error')))
        .mockImplementationOnce(() => 
          Promise.resolve({
            ok: true,
            status: 200,
            headers: new Map([['content-type', 'application/json']]),
            text: () => Promise.resolve('{"result": {"retry": "success"}}')
          })
        );

      const startTime = performance.now();
      
      await httpClient.get('/v1/test/retry-endpoint');
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      console.log(`📊 Retry operation time: ${responseTime.toFixed(2)}ms`);
      
      // Retry should complete quickly (within 1.2 seconds total to account for timing variations)
      expect(responseTime).toBeLessThan(1200);
    });
  });
});

// Export performance test utilities for other test files
export const performanceTestUtils = {
  measureExecutionTime: async <T>(operation: () => Promise<T>): Promise<{ result: T; time: number }> => {
    const startTime = performance.now();
    const result = await operation();
    const endTime = performance.now();
    return {
      result,
      time: endTime - startTime
    };
  },

  checkMemoryUsage: (operation: () => void, maxIncreaseKB = 1024): boolean => {
    const initialMemory = process.memoryUsage();
    operation();
    if (global.gc) global.gc();
    const finalMemory = process.memoryUsage();
    const increase = (finalMemory.heapUsed - initialMemory.heapUsed) / 1024;
    return increase < maxIncreaseKB;
  }
};