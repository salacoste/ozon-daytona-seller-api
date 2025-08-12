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
    globals: true,
    environment: 'node',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/test old/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'scripts/',
        'tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
        'src/types/generated/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});