/**
 * Global test setup for Vitest
 * Configures global mocks and test environment
 */

import { vi } from 'vitest';

// Mock global fetch if not available
if (!globalThis.fetch) {
  globalThis.fetch = vi.fn();
}

// Mock console methods to reduce noise in tests
vi.stubGlobal('console', {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
});

// Global test configuration
process.env['NODE_ENV'] = 'test';