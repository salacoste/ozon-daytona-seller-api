/**
 * Brand API implementation
 * Generated from MCP documentation: brandapi--chunk-001.md
 * Handles brand certification and management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { BrandCertificationListRequest } from "../../types/requests/brand.js";
import type { BrandCertificationListResponse } from "../../types/responses/brand.js";

/**
 * Brand API для управления брендами и сертификацией
 * Brand API for brand and certification management
 *
 * @example
 * ```typescript
 * // Получить список брендов, требующих сертификацию
 * const brands = await brandApi.getCertificationList({
 *   page: 1,
 *   page_size: 50
 * });
 *
 * brands.result?.brand_certification.forEach(brand => {
 *   if (brand.has_certificate) {
 *     console.log(`Бренд ${brand.brand_name} требует сертификат`);
 *   }
 * });
 * ```
 */
export class BrandApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить список сертифицируемых брендов
   * Get list of certifiable brands
   *
   * Метод для получения списка брендов, для которых требуется предоставить сертификат.
   * Ответ содержит список брендов, товары которых есть в вашем личном кабинете.
   *
   * Список брендов может изменяться, если Ozon получит требование от бренда предоставлять сертификат.
   *
   * @param request - Параметры запроса списка брендов
   * @param options - Дополнительные опции запроса
   * @returns Список брендов с информацией о требованиях к сертификации
   *
   * @example
   * ```typescript
   * const brands = await brandApi.getCertificationList({
   *   page: 1,
   *   page_size: 100
   * });
   *
   * console.log(`Всего брендов: ${brands.result?.total}`);
   *
   * const brandsRequiringCerts = brands.result?.brand_certification.filter(
   *   brand => brand.has_certificate
   * );
   *
   * console.log(`Брендов, требующих сертификацию: ${brandsRequiringCerts?.length}`);
   *
   * // Пагинация
   * if (brands.result && brands.result.total > 100) {
   *   const nextPage = await brandApi.getCertificationList({
   *     page: 2,
   *     page_size: 100
   *   });
   * }
   * ```
   */
  async getCertificationList(request: BrandCertificationListRequest, options?: RequestOptions): Promise<BrandCertificationListResponse> {
    // Валидация параметров согласно API
    if (!request.page || request.page < 1) {
      throw new Error('Parameter "page" is required and must be >= 1');
    }

    if (!request.page_size || request.page_size < 1) {
      throw new Error('Parameter "page_size" is required and must be >= 1');
    }

    return this.httpClient.request<BrandCertificationListRequest, BrandCertificationListResponse>("POST", "/v1/brand/company-certification/list", request, options);
  }
}
