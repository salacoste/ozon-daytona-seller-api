import { OzonApiError, type IRpcStatusDetail } from './OzonApiError';
export declare class RateLimitError extends OzonApiError {
    readonly name: string;
    readonly retryAfter?: number;
    constructor(options: {
        readonly httpStatus?: number;
        readonly code?: number;
        readonly message?: string;
        readonly details?: readonly IRpcStatusDetail[];
        readonly operationId?: string;
        readonly requestId?: string;
        readonly url?: string;
        readonly retryAfter?: number;
        readonly cause?: Error;
    });
    static fromOzonApiError(error: OzonApiError, retryAfter?: number): RateLimitError;
}
export declare class AuthError extends OzonApiError {
    readonly name: string;
    readonly authType: 'missing' | 'invalid' | 'expired' | 'forbidden';
    constructor(options: {
        readonly httpStatus?: number;
        readonly code?: number;
        readonly message?: string;
        readonly details?: readonly IRpcStatusDetail[];
        readonly operationId?: string;
        readonly requestId?: string;
        readonly url?: string;
        readonly authType?: 'missing' | 'invalid' | 'expired' | 'forbidden';
        readonly cause?: Error;
    });
    static fromOzonApiError(error: OzonApiError): AuthError;
    private static getDefaultMessage;
    private inferAuthType;
    needsRefresh(): boolean;
    isPermissionIssue(): boolean;
}
export declare class ValidationError extends OzonApiError {
    readonly name: string;
    readonly fieldErrors: Record<string, string[]>;
    constructor(options: {
        readonly httpStatus?: number;
        readonly code?: number;
        readonly message?: string;
        readonly details?: readonly IRpcStatusDetail[];
        readonly operationId?: string;
        readonly requestId?: string;
        readonly url?: string;
        readonly fieldErrors?: Record<string, string[]>;
        readonly cause?: Error;
    });
    static fromOzonApiError(error: OzonApiError): ValidationError;
    getFieldError(field: string): string[];
    hasFieldError(field: string): boolean;
    getErrorFields(): string[];
    getErrorCount(): number;
    getValidationSummary(): string;
    toJSON(): Record<string, unknown>;
}
export declare class NetworkError extends OzonApiError {
    readonly name: string;
    readonly networkCode?: string;
    constructor(options: {
        readonly message: string;
        readonly networkCode?: string;
        readonly operationId?: string;
        readonly url?: string;
        readonly cause?: Error;
    });
    static fromError(error: Error, context?: {
        operationId?: string;
        url?: string;
    }): NetworkError;
    isTimeout(): boolean;
    isConnectionError(): boolean;
    isRetryable(): boolean;
}
