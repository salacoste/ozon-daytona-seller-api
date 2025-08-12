"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsAnswersAPI = void 0;
class QuestionsAnswersAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createAnswer(params) {
        return this.httpClient.post('/v1/question/answer/create', params);
    }
    async deleteAnswer(params) {
        return this.httpClient.post('/v1/question/answer/delete', params);
    }
    async listAnswers(params) {
        return this.httpClient.post('/v1/question/answer/list', params);
    }
    async changeQuestionStatus(params) {
        return this.httpClient.post('/v1/question/change-status', params);
    }
    async getQuestionCounts(params = {}) {
        return this.httpClient.post('/v1/question/count', params);
    }
    async getQuestionInfo(params) {
        return this.httpClient.post('/v1/question/info', params);
    }
    async listQuestions(params = {}) {
        return this.httpClient.post('/v1/question/list', params);
    }
    async getTopSkuByQuestions(params) {
        return this.httpClient.post('/v1/question/top-sku', params);
    }
    async *iterateAnswers(params) {
        let lastId;
        const limit = params.limit || 50;
        while (true) {
            const response = await this.listAnswers({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit
            });
            const answers = response.data.answers || [];
            if (answers.length === 0) {
                break;
            }
            yield answers;
            if (!response.data.has_next) {
                break;
            }
            lastId = response.data.last_id;
            if (!lastId) {
                break;
            }
        }
    }
    async *iterateQuestions(params) {
        let lastId;
        const limit = params.limit || 100;
        while (true) {
            const response = await this.listQuestions({
                ...params,
                ...(lastId && { last_id: lastId }),
                limit
            });
            const questions = response.data.questions || [];
            if (questions.length === 0) {
                break;
            }
            yield questions;
            if (!response.data.has_next) {
                break;
            }
            lastId = response.data.last_id;
            if (!lastId) {
                break;
            }
        }
    }
    async getQuestionsAnalytics() {
        const countsResponse = await this.getQuestionCounts();
        const counts = countsResponse.data.counts;
        const recentQuestionsResponse = await this.listQuestions({
            limit: 100,
            sort_by: 'created_at',
            sort_order: 'DESC'
        });
        const recentQuestions = recentQuestionsResponse.data.questions;
        const topProductsResponse = await this.getTopSkuByQuestions({ limit: 20 });
        const topProducts = topProductsResponse.data.sku;
        const totalQuestions = counts.reduce((sum, count) => sum + count.count, 0);
        const newQuestions = counts.find(c => c.status === 'NEW')?.count || 0;
        const answeredQuestions = counts.find(c => c.status === 'ANSWERED')?.count || 0;
        const pendingQuestions = counts.find(c => c.status === 'PENDING_MODERATION')?.count || 0;
        const answerRate = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
        const answeredRecentQuestions = recentQuestions.filter(q => q.is_answered);
        let totalResponseTime = 0;
        let responseTimes = [];
        answeredRecentQuestions.forEach(question => {
            if (question.updated_at && question.created_at) {
                const responseTime = (new Date(question.updated_at).getTime() - new Date(question.created_at).getTime()) / (1000 * 60 * 60);
                if (responseTime > 0 && responseTime < 168) {
                    totalResponseTime += responseTime;
                    responseTimes.push(responseTime);
                }
            }
        });
        const averageResponseTime = responseTimes.length > 0 ? totalResponseTime / responseTimes.length : 0;
        const fastestResponseTime = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
        const slowestResponseTime = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const questionsAnsweredToday = recentQuestions.filter(q => q.is_answered &&
            new Date(q.updated_at || q.created_at).toDateString() === today.toDateString()).length;
        const questionsAnsweredWeek = recentQuestions.filter(q => q.is_answered &&
            new Date(q.updated_at || q.created_at) >= weekAgo).length;
        const productsNeedingAttention = topProducts.filter(p => p.questions_count > 10);
        const questionsPerProduct = topProducts.length > 0 ?
            topProducts.reduce((sum, p) => sum + p.questions_count, 0) / topProducts.length : 0;
        const questionQualityScore = this.calculateQuestionQualityScore(recentQuestions);
        return {
            question_metrics: {
                total_questions: totalQuestions,
                new_questions: newQuestions,
                answered_questions: answeredQuestions,
                pending_questions: pendingQuestions,
                answer_rate_percent: answerRate
            },
            response_performance: {
                average_response_time_hours: averageResponseTime,
                questions_answered_today: questionsAnsweredToday,
                questions_answered_week: questionsAnsweredWeek,
                fastest_response_time_hours: fastestResponseTime,
                slowest_response_time_hours: slowestResponseTime
            },
            product_insights: {
                most_questioned_products: topProducts.slice(0, 10),
                products_needing_attention: productsNeedingAttention,
                categories_with_most_questions: []
            },
            engagement_metrics: {
                questions_per_product_avg: questionsPerProduct,
                repeat_customers_asking: 0,
                question_quality_score: questionQualityScore
            }
        };
    }
    async getProductInsights() {
        const topProductsResponse = await this.getTopSkuByQuestions({ limit: 50 });
        const topProducts = topProductsResponse.data.sku;
        const insights = [];
        for (const product of topProducts.slice(0, 10)) {
            const questionsResponse = await this.listQuestions({
                sku: [product.sku],
                limit: 20,
                sort_by: 'created_at',
                sort_order: 'DESC'
            });
            const questions = questionsResponse.data.questions;
            if (product.questions_count > 20) {
                insights.push({
                    sku: product.sku,
                    question_id: questions[0]?.question_id || '',
                    insight_type: 'frequent_concern',
                    description: `This product receives ${product.questions_count} questions, indicating customers need more information`,
                    suggested_action: 'Enhance product description with detailed specifications, add FAQ section, include more product images',
                    priority: 'high',
                    estimated_impact: 'Could reduce questions by 40-60% and improve conversion rate'
                });
            }
            else if (product.questions_count > 10) {
                insights.push({
                    sku: product.sku,
                    question_id: questions[0]?.question_id || '',
                    insight_type: 'information_gap',
                    description: `Moderate question volume (${product.questions_count}) suggests some information gaps`,
                    suggested_action: 'Review common question themes and add missing details to product description',
                    priority: 'medium',
                    estimated_impact: 'Could reduce questions by 20-30%'
                });
            }
            else if (product.questions_count > 5) {
                const hasUnansweredQuestions = questions.some(q => !q.is_answered);
                if (hasUnansweredQuestions) {
                    insights.push({
                        sku: product.sku,
                        question_id: questions.find(q => !q.is_answered)?.question_id || '',
                        insight_type: 'product_issue',
                        description: `Product has ${product.questions_count} questions with some unanswered`,
                        suggested_action: 'Respond to unanswered questions promptly to maintain customer engagement',
                        priority: 'medium',
                        estimated_impact: 'Improved response rate will boost customer trust and sales'
                    });
                }
            }
        }
        return insights.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }
    async getQuestionsPendingResponse() {
        const urgentQuestions = [];
        for await (const questionsPage of this.iterateQuestions({
            status: ['NEW'],
            limit: 100
        })) {
            for (const question of questionsPage) {
                const hoursOld = (Date.now() - new Date(question.created_at).getTime()) / (1000 * 60 * 60);
                if (hoursOld > 24) {
                    urgentQuestions.push(question);
                }
                if (urgentQuestions.length >= 50) {
                    return urgentQuestions;
                }
            }
        }
        return urgentQuestions.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    calculateQuestionQualityScore(questions) {
        if (questions.length === 0)
            return 0;
        let qualityScore = 0;
        questions.forEach(question => {
            let score = 5;
            if (question.text.length > 100)
                score += 2;
            if (question.text.length > 200)
                score += 1;
            if (question.is_answered)
                score += 2;
            const daysOld = (Date.now() - new Date(question.created_at).getTime()) / (1000 * 60 * 60 * 24);
            if (daysOld < 7)
                score += 1;
            qualityScore += Math.min(score, 10);
        });
        return qualityScore / questions.length;
    }
}
exports.QuestionsAnswersAPI = QuestionsAnswersAPI;
