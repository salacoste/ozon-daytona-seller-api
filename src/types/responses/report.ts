/**
 * Response types for ReportAPI
 * Business reporting and analytics generation
 * Ready for manual editing and enhancements
 */

/**
 * Элемент финансового отчёта
 * Financial report item
 */
export interface ReportFinanceItem {
  /**
   * Название операции
   * Operation name
   */
  operation_type?: string;

  /**
   * Дата операции
   * Operation date
   */
  operation_date?: string;

  /**
   * Сумма операции
   * Operation amount
   */
  amount?: number;

  /**
   * Валюта
   * Currency
   */
  currency?: string;

  /**
   * Детали операции
   * Operation details
   */
  details?: Record<string, unknown>;

  readonly [key: string]: unknown;
}

/**
 * Результат финансового отчёта
 * Financial report result
 */
export interface ReportFinanceCashFlowResult {
  /**
   * Список операций
   * Operations list
   */
  operations?: ReportFinanceItem[];

  /**
   * Общее количество операций
   * Total operations count
   */
  total_count?: number;

  /**
   * Итоговая сумма
   * Total amount
   */
  total_amount?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ финансового отчёта
 * Financial report response
 */
export interface ReportFinanceCashFlowStatementListResponse {
  /**
   * Результат отчёта
   * Report result
   */
  result?: ReportFinanceCashFlowResult;

  readonly [key: string]: unknown;
}

/**
 * Ответ создания отчёта об уценённых товарах
 * Response for creating discounted products report
 */
export interface ReportCreateDiscountedResponse {
  /**
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;

  readonly [key: string]: unknown;
}

/**
 * Статус отчёта
 * Report status
 */
export type ReportStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

/**
 * Информация об отчёте
 * Report information
 */
export interface ReportInfo {
  /**
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;

  /**
   * Статус отчёта
   * Report status
   */
  status?: ReportStatus;

  /**
   * Дата создания отчёта
   * Report creation date
   */
  created_at?: string;

  /**
   * Дата обновления отчёта
   * Report update date
   */
  updated_at?: string;

  /**
   * Ссылка на скачивание отчёта
   * Report download link
   */
  download_url?: string;

  /**
   * Размер файла отчёта в байтах
   * Report file size in bytes
   */
  file_size?: number;

  /**
   * Тип отчёта
   * Report type
   */
  report_type?: string;

  /**
   * Сообщение об ошибке (если есть)
   * Error message (if any)
   */
  error_message?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ информации об отчёте
 * Response for report information
 */
export interface ReportInfoResponse {
  /**
   * Информация об отчёте
   * Report information
   */
  result?: ReportInfo;

  readonly [key: string]: unknown;
}

/**
 * Элемент списка отчётов
 * Report list item
 */
export interface ReportListItem {
  /**
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;

  /**
   * Статус отчёта
   * Report status
   */
  status?: ReportStatus;

  /**
   * Дата создания отчёта
   * Report creation date
   */
  created_at?: string;

  /**
   * Тип отчёта
   * Report type
   */
  report_type?: string;

  /**
   * Размер файла отчёта в байтах
   * Report file size in bytes
   */
  file_size?: number;

  readonly [key: string]: unknown;
}

/**
 * Результат списка отчётов
 * Report list result
 */
export interface ReportListResult {
  /**
   * Список отчётов
   * Reports list
   */
  reports?: ReportListItem[];

  /**
   * Общее количество отчётов
   * Total reports count
   */
  total_count?: number;

  /**
   * Номер текущей страницы
   * Current page number
   */
  page?: number;

  /**
   * Количество элементов на странице
   * Number of elements per page
   */
  page_size?: number;

  readonly [key: string]: unknown;
}

/**
 * Ответ списка отчётов
 * Response for report list
 */
export interface ReportListResponse {
  /**
   * Результат списка отчётов
   * Report list result
   */
  result?: ReportListResult;

  readonly [key: string]: unknown;
}

/**
 * Код создания отчёта
 * Report creation code
 */
export interface ReportCreateCode {
  /**
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;

  readonly [key: string]: unknown;
}

/**
 * Ответ создания отчёта
 * Response for report creation
 */
export interface ReportCreateResponse {
  /**
   * Код отчёта
   * Report code
   */
  result?: ReportCreateCode;

  readonly [key: string]: unknown;
}

/**
 * Ответ создания отчёта о возвратах
 * Response for creating returns report
 */
export interface ReportCreateReturnsResponse {
  /**
   * Уникальный идентификатор отчёта
   * Unique report identifier
   */
  code?: string;

  readonly [key: string]: unknown;
}
