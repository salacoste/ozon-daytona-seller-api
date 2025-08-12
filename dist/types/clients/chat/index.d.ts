import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { SendMessageRequest, SendMessageResponse, SendFileRequest, SendFileResponse, StartChatRequest, StartChatResponse, ChatListRequestV2, ChatListResponseV2, ChatListRequestV3, ChatListResponseV3, ChatHistoryRequestV2, ChatHistoryResponseV2, ChatHistoryRequestV3, ChatHistoryResponseV3, ChatReadRequest, ChatReadResponse } from './types';
export declare class ChatAPI {
    private readonly messaging;
    private readonly lists;
    constructor(httpClient: HttpClient);
    sendMessageV1(params: SendMessageRequest): Promise<IHttpResponse<SendMessageResponse>>;
    sendFileV1(params: SendFileRequest): Promise<IHttpResponse<SendFileResponse>>;
    startChatV1(params: StartChatRequest): Promise<IHttpResponse<StartChatResponse>>;
    listChatsV2(params: ChatListRequestV2): Promise<IHttpResponse<ChatListResponseV2>>;
    listChatsV3(params: ChatListRequestV3): Promise<IHttpResponse<ChatListResponseV3>>;
    getChatHistoryV2(params: ChatHistoryRequestV2): Promise<IHttpResponse<ChatHistoryResponseV2>>;
    getChatHistoryV3(params: ChatHistoryRequestV3): Promise<IHttpResponse<ChatHistoryResponseV3>>;
    markChatReadV2(params: ChatReadRequest): Promise<IHttpResponse<ChatReadResponse>>;
}
export type * from './types';
