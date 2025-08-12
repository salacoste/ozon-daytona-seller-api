export interface IRetryConfig {
    readonly maxRetries: number;
    readonly baseDelayMs: number;
    readonly maxDelayMs: number;
    readonly backoffFactor: number;
    readonly jitter: boolean;
    readonly retryableStatuses: number[];
    readonly retryableErrors: string[];
}
export declare const DEFAULT_RETRY_CONFIG: IRetryConfig;
export interface IRetryAttempt {
    readonly attemptNumber: number;
    readonly totalAttempts: number;
    readonly delayMs: number;
    readonly error: Error;
}
export type RetryHook = (attempt: IRetryAttempt) => void | Promise<void>;
export declare class RetryPolicy {
    private readonly config;
    private readonly onRetry;
    constructor(config?: Partial<IRetryConfig>, onRetry?: RetryHook);
    execute<T>(fn: () => Promise<T>): Promise<T>;
    private isRetryableError;
    private calculateDelay;
    private delay;
    getConfig(): IRetryConfig;
}
export declare function createRetryPolicy(options?: {
    maxRetries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    backoffFactor?: number;
    jitter?: boolean;
    onRetry?: RetryHook;
}): RetryPolicy;
export declare const RETRY_POLICIES: {
    CONSERVATIVE: RetryPolicy;
    AGGRESSIVE: RetryPolicy;
    QUICK: RetryPolicy;
    NONE: RetryPolicy;
};
