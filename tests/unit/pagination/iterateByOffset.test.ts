/**
 * Unit tests for iterateByOffset pagination utility
 */

import { describe, it, expect, vi } from 'vitest';
import {
  iterateByOffset,
  collectByOffset,
  collectItemsByOffset,
} from '../../../src/pagination/iterateByOffset';
import type { IOffsetPaginationParams, IOffsetPageResult } from '../../../src/pagination/types';

// Mock data types
interface MockParams extends IOffsetPaginationParams {
  readonly date_from?: string;
}

interface MockResult {
  readonly orders: Array<{ id: string; status: string }>;
  readonly total?: number;
  readonly has_next?: boolean;
}

type MockPageResult = IOffsetPageResult<MockResult>;

describe('iterateByOffset', () => {
  describe('Basic iteration', () => {
    it('should iterate through all pages with offset pagination', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }, { id: '2', status: 'shipped' }],
            total: 5,
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '3', status: 'delivered' }],
            total: 5,
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '4', status: 'pending' }, { id: '5', status: 'cancelled' }],
            total: 5,
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, { limit: 2 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(3);
      expect(mockFetcher).toHaveBeenCalledTimes(3);

      // Check calls with incremental offsets
      expect(mockFetcher).toHaveBeenNthCalledWith(1, { limit: 2, offset: 0 });
      expect(mockFetcher).toHaveBeenNthCalledWith(2, { limit: 2, offset: 2 });
      expect(mockFetcher).toHaveBeenNthCalledWith(3, { limit: 2, offset: 4 });

      expect(pages[0].result.orders).toHaveLength(2);
      expect(pages[1].result.orders).toHaveLength(1);
      expect(pages[2].result.orders).toHaveLength(2);
    });

    it('should stop when has_next is false', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }],
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '2', status: 'shipped' }],
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, { limit: 1 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(2);
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });

    it('should stop when reaching total count', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }, { id: '2', status: 'shipped' }],
            total: 3,
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '3', status: 'delivered' }],
            total: 3,
            has_next: true,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, { limit: 2 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(2);
      expect(mockFetcher).toHaveBeenCalledTimes(2);
      // Should not make third call because offset(4) + limit(2) >= total(3)
    });

    it('should handle initial offset parameter', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '5', status: 'pending' }],
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, {
        limit: 10,
        offset: 40,
      })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(1);
      expect(mockFetcher).toHaveBeenCalledWith({
        limit: 10,
        offset: 40,
      });
    });

    it('should detect empty pages by checking array properties', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }],
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [], // Empty array should stop pagination
            has_next: true, // Even though has_next is true
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(2);
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });

    it('should handle results with multiple array properties', async () => {
      interface MultiArrayResult {
        readonly orders: Array<{ id: string }>;
        readonly items: Array<{ sku: string }>;
        readonly has_next?: boolean;
      }

      const mockFetcher = vi.fn<[IOffsetPaginationParams], Promise<IOffsetPageResult<MultiArrayResult>>>()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1' }],
            items: [{ sku: 'SKU1' }, { sku: 'SKU2' }],
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [], // Empty orders
            items: [{ sku: 'SKU3' }], // But has items
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [], // Both arrays empty
            items: [],
            has_next: true,
          },
        });

      const pages: Array<IOffsetPageResult<MultiArrayResult>> = [];
      for await (const page of iterateByOffset(mockFetcher, { limit: 10 })) {
        pages.push(page.value);
      }

      expect(pages).toHaveLength(3);
      expect(mockFetcher).toHaveBeenCalledTimes(3);
    });
  });

  describe('Configuration', () => {
    it('should use default limit when not provided', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }],
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, {})) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenCalledWith({ limit: 100, offset: 0 });
    });

    it('should respect custom default limit in config', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }],
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(
        mockFetcher,
        {},
        { defaultLimit: 250 }
      )) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenCalledWith({ limit: 250, offset: 0 });
    });

    it('should enforce maximum limit', async () => {
      await expect(async () => {
        const mockFetcher = vi.fn();
        for await (const _ of iterateByOffset(
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
            orders: [{ id: `${i + 1}`, status: 'pending' }],
            has_next: true,
          },
        });
      }

      await expect(async () => {
        for await (const _ of iterateByOffset(
          mockFetcher,
          { limit: 1 },
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
            orders: [{ id: '1', status: 'pending' }],
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '2', status: 'shipped' }],
            has_next: false,
          },
        });

      const startTime = Date.now();
      const pages: MockPageResult[] = [];

      for await (const page of iterateByOffset(
        mockFetcher,
        { limit: 1 },
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
            orders: [{ id: '1', status: 'pending' }],
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '2', status: 'shipped' }],
            has_next: false,
          },
        });

      const pageInfos: Array<{
        pageNumber: number;
        totalFetched: number;
        done: boolean;
      }> = [];

      for await (const page of iterateByOffset(mockFetcher, { limit: 1 })) {
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

  describe('Additional parameters', () => {
    it('should preserve additional parameters through pagination', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '1', status: 'pending' }],
            has_next: true,
          },
        })
        .mockResolvedValueOnce({
          result: {
            orders: [{ id: '2', status: 'shipped' }],
            has_next: false,
          },
        });

      const pages: MockPageResult[] = [];
      for await (const page of iterateByOffset(mockFetcher, {
        limit: 1,
        date_from: '2024-01-01',
      })) {
        pages.push(page.value);
      }

      expect(mockFetcher).toHaveBeenNthCalledWith(1, {
        limit: 1,
        offset: 0,
        date_from: '2024-01-01',
      });
      expect(mockFetcher).toHaveBeenNthCalledWith(2, {
        limit: 1,
        offset: 1,
        date_from: '2024-01-01',
      });
    });
  });
});

