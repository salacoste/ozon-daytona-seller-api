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
    name: 'contract',
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.contract.test.ts',
      'src/types/generated/*.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportOnFailure: true,
      exclude: [
        'node_modules/',
        'dist/',
        'scripts/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.e2e.test.ts',
        'src/types/generated/', // Generated types don't need coverage
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
    setupFiles: ['./tests/setup/contract.setup.ts'],
    testTimeout: 10000, // 10s timeout for contract tests
  },
});