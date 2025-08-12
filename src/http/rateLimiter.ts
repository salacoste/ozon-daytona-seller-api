/**
 * Token bucket rate limiter implementation
 */

/**
 * Rate limiter configuration
 */
export interface IRateLimiterConfig {
  readonly requestsPerSecond: number;
  readonly burstCapacity: number;
  readonly queueCapacity: number;
}

/**
 * Default rate limiter configuration
 */
export const DEFAULT_RATE_LIMITER_CONFIG: IRateLimiterConfig = {
  requestsPerSecond: 10,
  burstCapacity: 20,
  queueCapacity: 100,
};

/**
 * Rate limit error
 */
export class RateLimitError extends Error {
  constructor(
    message: string,
    public readonly retryAfter?: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

/**
 * Queued request
 */
interface IQueuedRequest {
  readonly resolve: (value: void) => void;
  readonly reject: (error: Error) => void;
  readonly timestamp: number;
  readonly timeoutId: NodeJS.Timeout | undefined;
}

/**
 * Token bucket rate limiter
 */
export class TokenBucketRateLimiter {
  private readonly config: IRateLimiterConfig;
  private tokens: number;
  private lastRefillTime: number;
  private readonly queue: IQueuedRequest[] = [];
  private refillTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<IRateLimiterConfig> = {}) {
    this.config = { ...DEFAULT_RATE_LIMITER_CONFIG, ...config };
    this.tokens = this.config.burstCapacity;
    this.lastRefillTime = Date.now();
    
    // Start refill timer
    this.startRefillTimer();
  }

  /**
   * Acquire permission to make a request
   */
  async acquire(timeoutMs?: number): Promise<void> {
    // Try to acquire token immediately
    if (this.tryAcquireToken()) {
      return;
    }

    // Check queue capacity
    if (this.queue.length >= this.config.queueCapacity) {
      throw new RateLimitError(
        `Rate limit queue full (capacity: ${this.config.queueCapacity})`,
        this.estimateWaitTime()
      );
    }

    // Queue the request
    return new Promise<void>((resolve, reject) => {
      let timeoutId: NodeJS.Timeout | undefined;

      // Setup timeout if specified
      if (timeoutMs && timeoutMs > 0) {
        timeoutId = setTimeout(() => {
          // Remove from queue
          const index = this.queue.findIndex(req => req.timeoutId === timeoutId);
          if (index !== -1) {
            this.queue.splice(index, 1);
          }
          reject(new RateLimitError(
            `Rate limit timeout after ${timeoutMs}ms`,
            this.estimateWaitTime()
          ));
        }, timeoutMs);
      }

      const queuedRequest: IQueuedRequest = {
        resolve,
        reject,
        timestamp: Date.now(),
        timeoutId: timeoutId as NodeJS.Timeout | undefined,
      };

      this.queue.push(queuedRequest);
    });
  }

  /**
   * Try to acquire token immediately without queuing
   */
  tryAcquire(): boolean {
    return this.tryAcquireToken();
  }

  /**
   * Get current rate limiter stats
   */
  getStats(): {
    readonly availableTokens: number;
    readonly queueLength: number;
    readonly requestsPerSecond: number;
    readonly burstCapacity: number;
    readonly estimatedWaitTime: number;
  } {
    this.refillTokens(); // Update tokens before returning stats
    
    return {
      availableTokens: this.tokens,
      queueLength: this.queue.length,
      requestsPerSecond: this.config.requestsPerSecond,
      burstCapacity: this.config.burstCapacity,
      estimatedWaitTime: this.estimateWaitTime(),
    };
  }

  /**
   * Clear all queued requests
   */
  clearQueue(): void {
    while (this.queue.length > 0) {
      const request = this.queue.shift()!;
      if (request.timeoutId) {
        clearTimeout(request.timeoutId);
      }
      request.reject(new RateLimitError('Rate limiter queue cleared'));
    }
  }

  /**
   * Destroy the rate limiter and clear resources
   */
  destroy(): void {
    // Clear refill timer
    if (this.refillTimer) {
      clearInterval(this.refillTimer);
      this.refillTimer = null;
    }

    // Clear queue
    this.clearQueue();
  }

  /**
   * Try to acquire a token immediately
   */
  private tryAcquireToken(): boolean {
    this.refillTokens();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }

  /**
   * Refill tokens based on elapsed time
   */
  private refillTokens(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefillTime;
    const tokensToAdd = (timePassed / 1000) * this.config.requestsPerSecond;

    if (tokensToAdd >= 1) {
      this.tokens = Math.min(
        this.config.burstCapacity,
        this.tokens + Math.floor(tokensToAdd)
      );
      this.lastRefillTime = now;
    }
  }

  /**
   * Process queued requests
   */
  private processQueue(): void {
    while (this.queue.length > 0 && this.tryAcquireToken()) {
      const request = this.queue.shift()!;
      
      // Clear timeout if exists
      if (request.timeoutId) {
        clearTimeout(request.timeoutId);
      }
      
      // Resolve the queued request
      request.resolve();
    }
  }

  /**
   * Start the token refill timer
   */
  private startRefillTimer(): void {
    // Refill tokens and process queue every 100ms
    this.refillTimer = setInterval(() => {
      this.refillTokens();
      this.processQueue();
    }, 100);
  }

  /**
   * Estimate wait time for next available token
   */
  private estimateWaitTime(): number {
    if (this.tokens >= 1) {
      return 0;
    }

    // Calculate time needed to get at least 1 token
    const timeForOneToken = 1000 / this.config.requestsPerSecond; // ms per token
    
    // Add queue processing time
    const queueProcessingTime = this.queue.length * timeForOneToken;
    
    return Math.ceil(timeForOneToken + queueProcessingTime);
  }
}

/**
 * Utility function to create rate limiter with common configurations
 */
export function createRateLimiter(options: {
  requestsPerSecond?: number;
  burstCapacity?: number;
  queueCapacity?: number;
} = {}): TokenBucketRateLimiter {
  return new TokenBucketRateLimiter(options);
}

/**
 * Predefined rate limiter configurations
 */
export const RATE_LIMITER_CONFIGS = {
  /**
   * Conservative rate limiting for production
   */
  CONSERVATIVE: {
    requestsPerSecond: 5,
    burstCapacity: 10,
    queueCapacity: 50,
  },

  /**
   * Standard rate limiting for general use
   */
  STANDARD: {
    requestsPerSecond: 10,
    burstCapacity: 20,
    queueCapacity: 100,
  },

  /**
   * Aggressive rate limiting for high throughput
   */
  AGGRESSIVE: {
    requestsPerSecond: 20,
    burstCapacity: 40,
    queueCapacity: 200,
  },

  /**
   * Ozon API recommended limits
   */
  OZON_API: {
    requestsPerSecond: 10, // Based on Ozon API documentation
    burstCapacity: 30,
    queueCapacity: 100,
  },
};