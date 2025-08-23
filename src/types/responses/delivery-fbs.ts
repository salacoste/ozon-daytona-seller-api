/**
 * Response types for DeliveryFBS API
 * Generated from OZON API documentation
 * DeliveryFBS - FBS delivery management and tracking
 */

/**
 * Ответ подтверждения отгрузки
 * Response for carriage approval
 */
export interface DeliveryFbsCarriageApproveResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ удаления отгрузки
 * Response for carriage cancellation
 */
export interface DeliveryFbsCarriageCancelResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о созданной отгрузке
 * Created carriage information
 */
export interface DeliveryFbsCarriageInfo {
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Статус отгрузки
   * Carriage status
   */
  status?: string;
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
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
 * Ответ создания отгрузки
 * Response for carriage creation
 */
export interface DeliveryFbsCarriageCreateResponse {
  /** 
   * Информация о созданной отгрузке
   * Created carriage information
   */
  result?: DeliveryFbsCarriageInfo;
  
  readonly [key: string]: unknown;
}

/**
 * Информация о методе доставки
 * Delivery method information
 */
export interface DeliveryFbsDeliveryMethod {
  /** 
   * Идентификатор метода доставки
   * Delivery method ID
   */
  id?: number;
  
  /** 
   * Название метода доставки
   * Delivery method name
   */
  name?: string;
  
  /** 
   * Тип доставки
   * Delivery type
   */
  type?: string;
  
  /** 
   * Доступность метода
   * Method availability
   */
  is_available?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка методов доставки и отгрузок
 * Response for delivery methods and carriages list
 */
export interface DeliveryFbsCarriageDeliveryListResponse {
  /** 
   * Список методов доставки с отгрузками
   * List of delivery methods with carriages
   */
  result?: Array<{
    /** Метод доставки */
    delivery_method?: DeliveryFbsDeliveryMethod;
    /** Отгрузки для метода */
    carriages?: DeliveryFbsCarriageInfo[];
  }>;
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ информации о перевозке
 * Response for carriage information
 */
export interface DeliveryFbsCarriageGetResponse {
  /** 
   * Информация о перевозке
   * Carriage information
   */
  result?: DeliveryFbsCarriageInfo;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ изменения состава отгрузки
 * Response for carriage postings modification
 */
export interface DeliveryFbsSetPostingsResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Доступная перевозка
 * Available carriage
 */
export interface DeliveryFbsAvailableCarriage {
  /** 
   * Идентификатор перевозки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Статус перевозки
   * Carriage status
   */
  status?: string;
  
  /** 
   * Количество отправлений
   * Number of postings
   */
  postings_count?: number;
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка доступных перевозок
 * Response for available carriages list
 */
export interface DeliveryFbsCarriageAvailableListResponse {
  /** 
   * Список доступных перевозок
   * List of available carriages
   */
  result?: DeliveryFbsAvailableCarriage[];
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ разделения заказа на отправления
 * Response for posting split
 */
export interface DeliveryFbsPostingSplitResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: boolean;
  
  /** 
   * Созданные отправления
   * Created postings
   */
  created_postings?: string[];
  
  readonly [key: string]: unknown;
}

/**
 * Статус документа
 * Document status
 */
export interface DeliveryFbsDocumentStatus {
  /** 
   * Тип документа
   * Document type
   */
  type?: string;
  
  /** 
   * Статус формирования
   * Formation status
   */
  status?: 'pending' | 'processing' | 'ready' | 'error';
  
  /** 
   * Ссылка на документ (если готов)
   * Document URL (if ready)
   */
  url?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса отгрузки и документов
 * Response for shipment and documents status
 */
export interface DeliveryFbsActCheckStatusResponse {
  /** 
   * Статус отгрузки
   * Shipment status
   */
  carriage_status?: string;
  
  /** 
   * Статусы документов
   * Documents statuses
   */
  documents?: DeliveryFbsDocumentStatus[];
  
