import { OzonApiError } from './OzonApiError';
export class RateLimitError extends OzonApiError {
    constructor(options) {
        super({
            httpStatus: options.httpStatus ?? 429,
            code: options.code ?? 429,
            message: options.message ?? 'Rate limit exceeded',
            ...(options.details !== undefined && { details: options.details }),
            ...(options.operationId !== undefined && { operationId: options.operationId }),
            ...(options.requestId !== undefined && { requestId: options.requestId }),
            ...(options.url !== undefined && { url: options.url }),
            ...(options.cause !== undefined && { cause: options.cause }),
        });
        this.name = 'RateLimitError';
        this.retryAfter = options.retryAfter ?? this.getRetryAfter() ?? 60;
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
    static fromOzonApiError(error, retryAfter) {
        return new RateLimitError({
            httpStatus: error.httpStatus,
            code: error.code,
            message: error.message,
            details: error.details,
            ...(error.operationId !== undefined && { operationId: error.operationId }),
            ...(error.requestId !== undefined && { requestId: error.requestId }),
            ...(error.url !== undefined && { url: error.url }),
            ...(retryAfter !== undefined && { retryAfter }),
        });
    }
}
export class AuthError extends OzonApiError {
    constructor(options) {
        super({
            httpStatus: options.httpStatus ?? (options.authType === 'forbidden' ? 403 : 401),
            code: options.code ?? (options.authType === 'forbidden' ? 403 : 401),
            message: options.message ?? AuthError.getDefaultMessage(options.authType),
            ...(options.details !== undefined && { details: options.details }),
            ...(options.operationId !== undefined && { operationId: options.operationId }),
            ...(options.requestId !== undefined && { requestId: options.requestId }),
            ...(options.url !== undefined && { url: options.url }),
            ...(options.cause !== undefined && { cause: options.cause }),
        });
        this.name = 'AuthError';
        Object.setPrototypeOf(this, AuthError.prototype);
        this.authType = options.authType ?? this.inferAuthType();
    }
    static fromOzonApiError(error) {
        return new AuthError({
            httpStatus: error.httpStatus,
            code: error.code,
            message: error.message,
            details: error.details,
            ...(error.operationId !== undefined && { operationId: error.operationId }),
            ...(error.requestId !== undefined && { requestId: error.requestId }),
            ...(error.url !== undefined && { url: error.url }),
        });
    }
    static getDefaultMessage(authType) {
        switch (authType) {
            case 'missing':
                return 'Authentication credentials are missing';
            case 'invalid':
                return 'Authentication credentials are invalid';
            case 'expired':
                return 'Authentication credentials have expired';
            case 'forbidden':
                return 'Access forbidden - insufficient permissions';
            default:
                return 'Authentication failed';
        }
    }
    inferAuthType() {
        if (this.httpStatus === 403) {
            return 'forbidden';
        }
        const message = this.message.toLowerCase();
        if (message.includes('missing') || message.includes('required')) {
            return 'missing';
        }
        if (message.includes('expired') || message.includes('timeout')) {
            return 'expired';
        }
        if (message.includes('invalid') || message.includes('malformed')) {
            return 'invalid';
        }
        return 'invalid';
    }
    needsRefresh() {
        return this.authType === 'expired';
    }
    isPermissionIssue() {
        return this.authType === 'forbidden';
    }
}
export class ValidationError extends OzonApiError {
    constructor(options) {
        super({
            httpStatus: options.httpStatus ?? 400,
            code: options.code ?? 400,
            message: options.message ?? 'Validation failed',
            ...(options.details !== undefined && { details: options.details }),
            ...(options.operationId !== undefined && { operationId: options.operationId }),
            ...(options.requestId !== undefined && { requestId: options.requestId }),
            ...(options.url !== undefined && { url: options.url }),
            ...(options.cause !== undefined && { cause: options.cause }),
        });
        this.name = 'ValidationError';
        this.fieldErrors = options.fieldErrors ?? this.getFieldErrors();
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    static fromOzonApiError(error) {
        return new ValidationError({
            httpStatus: error.httpStatus,
            code: error.code,
            message: error.message,
            details: error.details,
            ...(error.operationId !== undefined && { operationId: error.operationId }),
            ...(error.requestId !== undefined && { requestId: error.requestId }),
            ...(error.url !== undefined && { url: error.url }),
        });
    }
    getFieldError(field) {
        return this.fieldErrors[field] ?? [];
    }
    hasFieldError(field) {
        return field in this.fieldErrors && (this.fieldErrors[field]?.length || 0) > 0;
    }
    getErrorFields() {
        return Object.keys(this.fieldErrors);
    }
    getErrorCount() {
        return Object.values(this.fieldErrors).reduce((sum, errors) => sum + errors.length, 0);
    }
    getValidationSummary() {
        const fields = this.getErrorFields();
        if (fields.length === 0) {
            return this.message;
        }
        const fieldSummaries = fields.map(field => {
            const errors = this.fieldErrors[field] || [];
            return `${field}: ${errors.join(', ')}`;
        });
        return `Validation failed: ${fieldSummaries.join('; ')}`;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            fieldErrors: this.fieldErrors,
            errorCount: this.getErrorCount(),
        };
    }
}
export class NetworkError extends OzonApiError {
    constructor(options) {
        super({
            httpStatus: 0,
            code: 0,
            message: options.message,
            ...(options.operationId !== undefined && { operationId: options.operationId }),
            ...(options.url !== undefined && { url: options.url }),
            ...(options.cause !== undefined && { cause: options.cause }),
        });
        this.name = 'NetworkError';
        if (options.networkCode !== undefined) {
            this.networkCode = options.networkCode;
        }
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
    static fromError(error, context) {
        const networkError = error;
        return new NetworkError({
            message: error.message,
            ...(networkError.code !== undefined && { networkCode: networkError.code }),
            ...(context?.operationId !== undefined && { operationId: context.operationId }),
            ...(context?.url !== undefined && { url: context.url }),
            cause: error,
        });
    }
    isTimeout() {
        return this.networkCode === 'ETIMEDOUT' ||
            this.message.toLowerCase().includes('timeout');
    }
    isConnectionError() {
        const connectionCodes = ['ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND', 'EHOSTUNREACH'];
        return connectionCodes.includes(this.networkCode ?? '');
    }
    isRetryable() {
        return true;
    }
}
