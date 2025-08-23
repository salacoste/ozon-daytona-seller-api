/**
 * Finance API implementation  
 * Manually implemented for comprehensive financial reporting
 */

import { HttpClient } from '../../core/http.js';
import type { RequestOptions } from '../../core/types.js';
import type {
  GetCompensationReportRequest,
  GetDecompensationReportRequest,
  CreateDocumentB2BSalesReportRequest,
  CreateDocumentB2BSalesJSONReportRequest,
  CreateMutualSettlementReportRequest,
  GetFinanceProductsBuyoutRequest,
  GetRealizationReportPostingRequest,
  GetRealizationReportV2Request,
  FinanceTransactionListV3Request,
  FinanceTransactionTotalsV3Request
} from '../../types/requests/finance.js';
import type {
  CreateReportResponse,
  CommonCreateReportResponse,
  CreateDocumentB2BSalesJSONReportResponse,
  GetFinanceProductsBuyoutResponse,
  GetRealizationReportPostingResponse,
  GetRealizationReportV2Response,
  FinanceTransactionListV3Response,
  FinanceTransactionTotalsV3Response
} from '../../types/responses/finance.js';

/**
 * Finance API для работы с финансовыми отчётами и транзакциями
 * Finance API for working with financial reports and transactions
 * 
 * @example
 * ```typescript
 * // Создать отчёт о компенсациях
 * const compensationReport = await financeApi.createCompensationReport({
 *   date: '2024-01',
 *   language: 'RU'
 * });
 * 
 * // Получить список транзакций
 * const transactions = await financeApi.getTransactionList({
 *   page: 1,
 *   page_size: 100,
 *   filter: {
 *     date: {
 *       from: '2024-01-01',
 *       to: '2024-01-31'
 *     }
 *   }
 * });
 * ```
 */
export class FinanceApi {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Отчёт о компенсациях
   * Compensation report
   * 
   * Создаёт отчёт о компенсациях для указанного периода. 
   * Отчёт содержит информацию о компенсациях, выплаченных продавцу.
   * 
   * @param request - Параметры запроса отчёта о компенсациях
   * @param options - Дополнительные опции запроса
   * @returns Статус создания отчёта
   * 
   * @example
   * ```typescript
   * const report = await financeApi.createCompensationReport({
   *   date: '2024-01',
   *   language: 'RU'
   * });
   * 
   * if (report.result?.code === 'SUCCESS') {
   *   console.log('Отчёт создан успешно');
   * }
   * ```
   */
  async createCompensationReport(
    request: GetCompensationReportRequest,
    options?: RequestOptions
  ): Promise<CreateReportResponse> {
    return this.httpClient.request<GetCompensationReportRequest, CreateReportResponse>(
      'POST',
      '/v1/finance/compensation',
      request,
      options
    );
  }

  /**
   * Отчёт о декомпенсациях
   * Decompensation report
   * 
   * Создаёт отчёт о декомпенсациях (возврат компенсаций) для указанного периода.
   * 
   * @param request - Параметры запроса отчёта о декомпенсациях
   * @param options - Дополнительные опции запроса
   * @returns Статус создания отчёта
   */
  async createDecompensationReport(
    request: GetDecompensationReportRequest,
    options?: RequestOptions
  ): Promise<CreateReportResponse> {
    return this.httpClient.request<GetDecompensationReportRequest, CreateReportResponse>(
      'POST',
      '/v1/finance/decompensation',
      request,
      options
    );
  }

  /**
   * Реестр продаж юридическим лицам
   * B2B sales document report
   * 
   * Создаёт отчёт с информацией о продажах юридическим лицам.
   * 
   * @param request - Параметры запроса реестра продаж B2B
   * @param options - Дополнительные опции запроса
   * @returns Результат создания отчёта с URL для скачивания
   */
  async createDocumentB2BSalesReport(
    request: CreateDocumentB2BSalesReportRequest,
    options?: RequestOptions
  ): Promise<CommonCreateReportResponse> {
    return this.httpClient.request<CreateDocumentB2BSalesReportRequest, CommonCreateReportResponse>(
      'POST',
      '/v1/finance/document-b2b-sales',
      request,
      options
    );
  }

  /**
   * Реестр продаж юридическим лицам в JSON
   * B2B sales JSON document report
   * 
   * Создаёт отчёт о продажах юридическим лицам в формате JSON.
   * 
   * @param request - Параметры запроса реестра продаж B2B в JSON
   * @param options - Дополнительные опции запроса
   * @returns Данные о счетах и общей сумме
   */
  async createDocumentB2BSalesJSONReport(
    request: CreateDocumentB2BSalesJSONReportRequest,
    options?: RequestOptions
  ): Promise<CreateDocumentB2BSalesJSONReportResponse> {
    return this.httpClient.request<CreateDocumentB2BSalesJSONReportRequest, CreateDocumentB2BSalesJSONReportResponse>(
      'POST',
      '/v1/finance/document-b2b-sales/json',
      request,
      options
    );
  }

