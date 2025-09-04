/**
 * Return API implementation
 * For comprehensive return workflow management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { GiveoutInfoRequest, GiveoutListRequest, ReturnsCompanyFbsInfoRequest, EmptyRequest } from "../../types/requests/return.js";
import type { GiveoutGetBarcodeResponse, GiveoutBarcodeResetResponse, GiveoutGetPDFResponse, GiveoutGetPNGResponse, GiveoutInfoResponse, GiveoutIsEnabledResponse, GiveoutListResponse, ReturnsCompanyFbsInfoResponse } from "../../types/responses/return.js";

/**
 * Return API для управления процессами возврата
 * Return API for return workflow management
 *
 * @example
 * ```typescript
 * // Получить список возвратных отгрузок
 * const giveouts = await returnApi.getGiveoutList({
 *   limit: 50
 * });
 *
 * // Получить штрихкод в PNG формате
 * const barcode = await returnApi.getGiveoutPNG();
 * ```
 */
export class ReturnApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить значение штрихкода для возвратных отгрузок
   * Get barcode value for return giveouts
   *
   * Метод для получения штрихкода в текстовом виде.
   *
   * @param options - Дополнительные опции запроса
   * @returns Значение штрихкода
   */
  async getGiveoutBarcode(options?: RequestOptions): Promise<GiveoutGetBarcodeResponse> {
    return this.httpClient.request<EmptyRequest, GiveoutGetBarcodeResponse>("POST", "/v1/return/giveout/barcode", {}, options);
  }

  /**
   * Сгенерировать новый штрихкод
   * Generate new barcode
   *
   * Метод для генерации нового штрихкода, если старый был скомпрометирован.
   *
   * @param options - Дополнительные опции запроса
   * @returns PNG файл с новым штрихкодом
   */
  async resetGiveoutBarcode(options?: RequestOptions): Promise<GiveoutBarcodeResetResponse> {
    return this.httpClient.request<EmptyRequest, GiveoutBarcodeResetResponse>("POST", "/v1/return/giveout/barcode-reset", {}, options);
  }

  /**
   * Получить штрихкод в формате PDF
   * Get barcode in PDF format
   *
   * Метод для получения штрихкода в PDF формате. Работает только для схемы FBS.
   *
   * @param options - Дополнительные опции запроса
   * @returns PDF файл со штрихкодом
   */
  async getGiveoutPDF(options?: RequestOptions): Promise<GiveoutGetPDFResponse> {
    return this.httpClient.request<EmptyRequest, GiveoutGetPDFResponse>("POST", "/v1/return/giveout/get-pdf", {}, options);
  }

  /**
   * Получить штрихкод в формате PNG
   * Get barcode in PNG format
   *
   * Метод для получения штрихкода в PNG формате.
   *
   * @param options - Дополнительные опции запроса
   * @returns PNG файл со штрихкодом
   */
  async getGiveoutPNG(options?: RequestOptions): Promise<GiveoutGetPNGResponse> {
    return this.httpClient.request<EmptyRequest, GiveoutGetPNGResponse>("POST", "/v1/return/giveout/get-png", {}, options);
  }

  /**
   * Получить информацию о возвратной отгрузке
   * Get return giveout info
   *
   * Метод для получения подробной информации о конкретной возвратной отгрузке.
   *
   * @param request - Параметры запроса информации о возвратной отгрузке
   * @param options - Дополнительные опции запроса
   * @returns Информация о возвратной отгрузке
   *
   * @example
   * ```typescript
   * const giveoutInfo = await returnApi.getGiveoutInfo({
   *   giveout_id: 12345
   * });
   *
   * console.log(`Status: ${giveoutInfo.status}, Items: ${giveoutInfo.items?.length}`);
   * ```
   */
  async getGiveoutInfo(request: GiveoutInfoRequest, options?: RequestOptions): Promise<GiveoutInfoResponse> {
    return this.httpClient.request<GiveoutInfoRequest, GiveoutInfoResponse>("POST", "/v1/return/giveout/info", request, options);
  }

  /**
   * Проверить возможность получения возвратных отгрузок по штрихкоду
   * Check barcode access for return giveouts
   *
   * Метод для проверки доступности функции возвратных отгрузок.
   *
   * @param options - Дополнительные опции запроса
   * @returns Информация о доступности функции
   */
  async isGiveoutEnabled(options?: RequestOptions): Promise<GiveoutIsEnabledResponse> {
    return this.httpClient.request<EmptyRequest, GiveoutIsEnabledResponse>("POST", "/v1/return/giveout/is-enabled", {}, options);
  }

  /**
   * Получить список возвратных отгрузок
   * Get return giveouts list
   *
   * Метод для получения списка активных возвратных отгрузок с пагинацией.
   *
   * @param request - Параметры запроса списка возвратных отгрузок
   * @param options - Дополнительные опции запроса
   * @returns Список возвратных отгрузок
   *
   * @example
   * ```typescript
   * const giveouts = await returnApi.getGiveoutList({
   *   limit: 100,
   *   last_id: 12345
   * });
   *
   * giveouts.giveouts?.forEach(giveout => {
   *   console.log(`Giveout ${giveout.giveout_id}: ${giveout.status}`);
   * });
   * ```
   */
  async getGiveoutList(request?: GiveoutListRequest, options?: RequestOptions): Promise<GiveoutListResponse> {
    return this.httpClient.request<GiveoutListRequest, GiveoutListResponse>("POST", "/v1/return/giveout/list", request ?? {}, options);
  }

  /**
   * Получить информацию о возвратах FBS
   * Get FBS returns info
   *
   * Метод для получения информации о количестве и сумме возвратов FBS.
   *
   * @param request - Параметры запроса информации о возвратах FBS
   * @param options - Дополнительные опции запроса
   * @returns Информация о возвратах FBS
   *
   * @example
   * ```typescript
   * const fbsInfo = await returnApi.getReturnsCompanyFbsInfo({
   *   date_from: '2024-01-01T00:00:00Z',
   *   date_to: '2024-01-31T23:59:59Z'
   * });
   *
   * fbsInfo.returns_info?.forEach(info => {
   *   console.log(`${info.date}: ${info.count} returns, ${info.amount} ${info.currency_code}`);
   * });
   * ```
   */
  async getReturnsCompanyFbsInfo(request?: ReturnsCompanyFbsInfoRequest, options?: RequestOptions): Promise<ReturnsCompanyFbsInfoResponse> {
    return this.httpClient.request<ReturnsCompanyFbsInfoRequest, ReturnsCompanyFbsInfoResponse>("POST", "/v1/returns/company/fbs/info", request ?? {}, options);
  }
}
