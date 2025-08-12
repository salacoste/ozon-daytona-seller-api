/**
 * Unit tests for iterateByLastId pagination utility
 */

import { describe, it, expect, vi } from 'vitest';
import {
  iterateByLastId,
  collectByLastId,
  collectItemsByLastId,
} from '../../../src/pagination/iterateByLastId';
import type { ILastIdPaginationParams, ILastIdPageResult } from '../../../src/pagination/types';

// Mock data types
interface MockParams extends ILastIdPaginationParams {
  readonly filter?: string;
}

interface MockResult {
  readonly items: Array<{ id: string; name: string }>;
  readonly last_id?: string;
  readonly has_next?: boolean;
}

type MockPageResult = ILastIdPageResult<MockResult>;

describe('iterateByLastId', () => {
  describe('Basic iteration', () => {
    it('should iterate through all pages until last_id becomes empty', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
            last_id: 'page1_last',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '3', name: 'Item 3' }],
            last_id: 'page2_last',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '4', name: 'Item 4' }],
            last_id: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByLastId(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(3);
      expect(mockFetcher).toHaveBeenCalledTimes(3);

      // Check first call
      expect(mockFetcher).toHaveBeenNthCalledWith(1, { limit: 10 });
      // Check second call with last_id from first page
      expect(mockFetcher).toHaveBeenNthCalledWith(2, { limit: 10, last_id: 'page1_last' });
      // Check third call with last_id from second page
      expect(mockFetcher).toHaveBeenNthCalledWith(3, { limit: 10, last_id: 'page2_last' });

      expect(pages[0].result.items).toHaveLength(2);
      expect(pages[1].result.items).toHaveLength(1);
      expect(pages[2].result.items).toHaveLength(1);
    });

    it('should stop when has_next is false', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '1', name: 'Item 1' }],
            last_id: 'page1_last',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '2', name: 'Item 2' }],
            last_id: 'page2_last',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByLastId(mockFetcher, { limit: 5 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(2);
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });

    it('should handle initial last_id parameter', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '5', name: 'Item 5' }],
            last_id: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByLastId(mockFetcher, {
        limit: 10,
        last_id: 'initial_last_id',
      })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(1);
      expect(mockFetcher).toHaveBeenCalledWith({
        limit: 10,
        last_id: 'initial_last_id',
      });
    });

    it('should handle empty results', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [],
            last_id: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByLastId(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(1);
      expect(pages[0].result.items).toEqual([]);
    });
  });

  describe('Configuration', () => {
    it('should use default limit when not provided', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '1', name: 'Item 1' }],
            last_id: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByLastId(mockFetcher, {})) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenCalledWith({ limit: 100 });
    });

    it('should respect custom default limit in config', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '1', name: 'Item 1' }],
            last_id: '',
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByLastId(
        mockFetcher,
        {},
        { defaultLimit: 250 }
      )) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenCalledWith({ limit: 250 });
    });

    it('should enforce maximum limit', async () => {
      await expect(async () => {
        const mockFetcher = vi.fn();
        for await (const _ of iterateByLastId(
          mockFetcher,
          { limit: 2000 },
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
            items: [{ id: `${i + 1}`, name: `Item ${i + 1}` }],
            last_id: `page${i + 1}_last`,
            has_next: true,
          },
        });
      }

      await expect(async () => {
        for await (const _ of iterateByLastId(
          mockFetcher,
          { limit: 10 },
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
            items: [{ id: '1', name: 'Item 1' }],
            last_id: 'page1_last',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '2', name: 'Item 2' }],
            last_id: '',
            has_next: false,
          },
        });

      const startTime = Date.now();
      const pages: MockPageResult[] = [];

      for await (const page of iterateByLastId(
        mockFetcher,
        { limit: 10 },
        { delayBetweenPages: 100 }
      )) {
        pages.push(page.value);
      }

      const endTime = Date.now();
      expect(pages).toHaveLength(2);
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    });
  });

  describe('Page information', () => {
    it('should provide correct page information', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '1', name: 'Item 1' }],
            last_id: 'page1_last',
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            items: [{ id: '2', name: 'Item 2' }],
            last_id: '',
            has_next: false,
          },
        });

      const pageInfos: Array<{
        pageNumber: number;
        totalFetched: number;
        done: boolean;
      }> = [];

      for await (const page of iterateByLastId(mockFetcher, { limit: 10 })) {
        pageInfos.push({
          pageNumber: page.pageNumber,
          totalFetched: page.totalFetched,
          done: page.done,
        });
      }

      expect(pageInfos).toEqual([
        { pageNumber: 1, totalFetched: 1, done: false },
        { pageNumber: 2, totalFetched: 2, done: false },
      ]);
    });
  });
});

describe('collectByLastId', () => {
  it('should collect all pages into array', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          items: [{ id: '1', name: 'Item 1' }],
          last_id: 'page1_last',
          has_next: true,
        },
      })
      .mockResolvedValueOnce({
        result: {
          items: [{ id: '2', name: 'Item 2' }],
          last_id: '',
          has_next: false,
        },
      });

    const pages = await collectByLastId(mockFetcher, { limit: 10 });

    expect(pages).toHaveLength(2);
    expect(pages[0].result.items).toEqual([{ id: '1', name: 'Item 1' }]);
    expect(pages[1].result.items).toEqual([{ id: '2', name: 'Item 2' }]);
  });
});

describe('collectItemsByLastId', () => {
  it('should collect all items into flat array', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          items: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
          last_id: 'page1_last',
          has_next: true,
        },
      })
      .mockResolvedValueOnce({
        result: {
          items: [{ id: '3', name: 'Item 3' }],
          last_id: '',
          has_next: false,
        },
      });

    const items = await collectItemsByLastId(
      mockFetcher,
      { limit: 10 },
      (page) => page.result.items
    );

    expect(items).toHaveLength(3);
    expect(items).toEqual([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ]);
  });

  it('should handle empty extractItems function', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          items: [{ id: '1', name: 'Item 1' }],
          last_id: '',
          has_next: false,
        },
      });

    const items = await collectItemsByLastId(
      mockFetcher,
      { limit: 10 },
      () => []
    );

    expect(items).toEqual([]);
  });
});