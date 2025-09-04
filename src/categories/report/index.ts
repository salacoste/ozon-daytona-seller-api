/**
 * ReportAPI implementation
 * Business reporting and analytics generation
 */

import { HttpClient } from "../../core/http.js";
import type { RequestOptions } from "../../core/types.js";
import type { ReportFinanceCashFlowStatementListRequest, ReportCreateDiscountedRequest, ReportInfoRequest, ReportListRequest, ReportCreatePostingsRequest, ReportCreateProductsRequest, ReportCreateStockByWarehouseRequest, ReportCreateReturnsRequest } from "../../types/requests/report.js";
import type { ReportFinanceCashFlowStatementListResponse, ReportCreateDiscountedResponse, ReportInfoResponse, ReportListResponse, ReportCreateResponse, ReportCreateReturnsResponse } from "../../types/responses/report.js";

/**
 * ReportAPI для бизнес-отчетности и генерации аналитики
 * ReportAPI for business reporting and analytics generation
 *
 * @example
 * ```typescript
 * // Получить финансовый отчёт
 * const financialReport = await reportApi.getFinanceCashFlowStatement({
 *   date: { from: '2024-01-01', to: '2024-01-31' },
 *   page: 1,
 *   page_size: 100
 * });
 *
 * // Создать отчёт об уценённых товарах
 * const discountedReport = await reportApi.createDiscountedReport({});
 *
 * // Получить информацию об отчёте
 * const reportInfo = await reportApi.getReportInfo({
 *   code: 'report_code_123'
 * });
 * ```
 */
