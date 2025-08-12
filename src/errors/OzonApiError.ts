/**
 * Ozon API error classes with rpcStatus normalization
 */

/**
 * RPC status structure from Ozon API responses
 */
export interface IRpcStatus {
  readonly code: number;
  readonly message: string;
  readonly details?: readonly IRpcStatusDetail[];
}

/**
 * RPC status detail structure
 */
export interface IRpcStatusDetail {
  readonly '@type'?: string;
  readonly field?: string;
  readonly description?: string;
  readonly code?: string;
  readonly message?: string;
  readonly [key: string]: unknown;
}

/**
 * Base Ozon API error class
 */
export class OzonApiError extends Error {
  public override readonly name: string = 'OzonApiError';
  public readonly httpStatus: number;
  public readonly code: number;
  public readonly details: readonly IRpcStatusDetail[];
  public readonly operationId?: string;
  public readonly requestId?: string;
  public readonly timestamp: Date;
  public readonly url?: string;
  public declare readonly cause?: Error;

  constructor(options: {
    readonly httpStatus: number;
    readonly code: number;
    readonly message: string;
    readonly details?: readonly IRpcStatusDetail[];
    readonly operationId?: string;
    readonly requestId?: string;
    readonly url?: string;
    readonly cause?: Error;
  }) {
    super(options.message);
    
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

    // Set the cause if provided
    if (options.cause) {
      (this as { cause?: Error }).cause = options.cause;
    }

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, OzonApiError.prototype);
  }

  /**
   * Create OzonApiError from RPC status response
   */
  static fromRpcStatus(
    httpStatus: number,
    rpcStatus: IRpcStatus,
    context?: {
      readonly operationId?: string;
      readonly requestId?: string;
      readonly url?: string;
    }
  ): OzonApiError {
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

  /**
   * Create OzonApiError from HTTP response
   */
  static async fromResponse(
    response: Response,
    context?: {
      readonly operationId?: string;
      readonly requestId?: string;
    }
  ): Promise<OzonApiError> {
    const requestId = context?.requestId ?? response.headers.get('x-request-id') ?? undefined;
    
    try {
      // Try to parse JSON response for RPC status
      const responseText = await response.text();
      
      if (responseText) {
        try {
          const responseData = JSON.parse(responseText);
          
          // Check if response contains RPC status structure
          if (responseData.error || responseData.code !== undefined) {
            const rpcStatus: IRpcStatus = responseData.error || responseData;
            return OzonApiError.fromRpcStatus(response.status, rpcStatus, {
              ...(context?.operationId !== undefined && { operationId: context.operationId }),
              ...(requestId !== undefined && { requestId }),
              ...(response.url && { url: response.url }),
            });
          }
        } catch {
          // Not JSON, fall through to generic error
        }
      }

      // Create generic API error for non-RPC responses
      return new OzonApiError({
        httpStatus: response.status,
        code: response.status,
        message: responseText || response.statusText || `HTTP ${response.status}`,
        ...(context?.operationId !== undefined && { operationId: context.operationId }),
        ...(requestId !== undefined && { requestId }),
        ...(response.url && { url: response.url }),
      });
    } catch (error) {
      // Fallback error if response parsing fails
      return new OzonApiError({
        httpStatus: response.status,
        code: response.status,
        message: `Failed to parse error response: ${response.statusText}`,
        ...(context?.operationId !== undefined && { operationId: context.operationId }),
        ...(requestId !== undefined && { requestId }),
        ...(response.url && { url: response.url }),
        cause: error as Error,
      });
    }
  }

  /**
   * Check if this is a client error (4xx)
   */
  isClientError(): boolean {
    return this.httpStatus >= 400 && this.httpStatus < 500;
  }

  /**
   * Check if this is a server error (5xx)
   */
  isServerError(): boolean {
    return this.httpStatus >= 500 && this.httpStatus < 600;
  }

  /**
   * Check if this error is retryable
   */
  isRetryable(): boolean {
    // Server errors are generally retryable
    if (this.isServerError()) {
      return true;
    }

    // Some client errors are retryable
    const retryableClientErrors = [408, 429]; // Timeout, Too Many Requests
    return retryableClientErrors.includes(this.httpStatus);
  }

  /**
   * Get retry-after header value in seconds
   */
  getRetryAfter(): number | undefined {
    // Look for retry-after information in details
    const retryDetail = this.details.find(detail => 
      detail['@type']?.includes('RetryInfo') || 
      detail.code === 'RATE_LIMIT_EXCEEDED'
    );

    if (retryDetail && typeof retryDetail.retryDelay === 'number') {
      return retryDetail.retryDelay;
    }

    // Default retry delays based on error type
    if (this.httpStatus === 429) {
      return 60; // 1 minute for rate limiting
    }

    if (this.httpStatus === 503) {
      return 30; // 30 seconds for service unavailable
    }

    return undefined;
  }

  /**
   * Get field-specific errors from details
   */
  getFieldErrors(): Record<string, string[]> {
    const fieldErrors: Record<string, string[]> = {};

    for (const detail of this.details) {
      if (detail.field && detail.description) {
        if (!fieldErrors[detail.field]) {
          fieldErrors[detail.field] = [];
        }
        fieldErrors[detail.field]!.push(detail.description);
      }
    }

    return fieldErrors;
  }

  /**
   * Convert to JSON for logging/serialization
   */
  toJSON(): Record<string, unknown> {
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

  /**
   * Get a human-readable error summary
   */
  override toString(): string {
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