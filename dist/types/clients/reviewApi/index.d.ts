import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { CommentCreateRequest, CommentDeleteRequest, CommentListRequest, ReviewChangeStatusRequest, ReviewCountRequest, ReviewInfoRequest, ReviewListRequest, CommentCreateResponse, CommentDeleteResponse, CommentListResponse, ReviewChangeStatusResponse, ReviewCountResponse, ReviewInfoResponse, ReviewListResponse, Review, ReviewAnalytics } from './types';
export declare class ReviewAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listReviews(params?: ReviewListRequest): Promise<IHttpResponse<ReviewListResponse>>;
    getReviewInfo(params: ReviewInfoRequest): Promise<IHttpResponse<ReviewInfoResponse>>;
    changeReviewStatus(params: ReviewChangeStatusRequest): Promise<IHttpResponse<ReviewChangeStatusResponse>>;
    getReviewCount(params?: ReviewCountRequest): Promise<IHttpResponse<ReviewCountResponse>>;
    createComment(params: CommentCreateRequest): Promise<IHttpResponse<CommentCreateResponse>>;
    listComments(params: CommentListRequest): Promise<IHttpResponse<CommentListResponse>>;
    deleteComment(params: CommentDeleteRequest): Promise<IHttpResponse<CommentDeleteResponse>>;
    iterateReviews(params: Omit<ReviewListRequest, 'offset'>): AsyncGenerator<Review[], void, unknown>;
    getReviewAnalytics(): Promise<ReviewAnalytics>;
    getReviewsNeedingAttention(days?: number): Promise<Review[]>;
    autoRespondToPositiveReviews(templateText?: string): Promise<number>;
}
export type * from './types';
