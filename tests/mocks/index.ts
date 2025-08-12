/**
 * Test mocking utilities
 * 
 * This module exports utilities for mocking HTTP transport,
 * API responses, and client behavior for comprehensive testing.
 */

// HTTP mocking utilities
export {
  MockHttpResponse,
  mockResponse,
  createMockHttpClient,
  mockData,
} from './httpMock';

// Client mocking utilities
export {
  mockClientConfig,
  setupHttpClientMock,
  setupApiMocks,
  setupOzonClientMock,
} from './clientMock';