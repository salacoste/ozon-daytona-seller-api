import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { SendMessageRequest, SendMessageResponse, SendFileRequest, SendFileResponse, StartChatRequest, StartChatResponse, ChatReadRequest, ChatReadResponse } from './types';
export declare class ChatMessaging {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    sendMessageV1(params: SendMessageRequest): Promise<IHttpResponse<SendMessageResponse>>;
    sendFileV1(params: SendFileRequest): Promise<IHttpResponse<SendFileResponse>>;
    startChatV1(params: StartChatRequest): Promise<IHttpResponse<StartChatResponse>>;
    markChatReadV2(params: ChatReadRequest): Promise<IHttpResponse<ChatReadResponse>>;
}
