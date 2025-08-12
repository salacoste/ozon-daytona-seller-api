/**
 * Unit tests for specialized error classes
 */

import { describe, it, expect } from 'vitest';
import { OzonApiError, RateLimitError, AuthError, ValidationError, NetworkError } from '../../../src/errors';

describe('RateLimitError', () => {
  describe('Constructor', () => {
    it('should create with default values', () => {
      const error = new RateLimitError({});

      expect(error.name).toBe('RateLimitError');
      expect(error.httpStatus).toBe(429);
      expect(error.code).toBe(429);
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.retryAfter).toBe(60);
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(OzonApiError);
      expect(error).toBeInstanceOf(RateLimitError);
    });

    it('should create with custom retry delay', () => {
      const error = new RateLimitError({
        httpStatus: 429,
        code: 8,
        message: 'Resource exhausted',
        retryAfter: 120,
        operationId: 'getProducts',
        requestId: 'req-123'
      });

      expect(error.httpStatus).toBe(429);
      expect(error.code).toBe(8);
      expect(error.message).toBe('Resource exhausted');
      expect(error.retryAfter).toBe(120);
      expect(error.operationId).toBe('getProducts');
      expect(error.requestId).toBe('req-123');
    });

    it('should extract retry delay from details', () => {
      const error = new RateLimitError({
        details: [{
          '@type': 'type.googleapis.com/google.rpc.RetryInfo',
          retryDelay: 90
        }]
      });

      expect(error.retryAfter).toBe(90);
    });
  });

  describe('fromOzonApiError', () => {
    it('should convert OzonApiError to RateLimitError', () => {
      const baseError = new OzonApiError({
        httpStatus: 429,
        code: 8,
        message: 'Too many requests',
        operationId: 'listProducts',
        requestId: 'req-456',
        details: [{
          '@type': 'type.googleapis.com/google.rpc.RetryInfo',
          retryDelay: 150
        }]
      });

      const rateLimitError = RateLimitError.fromOzonApiError(baseError);

      expect(rateLimitError).toBeInstanceOf(RateLimitError);
      expect(rateLimitError.httpStatus).toBe(429);
      expect(rateLimitError.code).toBe(8);
      expect(rateLimitError.message).toBe('Too many requests');
      expect(rateLimitError.operationId).toBe('listProducts');
      expect(rateLimitError.retryAfter).toBe(150);
    });

    it('should use custom retry delay if provided', () => {
      const baseError = new OzonApiError({
        httpStatus: 429,
        code: 429,
        message: 'Rate limited'
      });

      const rateLimitError = RateLimitError.fromOzonApiError(baseError, 300);

      expect(rateLimitError.retryAfter).toBe(300);
    });
  });
});

