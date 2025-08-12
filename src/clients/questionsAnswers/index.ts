/**
 * Questions&Answers API client for Ozon Seller API
 * 
 * Implements customer Q&A management from /beta/02-questions-answers.json:
 * - Answer creation, deletion, and listing
 * - Question status management and listing  
 * - Question information and analytics
 * - Top SKU analysis by question volume
 * 
 * **Beta Feature**: Customer question and answer management system.
 * Provides tools for managing customer inquiries, tracking response performance,
 * and identifying products needing attention through Q&A analytics.
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  // Request types
  QuestionAnswerCreateRequest,
  QuestionAnswerDeleteRequest,
  QuestionAnswerListRequest,
  QuestionChangeStatusRequest,
  QuestionCountRequest,
  QuestionInfoRequest,
  QuestionListRequest,
  QuestionTopSkuRequest,
  
  // Response types
  QuestionAnswerCreateResponse,
  QuestionAnswerDeleteResponse,
  QuestionAnswerListResponse,
  QuestionChangeStatusResponse,
  QuestionCountResponse,
  QuestionInfoResponse,
  QuestionListResponse,
  QuestionTopSkuResponse,
  
  // Base types
  Question,
  Answer,
  QuestionStatus,
  TopSkuQuestion,
  QuestionsAnalytics,
  QuestionInsight
} from './types';

/**
 * Questions&Answers API client for customer Q&A management
 * 
 * **Beta Feature**: Customer question and answer management system.
 * Helps sellers manage customer inquiries efficiently by providing tools for
 * answering questions, tracking performance, and identifying improvement opportunities.
 * 
 * **Key Features:**
 * - **Answer Management**: Create, delete, and list answers to customer questions
 * - **Question Management**: View, filter, and update question statuses
 * - **Performance Tracking**: Monitor response times and answer rates
 * - **Product Insights**: Identify products with high question volume
 * - **Analytics Dashboard**: Comprehensive Q&A performance analytics
 * 
 * @example
 * ```typescript
 * // Answer a customer question
 * const answerResponse = await client.questionsAnswers.createAnswer({
 *   question_id: 'q_12345',
 *   sku: 123456789,
 *   text: 'Thank you for your question! This product is indeed waterproof and suitable for outdoor use.'
 * });
 * 
 * console.log(`Answer created: ${answerResponse.data.answer_id}`);
 * 
 * // Get unanswered questions
 * const unansweredQuestions = await client.questionsAnswers.listQuestions({
 *   status: ['NEW'],
 *   limit: 20,
 *   sort_by: 'created_at',
 *   sort_order: 'ASC'
 * });
 * 
 * console.log('=== UNANSWERED QUESTIONS ===');
 * unansweredQuestions.data.questions.forEach(question => {
 *   console.log(`📝 ${question.text}`);
 *   console.log(`   SKU: ${question.sku} | Created: ${question.created_at}`);
 * });
 * 
 * // Get comprehensive analytics
 * const analytics = await client.questionsAnswers.getQuestionsAnalytics();
 * console.log(`📊 Answer Rate: ${analytics.question_metrics.answer_rate_percent}%`);
 * console.log(`⏱️ Avg Response Time: ${analytics.response_performance.average_response_time_hours} hours`);
 * ```
 */
export class QuestionsAnswersAPI {
  constructor(private readonly httpClient: HttpClient) {}

  // ============================================================================
  // Answer Management
  // ============================================================================

  /**
   * Create an answer to a customer question
   * 
   * Allows sellers to provide answers to customer questions about their products.
   * Answers must be 2-3000 characters long and should be helpful and accurate.
   * 
   * @param params - Answer creation parameters
   * @returns Created answer ID
   * 
   * @example
   * ```typescript
   * // Answer a product question
   * const answerResponse = await client.questionsAnswers.createAnswer({
   *   question_id: 'q_67890',
   *   sku: 123456789,
   *   text: 'Yes, this product is compatible with all iPhone models from iPhone 12 and newer. ' +
   *         'It includes all necessary adapters and comes with a 2-year warranty.'
   * });
   * 
   * console.log(`✅ Answer created with ID: ${answerResponse.data.answer_id}`);
   * ```
   */
  async createAnswer(
    params: QuestionAnswerCreateRequest
  ): Promise<IHttpResponse<QuestionAnswerCreateResponse>> {
    return this.httpClient.post('/v1/question/answer/create', params);
  }

