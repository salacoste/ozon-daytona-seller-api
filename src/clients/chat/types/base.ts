/**
 * ChatAPI base types
 * Based on /methods/15-chatapi.json
 */

/**
 * Chat status enum
 */
export type ChatStatus = 'All' | 'Opened' | 'Closed' | 'UNSPECIFIED';

/**
 * Chat type enum
 */
export type ChatType = 'Seller_Support' | 'Buyer_Seller' | 'UNSPECIFIED';

/**
 * User type enum
 */
export type UserType = 'customer' | 'seller' | 'crm' | 'courier' | 'support';

/**
 * Message direction enum
 */
export type MessageDirection = 'Forward' | 'Backward';

/**
 * Image moderation status enum
 */
export type ImageModerationStatus = 'SUCCESS' | 'MODERATION' | 'FAILED';

/**
 * User information
 */
export interface ChatUser {
  /** Идентификатор участника чата */
  id?: string;
  /** Тип участника чата */
  type?: UserType;
}

/**
 * Message context information
 */
export interface MessageContext {
  /** Номер заказа */
  order_number?: string;
  /** Идентификатор товара в системе Ozon — SKU */
  sku?: string;
}