/**
 * Specialized error classes for common Ozon API scenarios
 */

import { OzonApiError, type IRpcStatusDetail } from './OzonApiError';

/**
 * Rate limiting error - HTTP 429 or rate limit exceeded
 */
export class RateLimitError extends OzonApiError {
  public override readonly name: string = 'RateLimitError';
  public readonly retryAfter?: number;

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
  }) {
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

    this.retryAfter = options.retryAfter ?? this.getRetryAfter() ?? 60;

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }

  /**
   * Create RateLimitError from generic OzonApiError
   */
  static fromOzonApiError(error: OzonApiError, retryAfter?: number): RateLimitError {
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

/**
 * Authentication/Authorization error - HTTP 401/403
 */
export class AuthError extends OzonApiError {
  public override readonly name: string = 'AuthError';
  public readonly authType: 'missing' | 'invalid' | 'expired' | 'forbidden';

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
  }) {
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

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, AuthError.prototype);
    
    this.authType = options.authType ?? this.inferAuthType();
  }

  /**
   * Create AuthError from generic OzonApiError
   */
  static fromOzonApiError(error: OzonApiError): AuthError {
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

  /**
   * Get default message for auth type
   */
  private static getDefaultMessage(authType?: string): string {
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

  /**
   * Infer auth type from error details
   */
  private inferAuthType(): 'missing' | 'invalid' | 'expired' | 'forbidden' {
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

    return 'invalid'; // Default fallback
  }

  /**
   * Check if credentials need to be refreshed
   */
  needsRefresh(): boolean {
    return this.authType === 'expired';
  }

  /**
   * Check if this is a permission issue (vs credential issue)
   */
  isPermissionIssue(): boolean {
    return this.authType === 'forbidden';
  }
}

/**
 * Validation error - HTTP 400 with field validation details
 */
export class ValidationError extends OzonApiError {
  public override readonly name: string = 'ValidationError';
  public readonly fieldErrors: Record<string, string[]>;

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
  }) {
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

    this.fieldErrors = options.fieldErrors ?? this.getFieldErrors();

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  /**
   * Create ValidationError from generic OzonApiError
   */
  static fromOzonApiError(error: OzonApiError): ValidationError {
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

  /**
   * Get validation errors for a specific field
   */
  getFieldError(field: string): string[] {
    return this.fieldErrors[field] ?? [];
  }

  /**
   * Check if a specific field has validation errors
   */
  hasFieldError(field: string): boolean {
    return field in this.fieldErrors && (this.fieldErrors[field]?.length || 0) > 0;
  }

  /**
   * Get all fields that have validation errors
   */
  getErrorFields(): string[] {
    return Object.keys(this.fieldErrors);
  }

  /**
   * Get total number of validation errors
   */
  getErrorCount(): number {
    return Object.values(this.fieldErrors).reduce((sum, errors) => sum + errors.length, 0);
  }

  /**
   * Get a formatted summary of all validation errors
   */
  getValidationSummary(): string {
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

  /**
   * Convert to JSON with field errors
   */
  override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      fieldErrors: this.fieldErrors,
      errorCount: this.getErrorCount(),
    };
  }
}

/**
 * Network connectivity error
 */
export class NetworkError extends OzonApiError {
  public override readonly name: string = 'NetworkError';
  public readonly networkCode?: string;

  constructor(options: {
    readonly message: string;
    readonly networkCode?: string;
    readonly operationId?: string;
    readonly url?: string;
    readonly cause?: Error;
  }) {
    super({
      httpStatus: 0, // No HTTP status for network errors
      code: 0,
      message: options.message,
      ...(options.operationId !== undefined && { operationId: options.operationId }),
      ...(options.url !== undefined && { url: options.url }),
      ...(options.cause !== undefined && { cause: options.cause }),
    });

    if (options.networkCode !== undefined) {
      this.networkCode = options.networkCode;
    }

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, NetworkError.prototype);
  }

  /**
   * Create NetworkError from native error
   */
  static fromError(error: Error, context?: { operationId?: string; url?: string }): NetworkError {
    const networkError = error as NodeJS.ErrnoException;
    
    return new NetworkError({
      message: error.message,
      ...(networkError.code !== undefined && { networkCode: networkError.code }),
      ...(context?.operationId !== undefined && { operationId: context.operationId }),
      ...(context?.url !== undefined && { url: context.url }),
      cause: error,
    });
  }

  /**
   * Check if this is a timeout error
   */
  isTimeout(): boolean {
    return this.networkCode === 'ETIMEDOUT' || 
           this.message.toLowerCase().includes('timeout');
  }

  /**
   * Check if this is a connection error
   */
  isConnectionError(): boolean {
    const connectionCodes = ['ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND', 'EHOSTUNREACH'];
    return connectionCodes.includes(this.networkCode ?? '');
  }

  /**
   * Always retryable for network errors
   */
  override isRetryable(): boolean {
    return true;
  }
}