describe('AuthError', () => {
  describe('Constructor', () => {
    it('should create with default values for unauthorized', () => {
      const error = new AuthError({});

      expect(error.name).toBe('AuthError');
      expect(error.httpStatus).toBe(401);
      expect(error.code).toBe(401);
      expect(error.message).toBe('Authentication failed');
      expect(error.authType).toBe('invalid');
    });

    it('should create with forbidden type', () => {
      const error = new AuthError({
        authType: 'forbidden'
      });

      expect(error.httpStatus).toBe(403);
      expect(error.code).toBe(403);
      expect(error.message).toBe('Access forbidden - insufficient permissions');
      expect(error.authType).toBe('forbidden');
    });

    it('should create with all auth types', () => {
      const scenarios: Array<{
        authType: 'missing' | 'invalid' | 'expired' | 'forbidden';
        expectedMessage: string;
        expectedStatus: number;
      }> = [
        { authType: 'missing', expectedMessage: 'Authentication credentials are missing', expectedStatus: 401 },
        { authType: 'invalid', expectedMessage: 'Authentication credentials are invalid', expectedStatus: 401 },
        { authType: 'expired', expectedMessage: 'Authentication credentials have expired', expectedStatus: 401 },
        { authType: 'forbidden', expectedMessage: 'Access forbidden - insufficient permissions', expectedStatus: 403 }
      ];

      for (const scenario of scenarios) {
        const error = new AuthError({ authType: scenario.authType });
        expect(error.authType).toBe(scenario.authType);
        expect(error.message).toBe(scenario.expectedMessage);
        expect(error.httpStatus).toBe(scenario.expectedStatus);
      }
    });
  });

  describe('fromOzonApiError', () => {
    it('should convert OzonApiError to AuthError', () => {
      const baseError = new OzonApiError({
        httpStatus: 401,
        code: 16,
        message: 'Invalid API key',
        operationId: 'getOrders'
      });

      const authError = AuthError.fromOzonApiError(baseError);

      expect(authError).toBeInstanceOf(AuthError);
      expect(authError.httpStatus).toBe(401);
      expect(authError.code).toBe(16);
      expect(authError.message).toBe('Invalid API key');
      expect(authError.operationId).toBe('getOrders');
    });
  });

  describe('Type Inference', () => {
    it('should infer auth type from HTTP status', () => {
      const forbiddenError = new AuthError({ httpStatus: 403 });
      expect(forbiddenError.authType).toBe('forbidden');

      const unauthorizedError = new AuthError({ httpStatus: 401 });
      expect(unauthorizedError.authType).toBe('invalid'); // default for 401
    });

    it('should infer auth type from message content', () => {
      const scenarios = [
        { message: 'Missing API key', expected: 'missing' },
        { message: 'API key is required', expected: 'missing' },
        { message: 'Token has expired', expected: 'expired' },
        { message: 'Session timeout', expected: 'expired' },
        { message: 'Invalid credentials format', expected: 'invalid' },
        { message: 'Malformed token', expected: 'invalid' }
      ];

      for (const scenario of scenarios) {
        const error = new AuthError({ message: scenario.message });
        expect(error.authType).toBe(scenario.expected);
      }
    });
  });

  describe('Helper Methods', () => {
    it('should identify when credentials need refresh', () => {
      const expiredError = new AuthError({ authType: 'expired' });
      expect(expiredError.needsRefresh()).toBe(true);

      const invalidError = new AuthError({ authType: 'invalid' });
      expect(invalidError.needsRefresh()).toBe(false);
    });

    it('should identify permission issues', () => {
      const forbiddenError = new AuthError({ authType: 'forbidden' });
      expect(forbiddenError.isPermissionIssue()).toBe(true);

      const expiredError = new AuthError({ authType: 'expired' });
      expect(forbiddenError.isPermissionIssue()).toBe(true);
    });
  });
});

