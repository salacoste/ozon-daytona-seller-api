/**
 * Chat API implementation
 * Generated from MCP documentation: chatapi--chunk-001.md and premium--chunk-002.md
 * Handles customer communication and chat management
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type {
  ChatStartRequest,
  ChatSendMessageRequest,
  ChatSendFileRequest,
  ChatReadRequest,
  ChatHistoryV2Request,
  ChatHistoryV3Request,
  ChatListV2Request,
  ChatListV3Request,
} from '../../types/requests/chat.js';
import type {
  ChatStartResponse,
  ChatSendMessageResponse,
  ChatSendFileResponse,
  ChatReadResponse,
  ChatHistoryV2Response,
  ChatHistoryV3Response,
  ChatListV2Response,
  ChatListV3Response,
} from '../../types/responses/chat.js';

/**
 * Chat API для управления чатами и сообщениями
 * Chat API for chat and message management
 * 
 * Доступно для продавцов с подпиской Premium Plus.
 * Available for sellers with Premium Plus subscription.
 * 
 * @example
 * ```typescript
 * // Создать новый чат с покупателем
 * const chat = await chatApi.startChat({
 *   posting_number: 'FBS-12345'
 * });
 * 
 * // Отправить сообщение в чат
 * await chatApi.sendMessage({
 *   chat_id: chat.result?.chat_id!,
 *   text: 'Здравствуйте! Как дела с заказом?'
 * });
 * ```
 */
