/**
 * E2E test setup - runs before all end-to-end tests
 */

import { vi } from 'vitest';

// Mock environment variables for E2E testing
process.env.NODE_ENV = 'test';

// E2E tests need longer timeouts for real API calls
vi.setConfig({ testTimeout: 30000 });

// E2E tests should NOT mock HTTP calls or filesystem operations
// They test the real integration

// Suppress debug output but keep info, warnings, and errors for E2E visibility
const originalConsole = { ...console };
global.console = {
  ...console,
  debug: vi.fn(),
  // Keep log, info, warn, error for E2E debugging
};

// Set up test environment checks
beforeAll(() => {
  // Check for required environment variables for E2E tests
  if (!process.env.OZON_CLIENT_ID && !process.env.CI) {
    console.warn('⚠️  E2E tests require OZON_CLIENT_ID environment variable');
    console.warn('⚠️  Set OZON_CLIENT_ID and OZON_API_KEY to run E2E tests with real API');
    console.warn('⚠️  Skipping E2E tests that require real credentials');
  }
});

// Minimal cleanup for E2E tests
afterEach(() => {
  vi.clearAllTimers();
});

// Global teardown
afterAll(() => {
  vi.restoreAllMocks();
  global.console = originalConsole;
});