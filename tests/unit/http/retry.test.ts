/**
 * Unit tests for RetryPolicy
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RetryPolicy, createRetryPolicy, RETRY_POLICIES } from '../../../src/http/retry';

// Helper to create network errors with proper code property
function createNetworkError(code: string): NodeJS.ErrnoException {
  const error = new Error(`${code} error`) as NodeJS.ErrnoException;
  error.code = code;
  return error;
}

describe('RetryPolicy', () => {
  let pendingPromises: Promise<any>[] = [];

  beforeEach(() => {
    vi.useFakeTimers();
    pendingPromises = [];
  });

  afterEach(async () => {
    // Wait for all pending promises to settle to avoid unhandled rejections
    if (pendingPromises.length > 0) {
      await Promise.allSettled(pendingPromises);
    }
    pendingPromises = [];
    
    // Run all pending timers
    await vi.runAllTimersAsync();
    
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic Retry Logic', () => {
    it('should succeed on first attempt if no error', async () => {
      const mockFn = vi.fn().mockResolvedValue('success');
      const retryPolicy = new RetryPolicy({ maxRetries: 3 });

      const result = await retryPolicy.execute(mockFn);

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should retry on retryable errors', async () => {
      const mockFn = vi.fn()
        .mockRejectedValueOnce(createNetworkError('ECONNRESET'))
        .mockRejectedValueOnce(createNetworkError('ECONNRESET'))
        .mockResolvedValue('success');

      const retryPolicy = new RetryPolicy({ maxRetries: 3 });

      const resultPromise = retryPolicy.execute(mockFn);
      
      // Fast-forward through delays
      await vi.runAllTimersAsync();
      
      const result = await resultPromise;

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('should not retry on non-retryable errors', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('Invalid input'));
      const retryPolicy = new RetryPolicy({ maxRetries: 3 });

      await expect(retryPolicy.execute(mockFn)).rejects.toThrow('Invalid input');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should retry on HTTP 5xx status codes', async () => {
      const error = new Error('Server Error') as any;
      error.status = 500;

      const mockFn = vi.fn()
        .mockRejectedValueOnce(error)
        .mockResolvedValue('success');

      const retryPolicy = new RetryPolicy({ maxRetries: 2 });

      const resultPromise = retryPolicy.execute(mockFn);
      await vi.runAllTimersAsync();
      const result = await resultPromise;

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should exhaust all retries and throw last error', async () => {
      const mockFn = vi.fn().mockRejectedValue(createNetworkError('ETIMEDOUT'));
      const retryPolicy = new RetryPolicy({ maxRetries: 2 });

      const executePromise = retryPolicy.execute(mockFn);
      pendingPromises.push(executePromise.catch(() => {})); // Track and handle rejection
      await vi.runAllTimersAsync();

      await expect(executePromise).rejects.toThrow('ETIMEDOUT');
      expect(mockFn).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
    });
  });

  describe('Exponential Backoff', () => {
    it('should implement exponential backoff delays', async () => {
      const mockFn = vi.fn().mockRejectedValue(createNetworkError('ECONNRESET'));

      const onRetry = vi.fn();
      const retryPolicyWithHook = new RetryPolicy({
        maxRetries: 3,
        baseDelayMs: 1000,
        backoffFactor: 2,
        jitter: false,
      }, onRetry);

      const executePromise = retryPolicyWithHook.execute(mockFn);
      pendingPromises.push(executePromise.catch(() => {})); // Track and handle rejection
      await vi.runAllTimersAsync();

      await expect(executePromise).rejects.toThrow('ECONNRESET');

      // Check that delays follow exponential backoff pattern
      expect(onRetry).toHaveBeenCalledTimes(3);
      expect(onRetry.mock.calls[0][0].delayMs).toBe(1000); // 1000 * 2^0
      expect(onRetry.mock.calls[1][0].delayMs).toBe(2000); // 1000 * 2^1
      expect(onRetry.mock.calls[2][0].delayMs).toBe(4000); // 1000 * 2^2
    });

    it('should apply jitter when enabled', async () => {
      const mockFn = vi.fn().mockRejectedValue(createNetworkError('ECONNRESET'));
      const onRetry = vi.fn();
      
      const retryPolicy = new RetryPolicy({
        maxRetries: 2,
        baseDelayMs: 1000,
        backoffFactor: 2,
        jitter: true,
      }, onRetry);

      const executePromise = retryPolicy.execute(mockFn);
      pendingPromises.push(executePromise.catch(() => {})); // Track and handle rejection
      await vi.runAllTimersAsync();

      await expect(executePromise).rejects.toThrow('ECONNRESET');

      // With jitter, delays should be between 0 and calculated exponential delay
      expect(onRetry).toHaveBeenCalledTimes(2);
      const firstDelay = onRetry.mock.calls[0][0].delayMs;
      const secondDelay = onRetry.mock.calls[1][0].delayMs;
      
      expect(firstDelay).toBeGreaterThanOrEqual(0);
      expect(firstDelay).toBeLessThanOrEqual(1000);
      expect(secondDelay).toBeGreaterThanOrEqual(0);
      expect(secondDelay).toBeLessThanOrEqual(2000);
    });

    it('should respect maxDelayMs cap', async () => {
      const mockFn = vi.fn().mockRejectedValue(createNetworkError('ECONNRESET'));
      const onRetry = vi.fn();

      const retryPolicy = new RetryPolicy({
        maxRetries: 5,
        baseDelayMs: 1000,
        backoffFactor: 2,
        maxDelayMs: 3000,
        jitter: false,
      }, onRetry);

      const executePromise = retryPolicy.execute(mockFn);
      pendingPromises.push(executePromise.catch(() => {})); // Track and handle rejection
      await vi.runAllTimersAsync();

      await expect(executePromise).rejects.toThrow('ECONNRESET');

      // Delays should be capped at maxDelayMs
      const delays = onRetry.mock.calls.map(call => call[0].delayMs);
      expect(delays).toEqual([1000, 2000, 3000, 3000, 3000]); // Capped at 3000
    });
  });

  describe('Retry Hook', () => {
    it('should call retry hook with correct attempt information', async () => {
      const mockFn = vi.fn().mockRejectedValue(createNetworkError('ECONNRESET'));
      const onRetry = vi.fn();

      const retryPolicy = new RetryPolicy({
        maxRetries: 2,
        baseDelayMs: 500,
      }, onRetry);

      const executePromise = retryPolicy.execute(mockFn);
      pendingPromises.push(executePromise.catch(() => {})); // Track and handle rejection
      await vi.runAllTimersAsync();

      await expect(executePromise).rejects.toThrow('ECONNRESET');

      expect(onRetry).toHaveBeenCalledTimes(2);
      
      // First retry attempt
      expect(onRetry.mock.calls[0][0]).toMatchObject({
        attemptNumber: 1,
        totalAttempts: 3,
        error: expect.any(Error),
      });

      // Second retry attempt
      expect(onRetry.mock.calls[1][0]).toMatchObject({
        attemptNumber: 2,
        totalAttempts: 3,
        error: expect.any(Error),
      });
    });
  });

  describe('Predefined Retry Policies', () => {
    it('should provide conservative retry policy', () => {
      const config = RETRY_POLICIES.CONSERVATIVE.getConfig();
      expect(config.maxRetries).toBe(2);
      expect(config.baseDelayMs).toBe(1000);
      expect(config.jitter).toBe(true);
    });

    it('should provide aggressive retry policy', () => {
      const config = RETRY_POLICIES.AGGRESSIVE.getConfig();
      expect(config.maxRetries).toBe(5);
      expect(config.baseDelayMs).toBe(500);
    });

    it('should provide quick retry policy', () => {
      const config = RETRY_POLICIES.QUICK.getConfig();
      expect(config.maxRetries).toBe(3);
      expect(config.baseDelayMs).toBe(200);
      expect(config.backoffFactor).toBe(1.5);
    });

    it('should provide no retry policy', () => {
      const config = RETRY_POLICIES.NONE.getConfig();
      expect(config.maxRetries).toBe(0);
    });
  });

  describe('createRetryPolicy helper', () => {
    it('should create retry policy with custom options', () => {
      const onRetry = vi.fn();
      const policy = createRetryPolicy({
        maxRetries: 4,
        baseDelayMs: 2000,
        onRetry,
      });

      const config = policy.getConfig();
      expect(config.maxRetries).toBe(4);
      expect(config.baseDelayMs).toBe(2000);
    });
  });
});