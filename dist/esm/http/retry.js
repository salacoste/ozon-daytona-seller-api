export const DEFAULT_RETRY_CONFIG = {
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
export class RetryPolicy {
    constructor(config = {}, onRetry) {
        this.config = { ...DEFAULT_RETRY_CONFIG, ...config };
        this.onRetry = onRetry || undefined;
    }
    async execute(fn) {
        let lastError;
        for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
            try {
                const result = await fn();
                return result;
            }
            catch (error) {
                lastError = error;
                if (attempt >= this.config.maxRetries) {
                    break;
                }
                if (!this.isRetryableError(lastError)) {
                    break;
                }
                const delayMs = this.calculateDelay(attempt);
                if (this.onRetry) {
                    const retryAttempt = {
                        attemptNumber: attempt + 1,
                        totalAttempts: this.config.maxRetries + 1,
                        delayMs,
                        error: lastError,
                    };
                    await this.onRetry(retryAttempt);
                }
                await this.delay(delayMs);
            }
        }
        throw lastError || new Error('Unknown retry error');
    }
    isRetryableError(error) {
        const httpError = error;
        if (httpError.status && typeof httpError.status === 'number') {
            return this.config.retryableStatuses.includes(httpError.status);
        }
        const networkError = error;
        if (networkError.code) {
            return this.config.retryableErrors.includes(networkError.code);
        }
        if (error.message.includes('timeout') || error.message.includes('aborted')) {
            return true;
        }
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
    calculateDelay(attemptNumber) {
        const exponentialDelay = this.config.baseDelayMs * Math.pow(this.config.backoffFactor, attemptNumber);
        const cappedDelay = Math.min(exponentialDelay, this.config.maxDelayMs);
        if (this.config.jitter) {
            return Math.random() * cappedDelay;
        }
        return cappedDelay;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getConfig() {
        return { ...this.config };
    }
}
export function createRetryPolicy(options = {}) {
    const { onRetry, ...config } = options;
    return new RetryPolicy(config, onRetry);
}
export const RETRY_POLICIES = {
    CONSERVATIVE: createRetryPolicy({
        maxRetries: 2,
        baseDelayMs: 1000,
        maxDelayMs: 10000,
        backoffFactor: 2,
        jitter: true,
    }),
    AGGRESSIVE: createRetryPolicy({
        maxRetries: 5,
        baseDelayMs: 500,
        maxDelayMs: 30000,
        backoffFactor: 2,
        jitter: true,
    }),
    QUICK: createRetryPolicy({
        maxRetries: 3,
        baseDelayMs: 200,
        maxDelayMs: 2000,
        backoffFactor: 1.5,
        jitter: true,
    }),
    NONE: createRetryPolicy({
        maxRetries: 0,
    }),
};
