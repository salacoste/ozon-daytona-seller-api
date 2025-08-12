import { describe, it, expect, vi } from 'vitest';
import { collectByCursor, collectItemsByCursor } from '../../../src/pagination/iterateByCursor';
import type { MockParams, MockResult } from './_mocks';

describe('collectByCursor', () => {
  it('collects all pages into array', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: { products: [{ id: '1', title: 'Product 1' }], next_cursor: 'cursor_page_1', has_next: true },
      })
      .mockResolvedValueOnce({
        result: { products: [{ id: '2', title: 'Product 2' }], next_cursor: '', has_next: false },
      });

    const pages = await collectByCursor<MockParams, MockResult>(mockFetcher, { limit: 10 } as MockParams);

    expect(pages).toHaveLength(2);
    expect(pages[0].result.products).toEqual([{ id: '1', title: 'Product 1' }]);
    expect(pages[1].result.products).toEqual([{ id: '2', title: 'Product 2' }]);
  });
});

describe('collectItemsByCursor', () => {
  it('collects all items into flat array', async () => {
    const mockFetcher = vi.fn()
      .mockResolvedValueOnce({
        result: { products: [{ id: '1', title: 'Product 1' }, { id: '2', title: 'Product 2' }], next_cursor: 'cursor_page_1', has_next: true },
      })
      .mockResolvedValueOnce({
        result: { products: [{ id: '3', title: 'Product 3' }], next_cursor: '', has_next: false },
      });

    const items = await collectItemsByCursor<MockParams, MockResult, { id: string; title: string }>(
      mockFetcher,
      { limit: 10 } as MockParams,
      (page) => page.result.products
    );

    expect(items).toHaveLength(3);
    expect(items).toEqual([
      { id: '1', title: 'Product 1' },
      { id: '2', title: 'Product 2' },
      { id: '3', title: 'Product 3' },
    ]);
  });

  it('handles empty extractItems function', async () => {
    const mockFetcher = vi.fn().mockResolvedValueOnce({
      result: { products: [{ id: '1', title: 'Product 1' }], next_cursor: '', has_next: false },
    });

    const items = await collectItemsByCursor<MockParams, MockResult, never>(
      mockFetcher,
      { limit: 10 } as MockParams,
      () => []
    );

    expect(items).toEqual([]);
  });

  it('works with different extractors', async () => {
    const mockFetcher = vi.fn().mockResolvedValueOnce({
      result: { products: [ { id: '1', title: 'Product 1' }, { id: '2', title: 'Product 2' } ], next_cursor: '', has_next: false },
    });

    const ids = await collectItemsByCursor<MockParams, MockResult, string>(
      mockFetcher,
      { limit: 10 } as MockParams,
      (page) => page.result.products.map(p => p.id)
    );

    expect(ids).toEqual(['1', '2']);
  });
});
