/**
 * ChatAPI messaging types
 */

import type { ChatUser, MessageContext, ImageModerationStatus } from './base';

/**
 * Send message request
 */
export interface SendMessageRequest {
  /** Идентификатор чата */
  chat_id: string;
  /** Текст сообщения в формате plain text от 1 до 1000 символов */
  text: string;
}

/**
 * Send message response
 */
export interface SendMessageResponse {
  /** Результат обработки запроса */
  result?: string;
}

/**
 * Send file request
 */
export interface SendFileRequest {
  /** Идентификатор чата */
  chat_id: string;
  /** Файл в виде строки base64 */
  base64_content?: string;
  /** Название файла с расширением */
  name?: string;
}

/**
 * Send file response
 */
export interface SendFileResponse {
  /** Результат обработки запроса */
  result?: string;
}

/**
 * Start chat request
 */
export interface StartChatRequest {
  /** Идентификатор отправления */
  posting_number: string;
}

/**
 * Start chat result
 */
export interface StartChatResult {
  /** Идентификатор чата */
  chat_id?: string;
}

/**
 * Start chat response
 */
export interface StartChatResponse {
  /** Результат работы метода */
  result?: StartChatResult;
}

/**
 * Chat message V2
 */
export interface ChatMessageV2 {
  /** Дата создания сообщения */
  created_at?: string;
  /** Массив с содержимым сообщения в формате Markdown */
  data?: string[];
  /** Признак, что сообщение прочитано */
  is_read?: boolean;
  /** Идентификатор сообщения */
  message_id?: string;
  /** Информация об участнике чата */
  user?: ChatUser;
}

/**
 * Chat message V3
 */
export interface ChatMessageV3 {
  /** Информация о чате */
  context?: MessageContext;
  /** Дата создания сообщения */
  created_at?: string;
  /** Массив с содержимым сообщения в формате Markdown */
  data?: string[];
  /** Признак, что сообщение содержит изображение */
  is_image?: boolean;
  /** Признак, что сообщение прочитано */
  is_read?: boolean;
  /** Идентификатор сообщения */
  message_id?: string;
  /** Статус модерации изображения */
  moderate_image_status?: ImageModerationStatus;
  /** Информация об участнике чата */
  user?: ChatUser;
}