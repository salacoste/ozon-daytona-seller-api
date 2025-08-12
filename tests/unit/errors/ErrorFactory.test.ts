/**
 * Unit tests for ErrorFactory
 */

import { describe, it, expect } from 'vitest';
import { ErrorFactory, type IErrorContext } from '../../../src/errors/ErrorFactory';
import { OzonApiError, RateLimitError, AuthError, ValidationError, NetworkError } from '../../../src/errors';

describe('ErrorFactory', () => {
  describe('fromResponse', () => {
    it('should create RateLimitError from 429 response', async () => {
      const responseBody = {
        error: {
          code: 8,
          message: 'Rate limit exceeded',
          details: [{
            '@type': 'type.googleapis.com/google.rpc.RetryInfo',
            retryDelay: 120
          }]
        }
      };

      const response = new Response(JSON.stringify(responseBody), {
        status: 429,
        statusText: 'Too Many Requests',
        headers: {
          'content-type': 'application/json',
          'x-request-id': 'rate-limit-123'
        }
      });

      const error = await ErrorFactory.fromResponse(response, {
        operationId: 'getProducts'
      });

      expect(error).toBeInstanceOf(RateLimitError);
      expect(error.httpStatus).toBe(429);
      expect(error.code).toBe(8);
      expect(error.message).toBe('Rate limit exceeded');
      if (error instanceof RateLimitError) {
        expect(error.retryAfter).toBe(120);
      }
    });

    it('should create AuthError from 401 response', async () => {
      const responseBody = {
        code: 16,
        message: 'Authentication failed: invalid API key',
      };

      const response = new Response(JSON.stringify(responseBody), {
        status: 401,
        statusText: 'Unauthorized'
      });

      const error = await ErrorFactory.fromResponse(response);

      expect(error).toBeInstanceOf(AuthError);
      expect(error.httpStatus).toBe(401);
      expect(error.code).toBe(16);
      expect(error.message).toBe('Authentication failed: invalid API key');
      if (error instanceof AuthError) {
        expect(error.authType).toBe('invalid');
      }
    });

    it('should create ValidationError from 400 response with field details', async () => {
      const responseBody = {
        error: {
          code: 3,
          message: 'Invalid request parameters',
          details: [
            {
              '@type': 'type.googleapis.com/google.rpc.BadRequest',
              field: 'product_id',
              description: 'Product ID is required'
            },
            {
              '@type': 'type.googleapis.com/google.rpc.BadRequest', 
              field: 'price',
              description: 'Price must be positive'
            },
            {
              '@type': 'type.googleapis.com/google.rpc.BadRequest',
              field: 'price',
              description: 'Price must be less than 1000000'
            }
          ]
        }
      };

      const response = new Response(JSON.stringify(responseBody), {
        status: 400,
        statusText: 'Bad Request'
      });

      const error = await ErrorFactory.fromResponse(response);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.httpStatus).toBe(400);
      expect(error.code).toBe(3);
      if (error instanceof ValidationError) {
        expect(error.hasFieldError('product_id')).toBe(true);
        expect(error.hasFieldError('price')).toBe(true);
        expect(error.getFieldError('product_id')).toEqual(['Product ID is required']);
        expect(error.getFieldError('price')).toEqual([
          'Price must be positive',
          'Price must be less than 1000000'
        ]);
      }
    });

    it('should create generic OzonApiError for unspecialized errors', async () => {
      const responseBody = {
        code: 13,
        message: 'Internal processing error',
      };

      const response = new Response(JSON.stringify(responseBody), {
        status: 500,
        statusText: 'Internal Server Error'
      });

      const error = await ErrorFactory.fromResponse(response);

      expect(error).toBeInstanceOf(OzonApiError);
      expect(error).not.toBeInstanceOf(RateLimitError);
      expect(error).not.toBeInstanceOf(AuthError);
      expect(error).not.toBeInstanceOf(ValidationError);
      expect(error.httpStatus).toBe(500);
      expect(error.code).toBe(13);
    });
  });

  describe('fromRpcStatus', () => {
    it('should create appropriate specialized errors from RPC status', () => {
      // Rate limit error
      const rateLimitError = ErrorFactory.fromRpcStatus(429, {
        code: 8,
        message: 'Resource exhausted'
      });
      expect(rateLimitError).toBeInstanceOf(RateLimitError);

      // Auth error
      const authError = ErrorFactory.fromRpcStatus(403, {
        code: 7,
        message: 'Permission denied'
      });
      expect(authError).toBeInstanceOf(AuthError);

      // Validation error
      const validationError = ErrorFactory.fromRpcStatus(422, {
        code: 3,
        message: 'Invalid argument',
        details: [{
          field: 'name',
          description: 'Name is required'
        }]
      });
      expect(validationError).toBeInstanceOf(ValidationError);
    });
  });

  describe('fromNetworkError', () => {
    it('should create NetworkError from connection error', () => {
      const connectionError = new Error('connect ECONNREFUSED 127.0.0.1:80') as NodeJS.ErrnoException;
      connectionError.code = 'ECONNREFUSED';

      const error = ErrorFactory.fromNetworkError(connectionError, {
        operationId: 'getProducts',
        url: 'https://api.example.com/products'
      });

      expect(error).toBeInstanceOf(NetworkError);
      expect(error.message).toBe('connect ECONNREFUSED 127.0.0.1:80');
      expect(error.operationId).toBe('getProducts');
      if (error instanceof NetworkError) {
        expect(error.networkCode).toBe('ECONNREFUSED');
        expect(error.isConnectionError()).toBe(true);
      }
    });

    it('should create NetworkError from timeout error', () => {
      const timeoutError = new Error('Request timeout after 30000ms') as NodeJS.ErrnoException;
      timeoutError.code = 'ETIMEDOUT';

      const error = ErrorFactory.fromNetworkError(timeoutError);

      expect(error).toBeInstanceOf(NetworkError);
      if (error instanceof NetworkError) {
        expect(error.networkCode).toBe('ETIMEDOUT');
        expect(error.isTimeout()).toBe(true);
      }
    });
  });

  describe('fromUnknownError', () => {
    it('should return existing OzonApiError unchanged', () => {
      const originalError = new OzonApiError({
        httpStatus: 400,
        code: 400,
        message: 'Test error'
      });

      const error = ErrorFactory.fromUnknownError(originalError);
      expect(error).toBe(originalError);
    });

    it('should convert network Error to NetworkError', () => {
      const networkError = new Error('DNS lookup failed') as NodeJS.ErrnoException;
      networkError.code = 'ENOTFOUND';

      const error = ErrorFactory.fromUnknownError(networkError);

      expect(error).toBeInstanceOf(NetworkError);
      if (error instanceof NetworkError) {
        expect(error.networkCode).toBe('ENOTFOUND');
      }
    });

    it('should convert generic Error to OzonApiError', () => {
      const genericError = new Error('Something went wrong');

      const error = ErrorFactory.fromUnknownError(genericError, {
        operationId: 'testOp',
        requestId: 'req-123'
      });

      expect(error).toBeInstanceOf(OzonApiError);
      expect(error.httpStatus).toBe(0);
      expect(error.code).toBe(0);
      expect(error.message).toBe('Something went wrong');
      expect(error.operationId).toBe('testOp');
      expect(error.requestId).toBe('req-123');
      expect(error.cause).toBe(genericError);
    });

    it('should handle unknown error types', () => {
      const unknownError = { weird: 'object' };

      const error = ErrorFactory.fromUnknownError(unknownError);

      expect(error).toBeInstanceOf(OzonApiError);
      expect(error.httpStatus).toBe(0);
      expect(error.message).toBe('[object Object]');
    });

    it('should handle null/undefined errors', () => {
      const nullError = ErrorFactory.fromUnknownError(null);
      expect(nullError.message).toBe('Unknown error occurred');

      const undefinedError = ErrorFactory.fromUnknownError(undefined);
      expect(undefinedError.message).toBe('Unknown error occurred');
    });
  });

  describe('Error Classification', () => {
    it('should identify rate limit errors correctly', async () => {
      // Test various rate limit scenarios
      const scenarios = [
        { status: 429, code: 429, message: 'Too many requests' },
        { status: 200, code: 8, message: 'Resource exhausted' },
        { status: 400, code: 400, message: 'Rate limit exceeded' },
        { status: 500, code: 500, message: 'Request throttled' },
      ];

      for (const scenario of scenarios) {
        const response = new Response(JSON.stringify({
          code: scenario.code,
          message: scenario.message
        }), {
          status: scenario.status
        });

        const error = await ErrorFactory.fromResponse(response);
        expect(error).toBeInstanceOf(RateLimitError);
      }
    });

    it('should identify auth errors correctly', async () => {
      const scenarios = [
        { status: 401, code: 401, message: 'Unauthorized' },
        { status: 403, code: 403, message: 'Forbidden' },
        { status: 200, code: 16, message: 'Unauthenticated' },
        { status: 200, code: 7, message: 'Permission denied' },
        { status: 400, code: 400, message: 'Invalid Client-Id header' },
      ];

      for (const scenario of scenarios) {
        const response = new Response(JSON.stringify({
          code: scenario.code,
          message: scenario.message
        }), {
          status: scenario.status
        });

        const error = await ErrorFactory.fromResponse(response);
        expect(error).toBeInstanceOf(AuthError);
      }
    });

    it('should identify validation errors correctly', async () => {
      const scenarios = [
        { status: 400, code: 400, message: 'Bad request' },
        { status: 422, code: 422, message: 'Unprocessable entity' },
        { status: 200, code: 3, message: 'Invalid argument' },
        { status: 200, code: 9, message: 'Failed precondition' },
        { status: 500, code: 500, message: 'Validation failed' },
      ];

      for (const scenario of scenarios) {
        const response = new Response(JSON.stringify({
          code: scenario.code,
          message: scenario.message
        }), {
          status: scenario.status
        });

        const error = await ErrorFactory.fromResponse(response);
        expect(error).toBeInstanceOf(ValidationError);
      }
    });
  });

  describe('Real Ozon API Error Examples', () => {
    it('should handle typical Ozon rate limit response', async () => {
      const ozonRateLimitResponse = {
        error: {
          code: 8,
          message: 'Request rate limit exceeded',
          details: [{
            '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
            violations: [{
              subject: 'requests_per_minute',
              description: 'Exceeded 600 requests per minute limit'
            }]
          }]
        }
      };

      const response = new Response(JSON.stringify(ozonRateLimitResponse), {
        status: 429,
        headers: { 
          'content-type': 'application/json',
          'x-request-id': 'ozon-req-12345'
        }
      });

      const error = await ErrorFactory.fromResponse(response, {
        operationId: 'ProductInfoListV2'
      });

      expect(error).toBeInstanceOf(RateLimitError);
      expect(error.code).toBe(8);
      expect(error.requestId).toBe('ozon-req-12345');
      expect(error.operationId).toBe('ProductInfoListV2');
    });

    it('should handle typical Ozon validation response', async () => {
      const ozonValidationResponse = {
        code: 3,
        message: 'Invalid request',
        details: [
          {
            '@type': 'type.googleapis.com/google.rpc.BadRequest',
            field_violations: [
              {
                field: 'filter.offer_id',
                description: 'offer_id list is empty'
              },
              {
                field: 'limit',
                description: 'limit should be between 1 and 1000'
              }
            ]
          }
        ]
      };

      const response = new Response(JSON.stringify(ozonValidationResponse), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });

      const error = await ErrorFactory.fromResponse(response);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.code).toBe(3);
      expect(error.message).toBe('Invalid request');
    });

    it('should handle Ozon auth error response', async () => {
      const ozonAuthResponse = {
        error: {
          code: 16,
          message: 'Unauthenticated',
          details: [{
            '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
            reason: 'API_KEY_INVALID',
            domain: 'ozon.ru'
          }]
        }
      };

      const response = new Response(JSON.stringify(ozonAuthResponse), {
        status: 401,
        headers: { 'content-type': 'application/json' }
      });

      const error = await ErrorFactory.fromResponse(response);

      expect(error).toBeInstanceOf(AuthError);
      expect(error.code).toBe(16);
      if (error instanceof AuthError) {
        expect(error.authType).toBe('invalid');
      }
    });
  });
});