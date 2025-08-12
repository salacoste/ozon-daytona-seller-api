"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUtils = exports.ErrorFactory = void 0;
const OzonApiError_1 = require("./OzonApiError");
const SpecializedErrors_1 = require("./SpecializedErrors");
class ErrorFactory {
    static async fromResponse(response, context) {
        const baseError = await OzonApiError_1.OzonApiError.fromResponse(response, context);
        return this.mapToSpecializedError(baseError);
    }
    static fromRpcStatus(httpStatus, rpcStatus, context) {
        const baseError = OzonApiError_1.OzonApiError.fromRpcStatus(httpStatus, rpcStatus, context);
        return this.mapToSpecializedError(baseError);
    }
    static fromNetworkError(error, context) {
        return SpecializedErrors_1.NetworkError.fromError(error, context);
    }
    static fromUnknownError(error, context) {
        if (error instanceof OzonApiError_1.OzonApiError) {
            return error;
        }
        if (error instanceof Error) {
            const networkError = error;
            if (networkError.code) {
                return this.fromNetworkError(error, context);
            }
            return new OzonApiError_1.OzonApiError({
                httpStatus: 0,
                code: 0,
                message: error.message,
                ...(context?.operationId !== undefined && { operationId: context.operationId }),
                ...(context?.requestId !== undefined && { requestId: context.requestId }),
                ...(context?.url !== undefined && { url: context.url }),
                cause: error,
            });
        }
        return new OzonApiError_1.OzonApiError({
            httpStatus: 0,
            code: 0,
            message: (error !== null && error !== undefined) ? String(error) : 'Unknown error occurred',
            ...(context?.operationId !== undefined && { operationId: context.operationId }),
            ...(context?.requestId !== undefined && { requestId: context.requestId }),
            ...(context?.url !== undefined && { url: context.url }),
        });
    }
    static mapToSpecializedError(error) {
        if (this.isRateLimitError(error)) {
            return SpecializedErrors_1.RateLimitError.fromOzonApiError(error);
        }
        if (this.isAuthError(error)) {
            return SpecializedErrors_1.AuthError.fromOzonApiError(error);
        }
        if (this.isValidationError(error)) {
            return SpecializedErrors_1.ValidationError.fromOzonApiError(error);
        }
        return error;
    }
    static isRateLimitError(error) {
        if (error.httpStatus === 429) {
            return true;
        }
        if (error.code === 8 || error.code === 429) {
            return true;
        }
        const message = error.message.toLowerCase();
        const rateLimitMessages = [
            'rate limit',
            'too many requests',
            'quota exceeded',
            'throttled',
            'resource exhausted',
        ];
        return rateLimitMessages.some(msg => message.includes(msg));
    }
    static isAuthError(error) {
        if (error.httpStatus === 401 || error.httpStatus === 403) {
            return true;
        }
        if (error.code === 16 || error.code === 7) {
            return true;
        }
        const message = error.message.toLowerCase();
        const authMessages = [
            'unauthorized',
            'forbidden',
            'access denied',
            'permission denied',
            'authentication failed',
            'invalid credentials',
            'token expired',
            'client-id',
            'api-key',
        ];
        return authMessages.some(msg => message.includes(msg));
    }
    static isValidationError(error) {
        if (error.httpStatus === 400) {
            return true;
        }
        if (error.httpStatus === 422) {
            return true;
        }
        if (error.code === 3 || error.code === 9) {
            return true;
        }
        if (error.details.length > 0) {
            const hasFieldValidation = error.details.some(detail => detail.field !== undefined ||
                detail['@type']?.includes('FieldViolation') ||
                detail['@type']?.includes('BadRequest'));
            if (hasFieldValidation) {
                return true;
            }
        }
        const message = error.message.toLowerCase();
        const validationMessages = [
            'validation',
            'invalid',
            'required',
            'must be',
            'should be',
            'bad request',
            'malformed',
            'format',
        ];
        return validationMessages.some(msg => message.includes(msg));
    }
}
exports.ErrorFactory = ErrorFactory;
class ErrorUtils {
    static isRetryable(error) {
        if (error instanceof OzonApiError_1.OzonApiError) {
            return error.isRetryable();
        }
        if (error instanceof Error) {
            const networkError = error;
            if (networkError.code) {
                return true;
            }
        }
        return false;
    }
    static getRetryDelay(error) {
        if (error instanceof SpecializedErrors_1.RateLimitError) {
            return error.retryAfter;
        }
        if (error instanceof OzonApiError_1.OzonApiError) {
            return error.getRetryAfter();
        }
        return undefined;
    }
    static getRequestId(error) {
        if (error instanceof OzonApiError_1.OzonApiError) {
            return error.requestId;
        }
        return undefined;
    }
    static isAuthenticationError(error) {
        return error instanceof SpecializedErrors_1.AuthError;
    }
    static isValidationError(error) {
        return error instanceof SpecializedErrors_1.ValidationError;
    }
    static isRateLimitError(error) {
        return error instanceof SpecializedErrors_1.RateLimitError;
    }
    static isNetworkError(error) {
        return error instanceof SpecializedErrors_1.NetworkError;
    }
    static getUserMessage(error) {
        if (error instanceof SpecializedErrors_1.ValidationError) {
            return error.getValidationSummary();
        }
        if (error instanceof SpecializedErrors_1.AuthError) {
            return error.isPermissionIssue()
                ? 'You do not have permission to perform this action'
                : 'Authentication failed. Please check your credentials';
        }
        if (error instanceof SpecializedErrors_1.RateLimitError) {
            return `Rate limit exceeded. Please try again in ${error.retryAfter} seconds`;
        }
        if (error instanceof SpecializedErrors_1.NetworkError) {
            return error.isTimeout()
                ? 'Request timed out. Please check your connection and try again'
                : 'Network error occurred. Please check your connection';
        }
        if (error instanceof OzonApiError_1.OzonApiError) {
            return error.message;
        }
        if (error instanceof Error) {
            return error.message;
        }
        return 'An unexpected error occurred';
    }
    static serialize(error) {
        if (error instanceof OzonApiError_1.OzonApiError) {
            return error.toJSON();
        }
        if (error instanceof Error) {
            return {
                name: error.name,
                message: error.message,
                stack: error.stack,
            };
        }
        return {
            error: String(error),
        };
    }
}
exports.ErrorUtils = ErrorUtils;
