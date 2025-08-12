/**
 * Unit tests for TokenBucketRateLimiter
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TokenBucketRateLimiter, createRateLimiter, RateLimitError, RATE_LIMITER_CONFIGS } from '../../../src/http/rateLimiter';

describe('TokenBucketRateLimiter', () => {
  let rateLimitersToCleanup: TokenBucketRateLimiter[] = [];

  beforeEach(() => {
    vi.useFakeTimers();
    rateLimitersToCleanup = [];
  });

  afterEach(async () => {
    // Clean up all rate limiters to prevent unhandled rejections
    for (const rateLimiter of rateLimitersToCleanup) {
      try {
        rateLimiter.destroy();
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    rateLimitersToCleanup = [];
    
    // Run all pending timers to ensure promises are resolved
    await vi.runAllTimersAsync();
    
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic Token Acquisition', () => {
    it('should allow immediate acquisition when tokens are available', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 10,
        burstCapacity: 20,
        queueCapacity: 50,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Should acquire immediately
      await expect(rateLimiter.acquire()).resolves.toBeUndefined();
      
      const stats = rateLimiter.getStats();
      expect(stats.availableTokens).toBe(19); // Started with 20, used 1
    });

    it('should try acquire without queuing', () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 10,
        burstCapacity: 2,
        queueCapacity: 50,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Should succeed immediately
      expect(rateLimiter.tryAcquire()).toBe(true);
      expect(rateLimiter.tryAcquire()).toBe(true);
      
      // Should fail when no tokens available
      expect(rateLimiter.tryAcquire()).toBe(false);
    });

    it('should queue requests when no tokens available', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 1, // Very slow refill
        burstCapacity: 1,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use up the initial token
      expect(rateLimiter.tryAcquire()).toBe(true);
      
      // Next request should queue
      const acquirePromise = rateLimiter.acquire();
      
      // Should be queued, not resolved immediately
      const stats = rateLimiter.getStats();
      expect(stats.queueLength).toBe(1);
      expect(stats.availableTokens).toBe(0);

      // Advance time to allow token refill
      vi.advanceTimersByTime(1100); // 1.1 seconds
      
      await expect(acquirePromise).resolves.toBeUndefined();
      rateLimiter.destroy();
    });

    it('should reject when queue is full', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 1,
        burstCapacity: 1,
        queueCapacity: 2,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use initial token
      expect(rateLimiter.tryAcquire()).toBe(true);

      // Fill the queue - handle the pending promises to avoid unhandled rejections
      const promise1 = rateLimiter.acquire().catch(() => 'queue-cleared');
      const promise2 = rateLimiter.acquire().catch(() => 'queue-cleared');
      
      // This should fail due to queue capacity
      await expect(rateLimiter.acquire()).rejects.toThrow(RateLimitError);
      await expect(rateLimiter.acquire()).rejects.toThrow('Rate limit queue full');

      // Clean up the queued promises
      rateLimiter.destroy();
      await Promise.allSettled([promise1, promise2]);
    });
  });

  describe('Token Refill Mechanism', () => {
    it('should refill tokens based on elapsed time', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 10, // 1 token every 100ms
        burstCapacity: 5,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use all tokens
      for (let i = 0; i < 5; i++) {
        expect(rateLimiter.tryAcquire()).toBe(true);
      }
      expect(rateLimiter.tryAcquire()).toBe(false);

      // Advance time to refill tokens
      vi.advanceTimersByTime(300); // 300ms = 3 tokens

      const stats = rateLimiter.getStats();
      expect(stats.availableTokens).toBe(3);

      rateLimiter.destroy();
    });

    it('should not exceed burst capacity when refilling', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 10,
        burstCapacity: 5,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Wait longer than needed to fill bucket
      vi.advanceTimersByTime(2000); // 2 seconds

      const stats = rateLimiter.getStats();
      expect(stats.availableTokens).toBe(5); // Capped at burst capacity

      rateLimiter.destroy();
    });
  });

  describe('Queue Processing', () => {
    it('should process queued requests in FIFO order', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 2, // 1 token every 500ms
        burstCapacity: 1,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use initial token
      expect(rateLimiter.tryAcquire()).toBe(true);

      const results: number[] = [];
      
      // Queue multiple requests
      const promise1 = rateLimiter.acquire().then(() => results.push(1));
      const promise2 = rateLimiter.acquire().then(() => results.push(2));
      const promise3 = rateLimiter.acquire().then(() => results.push(3));

      // Advance time to process queue
      vi.advanceTimersByTime(2000);

      await Promise.all([promise1, promise2, promise3]);
      expect(results).toEqual([1, 2, 3]); // FIFO order

      rateLimiter.destroy();
    });

    it('should handle timeout for queued requests', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 1, // 1 token per second
        burstCapacity: 1,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use initial token
      expect(rateLimiter.tryAcquire()).toBe(true);

      // Queue request with short timeout (less than token refill time)
      const promise1 = rateLimiter.acquire(100); // 100ms timeout, but token refill takes 1000ms
      vi.advanceTimersByTime(150); // Advance past timeout but not enough for token refill
      await expect(promise1).rejects.toThrow(RateLimitError);
      
      const promise2 = rateLimiter.acquire(100);
      vi.advanceTimersByTime(150); // Advance past timeout but not enough for token refill
      await expect(promise2).rejects.toThrow('Rate limit timeout');

      rateLimiter.destroy();
    });
  });

  describe('Statistics and Management', () => {
    it('should provide accurate stats', () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 5,
        burstCapacity: 10,
        queueCapacity: 20,
      });
      rateLimitersToCleanup.push(rateLimiter);

      const stats = rateLimiter.getStats();
      expect(stats.availableTokens).toBe(10);
      expect(stats.queueLength).toBe(0);
      expect(stats.requestsPerSecond).toBe(5);
      expect(stats.burstCapacity).toBe(10);
      expect(typeof stats.estimatedWaitTime).toBe('number');

      rateLimiter.destroy();
    });

    it('should clear queue when requested', async () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 1,
        burstCapacity: 1,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use initial token
      expect(rateLimiter.tryAcquire()).toBe(true);

      // Queue some requests
      const promise1 = rateLimiter.acquire().catch(() => 'rejected1');
      const promise2 = rateLimiter.acquire().catch(() => 'rejected2');
      
      expect(rateLimiter.getStats().queueLength).toBe(2);

      // Clear queue
      rateLimiter.clearQueue();
      
      expect(rateLimiter.getStats().queueLength).toBe(0);
      await expect(promise1).resolves.toBe('rejected1');
      await expect(promise2).resolves.toBe('rejected2');

      rateLimiter.destroy();
    });

    it('should clean up resources when destroyed', () => {
      const rateLimiter = new TokenBucketRateLimiter();
      rateLimitersToCleanup.push(rateLimiter);
      
      // Should not throw when destroyed
      expect(() => rateLimiter.destroy()).not.toThrow();
      
      // Second destroy should also not throw
      expect(() => rateLimiter.destroy()).not.toThrow();
    });
  });

  describe('Wait Time Estimation', () => {
    it('should estimate wait time accurately', () => {
      const rateLimiter = new TokenBucketRateLimiter({
        requestsPerSecond: 4, // 250ms per token
        burstCapacity: 2,
        queueCapacity: 10,
      });
      rateLimitersToCleanup.push(rateLimiter);

      // Use all tokens
      expect(rateLimiter.tryAcquire()).toBe(true);
      expect(rateLimiter.tryAcquire()).toBe(true);

      const stats = rateLimiter.getStats();
      expect(stats.estimatedWaitTime).toBeGreaterThan(0);
      expect(stats.estimatedWaitTime).toBeLessThanOrEqual(250); // Should be ~250ms

      rateLimiter.destroy();
    });
  });

  describe('createRateLimiter helper', () => {
    it('should create rate limiter with custom options', () => {
      const rateLimiter = createRateLimiter({
        requestsPerSecond: 15,
        burstCapacity: 25,
        queueCapacity: 75,
      });
      rateLimitersToCleanup.push(rateLimiter);

      const stats = rateLimiter.getStats();
      expect(stats.requestsPerSecond).toBe(15);
      expect(stats.burstCapacity).toBe(25);
      expect(stats.availableTokens).toBe(25);
    });
  });

  describe('Predefined Configurations', () => {
    it('should provide conservative configuration', () => {
      const config = RATE_LIMITER_CONFIGS.CONSERVATIVE;
      expect(config.requestsPerSecond).toBe(5);
      expect(config.burstCapacity).toBe(10);
      expect(config.queueCapacity).toBe(50);
    });

    it('should provide standard configuration', () => {
      const config = RATE_LIMITER_CONFIGS.STANDARD;
      expect(config.requestsPerSecond).toBe(10);
      expect(config.burstCapacity).toBe(20);
      expect(config.queueCapacity).toBe(100);
    });

    it('should provide aggressive configuration', () => {
      const config = RATE_LIMITER_CONFIGS.AGGRESSIVE;
      expect(config.requestsPerSecond).toBe(20);
      expect(config.burstCapacity).toBe(40);
      expect(config.queueCapacity).toBe(200);
    });

    it('should provide Ozon API specific configuration', () => {
      const config = RATE_LIMITER_CONFIGS.OZON_API;
      expect(config.requestsPerSecond).toBe(10);
      expect(config.burstCapacity).toBe(30);
      expect(config.queueCapacity).toBe(100);
    });
  });

  describe('Error Handling', () => {
    it('should create RateLimitError with retry after information', () => {
      const error = new RateLimitError('Test error', 5000);
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(RateLimitError);
      expect(error.name).toBe('RateLimitError');
      expect(error.message).toBe('Test error');
      expect(error.retryAfter).toBe(5000);
    });
  });
});