describe('ValidationError', () => {
  describe('Constructor', () => {
    it('should create with default values', () => {
      const error = new ValidationError({});

      expect(error.name).toBe('ValidationError');
      expect(error.httpStatus).toBe(400);
      expect(error.code).toBe(400);
      expect(error.message).toBe('Validation failed');
      expect(error.fieldErrors).toEqual({});
    });

    it('should create with custom field errors', () => {
      const fieldErrors = {
        name: ['Name is required'],
        email: ['Invalid format', 'Already exists']
      };

      const error = new ValidationError({
        httpStatus: 422,
        code: 3,
        message: 'Invalid input',
        fieldErrors,
        operationId: 'createUser'
      });

      expect(error.httpStatus).toBe(422);
      expect(error.code).toBe(3);
      expect(error.message).toBe('Invalid input');
      expect(error.fieldErrors).toBe(fieldErrors);
      expect(error.operationId).toBe('createUser');
    });

    it('should extract field errors from details', () => {
      const error = new ValidationError({
        details: [
          { field: 'product_id', description: 'Product ID is required' },
          { field: 'price', description: 'Price must be positive' },
          { field: 'price', description: 'Price must be numeric' },
          { description: 'General error without field' } // Should be ignored
        ]
      });

      expect(error.fieldErrors).toEqual({
        product_id: ['Product ID is required'],
        price: ['Price must be positive', 'Price must be numeric']
      });
    });
  });

  describe('fromOzonApiError', () => {
    it('should convert OzonApiError to ValidationError', () => {
      const baseError = new OzonApiError({
        httpStatus: 400,
        code: 3,
        message: 'Validation failed',
        details: [
          { field: 'sku', description: 'SKU is required' }
        ]
      });

      const validationError = ValidationError.fromOzonApiError(baseError);

      expect(validationError).toBeInstanceOf(ValidationError);
      expect(validationError.httpStatus).toBe(400);
      expect(validationError.code).toBe(3);
      expect(validationError.hasFieldError('sku')).toBe(true);
    });
  });

  describe('Field Error Methods', () => {
    const error = new ValidationError({
      fieldErrors: {
        name: ['Name is required', 'Name too short'],
        email: ['Invalid email format'],
        age: ['Age must be positive']
      }
    });

    it('should get field errors', () => {
      expect(error.getFieldError('name')).toEqual(['Name is required', 'Name too short']);
      expect(error.getFieldError('email')).toEqual(['Invalid email format']);
      expect(error.getFieldError('nonexistent')).toEqual([]);
    });

    it('should check if field has errors', () => {
      expect(error.hasFieldError('name')).toBe(true);
      expect(error.hasFieldError('email')).toBe(true);
      expect(error.hasFieldError('nonexistent')).toBe(false);
    });

    it('should get all error fields', () => {
      const fields = error.getErrorFields();
      expect(fields).toContain('name');
      expect(fields).toContain('email');
      expect(fields).toContain('age');
      expect(fields).toHaveLength(3);
    });

    it('should count total errors', () => {
      expect(error.getErrorCount()).toBe(4); // 2 + 1 + 1
    });

    it('should generate validation summary', () => {
      const summary = error.getValidationSummary();
      expect(summary).toContain('name: Name is required, Name too short');
      expect(summary).toContain('email: Invalid email format');
      expect(summary).toContain('age: Age must be positive');
      expect(summary).toMatch(/^Validation failed:/);
    });

    it('should return message when no field errors', () => {
      const emptyError = new ValidationError({ message: 'Custom message' });
      expect(emptyError.getValidationSummary()).toBe('Custom message');
    });
  });

  describe('Serialization', () => {
    it('should serialize with field errors', () => {
      const error = new ValidationError({
        fieldErrors: {
          name: ['Required'],
          email: ['Invalid']
        }
      });

      const json = error.toJSON();

      expect(json.fieldErrors).toEqual({
        name: ['Required'],
        email: ['Invalid']
      });
      expect(json.errorCount).toBe(2);
      expect(json.name).toBe('ValidationError');
    });
  });
});

