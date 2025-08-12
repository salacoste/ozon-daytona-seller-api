export const DEFAULT_RATE_LIMITER_CONFIG = {
    requestsPerSecond: 10,
    burstCapacity: 20,
    queueCapacity: 100,
};
export class RateLimitError extends Error {
    constructor(message, retryAfter) {
        super(message);
        this.retryAfter = retryAfter;
        this.name = 'RateLimitError';
    }
}
export class TokenBucketRateLimiter {
    constructor(config = {}) {
        this.queue = [];
        this.refillTimer = null;
        this.config = { ...DEFAULT_RATE_LIMITER_CONFIG, ...config };
        this.tokens = this.config.burstCapacity;
        this.lastRefillTime = Date.now();
        this.startRefillTimer();
    }
    async acquire(timeoutMs) {
        if (this.tryAcquireToken()) {
            return;
        }
        if (this.queue.length >= this.config.queueCapacity) {
            throw new RateLimitError(`Rate limit queue full (capacity: ${this.config.queueCapacity})`, this.estimateWaitTime());
        }
        return new Promise((resolve, reject) => {
            let timeoutId;
            if (timeoutMs && timeoutMs > 0) {
                timeoutId = setTimeout(() => {
                    const index = this.queue.findIndex(req => req.timeoutId === timeoutId);
                    if (index !== -1) {
                        this.queue.splice(index, 1);
                    }
                    reject(new RateLimitError(`Rate limit timeout after ${timeoutMs}ms`, this.estimateWaitTime()));
                }, timeoutMs);
            }
            const queuedRequest = {
                resolve,
                reject,
                timestamp: Date.now(),
                timeoutId: timeoutId,
            };
            this.queue.push(queuedRequest);
        });
    }
    tryAcquire() {
        return this.tryAcquireToken();
    }
    getStats() {
        this.refillTokens();
        return {
            availableTokens: this.tokens,
            queueLength: this.queue.length,
            requestsPerSecond: this.config.requestsPerSecond,
            burstCapacity: this.config.burstCapacity,
            estimatedWaitTime: this.estimateWaitTime(),
        };
    }
    clearQueue() {
        while (this.queue.length > 0) {
            const request = this.queue.shift();
            if (request.timeoutId) {
                clearTimeout(request.timeoutId);
            }
            request.reject(new RateLimitError('Rate limiter queue cleared'));
        }
    }
    destroy() {
        if (this.refillTimer) {
            clearInterval(this.refillTimer);
            this.refillTimer = null;
        }
        this.clearQueue();
    }
    tryAcquireToken() {
        this.refillTokens();
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }
    refillTokens() {
        const now = Date.now();
        const timePassed = now - this.lastRefillTime;
        const tokensToAdd = (timePassed / 1000) * this.config.requestsPerSecond;
        if (tokensToAdd >= 1) {
            this.tokens = Math.min(this.config.burstCapacity, this.tokens + Math.floor(tokensToAdd));
            this.lastRefillTime = now;
        }
    }
    processQueue() {
        while (this.queue.length > 0 && this.tryAcquireToken()) {
            const request = this.queue.shift();
            if (request.timeoutId) {
                clearTimeout(request.timeoutId);
            }
            request.resolve();
        }
    }
    startRefillTimer() {
        this.refillTimer = setInterval(() => {
            this.refillTokens();
            this.processQueue();
        }, 100);
    }
    estimateWaitTime() {
        if (this.tokens >= 1) {
            return 0;
        }
        const timeForOneToken = 1000 / this.config.requestsPerSecond;
        const queueProcessingTime = this.queue.length * timeForOneToken;
        return Math.ceil(timeForOneToken + queueProcessingTime);
    }
}
export function createRateLimiter(options = {}) {
    return new TokenBucketRateLimiter(options);
}
export const RATE_LIMITER_CONFIGS = {
    CONSERVATIVE: {
        requestsPerSecond: 5,
        burstCapacity: 10,
        queueCapacity: 50,
    },
    STANDARD: {
        requestsPerSecond: 10,
        burstCapacity: 20,
        queueCapacity: 100,
    },
    AGGRESSIVE: {
        requestsPerSecond: 20,
        burstCapacity: 40,
        queueCapacity: 200,
    },
    OZON_API: {
        requestsPerSecond: 10,
        burstCapacity: 30,
        queueCapacity: 100,
    },
};
