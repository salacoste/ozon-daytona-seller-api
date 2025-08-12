"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OzonApiError = void 0;
class OzonApiError extends Error {
    constructor(options) {
        super(options.message);
        this.name = 'OzonApiError';
        this.httpStatus = options.httpStatus;
        this.code = options.code;
        this.details = options.details ?? [];
        if (options.operationId !== undefined) {
            this.operationId = options.operationId;
        }
        if (options.requestId !== undefined) {
            this.requestId = options.requestId;
        }
        if (options.url !== undefined) {
            this.url = options.url;
        }
        this.timestamp = new Date();
        if (options.cause) {
            this.cause = options.cause;
        }
        Object.setPrototypeOf(this, OzonApiError.prototype);
    }
    static fromRpcStatus(httpStatus, rpcStatus, context) {
        return new OzonApiError({
            httpStatus,
            code: rpcStatus.code,
            message: rpcStatus.message || `RPC Error ${rpcStatus.code}`,
            details: rpcStatus.details ?? [],
            ...(context?.operationId !== undefined && { operationId: context.operationId }),
            ...(context?.requestId !== undefined && { requestId: context.requestId }),
            ...(context?.url !== undefined && { url: context.url }),
        });
    }
    static async fromResponse(response, context) {
        const requestId = context?.requestId ?? response.headers.get('x-request-id') ?? undefined;
        try {
            const responseText = await response.text();
            if (responseText) {
                try {
                    const responseData = JSON.parse(responseText);
                    if (responseData.error || responseData.code !== undefined) {
                        const rpcStatus = responseData.error || responseData;
                        return OzonApiError.fromRpcStatus(response.status, rpcStatus, {
                            ...(context?.operationId !== undefined && { operationId: context.operationId }),
                            ...(requestId !== undefined && { requestId }),
                            ...(response.url && { url: response.url }),
                        });
                    }
                }
                catch {
                }
            }
            return new OzonApiError({
                httpStatus: response.status,
                code: response.status,
                message: responseText || response.statusText || `HTTP ${response.status}`,
                ...(context?.operationId !== undefined && { operationId: context.operationId }),
                ...(requestId !== undefined && { requestId }),
                ...(response.url && { url: response.url }),
            });
        }
        catch (error) {
            return new OzonApiError({
                httpStatus: response.status,
                code: response.status,
                message: `Failed to parse error response: ${response.statusText}`,
                ...(context?.operationId !== undefined && { operationId: context.operationId }),
                ...(requestId !== undefined && { requestId }),
                ...(response.url && { url: response.url }),
                cause: error,
            });
        }
    }
    isClientError() {
        return this.httpStatus >= 400 && this.httpStatus < 500;
    }
    isServerError() {
        return this.httpStatus >= 500 && this.httpStatus < 600;
    }
    isRetryable() {
        if (this.isServerError()) {
            return true;
        }
        const retryableClientErrors = [408, 429];
        return retryableClientErrors.includes(this.httpStatus);
    }
    getRetryAfter() {
        const retryDetail = this.details.find(detail => detail['@type']?.includes('RetryInfo') ||
            detail.code === 'RATE_LIMIT_EXCEEDED');
        if (retryDetail && typeof retryDetail.retryDelay === 'number') {
            return retryDetail.retryDelay;
        }
        if (this.httpStatus === 429) {
            return 60;
        }
        if (this.httpStatus === 503) {
            return 30;
        }
        return undefined;
    }
    getFieldErrors() {
        const fieldErrors = {};
        for (const detail of this.details) {
            if (detail.field && detail.description) {
                if (!fieldErrors[detail.field]) {
                    fieldErrors[detail.field] = [];
                }
                fieldErrors[detail.field].push(detail.description);
            }
        }
        return fieldErrors;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            httpStatus: this.httpStatus,
            code: this.code,
            details: this.details,
            operationId: this.operationId,
            requestId: this.requestId,
            url: this.url,
            timestamp: this.timestamp.toISOString(),
            stack: this.stack,
        };
    }
    toString() {
        const parts = [
            `${this.name}: ${this.message}`,
            `HTTP ${this.httpStatus}`,
            `Code ${this.code}`,
        ];
        if (this.operationId) {
            parts.push(`Operation: ${this.operationId}`);
        }
        if (this.requestId) {
            parts.push(`Request: ${this.requestId}`);
        }
        if (this.details.length > 0) {
            parts.push(`Details: ${this.details.length} error(s)`);
        }
        return parts.join(' | ');
    }
}
exports.OzonApiError = OzonApiError;
