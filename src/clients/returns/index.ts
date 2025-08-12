/**
 * ReturnsAPI client for Ozon Seller API
 * 
 * Implements returns information endpoints from /methods/27-returnsapi.json:
 * - Get FBO and FBS returns list with comprehensive filtering
 * - Pagination support with last_id
 * - Detailed return information including storage, logistics, and visual status
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  GetReturnsListV1Request,
  GetReturnsListV1Response,
  ReturnItem
} from './types';

/**
 * ReturnsAPI client for retrieving FBO and FBS returns information
 * 
 * Provides comprehensive returns data including product details, storage costs,
 * logistics tracking, visual status, and financial information for both
 * FBO and FBS return schemas.
 * 
 * @example
 * ```typescript
 * // Get returns for date range
 * const returns = await client.returns.getReturnsListV1({
 *   filter: {
 *     logistic_return_date: {
 *       time_from: '2024-01-01T00:00:00Z',
 *       time_to: '2024-01-31T23:59:59Z'
 *     },
 *     return_schema: 'FBO'
 *   },
 *   limit: 100
 * });
 * 
 * // Filter by posting numbers
 * const specificReturns = await client.returns.getReturnsListV1({
 *   filter: {
 *     posting_numbers: ['58544282-0057-1', '58544282-0058-1']
 *   },
 *   limit: 50
 * });
 * 
 * // Iterate through all returns with pagination
 * for await (const page of client.returns.iterateReturnsListV1({
 *   filter: { return_schema: 'FBS' },
 *   limit: 500
 * })) {
 *   page.forEach(returnItem => {
 *     console.log(`Return ${returnItem.id}: ${returnItem.product?.name}`);
 *   });
 * }
 * ```
 */
export class ReturnsAPI {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get returns list V1
   * 
   * Retrieves comprehensive information about FBO and FBS returns including
   * product details, storage costs, logistics tracking, and current status.
   * 
   * ⚠️ **Important**: Use only one date filter per request:
   * - `logistic_return_date` - Filter by return creation date
   * - `storage_tariffication_start_date` - Filter by tariffication start date  
   * - `visual_status_change_moment` - Filter by status change date
   * 
   * Using multiple date filters will result in an error.
   * 
   * @param params - Returns list parameters
   * @returns Returns information with pagination
   * 
   * @example
   * ```typescript
   * // Filter by return creation date
   * const result = await client.returns.getReturnsListV1({
   *   filter: {
   *     logistic_return_date: {
   *       time_from: '2024-01-01T00:00:00Z',
   *       time_to: '2024-01-31T23:59:59Z'
   *     },
   *     warehouse_id: 911,
   *     return_schema: 'FBO'
   *   },
   *   limit: 100
   * });
   * 
   * // Process returns data
   * result.data.returns?.forEach(returnItem => {
   *   console.log(`Return ${returnItem.id}:`);
   *   console.log(`  Product: ${returnItem.product?.name}`);
   *   console.log(`  Status: ${returnItem.visual?.status?.display_name}`);
   *   console.log(`  Storage cost: ${returnItem.storage?.sum?.price} ${returnItem.storage?.sum?.currency_code}`);
   * });
   * 
   * // Handle pagination
   * if (result.data.has_next) {
   *   const nextPage = await client.returns.getReturnsListV1({
   *     ...params,
   *     last_id: result.data.returns?.[result.data.returns.length - 1]?.id
   *   });
   * }
   * ```
   */
  async getReturnsListV1(
    params: GetReturnsListV1Request
  ): Promise<IHttpResponse<GetReturnsListV1Response>> {
    return this.httpClient.post('/v1/returns/list', params);
  }

  /**
   * Iterate through returns list V1 with automatic pagination
   * 
   * Automatically handles pagination using last_id to iterate through
   * all returns matching the specified filters.
   * 
   * @param params - Returns list parameters (without last_id)
   * @returns Async generator yielding pages of returns
   * 
   * @example
   * ```typescript
   * // Process all FBS returns for a warehouse
   * for await (const returnsPage of client.returns.iterateReturnsListV1({
   *   filter: {
   *     logistic_return_date: {
   *       time_from: '2024-01-01T00:00:00Z',
   *       time_to: '2024-12-31T23:59:59Z'
   *     },
   *     return_schema: 'FBS',
   *     warehouse_id: 911
   *   },
   *   limit: 500
   * })) {
   *   console.log(`Processing ${returnsPage.length} returns...`);
   *   
   *   for (const returnItem of returnsPage) {
   *     // Process each return
   *     if (returnItem.visual?.status?.sys_name === 'ArrivedAtReturnPlace') {
   *       console.log(`Return ${returnItem.posting_number} arrived at return place`);
   *     }
   *   }
   * }
   * ```
   */
  async *iterateReturnsListV1(
    params: Omit<GetReturnsListV1Request, 'last_id'>
  ): AsyncGenerator<ReturnItem[], void, unknown> {
    let lastId: number | undefined;
    let hasNext = true;
    
    while (hasNext) {
      const response = await this.getReturnsListV1({
        ...params,
        ...(lastId && { last_id: lastId }),
        limit: params.limit || 100
      });
      
      const returns = response.data.returns || [];
      if (returns.length === 0) {
        hasNext = false;
      } else {
        yield returns;
        lastId = returns.slice(-1)[0]?.id ? Number(returns.slice(-1)[0]?.id) : undefined;
        hasNext = response.data.has_next || false;
      }
    }
  }
}

// Re-export types for convenience
export type * from './types';