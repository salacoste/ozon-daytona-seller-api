/**
 * Chat API request types
 * Generated from MCP documentation: premium--chunk-001.md and premium--chunk-002.md
 * Ready for manual editing and enhancements
 */

/**
 * Запрос создания нового чата
 * Chat start request
 */
export interface ChatStartRequest {
  /** Идентификатор отправления */
  posting_number: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос отправки сообщения в чат
 * Chat send message request
 */
export interface ChatSendMessageRequest {
  /** Идентификатор чата */
  chat_id: string;
  /** Текст сообщения в формате plain text от 1 до 1000 символов */
  text: string;
  readonly [key: string]: unknown;
}

/**
 * Запрос отметки сообщений как прочитанных
 * Chat read request
 */
export interface ChatReadRequest {
  /** Идентификатор чата */
  chat_id: string;
  /** Идентификатор сообщения */
  from_message_id?: number;
  readonly [key: string]: unknown;
}

/**
 * Фильтр для истории чата v3
 * Chat history filter v3
 */
export interface ChatHistoryRequestFilter {
  /** Дополнительные параметры фильтрации */
  readonly [key: string]: unknown;
}

/**
 * Запрос истории чата (v3)
 * Chat history request v3
 */
export interface ChatHistoryV3Request {
  /** Идентификатор чата */
  chat_id: string;
  /**
   * Направление сортировки сообщений:
   * - `Forward` — от старых к новым.
   * - `Backward` — от новых к старым.
   * Значение по умолчанию — `Backward`.
   */
  direction?: ChatDirection;
  /** Фильтр для истории чата */
  filter?: ChatHistoryRequestFilter;
  /** Идентификатор сообщения, с которого начать вывод истории чата */
  from_message_id?: number;
  /** Количество сообщений в ответе. По умолчанию — 50. Максимальное значение — 1000 */
  limit?: number;
  readonly [key: string]: unknown;
}

/**
 * Запрос отправки файла в чат
 * Chat send file request
 */
export interface ChatSendFileRequest {
  /** Идентификатор чата */
  chat_id: string;
  /** Файл в виде строки base64 */
  base64_content?: string;
  /** Название файла с расширением */
  name?: string;
  readonly [key: string]: unknown;
}

/**
 * Направление сортировки сообщений
 * Chat message direction
 */
export type ChatDirection = "Forward" | "Backward";

/**
 * Запрос истории чата (v2) - УСТАРЕЛ
 * Chat history request v2 - DEPRECATED
 * @deprecated Отключается 13 июля 2025 года
 */
export interface ChatHistoryV2Request {
  /** Идентификатор чата */
  chat_id: string;
  /** Количество сообщений в ответе. По умолчанию — 50. Максимальное значение — 1000 */
  limit: number;
  /**
   * Направление сортировки сообщений:
   * - `Forward` — от старых к новым.
   * - `Backward` — от новых к старым.
   * Значение по умолчанию — `Backward`.
   */
  direction?: ChatDirection;
  /** Идентификатор сообщения, с которого начать вывод истории чата */
  from_message_id?: number;
  readonly [key: string]: unknown;
}

/**
 * Фильтр для списка чатов v2
 * Chat list filter v2
 */
export interface ChatListRequestFilter {
  /** Дополнительные параметры фильтрации */
  readonly [key: string]: unknown;
}

/**
 * Запрос списка чатов (v2) - УСТАРЕЛ
 * Chat list request v2 - DEPRECATED
 * @deprecated Метод устаревает, используйте ChatListV3Request
 */
export interface ChatListV2Request {
  /** Количество значений в ответе. Значение по умолчанию — 30. Максимальное значение — 1000 */
  limit: number;
  /** Фильтр для списка чатов */
  filter?: ChatListRequestFilter;
  /** Количество элементов, которое будет пропущено в ответе */
  offset?: number;
  readonly [key: string]: unknown;
}

/**
 * Фильтр для списка чатов v3
 * Chat list filter v3
 */
export interface ChatListV3RequestFilter {
  /** Дополнительные параметры фильтрации */
  readonly [key: string]: unknown;
}

/**
 * Запрос списка чатов (v3)
 * Chat list request v3
 */
export interface ChatListV3Request {
  /** Количество значений в ответе. Значение по умолчанию — 30. Максимальное значение — 1000 */
  limit: number;
  /** Фильтр для списка чатов */
  filter?: ChatListV3RequestFilter;
  /** Указатель для выборки следующих данных */
  cursor?: string;
  readonly [key: string]: unknown;
}
