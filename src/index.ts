/**
 * Main entry point for the Ozon Seller API TypeScript SDK
 * 
 * This SDK provides a comprehensive, type-safe client library for the Ozon marketplace seller API.
 * It covers 263 endpoints across 32 API groups with full TypeScript support and enterprise-ready features.
 * 
 * @packageDocumentation
 */

// Main client export
export { OzonClient } from './clients/OzonClient';
export type { IOzonClientConfig } from './clients/OzonClient';

// Sub-client exports
export { ProductAPI } from './clients/product';
export { FBOAPI } from './clients/fbo';
export { FBSAPI } from './clients/fbs';
export { PricesStocksAPI } from './clients/pricesStocks';
export { WarehouseAPI } from './clients/warehouse';
export { AnalyticsAPI } from './clients/analytics';
export { ReviewAPI } from './clients/reviewApi';
export { DigitalAPI } from './clients/digital';
export { QuantsAPI } from './clients/quants';
export { BetaMethodAPI } from './clients/betaMethod';
export { QuestionsAnswersAPI } from './clients/questionsAnswers';

// HTTP client exports (for advanced usage)
export { HttpClient } from './http/HttpClient';
export type { IHttpClientConfig, IHttpResponse } from './http/types';

// Generated type exports
export type * from './types/generated';

// Error exports
export { OzonApiError, RateLimitError, ValidationError } from './errors';

// Pagination utilities
export * from './pagination';

// Utility exports - will be added as we implement them
// export * from './utils';

// Version information
export const SDK_VERSION = '1.0.0';
export const SUPPORTED_API_VERSION = '2.1';