  /**
   * Delete an answer to a question
   * 
   * Removes a previously created answer. Use this if an answer needs correction
   * or is no longer relevant.
   * 
   * @param params - Answer deletion parameters
   * @returns Deletion success status
   */
  async deleteAnswer(
    params: QuestionAnswerDeleteRequest
  ): Promise<IHttpResponse<QuestionAnswerDeleteResponse>> {
    return this.httpClient.post('/v1/question/answer/delete', params);
  }

  /**
   * List answers for a specific question
   * 
   * Retrieves all answers associated with a particular question,
   * including both seller and system-generated answers.
   * 
   * @param params - Answer listing parameters
   * @returns Paginated list of answers
   * 
   * @example
   * ```typescript
   * // Get all answers for a question
   * const answersResponse = await client.questionsAnswers.listAnswers({
   *   question_id: 'q_12345',
   *   sku: 123456789,
   *   limit: 10
   * });
   * 
   * console.log('=== QUESTION ANSWERS ===');
   * answersResponse.data.answers.forEach(answer => {
   *   console.log(`${answer.is_seller_answer ? '🏪 Seller' : '👤 Customer'}: ${answer.text}`);
   *   console.log(`   Created: ${answer.created_at}`);
   * });
   * ```
   */
  async listAnswers(
    params: QuestionAnswerListRequest
  ): Promise<IHttpResponse<QuestionAnswerListResponse>> {
    return this.httpClient.post('/v1/question/answer/list', params);
  }

  // ============================================================================
  // Question Management
  // ============================================================================

  /**
   * Change status of questions
   * 
   * Updates the status of one or more questions. Useful for managing
   * question workflow and organization.
   * 
   * @param params - Status change parameters
   * @returns Update results with any failures
   * 
   * @example
   * ```typescript
   * // Mark questions as answered
   * const statusUpdate = await client.questionsAnswers.changeQuestionStatus({
   *   question_id: ['q_001', 'q_002', 'q_003'],
   *   sku: 123456789,
   *   status: 'ANSWERED'
   * });
   * 
   * console.log(`✅ Updated ${statusUpdate.data.updated_count} questions`);
   * if (statusUpdate.data.failed_questions.length > 0) {
   *   console.log('❌ Failed updates:', statusUpdate.data.failed_questions);
   * }
   * ```
   */
  async changeQuestionStatus(
    params: QuestionChangeStatusRequest
  ): Promise<IHttpResponse<QuestionChangeStatusResponse>> {
    return this.httpClient.post('/v1/question/change-status', params);
  }

  /**
   * Get question counts by status
   * 
   * Provides summary statistics about questions categorized by their status.
   * Useful for dashboard views and workload management.
   * 
   * @param params - Count request parameters
   * @returns Question counts by status
   * 
   * @example
   * ```typescript
   * // Get question statistics
   * const counts = await client.questionsAnswers.getQuestionCounts({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31'
   * });
   * 
   * console.log('=== QUESTION STATISTICS ===');
   * counts.data.counts.forEach(count => {
   *   console.log(`${count.status}: ${count.count} questions`);
   * });
   * console.log(`Total: ${counts.data.total_questions} questions`);
   * ```
   */
  async getQuestionCounts(
    params: QuestionCountRequest = {}
  ): Promise<IHttpResponse<QuestionCountResponse>> {
    return this.httpClient.post('/v1/question/count', params);
  }

  /**
   * Get detailed information about a specific question
   * 
   * Retrieves full question details including all associated answers.
   * 
   * @param params - Question info request parameters
   * @returns Question details with answers
   */
  async getQuestionInfo(
    params: QuestionInfoRequest
  ): Promise<IHttpResponse<QuestionInfoResponse>> {
    return this.httpClient.post('/v1/question/info', params);
  }

  /**
   * List questions with filtering and pagination
   * 
   * Retrieves questions based on various filters such as status, SKU, and date range.
   * Supports pagination for handling large volumes of questions.
   * 
   * @param params - Question listing parameters
   * @returns Paginated list of questions
   * 
   * @example
   * ```typescript
   * // Get new questions that need attention
   * const newQuestions = await client.questionsAnswers.listQuestions({
   *   status: ['NEW', 'PENDING_MODERATION'],
   *   limit: 50,
   *   sort_by: 'created_at',
   *   sort_order: 'ASC' // Oldest first
   * });
   * 
   * console.log('=== QUESTIONS NEEDING ATTENTION ===');
   * newQuestions.data.questions.forEach(question => {
   *   const urgency = this.calculateUrgency(question.created_at);
   *   console.log(`${urgency} SKU ${question.sku}: ${question.text.substring(0, 100)}...`);
   *   console.log(`   Asked ${this.getTimeAgo(question.created_at)}`);
   * });
   * ```
   */
  async listQuestions(
    params: QuestionListRequest = {}
  ): Promise<IHttpResponse<QuestionListResponse>> {
    return this.httpClient.post('/v1/question/list', params);
  }

