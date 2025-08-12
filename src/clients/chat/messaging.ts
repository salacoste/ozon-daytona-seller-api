/**
 * ChatAPI messaging methods
 */

import type { HttpClient } from '../../http/HttpClient';
import type { IHttpResponse } from '../../http/types';
import type {
  SendMessageRequest,
  SendMessageResponse,
  SendFileRequest,
  SendFileResponse,
  StartChatRequest,
  StartChatResponse,
  ChatReadRequest,
  ChatReadResponse
} from './types';

/**
 * Chat messaging operations
 */
export class ChatMessaging {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Send message V1
   * 
   * Sends text message to existing chat. Requires Premium Plus subscription
   * for buyer chats. Time limits apply based on shipment type.
   */
  async sendMessageV1(
    params: SendMessageRequest
  ): Promise<IHttpResponse<SendMessageResponse>> {
    return this.httpClient.post('/v1/chat/send/message', params);
  }

  /**
   * Send file V1
   * 
   * Sends file to existing chat. Requires Premium Plus subscription
   * for buyer chats. File should be base64 encoded.
   */
  async sendFileV1(
    params: SendFileRequest
  ): Promise<IHttpResponse<SendFileResponse>> {
    return this.httpClient.post('/v1/chat/send/file', params);
  }

  /**
   * Start chat V1
   * 
   * Creates new chat with buyer for specific posting. Only available
   * for Premium Plus sellers. Time restrictions apply by shipment type.
   */
  async startChatV1(
    params: StartChatRequest
  ): Promise<IHttpResponse<StartChatResponse>> {
    return this.httpClient.post('/v1/chat/start', params);
  }

  /**
   * Mark chat as read V2
   * 
   * Marks specified message and all previous messages as read.
   * Premium Plus required for buyer chats.
   */
  async markChatReadV2(
    params: ChatReadRequest
  ): Promise<IHttpResponse<ChatReadResponse>> {
    return this.httpClient.post('/v2/chat/read', params);
  }
}