  /**
   * Отчёт о взаиморасчётах
   * Mutual settlement report
   * 
   * Создаёт отчёт о взаиморасчётах между продавцом и Ozon.
   * 
   * @param request - Параметры запроса отчёта о взаиморасчётах
   * @param options - Дополнительные опции запроса
   * @returns Результат создания отчёта с URL для скачивания
   */
  async createMutualSettlementReport(
    request: CreateMutualSettlementReportRequest,
    options?: RequestOptions
  ): Promise<CommonCreateReportResponse> {
    return this.httpClient.request<CreateMutualSettlementReportRequest, CommonCreateReportResponse>(
      'POST',
      '/v1/finance/mutual-settlement',
      request,
      options
    );
  }

  /**
   * Отчёт о выкупленных товарах
   * Product buyout report
   * 
   * Получает отчёт о товарах, которые были выкуплены Ozon у продавца
   * за указанный период (максимум 31 день).
   * 
   * @param request - Параметры запроса с датами периода
   * @param options - Дополнительные опции запроса
   * @returns Список выкупленных товаров с суммами
   */
  async getProductsBuyout(
    request: GetFinanceProductsBuyoutRequest,
    options?: RequestOptions
  ): Promise<GetFinanceProductsBuyoutResponse> {
    return this.httpClient.request<GetFinanceProductsBuyoutRequest, GetFinanceProductsBuyoutResponse>(
      'POST',
      '/v1/finance/products/buyout',
      request,
      options
    );
  }

  /**
   * Отчёт о реализации товаров (позаказный)
   * Realization report by posting
   * 
   * Получает отчёт о реализации товаров с группировкой по отправлениям.
   * 
   * @param request - Параметры запроса с периодом дат
   * @param options - Дополнительные опции запроса
   * @returns Отчёт по реализации с детализацией по SKU
   */
  async getRealizationReportPosting(
    request: GetRealizationReportPostingRequest,
    options?: RequestOptions
  ): Promise<GetRealizationReportPostingResponse> {
    return this.httpClient.request<GetRealizationReportPostingRequest, GetRealizationReportPostingResponse>(
      'POST',
      '/v1/finance/realization/posting',
      request,
      options
    );
  }

  /**
   * Отчёт о реализации товаров v2
   * Realization report v2
   * 
   * Получает отчёт о реализации товаров за указанный месяц.
   * Версия 2 API с улучшенным форматом данных.
   * 
   * @param request - Параметры запроса с месяцем и языком
   * @param options - Дополнительные опции запроса
   * @returns Отчёт по реализации с заголовками и данными
   */
  async getRealizationReportV2(
    request: GetRealizationReportV2Request,
    options?: RequestOptions
  ): Promise<GetRealizationReportV2Response> {
    return this.httpClient.request<GetRealizationReportV2Request, GetRealizationReportV2Response>(
      'POST',
      '/v2/finance/realization',
      request,
      options
    );
  }

  /**
   * Список транзакций v3
   * Transaction list v3
   * 
   * Получает список финансовых транзакций с фильтрацией и пагинацией.
   * Версия 3 API с расширенными возможностями фильтрации.
   * 
   * @param request - Параметры запроса с фильтрами и пагинацией
   * @param options - Дополнительные опции запроса
   * @returns Список транзакций с пагинацией
   */
  async getTransactionList(
    request: FinanceTransactionListV3Request,
    options?: RequestOptions
  ): Promise<FinanceTransactionListV3Response> {
    return this.httpClient.request<FinanceTransactionListV3Request, FinanceTransactionListV3Response>(
      'POST',
      '/v3/finance/transaction/list',
      request,
      options
    );
  }

  /**
   * Итоги по транзакциям v3
   * Transaction totals v3
   * 
   * Получает агрегированные данные по транзакциям за период или отправление.
   * Позволяет получить общую сумму и количество операций.
   * 
   * @param request - Параметры запроса с периодом или номером отправления
   * @param options - Дополнительные опции запроса
   * @returns Итоговые суммы и количество операций
   */
  async getTransactionTotals(
    request: FinanceTransactionTotalsV3Request,
    options?: RequestOptions
  ): Promise<FinanceTransactionTotalsV3Response> {
    return this.httpClient.request<FinanceTransactionTotalsV3Request, FinanceTransactionTotalsV3Response>(
      'POST',
      '/v3/finance/transaction/totals',
      request,
      options
    );
  }
}