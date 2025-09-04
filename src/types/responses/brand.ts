/**
 * Brand API response types
 * Generated from MCP documentation: brandapi--chunk-001.md
 * Ready for manual editing and enhancements
 */

import type { BaseResponse } from "../../core/types.js";

/**
 * Информация о сертифицируемом бренде
 * Brand certification information
 */
export interface BrandCertificationInfo {
  /** Название бренда */
  brand_name: string;
  /**
   * Признак, что требуется сертификат:
   * - `true` — требуется сертификат;
   * - `false` — сертификат не нужен.
   */
  has_certificate: boolean;
}

/**
 * Результат запроса списка сертифицируемых брендов
 * Brand certification list result
 */
export interface BrandCertificationListResult {
  /** Информация о сертифицируемых брендах */
  brand_certification: BrandCertificationInfo[];
  /** Общее количество брендов */
  total: number;
}

/**
 * Ответ списка сертифицируемых брендов
 * Brand certification list response
 */
export interface BrandCertificationListResponse extends BaseResponse {
  /** Результат запроса */
  result?: BrandCertificationListResult;
  readonly [key: string]: unknown;
}
