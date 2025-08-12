import type { ICursorPaginationParams, ICursorPageResult } from '../../../src/pagination/types';

export interface MockParams extends ICursorPaginationParams {
  readonly category_id?: string;
}

export interface MockResult {
  readonly products: Array<{ id: string; title: string }>;
  readonly next_cursor?: string;
  readonly has_next?: boolean;
}

export type MockPageResult = ICursorPageResult<MockResult>;
