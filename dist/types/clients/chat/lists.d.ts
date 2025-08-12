import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type { ChatListRequestV2, ChatListResponseV2, ChatListRequestV3, ChatListResponseV3, ChatHistoryRequestV2, ChatHistoryResponseV2, ChatHistoryRequestV3, ChatHistoryResponseV3 } from './types';
export declare class ChatLists {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    listChatsV2(params: ChatListRequestV2): Promise<IHttpResponse<ChatListResponseV2>>;
    listChatsV3(params: ChatListRequestV3): Promise<IHttpResponse<ChatListResponseV3>>;
    getChatHistoryV2(params: ChatHistoryRequestV2): Promise<IHttpResponse<ChatHistoryResponseV2>>;
    getChatHistoryV3(params: ChatHistoryRequestV3): Promise<IHttpResponse<ChatHistoryResponseV3>>;
}