  /**
   * Get products with the highest number of questions
   * 
   * Identifies products that receive the most customer questions.
   * Useful for identifying products that may need better descriptions,
   * more images, or other improvements.
   * 
   * @param params - Top SKU request parameters
   * @returns Products ranked by question volume
   * 
   * @example
   * ```typescript
   * // Find products with most questions
   * const topQuestionedProducts = await client.questionsAnswers.getTopSkuByQuestions({
   *   limit: 10,
   *   date_from: '2024-01-01',
   *   min_questions_count: 5
   * });
   * 
   * console.log('=== MOST QUESTIONED PRODUCTS ===');
   * topQuestionedProducts.data.sku.forEach((product, index) => {
   *   console.log(`${index + 1}. SKU ${product.sku}: ${product.questions_count} questions`);
   *   if (product.questions_count > 20) {
   *     console.log(`   🚨 HIGH VOLUME - Consider improving product description`);
   *   } else if (product.questions_count > 10) {
   *     console.log(`   ⚠️ MODERATE VOLUME - Monitor for common themes`);
   *   }
   * });
   * ```
   */
  async getTopSkuByQuestions(
    params: QuestionTopSkuRequest
  ): Promise<IHttpResponse<QuestionTopSkuResponse>> {
    return this.httpClient.post('/v1/question/top-sku', params);
  }

  // ============================================================================
  // Pagination Helpers
  // ============================================================================

  /**
   * Iterate through all answers for a question with automatic pagination
   * 
   * @param params - Request parameters without last_id
   * @returns Async generator yielding pages of answers
   */
  async *iterateAnswers(
    params: Omit<QuestionAnswerListRequest, 'last_id'>
  ): AsyncGenerator<Answer[], void, unknown> {
    let lastId: string | undefined;
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

  /**
   * Iterate through all questions with automatic pagination
   * 
   * @param params - Request parameters without last_id
   * @returns Async generator yielding pages of questions
   */
  async *iterateQuestions(
    params: Omit<QuestionListRequest, 'last_id'>
  ): AsyncGenerator<Question[], void, unknown> {
    let lastId: string | undefined;
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

  // ============================================================================
  // Analytics and Helper Methods
  // ============================================================================

  /**
   * Get comprehensive questions & answers analytics
   * 
   * Analyzes Q&A data to provide insights about customer engagement,
   * response performance, and product-specific trends.
   * 
   * @returns Questions & answers analytics summary
   * 
   * @example
   * ```typescript
   * // Generate comprehensive Q&A report
   * const analytics = await client.questionsAnswers.getQuestionsAnalytics();
   * 
   * console.log('=== Q&A PERFORMANCE DASHBOARD ===');
   * console.log(`📊 Total Questions: ${analytics.question_metrics.total_questions}`);
   * console.log(`✅ Answer Rate: ${analytics.question_metrics.answer_rate_percent.toFixed(1)}%`);
   * console.log(`⏱️ Avg Response Time: ${analytics.response_performance.average_response_time_hours.toFixed(1)}h`);
   * console.log(`📈 Questions Today: ${analytics.response_performance.questions_answered_today}`);
   * 
   * console.log(`\\n🔍 Product Insights:`);
   * analytics.product_insights.most_questioned_products.slice(0, 3).forEach((product, i) => {
   *   console.log(`  ${i + 1}. SKU ${product.sku}: ${product.questions_count} questions`);
   * });
   * 
   * console.log(`\\n📈 Engagement:`);
   * console.log(`  Questions per Product: ${analytics.engagement_metrics.questions_per_product_avg.toFixed(1)}`);
   * console.log(`  Quality Score: ${analytics.engagement_metrics.question_quality_score.toFixed(1)}/10`);
   * ```
   */
  async getQuestionsAnalytics(): Promise<QuestionsAnalytics> {
    // Get question counts
    const countsResponse = await this.getQuestionCounts();
    const counts = countsResponse.data.counts;
    
    // Get recent questions for performance analysis
    const recentQuestionsResponse = await this.listQuestions({ 
      limit: 100, 
      sort_by: 'created_at', 
      sort_order: 'DESC' 
    });
    const recentQuestions = recentQuestionsResponse.data.questions;
    
    // Get top questioned products
    const topProductsResponse = await this.getTopSkuByQuestions({ limit: 20 });
    const topProducts = topProductsResponse.data.sku;

    // Calculate metrics
    const totalQuestions = counts.reduce((sum, count) => sum + count.count, 0);
    const newQuestions = counts.find(c => c.status === 'NEW')?.count || 0;
    const answeredQuestions = counts.find(c => c.status === 'ANSWERED')?.count || 0;
    const pendingQuestions = counts.find(c => c.status === 'PENDING_MODERATION')?.count || 0;
    const answerRate = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

    // Analyze response times from recent questions
    const answeredRecentQuestions = recentQuestions.filter(q => q.is_answered);
    let totalResponseTime = 0;
    let responseTimes: number[] = [];

    answeredRecentQuestions.forEach(question => {
      if (question.updated_at && question.created_at) {
        const responseTime = (new Date(question.updated_at).getTime() - new Date(question.created_at).getTime()) / (1000 * 60 * 60); // hours
        if (responseTime > 0 && responseTime < 168) { // Filter out unrealistic times (> 1 week)
          totalResponseTime += responseTime;
          responseTimes.push(responseTime);
        }
      }
    });

    const averageResponseTime = responseTimes.length > 0 ? totalResponseTime / responseTimes.length : 0;
    const fastestResponseTime = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
    const slowestResponseTime = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;

    // Calculate daily/weekly answered questions
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const questionsAnsweredToday = recentQuestions.filter(q => 
      q.is_answered && 
      new Date(q.updated_at || q.created_at).toDateString() === today.toDateString()
    ).length;
    
    const questionsAnsweredWeek = recentQuestions.filter(q => 
      q.is_answered && 
      new Date(q.updated_at || q.created_at) >= weekAgo
    ).length;

    // Product insights
    const productsNeedingAttention = topProducts.filter(p => p.questions_count > 10);
    
    // Engagement metrics
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
        categories_with_most_questions: [] // Would need category data
      },
      engagement_metrics: {
        questions_per_product_avg: questionsPerProduct,
        repeat_customers_asking: 0, // Would need customer data
        question_quality_score: questionQualityScore
      }
    };
  }

