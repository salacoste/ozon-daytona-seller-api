/**
 * Quants API types for economy product management
 * 
 * Beta API - Economy product system with quant-based inventory management
 * Handles product visibility, pricing, and quantum-based stock control
 */

// Base types
export interface QuantProduct {
  offer_id: string;
  product_id: number;
  quants: ProductQuant[];
}

export interface ProductQuant {
  quant_code: string;
  quant_size: number;
}

export interface QuantInfoItem {
  offer_id: string;
  product_id: number;
  quant_info: QuantInfo;
}

export interface QuantInfo {
  quants: QuantDetail[];
}

export interface QuantDetail {
  quant_code: string;
  quant_sice: number; // Note: API has typo "quant_sice" instead of "quant_size"
  sku: number;
  price: string;
  old_price?: string;
  min_price?: string;
  marketing_price?: MarketingPrice;
  dimensions?: ProductDimensions;
  barcodes_extended?: BarcodeInfo[];
  statuses?: ProductStatuses;
  shipment_type?: string;
}

export interface MarketingPrice {
  price: string;
  seller_price: string;
}

export interface ProductDimensions {
  height: number;
  width: number;
  depth: number;
  weight: number;
}

export interface BarcodeInfo {
  barcode: string;
  status: string;
  error?: string;
}

export interface ProductStatuses {
  state_name: string;
  state_sys_name: string;
  state_description: string;
  state_tooltip: string;
}

// Enums
export type ProductVisibility = 
  | 'ALL'
  | 'VISIBLE'
  | 'INVISIBLE'
  | 'EMPTY_STOCK'
  | 'NOT_MODERATED'
  | 'MODERATED'
  | 'DISABLED'
  | 'STATE_FAILED'
  | 'READY_TO_SUPPLY'
  | 'VALIDATION_STATE_PENDING'
  | 'VALIDATION_STATE_FAIL'
  | 'VALIDATION_STATE_SUCCESS'
  | 'TO_SUPPLY'
  | 'IN_SALE'
  | 'REMOVED_FROM_SALE'
  | 'OVERPRICED'
  | 'CRITICALLY_OVERPRICED'
  | 'EMPTY_BARCODE'
  | 'BARCODE_EXISTS'
  | 'QUARANTINE'
  | 'ARCHIVED'
  | 'OVERPRICED_WITH_STOCK'
  | 'PARTIAL_APPROVED';

// Request types
export interface QuantListRequest {
  cursor?: string;
  limit?: number;
  visibility?: ProductVisibility;
}

export interface QuantInfoRequest {
  quant_code: string[];
}

// Response types
export interface QuantListResponse {
  cursor: string;
  products: QuantProduct[];
  total_items: number;
}

export interface QuantInfoResponse {
  items: QuantInfoItem[];
}

// Analytics types
export interface QuantAnalytics {
  total_products: number;
  total_quants: number;
  visible_products: number;
  invisible_products: number;
  empty_stock_products: number;
  average_quant_size: number;
  price_distribution: {
    under_100: number;
    between_100_500: number;
    between_500_1000: number;
    over_1000: number;
  };
  visibility_breakdown: Record<ProductVisibility, number>;
  shipment_types: Record<string, number>;
}

export interface QuantPriceAnalysis {
  quant_code: string;
  current_price: number;
  old_price?: number;
  min_price?: number;
  marketing_price?: number;
  seller_price?: number;
  price_change_percent?: number;
  is_overpriced: boolean;
  is_competitive: boolean;
  price_category: 'budget' | 'mid-range' | 'premium' | 'luxury';
}