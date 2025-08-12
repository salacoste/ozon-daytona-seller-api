import { iterateByOffset, iterateByCursor } from '../../pagination';
import type { FBSAPI } from './FBSAPI';
export declare class FBSIterators {
    private readonly client;
    constructor(client: FBSAPI);
    iterateUnfulfilledV3(params?: Partial<Parameters<typeof this.client.getUnfulfilledV3>[0]>, config?: Parameters<typeof iterateByOffset>[2]): AsyncGenerator<import("../../pagination").IPaginationIteratorResult<import("../../pagination").IOffsetPageResult<import("../..").IV3FbsPosting[]>>, void, unknown>;
    iteratePostingsV3(params?: Partial<Parameters<typeof this.client.listV3>[0]>, config?: Parameters<typeof iterateByOffset>[2]): AsyncGenerator<import("../../pagination").IPaginationIteratorResult<import("../../pagination").IOffsetPageResult<import("../..").IV3FbsPosting[]>>, void, unknown>;
    iterateUnpaidLegalProducts(params?: Omit<Parameters<typeof this.client.managementMethods.getUnpaidLegalProductListV1>[0], 'cursor'>, config?: Parameters<typeof iterateByCursor>[2]): AsyncGenerator<import("../../pagination").IPaginationIteratorResult<import("../../pagination").ICursorPageResult<import("../..").IV1PostingUnpaidLegalProductListResponseProducts[]>>, void, unknown>;
    iterateUnfulfilled(params: Parameters<typeof this.iterateUnfulfilledV3>[0], config?: Parameters<typeof this.iterateUnfulfilledV3>[1]): AsyncGenerator<import("../../pagination").IPaginationIteratorResult<import("../../pagination").IOffsetPageResult<import("../..").IV3FbsPosting[]>>, void, unknown>;
    iterateList(params: Parameters<typeof this.iteratePostingsV3>[0], config?: Parameters<typeof this.iteratePostingsV3>[1]): AsyncGenerator<import("../../pagination").IPaginationIteratorResult<import("../../pagination").IOffsetPageResult<import("../..").IV3FbsPosting[]>>, void, unknown>;
}
