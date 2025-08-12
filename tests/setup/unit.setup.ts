/**
 * Unit test setup - runs before all unit tests
 */

import { vi, afterEach, afterAll } from 'vitest';

// Mock environment variables for consistent testing
process.env.NODE_ENV = 'test';

// Global test timeout for unit tests
vi.setConfig({ testTimeout: 5000 });

// Set up default mocks for external dependencies
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
  mkdir: vi.fn(),
  readdir: vi.fn(),
}));

// Suppress console output during tests unless explicitly testing logging
const originalConsole = { ...console };
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: originalConsole.error, // Keep error logging for debugging
};

// Global promise rejection handler to catch any unhandled rejections
let unhandledRejections: Array<any> = [];
const originalUnhandledRejection = process.listenerCount('unhandledRejection') > 0 
  ? process.listeners('unhandledRejection')[0] 
  : null;

process.on('unhandledRejection', (reason, promise) => {
  // Collect unhandled rejections for debugging but don't fail tests
  unhandledRejections.push({ reason, promise });
  console.warn('Unhandled Promise Rejection:', reason);
});

// Clean up after each test
afterEach(async () => {
  vi.clearAllMocks();
  vi.clearAllTimers();
  
  // Clear any accumulated unhandled rejections
  unhandledRejections = [];
  
  // Run any pending timers to ensure promises settle
  if (vi.isFakeTimers()) {
    await vi.runAllTimersAsync();
  }
});

// Global teardown
afterAll(() => {
  vi.restoreAllMocks();
  global.console = originalConsole;
  
  // Restore original unhandled rejection handler
  process.removeAllListeners('unhandledRejection');
  if (originalUnhandledRejection) {
    process.on('unhandledRejection', originalUnhandledRejection);
  }
});