export class ReportApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Финансовый отчёт
   * Get financial cash flow statement
   *
   * Метод для получения финансового отчёта за периоды с 01 по 15 и с 16 по 31.
   * Запросить отчёт за отдельные дни не получится.
   * Соответствует разделу "Финансы → Баланс" в личном кабинете.
   *
   * @param request - Параметры запроса финансового отчёта
   * @param options - Дополнительные опции запроса
   * @returns Финансовый отчёт
   *
   * @example
   * ```typescript
   * const report = await reportApi.getFinanceCashFlowStatement({
   *   date: { from: '2024-01-01', to: '2024-01-31' },
   *   page: 1,
   *   page_size: 50,
   *   with_details: true
   * });
   *
   * report.result?.operations?.forEach(operation => {
   *   console.log(`${operation.operation_type}: ${operation.amount} ${operation.currency}`);
   * });
   * ```
   */
  async getFinanceCashFlowStatement(request: ReportFinanceCashFlowStatementListRequest, options?: RequestOptions): Promise<ReportFinanceCashFlowStatementListResponse> {
    return this.httpClient.request<ReportFinanceCashFlowStatementListRequest, ReportFinanceCashFlowStatementListResponse>("POST", "/v1/finance/cash-flow-statement/list", request, options);
  }

  /**
   * Отчёт об уценённых товарах
   * Create discounted products report
   *
   * Запускает генерацию отчёта по уценённым товарам на складе Ozon.
   * Ozon может сам уценить товар, например, при повреждении.
   * В результате запроса будет не сам отчёт, а его уникальный идентификатор.
   * Соответствует разделу "Аналитика → Отчёты → Продажи со склада Ozon → Товары, уценённые Ozon".
   *
   * @param request - Параметры запроса создания отчёта
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного отчёта
   *
   * @example
   * ```typescript
   * const report = await reportApi.createDiscountedReport({});
   * console.log(`Отчёт создан с кодом: ${report.code}`);
   *
   * // Получить готовый отчёт через getReportInfo
   * const reportInfo = await reportApi.getReportInfo({ code: report.code });
   * ```
   */
  async createDiscountedReport(request: ReportCreateDiscountedRequest, options?: RequestOptions): Promise<ReportCreateDiscountedResponse> {
    return this.httpClient.request<ReportCreateDiscountedRequest, ReportCreateDiscountedResponse>("POST", "/v1/report/discounted/create", request, options);
  }

  /**
   * Информация об отчёте
   * Get report information
   *
   * Возвращает информацию о созданном ранее отчёте по его идентификатору.
   *
   * @param request - Параметры запроса информации об отчёте
   * @param options - Дополнительные опции запроса
   * @returns Информация об отчёте
   *
   * @example
   * ```typescript
   * const reportInfo = await reportApi.getReportInfo({
   *   code: 'report_code_123'
   * });
   *
   * if (reportInfo.result?.status === 'SUCCESS') {
   *   console.log(`Отчёт готов: ${reportInfo.result.download_url}`);
   * } else {
   *   console.log(`Статус: ${reportInfo.result?.status}`);
   * }
   * ```
   */
  async getReportInfo(request: ReportInfoRequest, options?: RequestOptions): Promise<ReportInfoResponse> {
    return this.httpClient.request<ReportInfoRequest, ReportInfoResponse>("POST", "/v1/report/info", request, options);
  }

  /**
   * Список отчётов
   * Get report list
   *
   * Возвращает список отчётов, которые были сформированы раньше.
   *
   * @param request - Параметры запроса списка отчётов
   * @param options - Дополнительные опции запроса
   * @returns Список отчётов
   *
   * @example
   * ```typescript
   * const reportList = await reportApi.getReportList({
   *   page: 1,
   *   page_size: 50,
   *   report_type: 'PRODUCTS'
   * });
   *
   * reportList.result?.reports?.forEach(report => {
   *   console.log(`${report.report_type}: ${report.status} (${report.created_at})`);
   * });
   * ```
   */
  async getReportList(request: ReportListRequest, options?: RequestOptions): Promise<ReportListResponse> {
    return this.httpClient.request<ReportListRequest, ReportListResponse>("POST", "/v1/report/list", request, options);
  }

  /**
   * Отчёт об отправлениях
   * Create postings report
   *
   * Отчёт об отправлениях с информацией по заказам: статусы заказов,
   * дата начала обработки, номера заказов, номера отправлений,
   * стоимость отправлений, содержимое отправлений.
   * Соответствует разделам "FBO → Заказы со склада Ozon" и "FBS → Заказы с моих складов → CSV".
   *
   * @param request - Параметры запроса создания отчёта об отправлениях
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного отчёта
   *
   * @example
   * ```typescript
   * const postingsReport = await reportApi.createPostingsReport({
   *   filter: {
   *     since: '2024-01-01',
   *     to: '2024-01-31',
   *     status: ['DELIVERED', 'CANCELLED']
   *   },
   *   language: 'RU'
   * });
   *
   * console.log(`Отчёт об отправлениях создан: ${postingsReport.result?.code}`);
   * ```
   */
  async createPostingsReport(request: ReportCreatePostingsRequest, options?: RequestOptions): Promise<ReportCreateResponse> {
    return this.httpClient.request<ReportCreatePostingsRequest, ReportCreateResponse>("POST", "/v1/report/postings/create", request, options);
  }

  /**
   * Отчёт по товарам
   * Create products report
   *
   * Метод для получения отчёта с данными о товарах. Например, Ozon ID,
   * количества товаров, цен, статуса. Соответствует разделу/действию
   * "Товары и цены → Список товаров → Скачать → Товары CSV".
   *
   * @param request - Параметры запроса создания отчёта по товарам
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного отчёта
   *
   * @example
   * ```typescript
   * const productsReport = await reportApi.createProductsReport({
   *   sku: [123456789, 987654321],
   *   visibility: 'VISIBLE',
   *   language: 'RU'
   * });
   *
   * console.log(`Отчёт по товарам создан: ${productsReport.result?.code}`);
   * ```
   */
  async createProductsReport(request: ReportCreateProductsRequest, options?: RequestOptions): Promise<ReportCreateResponse> {
    return this.httpClient.request<ReportCreateProductsRequest, ReportCreateResponse>("POST", "/v1/report/products/create", request, options);
  }

  /**
   * Отчёт об остатках на FBS-складе
   * Create FBS warehouse stock report
   *
   * Отчёт с информацией о количестве доступных и зарезервированных единиц товара на складе.
   * Соответствует разделу "FBS → Управление логистикой → Управление остатками → Скачать в XLS".
   * В результате запроса будет не сам отчёт, а его уникальный идентификатор.
   *
   * @param request - Параметры запроса создания отчёта об остатках
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного отчёта
   *
   * @example
   * ```typescript
   * const stockReport = await reportApi.createStockByWarehouseReport({
   *   warehouseId: ['12345', '67890'],
   *   language: 'RU'
   * });
   *
   * console.log(`Отчёт об остатках создан: ${stockReport.result?.code}`);
   * ```
   */
  async createStockByWarehouseReport(request: ReportCreateStockByWarehouseRequest, options?: RequestOptions): Promise<ReportCreateResponse> {
    return this.httpClient.request<ReportCreateStockByWarehouseRequest, ReportCreateResponse>("POST", "/v1/report/warehouse/stock", request, options);
  }

  /**
   * Отчёт о возвратах
   * Create returns report
   *
   * Метод для получения отчёта о возвратах FBO и FBS.
   *
   * @param request - Параметры запроса создания отчёта о возвратах
   * @param options - Дополнительные опции запроса
   * @returns Идентификатор созданного отчёта
   *
   * @example
   * ```typescript
   * const returnsReport = await reportApi.createReturnsReport({
   *   date_from: '2024-01-01',
   *   date_to: '2024-01-31',
   *   language: 'RU'
   * });
   *
   * console.log(`Отчёт о возвратах создан: ${returnsReport.code}`);
   * ```
   */
  async createReturnsReport(request: ReportCreateReturnsRequest, options?: RequestOptions): Promise<ReportCreateReturnsResponse> {
    return this.httpClient.request<ReportCreateReturnsRequest, ReportCreateReturnsResponse>("POST", "/v2/report/returns/create", request, options);
  }
}