export class ChatApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Создать новый чат
   * Start new chat
   * 
   * Создает новый чат с покупателем по отправлению.
   * Например, чтобы уточнить адрес или модель товара.
   * 
   * Ограничения:
   * - FBO — начать чат может только покупатель.
   * - FBS и rFBS — вы можете открыть чат в течение 72 часов после оплаты или доставки отправления.
   * 
   * @param request - Параметры создания чата
   * @param options - Дополнительные опции запроса
   * @returns Результат создания чата с идентификатором
   * 
   * @example
   * ```typescript
   * const chat = await chatApi.startChat({
   *   posting_number: 'FBS-12345'
   * });
   * 
   * console.log(`Чат создан с ID: ${chat.result?.chat_id}`);
   * ```
   */
  async startChat(
    request: ChatStartRequest,
    options?: RequestOptions
  ): Promise<ChatStartResponse> {
    return this.httpClient.request<ChatStartRequest, ChatStartResponse>(
      'POST',
      '/v1/chat/start',
      request,
      options
    );
  }

  /**
   * Отправить сообщение
   * Send message
   * 
   * Отправляет сообщение в существующий чат по его идентификатору.
   * 
   * Ограничения по времени:
   * - FBO — вы можете отправить сообщение в течение 48 часов с момента получения последнего сообщения от покупателя.
   * - FBS или rFBS — вы можете отправить сообщение покупателю после оплаты и в течение 72 часов после доставки отправления.
   *   После этого вы можете только отвечать на сообщения в течение 48 часов с момента получения последнего сообщения от покупателя.
   * 
   * @param request - Параметры отправки сообщения
   * @param options - Дополнительные опции запроса
   * @returns Результат отправки сообщения
   * 
   * @example
   * ```typescript
   * const result = await chatApi.sendMessage({
   *   chat_id: 'chat-123',
   *   text: 'Здравствуйте! Ваш заказ готовится к отправке.'
   * });
   * 
   * if (result.result === 'ok') {
   *   console.log('Сообщение отправлено успешно');
   * }
   * ```
   */
  async sendMessage(
    request: ChatSendMessageRequest,
    options?: RequestOptions
  ): Promise<ChatSendMessageResponse> {
    return this.httpClient.request<ChatSendMessageRequest, ChatSendMessageResponse>(
      'POST',
      '/v1/chat/send/message',
      request,
      options
    );
  }

  /**
   * Отправить файл
   * Send file
   * 
   * Отправляет файл в существующий чат по его идентификатору.
   * 
   * Ограничения по времени такие же, как для отправки сообщений.
   * 
   * @param request - Параметры отправки файла
   * @param options - Дополнительные опции запроса
   * @returns Результат отправки файла
   * 
   * @example
   * ```typescript
   * const fileData = btoa(fileContent); // конвертация в base64
   * 
   * const result = await chatApi.sendFile({
   *   chat_id: 'chat-123',
   *   base64_content: fileData,
   *   name: 'instruction.pdf'
   * });
   * 
   * if (result.result === 'ok') {
   *   console.log('Файл отправлен успешно');
   * }
   * ```
   */
  async sendFile(
    request: ChatSendFileRequest,
    options?: RequestOptions
  ): Promise<ChatSendFileResponse> {
    return this.httpClient.request<ChatSendFileRequest, ChatSendFileResponse>(
      'POST',
      '/v1/chat/send/file',
      request,
      options
    );
  }

  /**
   * Отметить сообщения как прочитанные
   * Mark messages as read
   * 
   * Метод для отметки выбранного сообщения и сообщений до него прочитанными.
   * 
   * @param request - Параметры отметки сообщений как прочитанных
   * @param options - Дополнительные опции запроса
   * @returns Результат с количеством непрочитанных сообщений
   * 
   * @example
   * ```typescript
   * const result = await chatApi.markAsRead({
   *   chat_id: 'chat-123',
   *   from_message_id: 456
   * });
   * 
   * console.log(`Непрочитанных сообщений: ${result.unread_count}`);
   * ```
   */
  async markAsRead(
    request: ChatReadRequest,
    options?: RequestOptions
  ): Promise<ChatReadResponse> {
    return this.httpClient.request<ChatReadRequest, ChatReadResponse>(
      'POST',
      '/v2/chat/read',
      request,
      options
    );
  }

  /**
   * Получить историю чата (v2)
   * Get chat history v2
   * 
   * ⚠️ Этот метод устаревает. Используйте getChatHistoryV3.
   * 
   * Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым.
   * 
   * @param request - Параметры запроса истории чата
   * @param options - Дополнительные опции запроса
   * @returns История сообщений чата
   * 
   * @example
   * ```typescript
   * const history = await chatApi.getChatHistoryV2({
   *   chat_id: 'chat-123',
   *   limit: 50,
   *   direction: 'Backward'
   * });
   * 
   * history.messages?.forEach(message => {
   *   console.log(`${message.user?.name}: ${message.data?.join(' ')}`);
   * });
   * ```
   */
  async getChatHistoryV2(
    request: ChatHistoryV2Request,
    options?: RequestOptions
  ): Promise<ChatHistoryV2Response> {
    return this.httpClient.request<ChatHistoryV2Request, ChatHistoryV2Response>(
      'POST',
      '/v2/chat/history',
      request,
      options
    );
  }

  /**
   * Получить историю чата (v3)
   * Get chat history v3
   * 
   * Возвращает историю сообщений чата. По умолчанию от самого нового сообщения к старым.
   * 
   * @param request - Параметры запроса истории чата
   * @param options - Дополнительные опции запроса
   * @returns История сообщений чата
   * 
   * @example
   * ```typescript
   * const history = await chatApi.getChatHistoryV3({
   *   chat_id: 'chat-123',
   *   limit: 50,
   *   direction: 'Backward'
   * });
   * 
   * history.messages?.forEach(message => {
   *   console.log(`${message.user?.name}: ${message.data?.join(' ')}`);
   *   if (message.is_image) {
   *     console.log('📷 Содержит изображение');
   *   }
   * });
   * ```
   */
  async getChatHistoryV3(
    request: ChatHistoryV3Request,
    options?: RequestOptions
  ): Promise<ChatHistoryV3Response> {
    return this.httpClient.request<ChatHistoryV3Request, ChatHistoryV3Response>(
      'POST',
      '/v3/chat/history',
      request,
      options
    );
  }

  /**
   * Получить список чатов (v2)
   * Get chat list v2
   * 
   * ⚠️ Этот метод устаревает. Используйте getChatListV3.
   * 
   * Возвращает информацию о чатах по указанным фильтрам.
   * 
   * @param request - Параметры запроса списка чатов
   * @param options - Дополнительные опции запроса
   * @returns Список чатов
   * 
   * @example
   * ```typescript
   * const chats = await chatApi.getChatListV2({
   *   limit: 100,
   *   filter: {
   *     chat_status: 'Opened',
   *     unread_only: true
   *   }
   * });
   * 
   * console.log(`Найдено ${chats.total_chats_count} чатов`);
   * console.log(`Непрочитанных сообщений: ${chats.total_unread_count}`);
   * ```
   */
  async getChatListV2(
    request?: ChatListV2Request,
    options?: RequestOptions
  ): Promise<ChatListV2Response> {
    return this.httpClient.request<ChatListV2Request, ChatListV2Response>(
      'POST',
      '/v2/chat/list',
      request ?? { limit: 30 },
      options
    );
  }

  /**
   * Получить список чатов (v3)
   * Get chat list v3
   * 
   * Возвращает информацию о чатах по указанным фильтрам.
   * 
   * @param request - Параметры запроса списка чатов
   * @param options - Дополнительные опции запроса
   * @returns Список чатов
   * 
   * @example
   * ```typescript
   * const chats = await chatApi.getChatListV3({
   *   limit: 100,
   *   filter: {
   *     chat_status: 'Opened',
   *     unread_only: true
   *   }
   * });
   * 
   * chats.chats?.forEach(chatInfo => {
   *   console.log(`Чат ${chatInfo.chat?.chat_id}: ${chatInfo.unread_count} непрочитанных`);
   * });
   * 
   * // Пагинация
   * if (chats.has_next) {
   *   const nextPage = await chatApi.getChatListV3({
   *     limit: 100,
   *     cursor: chats.cursor
   *   });
   * }
   * ```
   */
  async getChatListV3(
    request?: ChatListV3Request,
    options?: RequestOptions
  ): Promise<ChatListV3Response> {
    return this.httpClient.request<ChatListV3Request, ChatListV3Response>(
      'POST',
      '/v3/chat/list',
      request ?? { limit: 30 },
      options
    );
  }
}