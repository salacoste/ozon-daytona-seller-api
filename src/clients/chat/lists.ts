/**
 * ChatAPI list and history methods
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  ChatListRequestV2,
  ChatListResponseV2,
  ChatListRequestV3,
  ChatListResponseV3,
  ChatHistoryRequestV2,
  ChatHistoryResponseV2,
  ChatHistoryRequestV3,
  ChatHistoryResponseV3
} from './types';

/**
 * Chat list and history operations
 */
export class ChatLists {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * List chats V2
   * 
   * ⚠️ **Deprecated**: This method will be discontinued. Use listChatsV3 instead.
   * 
   * Returns list of chats with pagination using limit/offset.
   */
  async listChatsV2(
    params: ChatListRequestV2
  ): Promise<IHttpResponse<ChatListResponseV2>> {
    return this.httpClient.post('/v2/chat/list', params);
  }

  /**
   * List chats V3
   * 
   * Returns list of chats with cursor-based pagination.
   * Recommended over V2 for new integrations.
   */
  async listChatsV3(
    params: ChatListRequestV3
  ): Promise<IHttpResponse<ChatListResponseV3>> {
    return this.httpClient.post('/v3/chat/list', params);
  }

  /**
   * Get chat history V2
   * 
   * ⚠️ **Will be discontinued on July 13, 2025**: Use getChatHistoryV3 instead.
   * 
   * Returns chat message history with basic pagination.
   */
  async getChatHistoryV2(
    params: ChatHistoryRequestV2
  ): Promise<IHttpResponse<ChatHistoryResponseV2>> {
    return this.httpClient.post('/v2/chat/history', params);
  }

  /**
   * Get chat history V3
   * 
   * Returns chat message history with enhanced features and context.
   * Recommended over V2 for new integrations.
   */
  async getChatHistoryV3(
    params: ChatHistoryRequestV3
  ): Promise<IHttpResponse<ChatHistoryResponseV3>> {
    return this.httpClient.post('/v3/chat/history', params);
  }
}