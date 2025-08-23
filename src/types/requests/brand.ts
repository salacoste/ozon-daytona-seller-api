/**
 * Brand API request types
 * Generated from MCP documentation: brandapi--chunk-001.md
 * Ready for manual editing and enhancements
 */

/**
 * Запрос списка сертифицируемых брендов
 * Brand certification list request
 */
export interface BrandCertificationListRequest {
  /** Номер страницы, возвращаемой в запросе */
  page: number;
  /** Количество элементов на странице */
  page_size: number;
  readonly [key: string]: unknown;
}