/**
 * ChatAPI client for Ozon Seller API
 * 
 * Implements chat messaging endpoints from /methods/15-chatapi.json:
 * - Message and file sending (requires Premium Plus)
 * - Chat creation and management
 * - Chat list retrieval with V2/V3 versions
 * - Chat history with V2/V3 versions
 * - Message read status management
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import { ChatMessaging } from './messaging';
import { ChatLists } from './lists';
import type {
  SendMessageRequest,
  SendMessageResponse,
  SendFileRequest,
  SendFileResponse,
  StartChatRequest,
  StartChatResponse,
  ChatListRequestV2,
  ChatListResponseV2,
  ChatListRequestV3,
  ChatListResponseV3,
  ChatHistoryRequestV2,
  ChatHistoryResponseV2,
  ChatHistoryRequestV3,
  ChatHistoryResponseV3,
  ChatReadRequest,
  ChatReadResponse
} from './types';

/**
 * Chat API client implementing messaging and chat management
 * 
 * ⚠️ **Premium Plus Required**: Most chat operations with buyers require
 * Premium Plus subscription. Support chats are available to all sellers.
 * 
 * @example
 * ```typescript
 * // Send message to customer
 * await client.chat.sendMessageV1({
 *   chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
 *   text: 'Hello! Thank you for your question.'
 * });
 * 
 * // List unread chats
 * const chats = await client.chat.listChatsV3({
 *   filter: { unread_only: true },
 *   limit: 50
 * });
 * 
 * // Get chat history
 * const history = await client.chat.getChatHistoryV3({
 *   chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
 *   limit: 20
 * });
 * ```
 */
export class ChatAPI {
  private readonly messaging: ChatMessaging;
  private readonly lists: ChatLists;

  constructor(httpClient: HttpClient) {
    this.messaging = new ChatMessaging(httpClient);
    this.lists = new ChatLists(httpClient);
  }

  /**
   * Send message V1
   * 
   * @example
   * ```typescript
   * const result = await client.chat.sendMessageV1({
   *   chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
   *   text: 'Hello! Thank you for your question about the product.'
   * });
   * ```
   */
  async sendMessageV1(
    params: SendMessageRequest
  ): Promise<IHttpResponse<SendMessageResponse>> {
    return this.messaging.sendMessageV1(params);
  }

  /**
   * Send file V1
   * 
   * @example
   * ```typescript
   * const result = await client.chat.sendFileV1({
   *   chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
   *   base64_content: 'iVBORw0KGgoAAAANSU...',
   *   name: 'product-manual.pdf'
   * });
   * ```
   */
  async sendFileV1(
    params: SendFileRequest
  ): Promise<IHttpResponse<SendFileResponse>> {
    return this.messaging.sendFileV1(params);
  }

  /**
   * Start chat V1
   * 
   * @example
   * ```typescript
   * const result = await client.chat.startChatV1({
   *   posting_number: '47873153-0052-1'
   * });
   * ```
   */
  async startChatV1(
    params: StartChatRequest
  ): Promise<IHttpResponse<StartChatResponse>> {
    return this.messaging.startChatV1(params);
  }

  /**
   * List chats V2 (Deprecated)
   * ⚠️ Use listChatsV3 instead
   */
  async listChatsV2(
    params: ChatListRequestV2
  ): Promise<IHttpResponse<ChatListResponseV2>> {
    return this.lists.listChatsV2(params);
  }

  /**
   * List chats V3
   * 
   * @example
   * ```typescript
   * const result = await client.chat.listChatsV3({
   *   filter: { chat_status: 'Opened', unread_only: true },
   *   limit: 50
   * });
   * ```
   */
  async listChatsV3(
    params: ChatListRequestV3
  ): Promise<IHttpResponse<ChatListResponseV3>> {
    return this.lists.listChatsV3(params);
  }

  /**
   * Get chat history V2 (Will be discontinued July 13, 2025)
   * ⚠️ Use getChatHistoryV3 instead
   */
  async getChatHistoryV2(
    params: ChatHistoryRequestV2
  ): Promise<IHttpResponse<ChatHistoryResponseV2>> {
    return this.lists.getChatHistoryV2(params);
  }

  /**
   * Get chat history V3
   * 
   * @example
   * ```typescript
   * const result = await client.chat.getChatHistoryV3({
   *   chat_id: '18b8e1f9-4ae7-461c-84ea-8e1f54d1a45e',
   *   direction: 'Backward',
   *   limit: 20
   * });
   * ```
   */
  async getChatHistoryV3(
    params: ChatHistoryRequestV3
  ): Promise<IHttpResponse<ChatHistoryResponseV3>> {
    return this.lists.getChatHistoryV3(params);
  }

  /**
   * Mark chat as read V2
   * 
   * @example
   * ```typescript
   * const result = await client.chat.markChatReadV2({
   *   chat_id: '99feb3fc-a474-469f-95d5-268b470cc607',
   *   from_message_id: '3000000000118032000'
   * });
   * ```
   */
  async markChatReadV2(
    params: ChatReadRequest
  ): Promise<IHttpResponse<ChatReadResponse>> {
    return this.messaging.markChatReadV2(params);
  }
}

// Re-export types for convenience
export type * from './types';