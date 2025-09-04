/**
 * Digital API implementation
 * Digital product management
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { DigitalUploadPostingCodesRequest, DigitalListPostingCodesRequest, DigitalStocksImportRequest } from "../../types/requests/digital.js";
import type { DigitalUploadPostingCodesResponse, DigitalListPostingCodesResponse, DigitalStocksImportResponse } from "../../types/responses/digital.js";

/**
 * Digital API для управления цифровыми товарами
 * Digital API for digital products management
 *
 * 💾 Доступно только продавцам, работающим с цифровыми товарами
 * 💾 Available only for sellers working with digital products
 *
 * @example
 * ```typescript
 * // Получить список отправлений с цифровыми товарами
 * const digitalPostings = await digitalApi.getDigitalPostingsList({
 *   filter: {
 *     since: '2024-01-01',
 *     to: '2024-01-31'
 *   },
 *   limit: 100,
 *   with: {
 *     financial_data: true,
 *     analytics_data: true
 *   }
 * });
 *
 * // Загрузить коды для цифрового товара
 * await digitalApi.uploadDigitalCodes({
 *   posting_number: '12345-0001-1',
 *   exemplars_by_sku: [{
 *     sku: 123456789,
 *     exemplar_qty: 3,
 *     not_available_exemplar_qty: 0,
 *     exemplar_keys: ['CODE001', 'CODE002', 'CODE003']
 *   }]
 * });
 *
 * // Обновить остатки цифровых товаров
 * await digitalApi.updateDigitalStocks({
 *   stocks: [{
 *     offer_id: 'DIGITAL_PRODUCT_001',
 *     stock: 100
 *   }]
 * });
 * ```
 */
