import type { ChatUser, MessageContext, ImageModerationStatus } from './base';
export interface SendMessageRequest {
    chat_id: string;
    text: string;
}
export interface SendMessageResponse {
    result?: string;
}
export interface SendFileRequest {
    chat_id: string;
    base64_content?: string;
    name?: string;
}
export interface SendFileResponse {
    result?: string;
}
export interface StartChatRequest {
    posting_number: string;
}
export interface StartChatResult {
    chat_id?: string;
}
export interface StartChatResponse {
    result?: StartChatResult;
}
export interface ChatMessageV2 {
    created_at?: string;
    data?: string[];
    is_read?: boolean;
    message_id?: string;
    user?: ChatUser;
}
export interface ChatMessageV3 {
    context?: MessageContext;
    created_at?: string;
    data?: string[];
    is_image?: boolean;
    is_read?: boolean;
    message_id?: string;
    moderate_image_status?: ImageModerationStatus;
    user?: ChatUser;
}
