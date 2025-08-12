import type { ChatStatus, ChatType } from './base';
export interface ChatListFilter {
    chat_status?: ChatStatus;
    unread_only?: boolean;
}
export interface ChatListFilterV3 {
    chat_status?: ChatStatus;
    unread_only?: boolean;
}
export interface ChatListRequestV2 {
    filter?: ChatListFilter;
    limit: number;
    offset?: number;
}
export interface ChatListRequestV3 {
    filter?: ChatListFilterV3;
    limit: number;
    cursor?: string;
}
export interface ChatInfoV2 {
    chat_id?: string;
    chat_status?: ChatStatus;
    chat_type?: ChatType;
    created_at?: string;
    first_unread_message_id?: string;
    last_message_id?: string;
    unread_count?: number;
}
export interface ChatDetailsInfoV3 {
    created_at?: string;
    chat_id?: string;
    chat_status?: ChatStatus;
    chat_type?: ChatType;
}
export interface ChatInfoV3 {
    chat?: ChatDetailsInfoV3;
    first_unread_message_id?: string;
    last_message_id?: string;
    unread_count?: number;
}
export interface ChatListResponseV2 {
    chats?: ChatInfoV2[];
    total_chats_count?: number;
    total_unread_count?: number;
}
export interface ChatListResponseV3 {
    chats?: ChatInfoV3[];
    total_unread_count?: number;
    cursor?: string;
    has_next?: boolean;
}
