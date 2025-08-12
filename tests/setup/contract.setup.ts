/**
 * Contract test setup - runs before all contract tests
 */

import { vi } from 'vitest';

// Mock environment variables for contract testing
process.env.NODE_ENV = 'test';

// Contract tests can take longer than unit tests
vi.setConfig({ testTimeout: 10000 });

// Contract tests may need to read actual API documentation files
// Don't mock filesystem operations for contract tests
// vi.mock('node:fs/promises', () => ({})); // Commented out intentionally

// Suppress verbose console output but keep warnings and errors
const originalConsole = { ...console };
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: originalConsole.warn,
  error: originalConsole.error,
};

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});

// Global teardown
afterAll(() => {
  vi.restoreAllMocks();
  global.console = originalConsole;
});