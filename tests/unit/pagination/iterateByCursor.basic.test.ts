/**
 * Unit tests for iterateByCursor pagination utility — Basic flows
 */

import { describe, it, expect, vi } from 'vitest';
import { iterateByCursor } from '../../../src/pagination/iterateByCursor';
import type { MockParams, MockResult, MockPageResult } from './_mocks';

describe('iterateByCursor — Basic iteration', () => {
  it('iterates through all pages until next_cursor becomes empty', async () => {
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
    expect(mockFetcher).toHaveBeenNthCalledWith(1, { limit: 10 });
    expect(mockFetcher).toHaveBeenNthCalledWith(2, { limit: 10, cursor: 'cursor_page_1' });
    expect(mockFetcher).toHaveBeenNthCalledWith(3, { limit: 10, cursor: 'cursor_page_2' });
    expect(pages[0].result.products).toHaveLength(2);
    expect(pages[1].result.products).toHaveLength(1);
    expect(pages[2].result.products).toHaveLength(1);
  });

  it('stops when has_next is false', async () => {
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

  it('handles initial cursor parameter', async () => {
    const mockFetcher = vi.fn().mockResolvedValueOnce({
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
    expect(mockFetcher).toHaveBeenCalledWith({ limit: 10, cursor: 'initial_cursor' });
  });

  it('handles empty results', async () => {
    const mockFetcher = vi.fn().mockResolvedValueOnce({
      result: { products: [], next_cursor: '', has_next: false },
    });

    const pages: MockPageResult[] = [];
    for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, { limit: 10 })) {
      pages.push(page.value);
    }

    expect(pages).toHaveLength(1);
    expect(pages[0].result.products).toEqual([]);
  });

  it('stops when next_cursor is undefined', async () => {
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

describe('iterateByCursor — Page information', () => {
  it('provides correct page information', async () => {
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

    const pageInfos: Array<{ pageNumber: number; totalFetched: number; done: boolean }> = [];

    for await (const page of iterateByCursor<MockParams, MockResult>(mockFetcher, { limit: 10 })) {
      pageInfos.push({ pageNumber: page.pageNumber, totalFetched: page.totalFetched, done: page.done });
    }

    expect(pageInfos).toEqual([
      { pageNumber: 1, totalFetched: 1, done: false },
      { pageNumber: 2, totalFetched: 2, done: false },
    ]);
  });
});