describe('collectByOffset', () => {
  it('should collect all pages into array', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '1', status: 'pending' }],
          has_next: true,
        },
      })
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '2', status: 'shipped' }],
          has_next: false,
        },
      });

    const pages = await collectByOffset(mockFetcher, { limit: 1 });

    expect(pages).toHaveLength(2);
    expect(pages[0].result.orders).toEqual([{ id: '1', status: 'pending' }]);
    expect(pages[1].result.orders).toEqual([{ id: '2', status: 'shipped' }]);
  });
});

describe('collectItemsByOffset', () => {
  it('should collect all items into flat array', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '1', status: 'pending' }, { id: '2', status: 'shipped' }],
          has_next: true,
        },
      })
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '3', status: 'delivered' }],
          has_next: false,
        },
      });

    const items = await collectItemsByOffset(
      mockFetcher,
      { limit: 2 },
      (page) => page.result.orders
    );

    expect(items).toHaveLength(3);
    expect(items).toEqual([
      { id: '1', status: 'pending' },
      { id: '2', status: 'shipped' },
      { id: '3', status: 'delivered' },
    ]);
  });

  it('should handle empty extractItems function', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '1', status: 'pending' }],
          has_next: false,
        },
      });

    const items = await collectItemsByOffset(
      mockFetcher,
      { limit: 10 },
      () => []
    );

    expect(items).toEqual([]);
  });

  it('should work with different extractors', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          orders: [
            { id: '1', status: 'pending' },
            { id: '2', status: 'shipped' }
          ],
          has_next: false,
        },
      });

    const ids = await collectItemsByOffset(
      mockFetcher,
      { limit: 10 },
      (page) => page.result.orders.map(o => o.id)
    );

    expect(ids).toEqual(['1', '2']);
  });

  it('should handle complex total count scenarios', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '1', status: 'pending' }, { id: '2', status: 'shipped' }],
          total: 4,
          has_next: true,
        },
      })
      .mockResolvedValueOnce({
        result: {
          orders: [{ id: '3', status: 'delivered' }, { id: '4', status: 'cancelled' }],
          total: 4,
          has_next: false,
        },
      });

    const items = await collectItemsByOffset(
      mockFetcher,
      { limit: 2 },
      (page) => page.result.orders
    );

    expect(items).toHaveLength(4);
    expect(mockFetcher).toHaveBeenCalledTimes(2);
  });
});