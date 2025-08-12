/**
 * ChatAPI history types
 */

import type { MessageDirection } from './base';
import type { ChatMessageV2, ChatMessageV3 } from './messaging';

/**
 * Chat history filter
 */
export interface ChatHistoryFilter {
  /** Идентификаторы сообщений */
  message_ids?: string[];
}

/**
 * Chat history request V2
 */
export interface ChatHistoryRequestV2 {
  /** Идентификатор чата */
  chat_id: string;
  /** Направление сортировки сообщений */
  direction?: MessageDirection;
  /** Идентификатор сообщения, с которого начать вывод истории чата */
  from_message_id?: string;
  /** Количество сообщений в ответе */
  limit: number;
}

/**
 * Chat history request V3
 */
export interface ChatHistoryRequestV3 {
  /** Идентификатор чата */
  chat_id: string;
  /** Направление сортировки сообщений */
  direction?: MessageDirection;
  /** Фильтр по сообщениям */
  filter?: ChatHistoryFilter;
  /** Идентификатор сообщения, с которого начать вывод истории чата */
  from_message_id?: string;
  /** Количество сообщений в ответе */
  limit?: number;
}

/**
 * Chat history response V2
 */
export interface ChatHistoryResponseV2 {
  /** Признак, что в ответе вернули не все сообщения */
  has_next?: boolean;
  /** Массив сообщений */
  messages?: ChatMessageV2[];
}

/**
 * Chat history response V3
 */
export interface ChatHistoryResponseV3 {
  /** Признак, что в ответе вернули не все сообщения */
  has_next?: boolean;
  /** Массив сообщений */
  messages?: ChatMessageV3[];
}

/**
 * Chat read request
 */
export interface ChatReadRequest {
  /** Идентификатор чата */
  chat_id: string;
  /** Идентификатор сообщения */
  from_message_id?: string;
}

/**
 * Chat read response
 */
export interface ChatReadResponse {
  /** Количество непрочитанных сообщений в чате */
  unread_count?: number;
}