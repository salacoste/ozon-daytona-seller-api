export interface IRateLimiterConfig {
    readonly requestsPerSecond: number;
    readonly burstCapacity: number;
    readonly queueCapacity: number;
}
export declare const DEFAULT_RATE_LIMITER_CONFIG: IRateLimiterConfig;
export declare class RateLimitError extends Error {
    readonly retryAfter?: number | undefined;
    constructor(message: string, retryAfter?: number | undefined);
}
export declare class TokenBucketRateLimiter {
    private readonly config;
    private tokens;
    private lastRefillTime;
    private readonly queue;
    private refillTimer;
    constructor(config?: Partial<IRateLimiterConfig>);
    acquire(timeoutMs?: number): Promise<void>;
    tryAcquire(): boolean;
    getStats(): {
        readonly availableTokens: number;
        readonly queueLength: number;
        readonly requestsPerSecond: number;
        readonly burstCapacity: number;
        readonly estimatedWaitTime: number;
    };
    clearQueue(): void;
    destroy(): void;
    private tryAcquireToken;
    private refillTokens;
    private processQueue;
    private startRefillTimer;
    private estimateWaitTime;
}
export declare function createRateLimiter(options?: {
    requestsPerSecond?: number;
    burstCapacity?: number;
    queueCapacity?: number;
}): TokenBucketRateLimiter;
export declare const RATE_LIMITER_CONFIGS: {
    CONSERVATIVE: {
        requestsPerSecond: number;
        burstCapacity: number;
        queueCapacity: number;
    };
    STANDARD: {
        requestsPerSecond: number;
        burstCapacity: number;
        queueCapacity: number;
    };
    AGGRESSIVE: {
        requestsPerSecond: number;
        burstCapacity: number;
        queueCapacity: number;
    };
    OZON_API: {
        requestsPerSecond: number;
        burstCapacity: number;
        queueCapacity: number;
    };
};
