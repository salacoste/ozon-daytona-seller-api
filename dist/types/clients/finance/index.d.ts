import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { CashFlowStatementListRequest, CashFlowStatementListResponse, RealizationReportV2Request, RealizationReportV2Response, RealizationReportPostingV1Request, RealizationReportPostingV1Response, RealizationByDayRequest, RealizationByDayResponse, TransactionListV3Request, TransactionListV3Response, TransactionTotalsV3Request, TransactionTotalsV3Response, DocumentB2BSalesRequest, DocumentB2BSalesResponse, DocumentB2BSalesJsonResponse, MutualSettlementRequest, MutualSettlementResponse, ProductsBuyoutRequest, ProductsBuyoutResponse, CompensationRequest, CompensationResponse, DecompensationRequest, DecompensationResponse } from './types';
export declare class FinanceAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    getCashFlowStatementListV1(params: CashFlowStatementListRequest): Promise<IHttpResponse<CashFlowStatementListResponse>>;
    getRealizationReportV2(params: RealizationReportV2Request): Promise<IHttpResponse<RealizationReportV2Response>>;
    getRealizationReportPostingV1(params: RealizationReportPostingV1Request): Promise<IHttpResponse<RealizationReportPostingV1Response>>;
    getRealizationByDayV1(params: RealizationByDayRequest): Promise<IHttpResponse<RealizationByDayResponse>>;
    getTransactionListV3(params: TransactionListV3Request): Promise<IHttpResponse<TransactionListV3Response>>;
    getTransactionTotalsV3(params: TransactionTotalsV3Request): Promise<IHttpResponse<TransactionTotalsV3Response>>;
    getDocumentB2BSalesV1(params: DocumentB2BSalesRequest): Promise<IHttpResponse<DocumentB2BSalesResponse>>;
    getDocumentB2BSalesJsonV1(params: DocumentB2BSalesRequest): Promise<IHttpResponse<DocumentB2BSalesJsonResponse>>;
    getMutualSettlementV1(params: MutualSettlementRequest): Promise<IHttpResponse<MutualSettlementResponse>>;
    getProductsBuyoutV1(params: ProductsBuyoutRequest): Promise<IHttpResponse<ProductsBuyoutResponse>>;
    getCompensationV1(params: CompensationRequest): Promise<IHttpResponse<CompensationResponse>>;
    getDecompensationV1(params: DecompensationRequest): Promise<IHttpResponse<DecompensationResponse>>;
}
