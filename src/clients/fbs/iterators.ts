/**
 * FBS API iterator methods for automatic pagination
 */

import { iterateByOffset, iterateByCursor } from '../../pagination';
import type { FBSAPI } from './FBSAPI';

/**
 * FBS Iterator methods mixin
 */
export class FBSIterators {
  constructor(private readonly client: FBSAPI) {}

  /**
   * Iterate through FBS unfulfilled orders with automatic pagination
   * @param params - Query parameters for unfulfilled orders
   * @param config - Pagination configuration
   * @returns Async iterator for pages of unfulfilled orders
   */
  iterateUnfulfilledV3(
    params: Partial<Parameters<typeof this.client.getUnfulfilledV3>[0]> = {},
    config?: Parameters<typeof iterateByOffset>[2]
  ) {
    const completeParams = { limit: 100, offset: 0, ...params };
    return iterateByOffset(
      async (pageParams: any) => {
        const response = await this.client.getUnfulfilledV3(pageParams);
        const resultData = response.data.result || {};
        const postings = resultData.postings || [];
        return {
          result: postings,
          has_next: postings.length > 0 && postings.length >= (pageParams.limit || 100)
        };
      },
      completeParams,
      config
    );
  }

  /**
   * Iterate through FBS postings with automatic pagination
   * @param params - Query parameters for FBS posting list
   * @param config - Pagination configuration
   * @returns Async iterator for pages of postings
   */
  iteratePostingsV3(
    params: Partial<Parameters<typeof this.client.listV3>[0]> = {},
    config?: Parameters<typeof iterateByOffset>[2]
  ) {
    const completeParams = { limit: 100, offset: 0, ...params };
    return iterateByOffset(
      async (pageParams: any) => {
        const response = await this.client.listV3(pageParams);
        const resultData = response.data.result || {};
        const postings = resultData.postings || [];
        return {
          result: postings,
          has_next: resultData.has_next || false
        };
      },
      completeParams,
      config
    );
  }

  /**
   * Iterate through unpaid legal products with cursor-based pagination
   * @param params - Query parameters for unpaid legal products  
   * @param config - Pagination configuration
   * @returns Async iterator for pages of unpaid products using cursor pagination
   */
  iterateUnpaidLegalProducts(
    params: Omit<Parameters<typeof this.client.managementMethods.getUnpaidLegalProductListV1>[0], 'cursor'> = {},
    config?: Parameters<typeof iterateByCursor>[2]
  ) {
    const baseParams = { limit: 100, ...params };
    return iterateByCursor(
      async (pageParams: any) => {
        const response = await this.client.managementMethods.getUnpaidLegalProductListV1({ 
          ...baseParams, 
          ...pageParams
        });
        return {
          result: response.data.products || [],
          hasMore: !!response.data.cursor,
          next_cursor: response.data.cursor
        };
      },
      baseParams,
      config
    );
  }

  // ======= LEGACY ITERATOR ALIASES =======

  /**
   * @deprecated Use iterateUnfulfilledV3() instead
   */
  iterateUnfulfilled(
    params: Parameters<typeof this.iterateUnfulfilledV3>[0],
    config?: Parameters<typeof this.iterateUnfulfilledV3>[1]
  ) {
    return this.iterateUnfulfilledV3(params, config);
  }

  /**
   * @deprecated Use iteratePostingsV3() instead
   */
  iterateList(
    params: Parameters<typeof this.iteratePostingsV3>[0],
    config?: Parameters<typeof this.iteratePostingsV3>[1]
  ) {
    return this.iteratePostingsV3(params, config);
  }
}