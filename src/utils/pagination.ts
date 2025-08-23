/**
 * Pagination utilities for consistent pagination across all API categories
 */

import type { PaginationRequest, PaginationResponse, CursorPaginationRequest, CursorPaginationResponse } from "../types/common/base.js";

/**
 * Основные типы пагинации
 */
export type PaginationType = "offset" | "cursor";

/**
 * Конфигурация пагинации
 */
export interface PaginationConfig {
  /** Тип пагинации */
  type: PaginationType;
  /** Лимит по умолчанию */
  defaultLimit: number;
  /** Максимальный лимит */
  maxLimit: number;
}

/**
 * Конфигурации пагинации для различных категорий API
 */
export const PAGINATION_CONFIGS: Record<string, PaginationConfig> = {
  // ProductAPI - использует offset пагинацию
  product: {
    type: "offset",
    defaultLimit: 100,
    maxLimit: 1000,
  },

  // ReturnsAPI - использует offset пагинацию
  returns: {
    type: "offset",
    defaultLimit: 100,
    maxLimit: 500,
  },

  // ReturnAPI (giveouts) - использует offset пагинацию
  return: {
    type: "offset",
    defaultLimit: 50,
    maxLimit: 200,
  },

  // Quants - использует cursor пагинацию
  quants: {
    type: "cursor",
    defaultLimit: 100,
    maxLimit: 500,
  },
};

/**
 * Хелпер для создания offset-пагинации запроса
 */
export function createOffsetPaginationRequest(options: { limit?: number; last_id?: number; category: string }): PaginationRequest {
  const config = PAGINATION_CONFIGS[options.category];
  if (!config || config.type !== "offset") {
    throw new Error(`Invalid pagination config for category: ${options.category}`);
  }

  const limit = Math.min(options.limit ?? config.defaultLimit, config.maxLimit);

  return {
    limit,
    last_id: options.last_id,
  };
}

/**
 * Хелпер для создания cursor-пагинации запроса
 */
export function createCursorPaginationRequest(options: { limit?: number; cursor?: string; category: string }): CursorPaginationRequest {
  const config = PAGINATION_CONFIGS[options.category];
  if (!config || config.type !== "cursor") {
    throw new Error(`Invalid pagination config for category: ${options.category}`);
  }

  const limit = Math.min(options.limit ?? config.defaultLimit, config.maxLimit);

  return {
    limit,
    cursor: options.cursor,
  };
}

/**
 * Проверка, есть ли следующая страница для offset пагинации
 */
export function hasNextPageOffset(response: PaginationResponse, requestedLimit: number, itemsCount: number): boolean {
  // Если в ответе есть явное указание
  if (response.has_next !== undefined) {
    return response.has_next;
  }

  // Если количество элементов равно запрошенному лимиту, вероятно есть еще данные
  return itemsCount >= requestedLimit;
}

/**
 * Проверка, есть ли следующая страница для cursor пагинации
 */
export function hasNextPageCursor(response: CursorPaginationResponse): boolean {
  return !!response.cursor;
}

/**
 * Получить следующий последний ID для offset пагинации
 */
export function getNextLastId<T extends { id?: number }>(items: T[]): number | undefined {
  if (!items || items.length === 0) {
    return undefined;
  }

  const lastItem = items[items.length - 1];
  return lastItem?.id;
}

/**
 * Универсальный итератор для автоматической пагинации (offset)
 */
export async function* paginateOffset<TRequest extends PaginationRequest, TResponse extends PaginationResponse, TItem>(
  fetcher: (request: TRequest) => Promise<TResponse>,
  baseRequest: Omit<TRequest, keyof PaginationRequest>,
  category: string,
  itemsExtractor: (response: TResponse) => TItem[] | undefined,
): AsyncIterableIterator<TItem[]> {
  const config = PAGINATION_CONFIGS[category];
  if (!config || config.type !== "offset") {
    throw new Error(`Invalid pagination config for category: ${category}`);
  }

  let last_id: number | undefined;
  let hasMore = true;

  while (hasMore) {
    const request = {
      ...baseRequest,
      ...createOffsetPaginationRequest({
        last_id,
        category,
      }),
    } as TRequest;

    const response = await fetcher(request);
    const items = itemsExtractor(response) ?? [];

    if (items.length === 0) {
      break;
    }

    yield items;

    hasMore = hasNextPageOffset(response, request.limit!, items.length);
    if (hasMore) {
      // Попытаться получить last_id из последнего элемента
      const lastItem = items[items.length - 1] as Record<string, unknown>;
      last_id = (lastItem?.["id"] as number) ?? (lastItem?.["giveout_id"] as number) ?? (last_id ? last_id + items.length : items.length);
    }
  }
}

/**
 * Универсальный итератор для автоматической пагинации (cursor)
 */
export async function* paginateCursor<TRequest extends CursorPaginationRequest, TResponse extends CursorPaginationResponse, TItem>(
  fetcher: (request: TRequest) => Promise<TResponse>,
  baseRequest: Omit<TRequest, keyof CursorPaginationRequest>,
  category: string,
  itemsExtractor: (response: TResponse) => TItem[] | undefined,
): AsyncIterableIterator<TItem[]> {
  const config = PAGINATION_CONFIGS[category];
  if (!config || config.type !== "cursor") {
    throw new Error(`Invalid pagination config for category: ${category}`);
  }

  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const request = {
      ...baseRequest,
      ...createCursorPaginationRequest({
        cursor,
        category,
      }),
    } as TRequest;

    const response = await fetcher(request);
    const items = itemsExtractor(response) ?? [];

    if (items.length === 0) {
      break;
    }

    yield items;

    hasMore = hasNextPageCursor(response);
    if (hasMore) {
      cursor = response.cursor;
    }
  }
}

/**
 * Собрать все результаты из пагинированного API (offset)
 */
export async function collectAllOffset<TRequest extends PaginationRequest, TResponse extends PaginationResponse, TItem>(
  fetcher: (request: TRequest) => Promise<TResponse>,
  baseRequest: Omit<TRequest, keyof PaginationRequest>,
  category: string,
  itemsExtractor: (response: TResponse) => TItem[] | undefined,
  maxItems?: number,
): Promise<TItem[]> {
  const allItems: TItem[] = [];

  for await (const items of paginateOffset(fetcher, baseRequest, category, itemsExtractor)) {
    allItems.push(...items);

    if (maxItems && allItems.length >= maxItems) {
      return allItems.slice(0, maxItems);
    }
  }

  return allItems;
}

/**
 * Собрать все результаты из пагинированного API (cursor)
 */
export async function collectAllCursor<TRequest extends CursorPaginationRequest, TResponse extends CursorPaginationResponse, TItem>(
  fetcher: (request: TRequest) => Promise<TResponse>,
  baseRequest: Omit<TRequest, keyof CursorPaginationRequest>,
  category: string,
  itemsExtractor: (response: TResponse) => TItem[] | undefined,
  maxItems?: number,
): Promise<TItem[]> {
  const allItems: TItem[] = [];

  for await (const items of paginateCursor(fetcher, baseRequest, category, itemsExtractor)) {
    allItems.push(...items);

    if (maxItems && allItems.length >= maxItems) {
      return allItems.slice(0, maxItems);
    }
  }

  return allItems;
}
