import { OzonApiError, type IRpcStatus } from './OzonApiError';
import { NetworkError } from './SpecializedErrors';
export interface IErrorContext {
    readonly operationId?: string;
    readonly requestId?: string;
    readonly url?: string;
}
export declare class ErrorFactory {
    static fromResponse(response: Response, context?: IErrorContext): Promise<OzonApiError>;
    static fromRpcStatus(httpStatus: number, rpcStatus: IRpcStatus, context?: IErrorContext): OzonApiError;
    static fromNetworkError(error: Error, context?: IErrorContext): NetworkError;
    static fromUnknownError(error: unknown, context?: IErrorContext): OzonApiError;
    private static mapToSpecializedError;
    private static isRateLimitError;
    private static isAuthError;
    private static isValidationError;
}
export declare class ErrorUtils {
    static isRetryable(error: unknown): boolean;
    static getRetryDelay(error: unknown): number | undefined;
    static getRequestId(error: unknown): string | undefined;
    static isAuthenticationError(error: unknown): boolean;
    static isValidationError(error: unknown): boolean;
    static isRateLimitError(error: unknown): boolean;
    static isNetworkError(error: unknown): boolean;
    static getUserMessage(error: unknown): string;
    static serialize(error: unknown): Record<string, unknown>;
}