  /** 
   * Статус штрихкода
   * Barcode status
   */
  barcode_status?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ подтверждения отгрузки и создания документов
 * Response for shipment confirmation and document creation
 */
export interface DeliveryFbsActCreateResponse {
  /** 
   * Результат операции
   * Operation result
   */
  result?: boolean;
  
  /** 
   * Идентификатор созданного акта
   * Created act ID
   */
  act_id?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ штрихкода для отгрузки
 * Response for shipment barcode
 */
export interface DeliveryFbsGetBarcodeResponse {
  /** 
   * Изображение штрихкода в base64
   * Barcode image in base64
   */
  barcode?: string;
  
  /** 
   * Тип изображения
   * Image type
   */
  content_type?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ значения штрихкода в текстовом виде
 * Response for barcode text value
 */
export interface DeliveryFbsGetBarcodeTextResponse {
  /** 
   * Значение штрихкода
   * Barcode value
   */
  barcode_text?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ этикеток для грузового места
 * Response for container labels
 */
export interface DeliveryFbsGetContainerLabelsResponse {
  /** 
   * PDF файл с этикетками в base64
   * PDF file with labels in base64
   */
  content?: string;
  
  /** 
   * Тип содержимого
   * Content type
   */
  content_type?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ PDF с документами
 * Response for PDF documents
 */
export interface DeliveryFbsGetActResponse {
  /** 
   * PDF файл с документами в base64
   * PDF file with documents in base64
   */
  content?: string;
  
  /** 
   * Тип содержимого
   * Content type
   */
  content_type?: string;
  
  /** 
   * Название файла
   * File name
   */
  filename?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Отправление в акте
 * Posting in act
 */
export interface DeliveryFbsActPosting {
  /** 
   * Номер отправления
   * Posting number
   */
  posting_number?: string;
  
  /** 
   * Статус отправления
   * Posting status
   */
  status?: string;
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка отправлений в акте
 * Response for postings list in act
 */
export interface DeliveryFbsActGetPostingsResponse {
  /** 
   * Список отправлений
   * List of postings
   */
  result?: DeliveryFbsActPosting[];
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Акт отгрузки
 * Shipment act
 */
export interface DeliveryFbsAct {
  /** 
   * Идентификатор акта
   * Act ID
   */
  act_id?: number;
  
  /** 
   * Идентификатор отгрузки
   * Carriage ID
   */
  carriage_id?: number;
  
  /** 
   * Статус акта
   * Act status
   */
  status?: string;
  
  /** 
   * Дата создания
   * Creation date
   */
  created_at?: string;
  
  /** 
   * Тип интеграции
   * Integration type
   */
  integration_type?: string;
  
  /** 
   * Количество отправлений
   * Number of postings
   */
  postings_count?: number;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ списка актов по отгрузкам
 * Response for acts list by shipments
 */
export interface DeliveryFbsActListResponse {
  /** 
   * Список актов
   * List of acts
   */
  result?: DeliveryFbsAct[];
  
  /** 
   * Есть следующая страница
   * Has next page
   */
  has_next?: boolean;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ статуса формирования накладной
 * Response for waybill formation status
 */
export interface DeliveryFbsDigitalActCheckStatusResponse {
  /** 
   * Статус формирования
   * Formation status
   */
  status?: 'PROCESSING' | 'FORMED' | 'CONFIRMED' | 'CONFIRMED_WITH_MISMATCH' | 'ERROR';
  
  /** 
   * Сообщение об ошибке (если есть)
   * Error message (if any)
   */
  error_message?: string;
  
  readonly [key: string]: unknown;
}

/**
 * Ответ получения листа отгрузки по перевозке
 * Response for shipment list by carriage
 */
export interface DeliveryFbsGetDigitalActResponse {
  /** 
   * PDF файл с листом отгрузки в base64
   * PDF file with shipment list in base64
   */
  content?: string;
  
  /** 
   * Тип содержимого
   * Content type
   */
  content_type?: string;
  
  /** 
   * Название файла
   * File name
   */
  filename?: string;
  
  readonly [key: string]: unknown;
}