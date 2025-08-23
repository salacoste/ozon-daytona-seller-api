/**
 * Comprehensive error handling system for Ozon Seller API SDK
 * Based on Anthropic SDK error patterns with Ozon-specific adaptations
 */

import type { ApiErrorResponse, RequestId } from "./types.js";

// Base error class following Anthropic SDK patterns
export abstract class OzonError extends Error {
  public override readonly name: string;
  public readonly requestId?: RequestId;
  public readonly timestamp: Date;

  constructor(message: string, requestId?: RequestId) {
    super(message);
    this.name = this.constructor.name;
    this.requestId = requestId;
    this.timestamp = new Date();

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// API-related errors
export class ApiError extends OzonError {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: readonly unknown[];
  public readonly headers?: Record<string, string>;

  constructor(message: string, status: number, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, requestId);
    this.status = status;
    this.code = code ?? undefined;
    this.details = details ?? undefined;
    this.headers = headers ?? undefined;
  }

  public static fromResponse(response: Response, errorData?: ApiErrorResponse, requestId?: RequestId): ApiError {
    const message = errorData?.message ?? response.statusText ?? "Unknown API error";
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Create specific error subtypes based on status code
    const status = response.status;
    if (status === 400) {
      return new BadRequestError(message, errorData?.code, errorData?.details, headers, requestId);
    }
    if (status === 401) {
      return new AuthenticationError(message, errorData?.code, errorData?.details, headers, requestId);
    }
    if (status === 403) {
      return new PermissionError(message, errorData?.code, errorData?.details, headers, requestId);
    }
    if (status === 404) {
      return new NotFoundError(message, errorData?.code, errorData?.details, headers, requestId);
    }
    if (status === 422) {
      return new ValidationError(message, errorData?.code, errorData?.details, headers, requestId);
    }
    if (status === 429) {
      return new RateLimitError(message, errorData?.code, errorData?.details, headers, requestId);
    }
    if (status >= 500) {
      return new InternalServerError(message, errorData?.code, errorData?.details, headers, requestId);
    }

    return new ApiError(message, status, errorData?.code, errorData?.details, headers, requestId);
  }
}

// Specific error types following HTTP status codes
export class BadRequestError extends ApiError {
  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 400, code, details, headers, requestId);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 401, code, details, headers, requestId);
  }
}

export class PermissionError extends ApiError {
  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 403, code, details, headers, requestId);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 404, code, details, headers, requestId);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 422, code, details, headers, requestId);
  }
}

export class RateLimitError extends ApiError {
  public readonly retryAfter?: number;

  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 429, code, details, headers, requestId);

    // Extract retry-after header if present
    const retryAfterHeader = headers?.["retry-after"] ?? headers?.["Retry-After"];
    if (retryAfterHeader) {
      this.retryAfter = parseInt(retryAfterHeader, 10);
    }
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string, code?: string, details?: readonly unknown[], headers?: Record<string, string>, requestId?: RequestId) {
    super(message, 500, code, details, headers, requestId);
  }
}

// Network and connection errors
export class ConnectionError extends OzonError {
  public override readonly cause?: Error;

  constructor(message: string, cause?: Error, requestId?: RequestId) {
    super(message, requestId);
    this.cause = cause ?? undefined;
  }
}

export class TimeoutError extends OzonError {
  public readonly timeout: number;

  constructor(message: string, timeout: number, requestId?: RequestId) {
    super(message, requestId);
    this.timeout = timeout;
  }
}

// Configuration errors
export class ConfigurationError extends OzonError {
  constructor(message: string) {
    super(message);
  }
}

// Validation errors for SDK usage
export class SDKError extends OzonError {
  constructor(message: string) {
    super(message);
  }
}

// Helper function to check if error is retryable
export const isRetryableError = (error: unknown): boolean => {
  if (error instanceof RateLimitError) return true;
  if (error instanceof InternalServerError) return true;
  if (error instanceof ConnectionError) return true;
  if (error instanceof TimeoutError) return true;

  if (error instanceof ApiError) {
    // Retry on 502, 503, 504
    return error.status === 502 || error.status === 503 || error.status === 504;
  }

  return false;
};

// Helper function to get retry delay from error
export const getRetryDelay = (error: unknown, attempt: number): number => {
  if (error instanceof RateLimitError && error.retryAfter) {
    return error.retryAfter * 1000; // Convert to milliseconds
  }

  // Exponential backoff: 1s, 2s, 4s, 8s, 16s
  return Math.min(1000 * Math.pow(2, attempt), 16000);
};
