/**
 * Error factory for consistent mapping of API responses to typed errors
 */

import { OzonApiError, type IRpcStatus } from './OzonApiError';
import { RateLimitError, AuthError, ValidationError, NetworkError } from './SpecializedErrors';

/**
 * Error context for error creation
 */
export interface IErrorContext {
  readonly operationId?: string;
  readonly requestId?: string;
  readonly url?: string;
}

/**
 * Factory class for creating appropriate error instances
 */
export class ErrorFactory {
  /**
   * Create appropriate error from HTTP response
   */
  static async fromResponse(response: Response, context?: IErrorContext): Promise<OzonApiError> {
    // First create generic OzonApiError
    const baseError = await OzonApiError.fromResponse(response, context);
    
    // Map to specialized error based on status code and content
    return this.mapToSpecializedError(baseError);
  }

  /**
   * Create error from RPC status
   */
  static fromRpcStatus(
    httpStatus: number, 
    rpcStatus: IRpcStatus, 
    context?: IErrorContext
  ): OzonApiError {
    const baseError = OzonApiError.fromRpcStatus(httpStatus, rpcStatus, context);
    return this.mapToSpecializedError(baseError);
  }

  /**
   * Create error from network/fetch error
   */
  static fromNetworkError(error: Error, context?: IErrorContext): NetworkError {
    return NetworkError.fromError(error, context);
  }

  /**
   * Create error from unknown error object
   */
  static fromUnknownError(error: unknown, context?: IErrorContext): OzonApiError {
    if (error instanceof OzonApiError) {
      return error;
    }

    if (error instanceof Error) {
      // Check if it's a network error
      const networkError = error as NodeJS.ErrnoException;
      if (networkError.code) {
        return this.fromNetworkError(error, context);
      }

      // Generic error to OzonApiError
      return new OzonApiError({
        httpStatus: 0,
        code: 0,
        message: error.message,
        ...(context?.operationId !== undefined && { operationId: context.operationId }),
        ...(context?.requestId !== undefined && { requestId: context.requestId }),
        ...(context?.url !== undefined && { url: context.url }),
        cause: error,
      });
    }

    // Unknown error type
    return new OzonApiError({
      httpStatus: 0,
      code: 0,
      message: (error !== null && error !== undefined) ? String(error) : 'Unknown error occurred',
      ...(context?.operationId !== undefined && { operationId: context.operationId }),
      ...(context?.requestId !== undefined && { requestId: context.requestId }),
      ...(context?.url !== undefined && { url: context.url }),
    });
  }

  /**
   * Map generic OzonApiError to specialized error based on status and content
   */
  private static mapToSpecializedError(error: OzonApiError): OzonApiError | RateLimitError | AuthError | ValidationError {
    // Rate limiting errors
    if (this.isRateLimitError(error)) {
      return RateLimitError.fromOzonApiError(error);
    }

    // Authentication/Authorization errors
    if (this.isAuthError(error)) {
      return AuthError.fromOzonApiError(error);
    }

    // Validation errors
    if (this.isValidationError(error)) {
      return ValidationError.fromOzonApiError(error);
    }

    // Return original error if no specialized mapping applies
    return error;
  }

  /**
   * Check if error is a rate limiting error
   */
  private static isRateLimitError(error: OzonApiError): boolean {
    // HTTP 429 Too Many Requests
    if (error.httpStatus === 429) {
      return true;
    }

    // Check RPC code for rate limiting
    if (error.code === 8 || error.code === 429) { // RESOURCE_EXHAUSTED or custom rate limit
      return true;
    }

    // Check error message for rate limit indicators
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

  /**
   * Check if error is an authentication/authorization error
   */
  private static isAuthError(error: OzonApiError): boolean {
    // HTTP 401 Unauthorized or 403 Forbidden
    if (error.httpStatus === 401 || error.httpStatus === 403) {
      return true;
    }

    // Check RPC code for auth errors
    if (error.code === 16 || error.code === 7) { // UNAUTHENTICATED or PERMISSION_DENIED
      return true;
    }

    // Check error message for auth indicators
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

  /**
   * Check if error is a validation error
   */
  private static isValidationError(error: OzonApiError): boolean {
    // HTTP 400 Bad Request
    if (error.httpStatus === 400) {
      return true;
    }

    // HTTP 422 Unprocessable Entity
    if (error.httpStatus === 422) {
      return true;
    }

    // Check RPC code for validation errors
    if (error.code === 3 || error.code === 9) { // INVALID_ARGUMENT or FAILED_PRECONDITION
      return true;
    }

    // Check if we have field-specific validation details
    if (error.details.length > 0) {
      const hasFieldValidation = error.details.some(detail => 
        detail.field !== undefined || 
        detail['@type']?.includes('FieldViolation') ||
        detail['@type']?.includes('BadRequest')
      );
      
      if (hasFieldValidation) {
        return true;
      }
    }

    // Check error message for validation indicators
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

/**
 * Utility functions for error handling
 */
export class ErrorUtils {
  /**
   * Check if error is retryable
   */
  static isRetryable(error: unknown): boolean {
    if (error instanceof OzonApiError) {
      return error.isRetryable();
    }

    // Network errors are generally retryable
    if (error instanceof Error) {
      const networkError = error as NodeJS.ErrnoException;
      if (networkError.code) {
        return true;
      }
    }

    return false;
  }

  /**
   * Get retry delay in seconds
   */
  static getRetryDelay(error: unknown): number | undefined {
    if (error instanceof RateLimitError) {
      return error.retryAfter;
    }

    if (error instanceof OzonApiError) {
      return error.getRetryAfter();
    }

    return undefined;
  }

  /**
   * Extract request ID from error
   */
  static getRequestId(error: unknown): string | undefined {
    if (error instanceof OzonApiError) {
      return error.requestId;
    }

    return undefined;
  }

  /**
   * Check if error indicates authentication issue
   */
  static isAuthenticationError(error: unknown): boolean {
    return error instanceof AuthError;
  }

  /**
   * Check if error indicates validation issue
   */
  static isValidationError(error: unknown): boolean {
    return error instanceof ValidationError;
  }

  /**
   * Check if error indicates rate limiting
   */
  static isRateLimitError(error: unknown): boolean {
    return error instanceof RateLimitError;
  }

  /**
   * Check if error indicates network connectivity issue
   */
  static isNetworkError(error: unknown): boolean {
    return error instanceof NetworkError;
  }

  /**
   * Get user-friendly error message
   */
  static getUserMessage(error: unknown): string {
    if (error instanceof ValidationError) {
      return error.getValidationSummary();
    }

    if (error instanceof AuthError) {
      return error.isPermissionIssue() 
        ? 'You do not have permission to perform this action'
        : 'Authentication failed. Please check your credentials';
    }

    if (error instanceof RateLimitError) {
      return `Rate limit exceeded. Please try again in ${error.retryAfter} seconds`;
    }

    if (error instanceof NetworkError) {
      return error.isTimeout()
        ? 'Request timed out. Please check your connection and try again'
        : 'Network error occurred. Please check your connection';
    }

    if (error instanceof OzonApiError) {
      return error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'An unexpected error occurred';
  }

  /**
   * Serialize error for logging (excluding sensitive data)
   */
  static serialize(error: unknown): Record<string, unknown> {
    if (error instanceof OzonApiError) {
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