  /**
   * Generate insights for improving product listings based on Q&A patterns
   * 
   * Analyzes question patterns to identify opportunities for product
   * description improvements, additional images, or FAQ sections.
   * 
   * @returns Product improvement insights
   */
  async getProductInsights(): Promise<QuestionInsight[]> {
    // Get top questioned products
    const topProductsResponse = await this.getTopSkuByQuestions({ limit: 50 });
    const topProducts = topProductsResponse.data.sku;
    
    const insights: QuestionInsight[] = [];

    for (const product of topProducts.slice(0, 10)) {
      // Get recent questions for this product
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
      } else if (product.questions_count > 10) {
        insights.push({
          sku: product.sku,
          question_id: questions[0]?.question_id || '',
          insight_type: 'information_gap',
          description: `Moderate question volume (${product.questions_count}) suggests some information gaps`,
          suggested_action: 'Review common question themes and add missing details to product description',
          priority: 'medium',
          estimated_impact: 'Could reduce questions by 20-30%'
        });
      } else if (product.questions_count > 5) {
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

  /**
   * Get questions that need immediate attention
   * 
   * @returns Questions requiring urgent response
   */
  async getQuestionsPendingResponse(): Promise<Question[]> {
    const urgentQuestions: Question[] = [];
    
    for await (const questionsPage of this.iterateQuestions({ 
      status: ['NEW'], 
      limit: 100 
    })) {
      for (const question of questionsPage) {
        const hoursOld = (Date.now() - new Date(question.created_at).getTime()) / (1000 * 60 * 60);
        
        // Consider questions urgent if older than 24 hours
        if (hoursOld > 24) {
          urgentQuestions.push(question);
        }
        
        // Limit to prevent excessive processing
        if (urgentQuestions.length >= 50) {
          return urgentQuestions;
        }
      }
    }
    
    return urgentQuestions.sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private calculateQuestionQualityScore(questions: Question[]): number {
    if (questions.length === 0) return 0;
    
    let qualityScore = 0;
    
    questions.forEach(question => {
      let score = 5; // Base score
      
      // Longer questions tend to be more detailed and useful
      if (question.text.length > 100) score += 2;
      if (question.text.length > 200) score += 1;
      
      // Questions that get answered indicate they were worthwhile
      if (question.is_answered) score += 2;
      
      // Recent questions are more relevant
      const daysOld = (Date.now() - new Date(question.created_at).getTime()) / (1000 * 60 * 60 * 24);
      if (daysOld < 7) score += 1;
      
      qualityScore += Math.min(score, 10); // Cap at 10
    });
    
    return qualityScore / questions.length;
  }
}

// Re-export types for convenience
export type * from './types';