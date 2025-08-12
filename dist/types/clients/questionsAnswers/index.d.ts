import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { QuestionAnswerCreateRequest, QuestionAnswerDeleteRequest, QuestionAnswerListRequest, QuestionChangeStatusRequest, QuestionCountRequest, QuestionInfoRequest, QuestionListRequest, QuestionTopSkuRequest, QuestionAnswerCreateResponse, QuestionAnswerDeleteResponse, QuestionAnswerListResponse, QuestionChangeStatusResponse, QuestionCountResponse, QuestionInfoResponse, QuestionListResponse, QuestionTopSkuResponse, Question, Answer, QuestionsAnalytics, QuestionInsight } from './types';
export declare class QuestionsAnswersAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    createAnswer(params: QuestionAnswerCreateRequest): Promise<IHttpResponse<QuestionAnswerCreateResponse>>;
    deleteAnswer(params: QuestionAnswerDeleteRequest): Promise<IHttpResponse<QuestionAnswerDeleteResponse>>;
    listAnswers(params: QuestionAnswerListRequest): Promise<IHttpResponse<QuestionAnswerListResponse>>;
    changeQuestionStatus(params: QuestionChangeStatusRequest): Promise<IHttpResponse<QuestionChangeStatusResponse>>;
    getQuestionCounts(params?: QuestionCountRequest): Promise<IHttpResponse<QuestionCountResponse>>;
    getQuestionInfo(params: QuestionInfoRequest): Promise<IHttpResponse<QuestionInfoResponse>>;
    listQuestions(params?: QuestionListRequest): Promise<IHttpResponse<QuestionListResponse>>;
    getTopSkuByQuestions(params: QuestionTopSkuRequest): Promise<IHttpResponse<QuestionTopSkuResponse>>;
    iterateAnswers(params: Omit<QuestionAnswerListRequest, 'last_id'>): AsyncGenerator<Answer[], void, unknown>;
    iterateQuestions(params: Omit<QuestionListRequest, 'last_id'>): AsyncGenerator<Question[], void, unknown>;
    getQuestionsAnalytics(): Promise<QuestionsAnalytics>;
    getProductInsights(): Promise<QuestionInsight[]>;
    getQuestionsPendingResponse(): Promise<Question[]>;
    private calculateQuestionQualityScore;
}
export type * from './types';
