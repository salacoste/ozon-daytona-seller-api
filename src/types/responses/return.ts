/**
 * ReturnAPI response types
 * Generated from OZON API documentation
 */

import type { BaseResponse } from '../../core/types.js';
import type { 
  GiveoutId, 
  GiveoutStatus, 
  BasicProductInfo, 
  DateString, 
  CurrencyCode, 
  PaginationResponse 
} from '../common/base.js';

/**
 * Ответ на запрос штрихкода
 */
export interface GiveoutGetBarcodeResponse extends BaseResponse {
  /** Значение штрихкода */
  barcode?: string;
}

/**
 * Ответ на сброс штрихкода
 */
export interface GiveoutBarcodeResetResponse extends BaseResponse {
  /** Base64 изображение PNG с новым штрихкодом */
  barcode_png?: string;
}

/**
 * Ответ на запрос PDF штрихкода
 */
export interface GiveoutGetPDFResponse extends BaseResponse {
  /** Base64 PDF файл со штрихкодом */
  barcode_pdf?: string;
}

/**
 * Ответ на запрос PNG штрихкода
 */
export interface GiveoutGetPNGResponse extends BaseResponse {
  /** Base64 изображение PNG со штрихкодом */
  barcode_png?: string;
}

/**
 * Товар в возвратной отгрузке
 */
export interface GiveoutInfoResponseItem extends BasicProductInfo {
  /** Количество товаров в возврате */
  quantity?: number;
}

/**
 * Ответ на запрос информации о возвратной отгрузке
 */
export interface GiveoutInfoResponse extends BaseResponse {
  /** Идентификатор возвратной отгрузки */
  giveout_id?: GiveoutId;
  /** Статус возвратной отгрузки */
  status?: GiveoutStatus;
  /** Дата создания */
  created_at?: DateString;
  /** Дата обновления */
  updated_at?: DateString;
  /** Товары в возвратной отгрузке */
  items?: GiveoutInfoResponseItem[];
}

/**
 * Ответ на проверку доступности возвратных отгрузок
 */
export interface GiveoutIsEnabledResponse extends BaseResponse {
  /** Доступность функции возвратных отгрузок */
  enabled?: boolean;
}

/**
 * Элемент списка возвратных отгрузок
 */
export interface GiveoutListResponseItem {
  /** Идентификатор возвратной отгрузки */
  giveout_id?: GiveoutId;
  /** Статус возвратной отгрузки */
  status?: GiveoutStatus;
  /** Дата создания */
  created_at?: DateString;
  /** Количество товаров в отгрузке */
  items_count?: number;
}

/**
 * Ответ на запрос списка возвратных отгрузок
 */
export interface GiveoutListResponse extends BaseResponse, PaginationResponse {
  /** Список возвратных отгрузок */
  giveouts?: GiveoutListResponseItem[];
}

/**
 * Информация о возвратах FBS
 */
export interface ReturnsCompanyFbsInfoResponseItem {
  /** Дата */
  date?: DateString;
  /** Количество возвратов */
  count?: number;
  /** Общая сумма возвратов */
  amount?: string;
  /** Валюта */
  currency_code?: CurrencyCode;
}

/**
 * Ответ на запрос информации о возвратах FBS
 */
export interface ReturnsCompanyFbsInfoResponse extends BaseResponse {
  /** Информация о возвратах FBS по дням */
  returns_info?: ReturnsCompanyFbsInfoResponseItem[];
}