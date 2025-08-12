/**
 * ChatAPI list and history types
 */

import type { ChatStatus, ChatType } from './base';

/**
 * Chat list filter V2
 */
export interface ChatListFilter {
  /** Фильтр по статусу чата */
  chat_status?: ChatStatus;
  /** Фильтр по чатам с непрочитанными сообщениями */
  unread_only?: boolean;
}

/**
 * Chat list filter V3
 */
export interface ChatListFilterV3 {
  /** Фильтр по статусу чата */
  chat_status?: ChatStatus;
  /** Фильтр по чатам с непрочитанными сообщениями */
  unread_only?: boolean;
}

/**
 * Chat list request V2
 */
export interface ChatListRequestV2 {
  /** Фильтр по чатам */
  filter?: ChatListFilter;
  /** Количество значений в ответе */
  limit: number;
  /** Количество элементов, которое будет пропущено в ответе */
  offset?: number;
}

/**
 * Chat list request V3
 */
export interface ChatListRequestV3 {
  /** Фильтр по чатам */
  filter?: ChatListFilterV3;
  /** Количество значений в ответе */
  limit: number;
  /** Указатель для выборки следующих данных */
  cursor?: string;
}

/**
 * Chat details V2
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
  first_unread_message_id?: string;
  /** Идентификатор последнего сообщения в чате */
  last_message_id?: string;
  /** Количество непрочитанных сообщений в чате */
  unread_count?: number;
}

/**
 * Chat details info V3
 */
export interface ChatDetailsInfoV3 {
  /** Дата создания чата */
  created_at?: string;
  /** Идентификатор чата */
  chat_id?: string;
  /** Статус чата */
  chat_status?: ChatStatus;
  /** Тип чата */
  chat_type?: ChatType;
}

/**
 * Chat info V3
 */
export interface ChatInfoV3 {
  /** Информация о чате */
  chat?: ChatDetailsInfoV3;
  /** Идентификатор первого непрочитанного сообщения в чате */
  first_unread_message_id?: string;
  /** Идентификатор последнего сообщения в чате */
  last_message_id?: string;
  /** Количество непрочитанных сообщений в чате */
  unread_count?: number;
}

/**
 * Chat list response V2
 */
export interface ChatListResponseV2 {
  /** Данные чатов */
  chats?: ChatInfoV2[];
  /** Общее количество чатов */
  total_chats_count?: number;
  /** Общее количество непрочитанных сообщений */
  total_unread_count?: number;
}

/**
 * Chat list response V3
 */
export interface ChatListResponseV3 {
  /** Данные чатов */
  chats?: ChatInfoV3[];
  /** Общее количество непрочитанных сообщений */
  total_unread_count?: number;
  /** Указатель для выборки следующих данных */
  cursor?: string;
  /** Признак, что в ответе вернулись не все чаты */
  has_next?: boolean;
}