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
    name: 'unit',
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.test.ts',
      'src/**/*.spec.ts'
    ],
    exclude: [
      'src/**/*.contract.test.ts',
      'src/**/*.e2e.test.ts',
      'src/**/*.integration.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      reportOnFailure: true,
      exclude: [
        'node_modules/',
        'dist/',
        'scripts/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts', 
        '**/*.contract.test.ts',
        '**/*.e2e.test.ts',
        'src/types/generated/',
        'src/index.ts', // Entry point - covered by integration tests
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        // Higher thresholds for core modules
        'src/http/': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/errors/': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/pagination/': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },
    setupFiles: ['./tests/setup/unit.setup.ts'],
    testTimeout: 5000, // 5s timeout for unit tests
  },
});