export interface IRpcStatus {
    readonly code: number;
    readonly message: string;
    readonly details?: readonly IRpcStatusDetail[];
}
export interface IRpcStatusDetail {
    readonly '@type'?: string;
    readonly field?: string;
    readonly description?: string;
    readonly code?: string;
    readonly message?: string;
    readonly [key: string]: unknown;
}
export declare class OzonApiError extends Error {
    readonly name: string;
    readonly httpStatus: number;
    readonly code: number;
    readonly details: readonly IRpcStatusDetail[];
    readonly operationId?: string;
    readonly requestId?: string;
    readonly timestamp: Date;
    readonly url?: string;
    readonly cause?: Error;
    constructor(options: {
        readonly httpStatus: number;
        readonly code: number;
        readonly message: string;
        readonly details?: readonly IRpcStatusDetail[];
        readonly operationId?: string;
        readonly requestId?: string;
        readonly url?: string;
        readonly cause?: Error;
    });
    static fromRpcStatus(httpStatus: number, rpcStatus: IRpcStatus, context?: {
        readonly operationId?: string;
        readonly requestId?: string;
        readonly url?: string;
    }): OzonApiError;
    static fromResponse(response: Response, context?: {
        readonly operationId?: string;
        readonly requestId?: string;
    }): Promise<OzonApiError>;
    isClientError(): boolean;
    isServerError(): boolean;
    isRetryable(): boolean;
    getRetryAfter(): number | undefined;
    getFieldErrors(): Record<string, string[]>;
    toJSON(): Record<string, unknown>;
    toString(): string;
}
