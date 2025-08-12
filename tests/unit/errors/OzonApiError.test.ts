/**
 * Unit tests for OzonApiError
 */

import { describe, it, expect } from 'vitest';
import { OzonApiError, type IRpcStatus } from '../../../src/errors/OzonApiError';

describe('OzonApiError', () => {
  describe('Constructor', () => {
    it('should create basic error with required fields', () => {
      const error = new OzonApiError({
        httpStatus: 400,
        code: 1001,
        message: 'Test error',
      });

      expect(error.name).toBe('OzonApiError');
      expect(error.message).toBe('Test error');
      expect(error.httpStatus).toBe(400);
      expect(error.code).toBe(1001);
      expect(error.details).toEqual([]);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('should create error with all optional fields', () => {
      const details = [{ field: 'name', description: 'Required field' }];
      const cause = new Error('Original cause');

      const error = new OzonApiError({
        httpStatus: 422,
        code: 2001,
        message: 'Validation failed',
        details,
        operationId: 'op-123',
        requestId: 'req-456',
        url: 'https://api.example.com/test',
        cause,
      });

      expect(error.httpStatus).toBe(422);
      expect(error.code).toBe(2001);
      expect(error.message).toBe('Validation failed');
      expect(error.details).toBe(details);
      expect(error.operationId).toBe('op-123');
      expect(error.requestId).toBe('req-456');
      expect(error.url).toBe('https://api.example.com/test');
      expect(error.cause).toBe(cause);
    });

    it('should be instanceof Error and OzonApiError', () => {
      const error = new OzonApiError({
        httpStatus: 500,
        code: 500,
        message: 'Server error',
      });

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(OzonApiError);
    });
  });

  describe('fromRpcStatus', () => {
    it('should create error from basic RPC status', () => {
      const rpcStatus: IRpcStatus = {
        code: 3,
        message: 'Invalid argument provided',
      };

      const error = OzonApiError.fromRpcStatus(400, rpcStatus);

      expect(error.httpStatus).toBe(400);
      expect(error.code).toBe(3);
      expect(error.message).toBe('Invalid argument provided');
      expect(error.details).toEqual([]);
    });

    it('should create error with details and context', () => {
      const rpcStatus: IRpcStatus = {
        code: 3,
        message: 'Invalid argument',
        details: [
          {
            '@type': 'type.googleapis.com/google.rpc.BadRequest',
            field: 'email',
            description: 'Invalid email format',
          },
        ],
      };

      const error = OzonApiError.fromRpcStatus(422, rpcStatus, {
        operationId: 'createUser',
        requestId: 'req-789',
        url: 'https://api.example.com/users',
      });

      expect(error.httpStatus).toBe(422);
      expect(error.code).toBe(3);
      expect(error.message).toBe('Invalid argument');
      expect(error.details).toHaveLength(1);
      expect(error.details[0].field).toBe('email');
      expect(error.operationId).toBe('createUser');
      expect(error.requestId).toBe('req-789');
    });

    it('should use fallback message when message is empty', () => {
      const rpcStatus: IRpcStatus = {
        code: 5,
        message: '',
      };

      const error = OzonApiError.fromRpcStatus(404, rpcStatus);
      expect(error.message).toBe('RPC Error 5');
    });
  });

  describe('fromResponse', () => {
    it('should create error from Response with JSON RPC status', async () => {
      const responseBody = {
        error: {
          code: 3,
          message: 'Invalid request',
          details: [{ field: 'id', description: 'Required' }],
        },
      };

      const response = new Response(JSON.stringify(responseBody), {
        status: 400,
        statusText: 'Bad Request',
        headers: {
          'content-type': 'application/json',
          'x-request-id': 'test-request-123',
        },
      });

      // Mock response.url since it's not easily settable
      Object.defineProperty(response, 'url', {
        value: 'https://api.example.com/test',
        writable: false,
      });

      const error = await OzonApiError.fromResponse(response, {
        operationId: 'testOp',
      });

      expect(error.httpStatus).toBe(400);
      expect(error.code).toBe(3);
      expect(error.message).toBe('Invalid request');
      expect(error.details).toHaveLength(1);
      expect(error.requestId).toBe('test-request-123');
      expect(error.operationId).toBe('testOp');
    });

    it('should create error from Response with direct RPC status', async () => {
      const responseBody = {
        code: 7,
        message: 'Permission denied',
      };

      const response = new Response(JSON.stringify(responseBody), {
        status: 403,
        statusText: 'Forbidden',
      });

      const error = await OzonApiError.fromResponse(response);

      expect(error.httpStatus).toBe(403);
      expect(error.code).toBe(7);
      expect(error.message).toBe('Permission denied');
    });

    it('should create error from Response with plain text', async () => {
      const response = new Response('Server temporarily unavailable', {
        status: 503,
        statusText: 'Service Unavailable',
      });

      const error = await OzonApiError.fromResponse(response);

      expect(error.httpStatus).toBe(503);
      expect(error.code).toBe(503);
      expect(error.message).toBe('Server temporarily unavailable');
    });

    it('should create error from Response with empty body', async () => {
      const response = new Response('', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      const error = await OzonApiError.fromResponse(response);

      expect(error.httpStatus).toBe(500);
      expect(error.code).toBe(500);
      expect(error.message).toBe('Internal Server Error');
    });
  });

  describe('Error Classification Methods', () => {
    it('should identify client errors (4xx)', () => {
      const error = new OzonApiError({ httpStatus: 404, code: 404, message: 'Not found' });
      expect(error.isClientError()).toBe(true);
      expect(error.isServerError()).toBe(false);
    });

    it('should identify server errors (5xx)', () => {
      const error = new OzonApiError({ httpStatus: 500, code: 500, message: 'Server error' });
      expect(error.isClientError()).toBe(false);
      expect(error.isServerError()).toBe(true);
    });

    it('should identify retryable errors', () => {
      const serverError = new OzonApiError({ httpStatus: 503, code: 503, message: 'Unavailable' });
      expect(serverError.isRetryable()).toBe(true);

      const timeoutError = new OzonApiError({ httpStatus: 408, code: 408, message: 'Timeout' });
      expect(timeoutError.isRetryable()).toBe(true);

      const rateLimitError = new OzonApiError({ httpStatus: 429, code: 429, message: 'Too many requests' });
      expect(rateLimitError.isRetryable()).toBe(true);

      const clientError = new OzonApiError({ httpStatus: 400, code: 400, message: 'Bad request' });
      expect(clientError.isRetryable()).toBe(false);
    });
  });

  describe('getRetryAfter', () => {
    it('should return retry delay from details', () => {
      const error = new OzonApiError({
        httpStatus: 429,
        code: 429,
        message: 'Rate limited',
        details: [
          {
            '@type': 'type.googleapis.com/google.rpc.RetryInfo',
            retryDelay: 120,
          },
        ],
      });

      expect(error.getRetryAfter()).toBe(120);
    });

    it('should return default delays for specific status codes', () => {
      const rateLimitError = new OzonApiError({
        httpStatus: 429,
        code: 429,
        message: 'Too many requests',
      });
      expect(rateLimitError.getRetryAfter()).toBe(60);

      const serviceError = new OzonApiError({
        httpStatus: 503,
        code: 503,
        message: 'Service unavailable',
      });
      expect(serviceError.getRetryAfter()).toBe(30);
    });

    it('should return undefined for non-retryable errors', () => {
      const error = new OzonApiError({
        httpStatus: 400,
        code: 400,
        message: 'Bad request',
      });
      expect(error.getRetryAfter()).toBeUndefined();
    });
  });

  describe('getFieldErrors', () => {
    it('should extract field errors from details', () => {
      const error = new OzonApiError({
        httpStatus: 422,
        code: 3,
        message: 'Validation failed',
        details: [
          { field: 'name', description: 'Name is required' },
          { field: 'email', description: 'Invalid email format' },
          { field: 'email', description: 'Email already exists' },
          { description: 'General error without field' }, // Should be ignored
        ],
      });

      const fieldErrors = error.getFieldErrors();

      expect(fieldErrors).toEqual({
        name: ['Name is required'],
        email: ['Invalid email format', 'Email already exists'],
      });
    });

    it('should return empty object when no field errors', () => {
      const error = new OzonApiError({
        httpStatus: 500,
        code: 500,
        message: 'Server error',
      });

      expect(error.getFieldErrors()).toEqual({});
    });
  });

  describe('Serialization', () => {
    it('should serialize to JSON correctly', () => {
      const error = new OzonApiError({
        httpStatus: 400,
        code: 1001,
        message: 'Test error',
        operationId: 'test-op',
        requestId: 'test-req',
        url: 'https://api.example.com/test',
        details: [{ field: 'test', description: 'Test field error' }],
      });

      const json = error.toJSON();

      expect(json.name).toBe('OzonApiError');
      expect(json.message).toBe('Test error');
      expect(json.httpStatus).toBe(400);
      expect(json.code).toBe(1001);
      expect(json.operationId).toBe('test-op');
      expect(json.requestId).toBe('test-req');
      expect(json.url).toBe('https://api.example.com/test');
      expect(json.details).toEqual([{ field: 'test', description: 'Test field error' }]);
      expect(json.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(json.stack).toBeDefined();
    });

    it('should convert to string with summary information', () => {
      const error = new OzonApiError({
        httpStatus: 422,
        code: 3,
        message: 'Validation failed',
        operationId: 'createUser',
        requestId: 'req-123',
        details: [{ field: 'name', description: 'Required' }],
      });

      const str = error.toString();

      expect(str).toContain('OzonApiError: Validation failed');
      expect(str).toContain('HTTP 422');
      expect(str).toContain('Code 3');
      expect(str).toContain('Operation: createUser');
      expect(str).toContain('Request: req-123');
      expect(str).toContain('Details: 1 error(s)');
    });
  });
});