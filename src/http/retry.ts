/**
 * Retry policy implementation with exponential backoff and jitter
 */

/**
 * Retry policy configuration
 */
export interface IRetryConfig {
  readonly maxRetries: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly backoffFactor: number;
  readonly jitter: boolean;
  readonly retryableStatuses: number[];
  readonly retryableErrors: string[];
}

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_CONFIG: IRetryConfig = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  backoffFactor: 2,
  jitter: true,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  retryableErrors: [
    'ECONNRESET',
    'ECONNREFUSED', 
    'ENOTFOUND',
    'ENETDOWN',
    'ENETUNREACH',
    'EHOSTDOWN',
    'EHOSTUNREACH',
    'EPIPE',
    'ETIMEDOUT',
  ],
};

/**
 * Retry attempt information
 */
export interface IRetryAttempt {
  readonly attemptNumber: number;
  readonly totalAttempts: number;
  readonly delayMs: number;
  readonly error: Error;
}

/**
 * Retry hook - called before each retry attempt
 */
export type RetryHook = (attempt: IRetryAttempt) => void | Promise<void>;

/**
 * Retry policy implementation
 */
export class RetryPolicy {
  private readonly config: IRetryConfig;
  private readonly onRetry: RetryHook | undefined;

  constructor(config: Partial<IRetryConfig> = {}, onRetry?: RetryHook) {
    this.config = { ...DEFAULT_RETRY_CONFIG, ...config };
    this.onRetry = onRetry || undefined;
  }

  /**
   * Execute function with retry policy
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await fn();
        return result;
      } catch (error) {
        lastError = error as Error;

        // Don't retry on the last attempt
        if (attempt >= this.config.maxRetries) {
          break;
        }

        // Check if error is retryable
        if (!this.isRetryableError(lastError)) {
          break;
        }

        // Calculate delay for this attempt
        const delayMs = this.calculateDelay(attempt);

        // Call retry hook if provided
        if (this.onRetry) {
          const retryAttempt: IRetryAttempt = {
            attemptNumber: attempt + 1,
            totalAttempts: this.config.maxRetries + 1,
            delayMs,
            error: lastError,
          };
          await this.onRetry(retryAttempt);
        }

        // Wait before retry
        await this.delay(delayMs);
      }
    }

    // All retries exhausted, throw the last error
    throw lastError || new Error('Unknown retry error');
  }

  /**
   * Check if error is retryable based on configuration
   */
  private isRetryableError(error: Error): boolean {
    // Check for HTTP status codes (assume error has status property)
    const httpError = error as any;
    if (httpError.status && typeof httpError.status === 'number') {
      return this.config.retryableStatuses.includes(httpError.status);
    }

    // Check for network error codes
    const networkError = error as NodeJS.ErrnoException;
    if (networkError.code) {
      return this.config.retryableErrors.includes(networkError.code);
    }

    // Check for timeout errors
    if (error.message.includes('timeout') || error.message.includes('aborted')) {
      return true;
    }

    // Check for network-related error messages
    const networkMessages = [
      'network error',
      'connection refused',
      'connection reset',
      'connection timeout',
      'dns lookup failed',
      'socket hang up',
    ];

    const errorMessage = error.message.toLowerCase();
    return networkMessages.some(msg => errorMessage.includes(msg));
  }

  /**
   * Calculate delay for retry attempt with exponential backoff and jitter
   */
  private calculateDelay(attemptNumber: number): number {
    // Exponential backoff: baseDelay * (backoffFactor ^ attemptNumber)
    const exponentialDelay = this.config.baseDelayMs * Math.pow(this.config.backoffFactor, attemptNumber);

    // Cap the delay at maxDelayMs
    const cappedDelay = Math.min(exponentialDelay, this.config.maxDelayMs);

    // Apply jitter if enabled
    if (this.config.jitter) {
      // Full jitter: random between 0 and cappedDelay
      return Math.random() * cappedDelay;
    }

    return cappedDelay;
  }

  /**
   * Delay execution for specified milliseconds
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current retry configuration
   */
  getConfig(): IRetryConfig {
    return { ...this.config };
  }
}

/**
 * Utility function to create retry policy with common configurations
 */
export function createRetryPolicy(options: {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  jitter?: boolean;
  onRetry?: RetryHook;
} = {}): RetryPolicy {
  const { onRetry, ...config } = options;
  return new RetryPolicy(config, onRetry);
}

/**
 * Predefined retry policies for common scenarios
 */
export const RETRY_POLICIES = {
  /**
   * Conservative retry policy for production
   */
  CONSERVATIVE: createRetryPolicy({
    maxRetries: 2,
    baseDelayMs: 1000,
    maxDelayMs: 10000,
    backoffFactor: 2,
    jitter: true,
  }),

  /**
   * Aggressive retry policy for development
   */
  AGGRESSIVE: createRetryPolicy({
    maxRetries: 5,
    baseDelayMs: 500,
    maxDelayMs: 30000,
    backoffFactor: 2,
    jitter: true,
  }),

  /**
   * Quick retry policy for fast operations
   */
  QUICK: createRetryPolicy({
    maxRetries: 3,
    baseDelayMs: 200,
    maxDelayMs: 2000,
    backoffFactor: 1.5,
    jitter: true,
  }),

  /**
   * No retry policy
   */
  NONE: createRetryPolicy({
    maxRetries: 0,
  }),
};