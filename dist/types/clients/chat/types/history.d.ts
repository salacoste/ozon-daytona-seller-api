import type { MessageDirection } from './base';
import type { ChatMessageV2, ChatMessageV3 } from './messaging';
export interface ChatHistoryFilter {
    message_ids?: string[];
}
export interface ChatHistoryRequestV2 {
    chat_id: string;
    direction?: MessageDirection;
    from_message_id?: string;
    limit: number;
}
export interface ChatHistoryRequestV3 {
    chat_id: string;
    direction?: MessageDirection;
    filter?: ChatHistoryFilter;
    from_message_id?: string;
    limit?: number;
}
export interface ChatHistoryResponseV2 {
    has_next?: boolean;
    messages?: ChatMessageV2[];
}
export interface ChatHistoryResponseV3 {
    has_next?: boolean;
    messages?: ChatMessageV3[];
}
export interface ChatReadRequest {
    chat_id: string;
    from_message_id?: string;
}
export interface ChatReadResponse {
    unread_count?: number;
}