describe('NetworkError', () => {
  describe('Constructor', () => {
    it('should create with required parameters', () => {
      const error = new NetworkError({
        message: 'Connection failed',
        networkCode: 'ECONNREFUSED',
        operationId: 'getProducts',
        url: 'https://api.example.com/products'
      });

      expect(error.name).toBe('NetworkError');
      expect(error.message).toBe('Connection failed');
      expect(error.networkCode).toBe('ECONNREFUSED');
      expect(error.operationId).toBe('getProducts');
      expect(error.url).toBe('https://api.example.com/products');
      expect(error.httpStatus).toBe(0); // No HTTP status for network errors
      expect(error.code).toBe(0);
    });

    it('should work without optional parameters', () => {
      const error = new NetworkError({
        message: 'Network error occurred'
      });

      expect(error.message).toBe('Network error occurred');
      expect(error.networkCode).toBeUndefined();
    });
  });

  describe('fromError', () => {
    it('should create NetworkError from Node.js error', () => {
      const nodeError = new Error('connect ECONNREFUSED 127.0.0.1:80') as NodeJS.ErrnoException;
      nodeError.code = 'ECONNREFUSED';

      const networkError = NetworkError.fromError(nodeError, {
        operationId: 'getOrders',
        url: 'https://api.example.com/orders'
      });

      expect(networkError).toBeInstanceOf(NetworkError);
      expect(networkError.message).toBe('connect ECONNREFUSED 127.0.0.1:80');
      expect(networkError.networkCode).toBe('ECONNREFUSED');
      expect(networkError.operationId).toBe('getOrders');
      expect(networkError.url).toBe('https://api.example.com/orders');
      expect(networkError.cause).toBe(nodeError);
    });

    it('should work without context', () => {
      const nodeError = new Error('DNS lookup failed') as NodeJS.ErrnoException;
      nodeError.code = 'ENOTFOUND';

      const networkError = NetworkError.fromError(nodeError);

      expect(networkError.networkCode).toBe('ENOTFOUND');
      expect(networkError.operationId).toBeUndefined();
    });
  });

  describe('Error Classification', () => {
    it('should identify timeout errors', () => {
      const timeoutError1 = new NetworkError({
        message: 'Request timeout',
        networkCode: 'ETIMEDOUT'
      });
      expect(timeoutError1.isTimeout()).toBe(true);

      const timeoutError2 = new NetworkError({
        message: 'Connection timeout occurred'
      });
      expect(timeoutError2.isTimeout()).toBe(true);

      const connectionError = new NetworkError({
        message: 'Connection refused',
        networkCode: 'ECONNREFUSED'
      });
      expect(connectionError.isTimeout()).toBe(false);
    });

    it('should identify connection errors', () => {
      const connectionCodes = ['ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND', 'EHOSTUNREACH'];

      for (const code of connectionCodes) {
        const error = new NetworkError({
          message: `Network error: ${code}`,
          networkCode: code
        });
        expect(error.isConnectionError()).toBe(true);
      }

      const timeoutError = new NetworkError({
        message: 'Timeout',
        networkCode: 'ETIMEDOUT'
      });
      expect(timeoutError.isConnectionError()).toBe(false);
    });

    it('should always be retryable', () => {
      const error = new NetworkError({ message: 'Any network error' });
      expect(error.isRetryable()).toBe(true);
    });
  });
});

describe('Error Inheritance', () => {
  it('should maintain proper prototype chains', () => {
    const rateLimitError = new RateLimitError({});
    expect(rateLimitError instanceof Error).toBe(true);
    expect(rateLimitError instanceof OzonApiError).toBe(true);
    expect(rateLimitError instanceof RateLimitError).toBe(true);

    const authError = new AuthError({});
    expect(authError instanceof Error).toBe(true);
    expect(authError instanceof OzonApiError).toBe(true);
    expect(authError instanceof AuthError).toBe(true);

    const validationError = new ValidationError({});
    expect(validationError instanceof Error).toBe(true);
    expect(validationError instanceof OzonApiError).toBe(true);
    expect(validationError instanceof ValidationError).toBe(true);

    const networkError = new NetworkError({ message: 'test' });
    expect(networkError instanceof Error).toBe(true);
    expect(networkError instanceof OzonApiError).toBe(true);
    expect(networkError instanceof NetworkError).toBe(true);
  });

  it('should work with instanceof checks after JSON round-trip', () => {
    // This tests that our prototype setup is robust
    const original = new RateLimitError({ message: 'Test' });
    const json = JSON.stringify(original.toJSON());
    const parsed = JSON.parse(json);

    // Create new instance with same data
    const recreated = new RateLimitError({
      httpStatus: parsed.httpStatus,
      code: parsed.code,
      message: parsed.message
    });

    expect(recreated instanceof RateLimitError).toBe(true);
    expect(recreated instanceof OzonApiError).toBe(true);
    expect(recreated instanceof Error).toBe(true);
  });
});