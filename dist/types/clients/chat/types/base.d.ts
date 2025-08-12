export type ChatStatus = 'All' | 'Opened' | 'Closed' | 'UNSPECIFIED';
export type ChatType = 'Seller_Support' | 'Buyer_Seller' | 'UNSPECIFIED';
export type UserType = 'customer' | 'seller' | 'crm' | 'courier' | 'support';
export type MessageDirection = 'Forward' | 'Backward';
export type ImageModerationStatus = 'SUCCESS' | 'MODERATION' | 'FAILED';
export interface ChatUser {
    id?: string;
    type?: UserType;
}
export interface MessageContext {
    order_number?: string;
    sku?: string;
}
