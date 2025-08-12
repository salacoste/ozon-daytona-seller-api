/**
 * Unit tests for iterateByCursor pagination utility
 */

import { describe, it, expect, vi } from 'vitest';
import {
  iterateByCursor,
} from '../../../src/pagination/iterateByCursor';
import type { MockParams, MockResult, MockPageResult } from './_mocks';

describe('iterateByCursor', () => {
  describe('Basic iteration', () => {
    it('should iterate through all pages until next_cursor becomes empty', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '1', title: 'Product 1' }, { id: '2', title: 'Product 2' }],
            next_cursor: 'cursor_page_1',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '3', title: 'Product 3' }],
            next_cursor: 'cursor_page_2',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '4', title: 'Product 4' }],
            next_cursor: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(3);
      expect(mockFetcher).toHaveBeenCalledTimes(3);

      // Check first call (no cursor)
      expect(mockFetcher).toHaveBeenNthCalledWith(1, { limit: 10 });
      // Check second call with cursor from first page
      expect(mockFetcher).toHaveBeenNthCalledWith(2, { limit: 10, cursor: 'cursor_page_1' });
      // Check third call with cursor from second page
      expect(mockFetcher).toHaveBeenNthCalledWith(3, { limit: 10, cursor: 'cursor_page_2' });

      expect(pages[0].result.products).toHaveLength(2);
      expect(pages[1].result.products).toHaveLength(1);
      expect(pages[2].result.products).toHaveLength(1);
    });

    it('should stop when has_next is false', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '1', title: 'Product 1' }],
            next_cursor: 'cursor_page_1',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '2', title: 'Product 2' }],
            next_cursor: 'cursor_page_2',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, { limit: 5 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(2);
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });

    it('should handle initial cursor parameter', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '5', title: 'Product 5' }],
            next_cursor: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, {
        limit: 10,
        cursor: 'initial_cursor',
      })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(1);
      expect(mockFetcher).toHaveBeenCalledWith({
        limit: 10,
        cursor: 'initial_cursor',
      });
    });

    it('should handle empty results', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [],
            next_cursor: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].result.products).toEqual([]);
    });

    it('should stop when next_cursor is undefined', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '1', title: 'Product 1' }],
            next_cursor: 'cursor_page_1',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '2', title: 'Product 2' }],
            // next_cursor is undefined
            has_next: true,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(2);
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });
  });

  describe('Configuration', () => {
    it('should use default limit when not provided', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '1', title: 'Product 1' }],
            next_cursor: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, {} as MockParams)) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenCalledWith({ limit: 100 });
    });

    it('should respect custom default limit in config', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '1', title: 'Product 1' }],
            next_cursor: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByCursor<MockParams, MockResult>(
        mockFetcher,
        {} as MockParams,
        { defaultLimit: 250 }
      )) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenCalledWith({ limit: 250 });
    });

    it('should enforce maximum limit', async () => {
      await expect(async () => {
        const mockFetcher = vi.fn();
        for await (const _ of iterateByCursor<MockParams, MockResult>(
          mockFetcher,
          { limit: 2000 } as MockParams,
          { maxLimit: 1000 }
        )) {
          break;
        }
      }).rejects.toThrow('Limit 2000 exceeds maximum allowed 1000');
    });

    it('should enforce maximum pages', async () => {
      const mockFetcher = vi.fn();
      // Mock 5 pages with continuous pagination
      for (let i = 0; i < 5; i++) {
        mockFetcher.mockResolvedValueOnce({
          result: {
            products: [{ id: `${i + 1}`, title: `Product ${i + 1}` }],
            next_cursor: `cursor_page_${i + 1}`,
            has_next: true,
          },
        });
      }

      await expect(async () => {
        for await (const _ of iterateByCursor<MockParams, MockResult>(
          mockFetcher,
          { limit: 10 } as MockParams,
          { maxPages: 3 }
        )) {
          // Continue iterating
        }
      }).rejects.toThrow('Pagination limit exceeded: fetched 3 pages');
    });

    it('should add delay between pages when configured', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '1', title: 'Product 1' }],
            next_cursor: 'cursor_page_1',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            products: [{ id: '2', title: 'Product 2' }],
            next_cursor: '',
            has_next: false,
          },
        });

      const startTime = Date.now();
      const pages: MockPageResult[] = [];

      for await (const page of iterateByCursor<MockParams, MockResult>(
        mockFetcher,
        { limit: 10 } as MockParams,
        { delayBetweenPages: 100 }
      )) {
        pages.push(page.value);
      }

      const endTime = Date.now();
      expect(pages).toHaveLength(2);
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });
  });
});