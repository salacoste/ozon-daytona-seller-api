/**
 * Chat API response types
 * Generated from MCP documentation: chatapi--chunk-001.md and premium--chunk-002.md
 * Ready for manual editing and enhancements
 */

import type { BaseResponse } from '../../core/types.js';

/**
 * Статус чата
 * Chat status
 */
export type ChatStatus = 'All' | 'Opened' | 'Closed';

/**
 * Тип чата
 * Chat type
 */
export type ChatType = 'Seller_Support' | 'Buyer_Seller';

/**
 * Статус модерации изображения
 * Image moderation status
 */
export type ChatMessageModerateImageStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

/**
 * Пользователь чата v2
 * Chat user v2
 */
export interface ChatUserV2 {
  /** Идентификатор пользователя */
  id?: string;
  /** Имя пользователя */
  name?: string;
  /** Тип пользователя */
  type?: string;
}

/**
 * Пользователь чата v3
 * Chat user v3
 */
export interface ChatUserV3 {
  /** Идентификатор пользователя */
  id?: string;
  /** Имя пользователя */
  name?: string;
  /** Тип пользователя */
  type?: string;
}

/**
 * Контекст сообщения чата
 * Chat message context
 */
export interface ChatMessageContext {
  /** Дополнительная информация о контексте */
  readonly [key: string]: unknown;
}

/**
 * Сообщение чата v2
 * Chat message v2
 */
export interface ChatMessageV2 {
  /** Дата создания сообщения */
  created_at?: string;
  /** Массив с содержимым сообщения в формате Markdown */
  data?: string[];
  /** Признак, что сообщение прочитано */
  is_read?: boolean;
  /** Идентификатор сообщения */
  messageId?: number;
  /** Пользователь */
  user?: ChatUserV2;
}

/**
 * Сообщение чата v3
 * Chat message v3
 */
export interface ChatMessageV3 {
  /** Контекст сообщения */
  context?: ChatMessageContext;
  /** Дата создания сообщения */
  created_at?: string;
  /** Массив с содержимым сообщения в формате Markdown */
  data?: string[];
  /** Признак, что сообщение содержит изображение */
  is_image?: boolean;
  /** Признак, что сообщение прочитано */
  is_read?: boolean;
  /** Идентификатор сообщения */
  message_id?: number;
  /** Статус модерации изображения */
  moderate_image_status?: ChatMessageModerateImageStatus;
  /** Пользователь */
  user?: ChatUserV3;
}

/**
 * Информация о чате v2
 * Chat info v2
 */
export interface ChatInfoV2 {
  /** Идентификатор чата */
  chat_id?: string;
  /** Статус чата */
  chat_status?: ChatStatus;
  /** Тип чата */
  chat_type?: ChatType;
  /** Дата создания чата */
  created_at?: string;
  /** Идентификатор первого непрочитанного сообщения в чате */
  first_unread_message_id?: number;
  /** Идентификатор последнего сообщения в чате */
  last_message_id?: number;
  /** Количество непрочитанных сообщений в чате */
  unread_count?: number;
}

/**
 * Детальная информация о чате v3
 * Chat details info v3
 */
export interface ChatDetailsInfoV3 {
  /** Идентификатор чата */
  chat_id?: string;
  /** Статус чата */
  chat_status?: ChatStatus;
  /** Тип чата */
  chat_type?: ChatType;
  /** Дата создания чата */
  created_at?: string;
  /** Дополнительные детали */
  readonly [key: string]: unknown;
}

/**
 * Информация о чате v3
 * Chat info v3
 */
export interface ChatInfoV3 {
  /** Детальная информация о чате */
  chat?: ChatDetailsInfoV3;
  /** Идентификатор первого непрочитанного сообщения в чате */
  first_unread_message_id?: number;
  /** Идентификатор последнего сообщения в чате */
  last_message_id?: number;
  /** Количество непрочитанных сообщений в чате */
  unread_count?: number;
}

/**
 * Ответ создания нового чата
 * Chat start response
 */
export interface ChatStartResponse extends BaseResponse {
  /** Результат создания чата */
  result?: {
    /** Идентификатор созданного чата */
    chat_id?: string;
  };
  readonly [key: string]: unknown;
}

/**
 * Ответ отправки сообщения в чат
 * Chat send message response
 */
export interface ChatSendMessageResponse extends BaseResponse {
  /** Результат обработки запроса */
  result?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ отправки файла в чат
 * Chat send file response
 */
export interface ChatSendFileResponse extends BaseResponse {
  /** Результат обработки запроса */
  result?: string;
  readonly [key: string]: unknown;
}

/**
 * Ответ отметки сообщений как прочитанных
 * Chat read response
 */
export interface ChatReadResponse extends BaseResponse {
  /** Количество непрочитанных сообщений в чате */
  unread_count?: number;
  readonly [key: string]: unknown;
}

/**
 * Ответ истории чата v2
 * Chat history response v2
 */
export interface ChatHistoryV2Response extends BaseResponse {
  /** Признак, что в ответе вернули не все сообщения */
  has_next?: boolean;
  /** Массив сообщений */
  messages?: ChatMessageV2[];
  readonly [key: string]: unknown;
}

/**
 * Ответ истории чата v3
 * Chat history response v3
 */
export interface ChatHistoryV3Response extends BaseResponse {
  /** Признак, что в ответе вернули не все сообщения */
  has_next?: boolean;
  /** Массив сообщений */
  messages?: ChatMessageV3[];
  readonly [key: string]: unknown;
}

/**
 * Ответ списка чатов v2
 * Chat list response v2
 */
export interface ChatListV2Response extends BaseResponse {
  /** Данные чатов */
  chats?: ChatInfoV2[];
  /** Общее количество чатов */
  total_chats_count?: number;
  /** Общее количество непрочитанных сообщений */
  total_unread_count?: number;
  readonly [key: string]: unknown;
}

/**
 * Ответ списка чатов v3
 * Chat list response v3
 */
export interface ChatListV3Response extends BaseResponse {
  /** Данные чатов */
  chats?: ChatInfoV3[];
  /** Общее количество непрочитанных сообщений */
  total_unread_count?: number;
  /** Указатель для выборки следующих данных */
  cursor?: string;
  /** Признак, что в ответе вернулись не все чаты */
  has_next?: boolean;
  readonly [key: string]: unknown;
}