export class DigitalApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Получить список отправлений с цифровыми товарами
   * Get list of postings with digital products
   *
   * Возвращает список отправлений, по которым нужно загрузить коды цифровых товаров.
   * Доступно только продавцам, работающим с цифровыми товарами.
   *
   * @param request - Параметры запроса списка отправлений
   * @param options - Дополнительные опции запроса
   * @returns Список отправлений с цифровыми товарами
   *
   * @example
   * ```typescript
   * // Получить все отправления за последнюю неделю
   * const weekAgo = new Date();
   * weekAgo.setDate(weekAgo.getDate() - 7);
   *
   * const digitalPostings = await digitalApi.getDigitalPostingsList({
   *   filter: {
   *     since: weekAgo.toISOString().split('T')[0],
   *     to: new Date().toISOString().split('T')[0]
   *   },
   *   limit: 100,
   *   dir: 'DESC',
   *   with: {
   *     financial_data: true,
   *     analytics_data: true,
   *     legal_info: false
   *   }
   * });
   *
   * digitalPostings.result?.forEach(posting => {
   *   console.log(`Отправление: ${posting.posting_number} (${posting.status})`);
   *   console.log(`Заказ: ${posting.order_number}, ID: ${posting.order_id}`);
   *   console.log(`Создан: ${posting.created_at}`);
   *   console.log(`Дедлайн кодов: ${posting.waiting_deadline_for_digital_code}`);
   *
   *   posting.products?.forEach(product => {
   *     console.log(`  Товар: ${product.name} (SKU: ${product.sku})`);
   *     console.log(`  Требуется кодов: ${product.required_qty_for_digital_code}`);
   *     console.log(`  Цена: ${product.price} ${product.currency_code}`);
   *   });
   *
   *   if (posting.analytics_data) {
   *     console.log(`  Регион: ${posting.analytics_data.region}, город: ${posting.analytics_data.city}`);
   *   }
   *
   *   if (posting.financial_data) {
   *     console.log(`  Сумма заказа: ${posting.financial_data.order_amount}`);
   *     console.log(`  Комиссия: ${posting.financial_data.commission}`);
   *   }
   * });
   *
   * // Найти отправления, требующие загрузки кодов
   * const pendingCodeUploads = digitalPostings.result?.filter(posting =>
   *   posting.status === 'awaiting_packaging' &&
   *   posting.products?.some(product => product.required_qty_for_digital_code > 0)
   * ) || [];
   *
   * console.log(`Отправлений ожидают загрузки кодов: ${pendingCodeUploads.length}`);
   * ```
   */
  async getDigitalPostingsList(request: DigitalListPostingCodesRequest = {}, options?: RequestOptions): Promise<DigitalListPostingCodesResponse> {
    return this.httpClient.request<DigitalListPostingCodesRequest, DigitalListPostingCodesResponse>("POST", "/v1/posting/digital/list", request, options);
  }

  /**
   * Загрузить коды цифровых товаров для отправления
   * Upload digital product codes for posting
   *
   * Позволяет загрузить коды цифровых товаров в течение 24 часов с момента получения заказа.
   * Доступно только продавцам, работающим с цифровыми товарами.
   *
   * @param request - Параметры запроса загрузки кодов
   * @param options - Дополнительные опции запроса
   * @returns Результат загрузки кодов по товарам
   *
   * @example
   * ```typescript
   * // Загрузить коды для отправления с несколькими товарами
   * const uploadResult = await digitalApi.uploadDigitalCodes({
   *   posting_number: '12345-0001-1',
   *   exemplars_by_sku: [
   *     {
   *       sku: 123456789,
   *       exemplar_qty: 3,
   *       not_available_exemplar_qty: 0,
   *       exemplar_keys: [
   *         'GAME_KEY_001_ABC123',
   *         'GAME_KEY_002_DEF456',
   *         'GAME_KEY_003_GHI789'
   *       ]
   *     },
   *     {
   *       sku: 987654321,
   *       exemplar_qty: 1,
   *       not_available_exemplar_qty: 1, // Один код недоступен
   *       exemplar_keys: ['SOFTWARE_LIC_XYZ999']
   *     }
   *   ]
   * });
   *
   * // Проверить результаты загрузки
   * uploadResult.exemplars_by_sku?.forEach(result => {
   *   console.log(`SKU ${result.sku}:`);
   *   console.log(`  Принято кодов: ${result.received_qty}`);
   *   console.log(`  Отклонено кодов: ${result.rejected_qty}`);
   *
   *   if (result.failed_exemplars && result.failed_exemplars.length > 0) {
   *     console.log('  Ошибки:');
   *     result.failed_exemplars.forEach(error => {
   *       console.log(`    ${error.code}: ${error.message}`);
   *     });
   *   }
   * });
   *
   * // Пример обработки частично недоступных кодов
   * const uploadWithPartialFailure = await digitalApi.uploadDigitalCodes({
   *   posting_number: '12345-0002-1',
   *   exemplars_by_sku: [{
   *     sku: 555666777,
   *     exemplar_qty: 2,        // Передаём 2 кода
   *     not_available_exemplar_qty: 1, // 1 код недоступен
   *     exemplar_keys: ['CODE_A', 'CODE_B'] // Общее количество должно быть 3
   *   }]
   * });
   * ```
   */
  async uploadDigitalCodes(request: DigitalUploadPostingCodesRequest, options?: RequestOptions): Promise<DigitalUploadPostingCodesResponse> {
    return this.httpClient.request<DigitalUploadPostingCodesRequest, DigitalUploadPostingCodesResponse>("POST", "/v1/posting/digital/codes/upload", request, options);
  }

  /**
   * Обновить остатки цифровых товаров
   * Update digital products stock
   *
   * Используйте метод для изменения информации о количестве цифровых товаров в наличии.
   * Доступно только продавцам, работающим с цифровыми товарами.
   *
   * @param request - Параметры запроса обновления остатков
   * @param options - Дополнительные опции запроса
   * @returns Результат обновления остатков по товарам
   *
   * @example
   * ```typescript
   * // Обновить остатки для нескольких цифровых товаров
   * const stockUpdateResult = await digitalApi.updateDigitalStocks({
   *   stocks: [
   *     {
   *       offer_id: 'GAME_DIGITAL_001',
   *       stock: 50 // Осталось 50 лицензий игры
   *     },
   *     {
   *       offer_id: 'SOFTWARE_LICENSE_002',
   *       stock: 25 // Осталось 25 лицензий ПО
   *     },
   *     {
   *       offer_id: 'DIGITAL_BOOK_003',
   *       stock: 0 // Цифровая книга закончилась
   *     },
   *     {
   *       offer_id: 'MUSIC_ALBUM_004',
   *       stock: 999 // Музыкальный альбом (неограничено)
   *     }
   *   ]
   * });
   *
   * // Проверить результаты обновления
   * let successCount = 0;
   * let errorCount = 0;
   *
   * stockUpdateResult.status?.forEach(status => {
   *   if (status.updated) {
   *     successCount++;
   *     console.log(`✅ ${status.offer_id} (SKU: ${status.sku}) - остатки обновлены`);
   *   } else {
   *     errorCount++;
   *     console.log(`❌ ${status.offer_id} - ошибка обновления:`);
   *     status.errors?.forEach(error => {
   *       console.log(`   ${error.code}: ${error.message}`);
   *     });
   *   }
   * });
   *
   * console.log(`Обновлено успешно: ${successCount}, с ошибками: ${errorCount}`);
   *
   * // Пример функции для пакетного обновления остатков
   * const updateStocksBatch = async (stockUpdates: { offerId: string; newStock: number }[]) => {
   *   const batchSize = 100; // Рекомендуемый размер батча
   *
   *   for (let i = 0; i < stockUpdates.length; i += batchSize) {
   *     const batch = stockUpdates.slice(i, i + batchSize);
   *
   *     const result = await digitalApi.updateDigitalStocks({
   *       stocks: batch.map(item => ({
   *         offer_id: item.offerId,
   *         stock: item.newStock
   *       }))
   *     });
   *
   *     console.log(`Обработан батч ${Math.floor(i / batchSize) + 1}/${Math.ceil(stockUpdates.length / batchSize)}`);
   *
   *     // Задержка между батчами для избежания rate limiting
   *     if (i + batchSize < stockUpdates.length) {
   *       await new Promise(resolve => setTimeout(resolve, 1000));
   *     }
   *   }
   * };
   * ```
   */
  async updateDigitalStocks(request: DigitalStocksImportRequest, options?: RequestOptions): Promise<DigitalStocksImportResponse> {
    return this.httpClient.request<DigitalStocksImportRequest, DigitalStocksImportResponse>("POST", "/v1/product/digital/stocks/import", request, options);
  }
}
