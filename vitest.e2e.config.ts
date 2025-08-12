/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/types': resolve(__dirname, './src/types'),
      '@/clients': resolve(__dirname, './src/clients'),
      '@/http': resolve(__dirname, './src/http'),
      '@/errors': resolve(__dirname, './src/errors'),
      '@/pagination': resolve(__dirname, './src/pagination'),
      '@/utils': resolve(__dirname, './src/utils'),
    },
  },
  test: {
    name: 'e2e',
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.e2e.test.ts',
      'tests/e2e/**/*.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportOnFailure: false, // E2E tests focus on functionality, not coverage
      exclude: [
        'node_modules/',
        'dist/',
        'scripts/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.contract.test.ts',
        'src/types/generated/',
      ],
      thresholds: {
        global: {
          branches: 60, // Lower thresholds for E2E
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
    },
    setupFiles: ['./tests/setup/e2e.setup.ts'],
    testTimeout: 30000, // 30s timeout for E2E tests
    // E2E tests should run sequentially to avoid API rate limiting
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});