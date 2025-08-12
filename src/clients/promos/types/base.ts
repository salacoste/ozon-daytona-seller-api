/**
 * Promos API base types
 */

/**
 * Promotional action/campaign information
 */
export interface PromoAction {
  /** Promo action identifier */
  id?: number;
  /** Action title/name */
  title?: string;
  /** Type of promotional action */
  action_type?: string;
  /** Detailed description of the action */
  description?: string;
  /** Action start date */
  date_start?: string;
  /** Action end date */
  date_end?: string;
  /** 
   * Freeze date - when seller restrictions take effect.
   * After this date, sellers cannot increase prices or reduce stock.
   */
  freeze_date?: string;
  /** Number of products available for this action */
  potential_products_count?: number;
  /** Number of products currently participating */
  participating_products_count?: number;
  /** Whether you are participating in this action */
  is_participating?: boolean;
  /** Whether this is a voucher-based action (requires promo code) */
  is_voucher_action?: boolean;
  /** Number of banned/blocked products */
  banned_products_count?: number;
  /** Whether action has targeted audience */
  with_targeting?: boolean;
  /** Minimum order amount for action eligibility */
  order_amount?: number;
  /** Type of discount (PERCENT, FIXED_AMOUNT, etc.) */
  discount_type?: string;
  /** Discount value/amount */
  discount_value?: number;
}

/**
 * Product in promotional action
 */
export interface PromoProduct {
  /** Product identifier in seller's system */
  id?: number;
  /** Current product price without discount */
  price?: number;
  /** Promotional price for this product */
  action_price?: number;
  /** Whether price exceeds recommended action price */
  alert_max_action_price_failed?: boolean;
  /** Recommended promotional price */
  alert_max_action_price?: number;
  /** Maximum allowed promotional price */
  max_action_price?: number;
  /** How product was added to action (MANUAL, AUTO) */
  add_mode?: string;
  /** Minimum stock quantity for stock-based promotions */
  min_stock?: number;
  /** Current stock quantity in promotion */
  stock?: number;
}

/**
 * Product with pricing information for activation
 */
export interface PromoProductPrice {
  /** Product identifier in seller's system */
  product_id: number;
  /** Promotional price to set */
  action_price: number;
  /** Stock quantity for stock-based promotions */
  stock?: number;
}

/**
 * Rejected product with reason
 */
export interface RejectedProduct {
  /** Product identifier */
  product_id?: number;
  /** Reason why product was rejected */
  reason?: string;
}

/**
 * Discount request status types
 */
export type DiscountTaskStatus = 
  | 'NEW'                // New request
  | 'SEEN'               // Viewed request  
  | 'APPROVED'           // Approved request
  | 'PARTLY_APPROVED'    // Partially approved
  | 'DECLINED'           // Declined by seller
  | 'AUTO_DECLINED'      // Auto-declined by system
  | 'DECLINED_BY_USER'   // Declined by customer
  | 'COUPON'             // Discount via coupon
  | 'PURCHASED';         // Product purchased

/**
 * Customer discount request/task
 */
export interface DiscountTask {
  /** Task identifier */
  id?: number;
  /** Task creation date */
  created_at?: string;
  /** Task expiration date */
  end_at?: string;
  /** Deadline for changing decision */
  edited_till?: string;
  /** Current task status */
  status?: string;
  /** Customer name */
  customer_name?: string;
  /** Product SKU in Ozon system */
  sku?: number;
  /** Product offer ID in seller system */
  offer_id?: string;
  /** Customer comment on the request */
  user_comment?: string;
  /** Seller comment on the request */
  seller_comment?: string;
  /** Price requested by customer */
  requested_price?: number;
  /** Price approved by seller */
  approved_price?: number;
  /** Original product price before all discounts */
  original_price?: number;
  /** Base price on Ozon when not in promotions */
  base_price?: number;
  /** Minimum automatic price after discounts/promotions */
  min_auto_price?: number;
  /** Discount amount in rubles */
  discount?: number;
  /** Discount percentage */
  discount_percent?: number;
  /** Approved discount amount in rubles */
  approved_discount?: number;
  /** Approved discount percentage */
  approved_discount_percent?: number;
  /** Whether product is damaged/discounted */
  is_damaged?: boolean;
  /** Whether customer previously purchased this product */
  is_purchased?: boolean;
  /** Whether task was auto-moderated */
  is_auto_moderated?: boolean;
  /** Moderation date (viewed/approved/declined) */
  moderated_at?: string;
  /** Previous task ID from same customer for this product */
  prev_task_id?: number;
  /** Customer email address */
  email?: string;
  /** Seller employee who processed the task - last name */
  last_name?: string;
  /** Seller employee who processed the task - first name */
  first_name?: string;
  /** Seller employee who processed the task - patronymic */
  patronymic?: string;
  /** Minimum approved quantity */
  approved_quantity_min?: number;
  /** Maximum approved quantity */
  approved_quantity_max?: number;
  /** Minimum requested quantity */
  requested_quantity_min?: number;
  /** Maximum requested quantity */
  requested_quantity_max?: number;
  /** Requested price with regional fee */
  requested_price_with_fee?: number;
  /** Approved price with regional fee */
  approved_price_with_fee?: number;
  /** Regional fee percentage */
  approved_price_fee_percent?: number;
}

/**
 * Task approval details
 */
export interface DiscountTaskApproval {
  /** Task identifier */
  id: number;
  /** Approved price */
  approved_price: number;
  /** Seller comment */
  seller_comment?: string;
  /** Minimum approved quantity */
  approved_quantity_min: number;
  /** Maximum approved quantity */
  approved_quantity_max: number;
}

/**
 * Task decline details
 */
export interface DiscountTaskDecline {
  /** Task identifier */
  id: number;
  /** Seller comment explaining decline reason */
  seller_comment?: string;
}

/**
 * Failed task operation details
 */
export interface FailedTaskDetail {
  /** Task identifier that failed */
  task_id?: number;
  /** User-friendly error message */
  error_for_user?: string;
}