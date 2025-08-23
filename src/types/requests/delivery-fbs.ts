/**
 * Request types for DeliveryFBS API
 * Generated from OZON API documentation
 * DeliveryFBS - FBS delivery management and tracking
 */

/**
 * Запрос подтверждения отгрузки
 * Request for carriage approval
 */
export interface DeliveryFbsCarriageApproveRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос удаления отгрузки
 * Request for carriage cancellation
 */
export interface DeliveryFbsCarriageCancelRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос создания отгрузки
 * Request for carriage creation
 */
export interface DeliveryFbsCarriageCreateRequest {
  /** 
   * Идентификатор метода доставки
   * Delivery method ID
   */
  delivery_method_id?: number;
  
  /** 
   * Время начала интервала отгрузки
   * Carriage interval start time
   */
  first_mile_from_time?: string;
  
  /** 
   * Время окончания интервала отгрузки
   * Carriage interval end time
   */
  first_mile_to_time?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка методов доставки и отгрузок
 * Request for delivery methods and carriages list
 */
export interface DeliveryFbsCarriageDeliveryListRequest {
  /** 
   * Фильтр по статусу отгрузки
   * Carriage status filter
   */
  status?: string;
  
  /** 
   * Лимит записей в ответе
   * Records limit in response
   */
  limit?: number;
  
  /** 
   * Смещение для пагинации
   * Pagination offset
   */
  offset?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос информации о перевозке
 * Request for carriage information
 */
export interface DeliveryFbsCarriageGetRequest {
  /** 
   * Идентификатор перевозки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос изменения состава отгрузки
 * Request for carriage postings modification
 */
export interface DeliveryFbsSetPostingsRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Список номеров отправлений
   * List of posting numbers
   */
  posting_number?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка доступных перевозок
 * Request for available carriages list
 */
export interface DeliveryFbsCarriageAvailableListRequest {
  /** 
   * Лимит записей в ответе
   * Records limit in response
   */
  limit?: number;
  
  /** 
   * Смещение для пагинации
   * Pagination offset
   */
  offset?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос разделения заказа на отправления
 * Request for posting split
 */
export interface DeliveryFbsPostingSplitRequest {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса отгрузки и документов
 * Request for shipment and documents status
 */
export interface DeliveryFbsActCheckStatusRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос подтверждения отгрузки и создания документов
 * Request for shipment confirmation and document creation
 */
export interface DeliveryFbsActCreateRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Номера отправлений для включения в акт
   * Posting numbers to include in the act
   */
  posting_number?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос штрихкода для отгрузки
 * Request for shipment barcode
 */
export interface DeliveryFbsGetBarcodeRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос этикеток для грузового места
 * Request for container labels
 */
export interface DeliveryFbsGetContainerLabelsRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Номера контейнеров
   * Container numbers
   */
  container_numbers?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Запрос PDF с документами
 * Request for PDF documents
 */
export interface DeliveryFbsGetActRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Тип документа
   * Document type
   */
  doc_type?: 'act' | 'waybill' | 'shipment_list';
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка отправлений в акте
 * Request for postings list in act
 */
export interface DeliveryFbsActGetPostingsRequest {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Лимит записей в ответе
   * Records limit in response
   */
  limit?: number;
  
  /** 
   * Смещение для пагинации
   * Pagination offset
   */
  offset?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос списка актов по отгрузкам
 * Request for acts list by shipments
 */
export interface DeliveryFbsActListRequest {
  /** 
   * Фильтр по периоду
   * Period filter
   */
  filter?: {
    /** Дата начала периода */
    since?: string;
    /** Дата окончания периода */
    to?: string;
    /** Статус отгрузки */
    status?: string;
    /** Тип интеграции */
    integration_type?: string;
  };
  
  /** 
   * Лимит записей в ответе
   * Records limit in response
   */
  limit?: number;
  
  /** 
   * Смещение для пагинации
   * Pagination offset
   */
  offset?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос статуса формирования накладной
 * Request for waybill formation status
 */
export interface DeliveryFbsDigitalActCheckStatusRequest {
  /** 
   * Идентификатор перевозки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Запрос получения листа отгрузки по перевозке
 * Request for shipment list by carriage
 */
export interface DeliveryFbsGetDigitalActRequest {
  /** 
   * Идентификатор перевозки
   * Carriage ID
   */
  carriage_id?: number;
  
  readonly [key: string]: unknown;
}