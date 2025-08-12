export class ReviewAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async listReviews(params = {}) {
        return this.httpClient.post('/v1/review/list', params);
    }
    async getReviewInfo(params) {
        return this.httpClient.post('/v1/review/info', params);
    }
    async changeReviewStatus(params) {
        return this.httpClient.post('/v1/review/change-status', params);
    }
    async getReviewCount(params = {}) {
        return this.httpClient.post('/v1/review/count', params);
    }
    async createComment(params) {
        return this.httpClient.post('/v1/review/comment/create', params);
    }
    async listComments(params) {
        return this.httpClient.post('/v1/review/comment/list', params);
    }
    async deleteComment(params) {
        return this.httpClient.post('/v1/review/comment/delete', params);
    }
    async *iterateReviews(params) {
        let offset = 0;
        let hasNext = true;
        const limit = params.limit || 50;
        while (hasNext) {
            const response = await this.listReviews({
                ...params,
                offset,
                limit
            });
            const reviews = response.data.reviews || [];
            if (reviews.length === 0) {
                hasNext = false;
            }
            else {
                yield reviews;
                hasNext = response.data.has_next;
                offset += limit;
            }
        }
    }
    async getReviewAnalytics() {
        const countsResponse = await this.getReviewCount();
        const counts = countsResponse.data;
        const reviewsResponse = await this.listReviews({
            limit: 1000
        });
        const reviews = reviewsResponse.data.reviews;
        const totalReviews = counts.total;
        const averageRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        const ratingDistribution = {};
        for (let i = 1; i <= 5; i++) {
            ratingDistribution[i] = reviews.filter(r => r.rating === i).length;
        }
        const reviewsWithComments = reviews.filter(r => r.status === 'PROCESSED').length;
        const responseRate = totalReviews > 0 ? reviewsWithComments / totalReviews : 0;
        return {
            total_reviews: totalReviews,
            average_rating: averageRating,
            rating_distribution: ratingDistribution,
            response_rate: responseRate,
            processing_stats: {
                processed: counts.processed,
                pending: counts.new,
                requires_attention: counts.requires_attention
            }
        };
    }
    async getReviewsNeedingAttention(days = 7) {
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - days);
        const response = await this.listReviews({
            limit: 100,
            filter: {
                rating: [1, 2, 3],
                status: ['NEW', 'REQUIRES_ATTENTION'],
                date_from: dateFrom.toISOString()
            },
            sort: {
                field: 'created_at',
                direction: 'ASC'
            }
        });
        return response.data.reviews;
    }
    async autoRespondToPositiveReviews(templateText = "Thank you for taking the time to share your positive experience! We're delighted that you're happy with your purchase.") {
        const positiveReviews = await this.listReviews({
            limit: 50,
            filter: {
                rating: [4, 5],
                status: ['NEW']
            }
        });
        let responseCount = 0;
        for (const review of positiveReviews.data.reviews) {
            try {
                await this.createComment({
                    review_id: review.review_id,
                    text: templateText,
                    mark_review_as_processed: true
                });
                responseCount++;
            }
            catch (error) {
                console.error(`Failed to respond to review ${review.review_id}:`, error);
            }
        }
        return responseCount;
    }
}
