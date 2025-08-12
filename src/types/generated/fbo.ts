/**
 * Generated types for FBO (FBO)
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: 06-fbo.json
 * Endpoints: 13
 * Schemas: 69
 */

/**
 * Фильтр для поиска отправлений.
 */
export interface IPostingGetFboPostingListRequestFilter {
  /** Начало периода в формате YYYY-MM-DD. */
  readonly since: string;
  /** Статус отправления. - `awaiting_packaging` — ожидает упаковки, - `awaiting_deliver` — ожидает отгрузки, - `delivering` — доставляется, - `delivered` — доставлено, - `cancelled` — отменено. */
  readonly status?: string;
  /** Конец периода в формате YYYY-MM-DD. */
  readonly to: string;
}

/**
 * Дополнительные поля, которые нужно добавить в ответ.
 */
export interface IPostingFboPostingWithParams {
  /** Передайте `true`, чтобы добавить в ответ данные аналитики. */
  readonly analytics_data?: boolean;
  /** Передайте `true`, чтобы добавить в ответ финансовые данные. */
  readonly financial_data?: boolean;
  /** Передайте `true`, чтобы добавить в ответ юридическую информацию. */
  readonly legal_info?: boolean;
}

export interface IPostingGetFboPostingListRequest {
  /** Направление сортировки:   - `asc` — по возрастанию,   - `desc` — по убыванию. */
  readonly dir?: string;
  readonly filter: IPostingGetFboPostingListRequestFilter;
  /** Количество значений в ответе:   - максимум — 1000,   - минимум — 1. */
  readonly limit: number;
  /** Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента. Максимальное значение — 20000. */
  readonly offset?: number;
  /** Если включена транслитерация адреса из кириллицы в латиницу — `true`. */
  readonly translit?: boolean;
  readonly with?: IPostingFboPostingWithParams;
}

/**
 * Дополнительная информация.
 */
export interface IV2AdditionalDataItem {
  readonly key?: string;
  readonly value?: string;
}

/**
 * Данные аналитики.
 */
export interface IFboPostingFboPostingAnalyticsData {
  /** Город доставки. Только для продавцов из СНГ. */
  readonly city?: string;
  /** Способ доставки. */
  readonly delivery_type?: string;
  /** Получатель юридическое лицо:   - `true` — юридическое лицо,   - `false` — физическое лицо. */
  readonly is_legal?: boolean;
  /** Наличие подписки Premium. */
  readonly is_premium?: boolean;
  /** Способ оплаты:  - `картой онлайн`, - `Ozon Карта`, - `автосписание с Ozon Карты при выдаче`, - `сохранённой картой при получении`, - `Система Быстрых Платежей`,  - `Ozon Рассрочка`,  - `оплата на расчётный счёт`, - `SberPay`. */
  readonly payment_type_group_name?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
  /** Название склада отправки заказа. */
  readonly warehouse_name?: string;
}

export interface IPostingFinancialDataProduct {
  /** Список акций. */
  readonly actions?: string[];
  /** Валюта ваших цен. Cовпадает с валютой, которая установлена в настройках личного кабинета.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Размер комиссии за товар. */
  readonly commission_amount?: number;
  /** Процент комиссии. */
  readonly commission_percent?: number;
  /** Код валюты, в которой рассчитывались комиссии. */
  readonly commissions_currency_code?: string;
  /** Цена до учёта скидок. На карточке товара отображается зачёркнутой. */
  readonly old_price?: number;
  /** Выплата продавцу. */
  readonly payout?: number;
  /** Цена товара с учётом скидок — это значение показывается на карточке товара. */
  readonly price?: number;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Количество товара в отправлении. */
  readonly quantity?: number;
  /** Процент скидки. */
  readonly total_discount_percent?: number;
  /** Сумма скидки. */
  readonly total_discount_value?: number;
}

/**
 * Финансовые данные.
 */
export interface IV2PostingFinancialData {
  /** Код региона, откуда отправляется заказ. */
  readonly cluster_from?: string;
  /** Код региона, куда доставляется заказ. */
  readonly cluster_to?: string;
  /** Список товаров в заказе. */
  readonly products?: IPostingFinancialDataProduct[];
}

/**
 * Юридическая информация о покупателе.
 */
export interface IV2FboSinglePostingLegalInfo {
  /** Название компании. */
  readonly company_name?: string;
  /** ИНН. */
  readonly inn?: string;
  /** КПП. */
  readonly kpp?: string;
}

export interface IV2PostingProduct {
  /** Коды активации для услуг и цифровых товаров. */
  readonly digital_codes?: unknown;
  /** Название товара. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Валюта ваших цен. Cовпадает с валютой, которая установлена в настройках личного кабинета.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Цена товара. */
  readonly price?: string;
  /** Признак выкупа товара. */
  readonly is_marketplace_buyout?: boolean;
  /** Количество товара в отправлении. */
  readonly quantity?: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
}

/**
 * Результат запроса.
 */
export interface IV2FboPosting {
  readonly additional_data?: IV2AdditionalDataItem[];
  readonly analytics_data?: IFboPostingFboPostingAnalyticsData;
  /** Идентификатор причины отмены отправления. */
  readonly cancel_reason_id?: number;
  /** Дата и время создания отправления. */
  readonly created_at?: string;
  readonly financial_data?: IV2PostingFinancialData;
  /** Дата и время начала обработки отправления. */
  readonly in_process_at?: string;
  readonly legal_info?: IV2FboSinglePostingLegalInfo;
  /** Идентификатор заказа, к которому относится отправление. */
  readonly order_id?: number;
  /** Номер заказа, к которому относится отправление. */
  readonly order_number?: string;
  /** Номер отправления. */
  readonly posting_number?: string;
  /** Список товаров в отправлении. */
  readonly products?: IV2PostingProduct[];
  /** Статус отправления:   - `awaiting_packaging` — ожидает упаковки,   - `awaiting_deliver` — ожидает отгрузки,   - `delivering` — доставляется,   - `delivered` — доставлено,   - `cancelled` — отменено. */
  readonly status?: string;
}

export interface IV2FboPostingListResponse {
  /** Массив отправлений. */
  readonly result?: IV2FboPosting[];
}

export interface IProtobufAny {
  /** Тип протокола передачи данных. */
  readonly typeUrl?: string;
  /** Значение ошибки. */
  readonly value?: string;
}

export interface IRpcStatus {
  /** Код ошибки. */
  readonly code?: number;
  /** Дополнительная информация об ошибке. */
  readonly details?: IProtobufAny[];
  /** Описание ошибки. */
  readonly message?: string;
}

export interface IPostingGetFboPostingRequest {
  /** Номер отправления. */
  readonly posting_number: string;
  /** Если включена транслитерация адреса из кириллицы в латиницу — `true`. */
  readonly translit?: boolean;
  readonly with?: IPostingFboPostingWithParams;
}

export interface IV2FboPostingResponse {
  readonly result?: IV2FboPosting;
}

export interface ICancelReasonListResponseCancelReason {
  /** Идентификатор причины отмены. */
  readonly id?: number;
  /** Результат отмены отправления. `true`, если запрос доступен для отмены. */
  readonly is_available_for_cancellation?: boolean;
  /** Название категории. */
  readonly title?: string;
  /** Инициатор отмены отправления: - `buyer` — покупатель, - `seller` — продавец. */
  readonly type_id?: string;
}

export interface IV1CancelReasonListResponse {
  /** Результат работы метода. */
  readonly result?: ICancelReasonListResponseCancelReason[];
}

export type ICommonEmpty = Record<string, unknown>;

/**
 * Статус поставки:
 * - `UNSPECIFIED` — статус не указан;
 * - `DATA_FILLING` — заполнение данных;
 * - `READY_TO_SUPPLY` — готова к отгрузке;
 * - `ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки;
 * - `IN_TRANSIT` — в пути;
 * - `ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе;
 * - `REPORTS_CONFIRMATION_AWAITING` — согласование актов;
 * - `REPORT_REJECTED` — спор;
 * - `COMPLETED` — завершена;
 * - `REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке;
 * - `CANCELLED` — отменена.
 * 
 */
export type IV1OrderState = 'ORDER_STATE_UNSPECIFIED' | 'ORDER_STATE_DATA_FILLING' | 'ORDER_STATE_READY_TO_SUPPLY' | 'ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_IN_TRANSIT' | 'ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'ORDER_STATE_REPORTS_CONFIRMATION_AWAITING' | 'ORDER_STATE_REPORT_REJECTED' | 'ORDER_STATE_COMPLETED' | 'ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_CANCELLED';

export interface IV1SupplyOrderStatusCounterResponseItem {
  /** Количество заявок в статусе. */
  readonly count?: number;
  readonly order_state?: IV1OrderState;
}

export interface IV1SupplyOrderStatusCounterResponse {
  readonly items?: IV1SupplyOrderStatusCounterResponseItem[];
}

export interface IGooglerpcStatus {
  /** Код ошибки. */
  readonly code?: number;
  /** Дополнительная информация об ошибке. */
  readonly details?: IProtobufAny[];
  /** Описание ошибки. */
  readonly message?: string;
}

/**
 * Список складов для расчёта товарных тегов.
 */
export interface IGetSupplyOrderBundleRequestItemTagsCalculation {
  /** Идентификатор склада отгрузки поставки. */
  readonly dropoff_warehouse_id: string;
  /** Список идентификаторов складов поставки, не больше 25 значений. */
  readonly storage_warehouse_ids: string[];
}

/**
 * Сортировка по параметрам:
 * - `SKU` — SKU;
 * - `NAME` — названию товара;
 * - `QUANTITY` — количеству;
 * - `TOTAL_VOLUME_IN_LITRES` — объёму в литрах.
 * 
 */
export type IV1ItemSortField = 'UNSPECIFIED' | 'SKU' | 'NAME' | 'QUANTITY' | 'TOTAL_VOLUME_IN_LITRES';

export interface IV1GetSupplyOrderBundleRequest {
  /** Идентификаторы товарного состава поставки. Можно получить в методе [/v2/supply-order/get](#operation/SupplyOrderAPI_GetSupplyOrdersV2). */
  readonly bundle_ids: string[];
  /** `true`, чтобы сортировать по возрастанию. */
  readonly is_asc?: boolean;
  readonly item_tags_calculation?: IGetSupplyOrderBundleRequestItemTagsCalculation;
  /** Идентификатор последнего значения SKU на странице. */
  readonly last_id?: string;
  /** Количество товаров на странице. */
  readonly limit: number;
  /** Поисковый запрос, например: по названию, артикулу или SKU. */
  readonly query?: string;
  readonly sort_field?: IV1ItemSortField;
}

/**
 * Метка Super-товара:
 * - `ITEM_SFBO_ATTRIBUTE_NONE` — без метки;
 * - `ITEM_SFBO_ATTRIBUTE_SUPER_FBO` — Super-товар;
 * - `ITEM_SFBO_ATTRIBUTE_ANTI_FBO` — неходовой товар.
 * 
 */
export type IV1ItemSfboAttribute = 'ITEM_SFBO_ATTRIBUTE_NONE' | 'ITEM_SFBO_ATTRIBUTE_SUPER_FBO' | 'ITEM_SFBO_ATTRIBUTE_ANTI_FBO';

/**
 * Тип упаковки:
 * - `BUNDLE_ITEM_SHIPMENT_TYPE_GENERAL` — обычный товар;
 * - `BUNDLE_ITEM_SHIPMENT_TYPE_BOX` — коробка;
 * - `BUNDLE_ITEM_SHIPMENT_TYPE_PALLET` — палета.
 * 
 */
export type IV1BundleItemShipmentType = 'BUNDLE_ITEM_SHIPMENT_TYPE_GENERAL' | 'BUNDLE_ITEM_SHIPMENT_TYPE_BOX' | 'BUNDLE_ITEM_SHIPMENT_TYPE_PALLET';

export interface IV1ItemResponse {
  /** Ссылка на изображение товара. */
  readonly icon_path?: string;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
  /** Название товара. */
  readonly name?: string;
  /** Количество товара. */
  readonly quantity?: number;
  /** Штрихкод товара. */
  readonly barcode?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Количество товаров в одной упаковке. */
  readonly quant?: number;
  /** `true`, если количество товаров в одной упаковке можно изменить. */
  readonly is_quant_editable?: boolean;
  /** Объём товара в литрах. */
  readonly volume_in_litres?: number;
  /** Объём всех товаров в литрах. */
  readonly total_volume_in_litres?: number;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly contractor_item_code?: string;
  readonly sfbo_attribute?: IV1ItemSfboAttribute;
  readonly shipment_type?: IV1BundleItemShipmentType;
  /** Теги товаров из поставки или заявки на поставку.  Возможные значения: - `EVSD_REQUIRED` — товар с сертификацией «Меркурий»; - `MARKING_REQUIRED` — товар с обязательной маркировкой «Честный ЗНАК»; - `MARKING_POSSIBLE` — товар с возможной маркировкой «Честный ЗНАК»; - `JEWELRY` — товар с признаком ювелирного изделия; - `TRACEABLE` — товар с признаком прослеживаемости; - `ETTN_REQUIRED` — товар с признаком прослеживаемости, для которого необходима электронная ТТН; - `UNDEFINED` — неизвестный тег. */
  readonly tags?: 'EVSD_REQUIRED' | 'MARKING_REQUIRED' | 'MARKING_POSSIBLE' | 'JEWELRY' | 'TRACEABLE' | 'ETTN_REQUIRED' | 'UNDEFINED'[];
  /** Зона размещения товара.  Возможные значения: - `UNSPECIFIED` — зона не указана; - `CLOSED_ZONE` — закрытая зона; - `DANGEROUS_GOODS` — товар 2–4 класса опасности; - `PRODUCTS` — продукты; - `SORT` — сортируемый товар; - `NON_SORT` — несортируемый товар; - `OVERSIZE` — крупногабаритный товар; - `JEWELRY` — ювелирные изделия; - `UNRESOLVED` — неизвестная зона. */
  readonly placement_zone?: 'UNSPECIFIED' | 'CLOSED_ZONE' | 'DANGEROUS_GOODS' | 'PRODUCTS' | 'SORT' | 'NON_SORT' | 'OVERSIZE' | 'JEWELRY' | 'UNRESOLVED';
}

export interface IV1GetSupplyOrderBundleResponse {
  /** Список товаров в заявке на поставку. */
  readonly items?: IV1ItemResponse[];
  /** Количество товаров в заявке. */
  readonly total_count?: number;
  /** Признак, что в ответе вернули не все товары: - `true` — сделайте повторный запрос с другим значением `page` и `page_size`, чтобы получить информацию об остальных товарах; - `false` — ответ содержит все товары из заявки. */
  readonly has_next?: boolean;
  /** Идентификатор последнего значения на странице. */
  readonly last_id?: string;
}

/**
 * Фильтр.
 */
export interface IGetSupplyOrdersListRequestFilter {
  /** Фильтр по статусу поставки: - `ORDER_STATE_DATA_FILLING` — заполнение данных; - `ORDER_STATE_READY_TO_SUPPLY` — готова к отгрузке; - `ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки; - `ORDER_STATE_IN_TRANSIT` — в пути; - `ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе; - `ORDER_STATE_REPORTS_CONFIRMATION_AWAITING` — согласование актов; - `ORDER_STATE_REPORT_REJECTED` — спор; - `ORDER_STATE_COMPLETED` — завершена; - `ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке; - `ORDER_STATE_CANCELLED` — отменена. */
  readonly states?: 'ORDER_STATE_DATA_FILLING' | 'ORDER_STATE_READY_TO_SUPPLY' | 'ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_IN_TRANSIT' | 'ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'ORDER_STATE_REPORTS_CONFIRMATION_AWAITING' | 'ORDER_STATE_REPORT_REJECTED' | 'ORDER_STATE_COMPLETED' | 'ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_CANCELLED'[];
}

/**
 * Настройка отображения списка заявок.
 */
export interface IGetSupplyOrdersListRequestPaging {
  /** Номер поставки, с которой отобразится список заявок. */
  readonly from_supply_order_id?: number;
  /** Количество значений в ответе:   - максимум — 100,   - минимум — 1. */
  readonly limit: number;
}

export interface IV2GetSupplyOrdersListRequest {
  readonly filter?: IGetSupplyOrdersListRequestFilter;
  readonly paging: IGetSupplyOrdersListRequestPaging;
}

export interface IV2GetSupplyOrdersListResponse {
  /** Идентификатор заявки на поставку, который вы запрашивали в прошлый раз. */
  readonly last_supply_order_id?: number;
  /** Идентификатор заявки на поставку. */
  readonly supply_order_id?: string[];
}

export interface IV2GetSupplyOrdersRequest {
  /** Идентификатор заявки на поставку в системе Ozon. */
  readonly order_ids: string[];
}

/**
 * Статус поставки:
 * - `ORDER_STATE_UNSPECIFIED` — статус не указан;
 * - `ORDER_STATE_DATA_FILLING` — заполнение данных;
 * - `ORDER_STATE_READY_TO_SUPPLY` — готова к отгрузке;
 * - `ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки;
 * - `ORDER_STATE_IN_TRANSIT` — в пути;
 * - `ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе;
 * - `ORDER_STATE_REPORTS_CONFIRMATION_AWAITING` — согласование актов;
 * - `ORDER_STATE_REPORT_REJECTED` — спор;
 * - `ORDER_STATE_COMPLETED` — завершена;
 * - `ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке;
 * - `ORDER_STATE_CANCELLED` — отменена.
 * 
 */
export type IV2State = 'ORDER_STATE_UNSPECIFIED' | 'ORDER_STATE_DATA_FILLING' | 'ORDER_STATE_READY_TO_SUPPLY' | 'ORDER_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_IN_TRANSIT' | 'ORDER_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'ORDER_STATE_REPORTS_CONFIRMATION_AWAITING' | 'ORDER_STATE_REPORT_REJECTED' | 'ORDER_STATE_COMPLETED' | 'ORDER_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'ORDER_STATE_CANCELLED';

/**
 * Статус поставки:
 * - `SUPPLY_STATE_UNSPECIFIED` — статус не указан;
 * - `SUPPLY_STATE_DATA_FILLING` — заполнение данных;
 * - `SUPPLY_STATE_READY_TO_SUPPLY` — готова к отгрузке;
 * - `SUPPLY_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE` — принята на точке отгрузки;
 * - `SUPPLY_STATE_IN_TRANSIT` — в пути;
 * - `SUPPLY_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE` — приёмка на складе;
 * - `SUPPLY_STATE_REPORTS_CONFIRMATION_AWAITING` — согласование актов;
 * - `SUPPLY_STATE_REPORT_REJECTED` — спор;
 * - `SUPPLY_STATE_COMPLETED` — завершена;
 * - `SUPPLY_STATE_REJECTED_AT_SUPPLY_WAREHOUSE` — отказано в приёмке;
 * - `SUPPLY_STATE_CANCELLED` — отменена;
 * - `SUPPLY_STATE_OVERDUE` — просрочена.
 * 
 */
export type IV2SupplyState = 'SUPPLY_STATE_UNSPECIFIED' | 'SUPPLY_STATE_DATA_FILLING' | 'SUPPLY_STATE_READY_TO_SUPPLY' | 'SUPPLY_STATE_ACCEPTED_AT_SUPPLY_WAREHOUSE' | 'SUPPLY_STATE_IN_TRANSIT' | 'SUPPLY_STATE_ACCEPTANCE_AT_STORAGE_WAREHOUSE' | 'SUPPLY_STATE_REPORTS_CONFIRMATION_AWAITING' | 'SUPPLY_STATE_REPORT_REJECTED' | 'SUPPLY_STATE_COMPLETED' | 'SUPPLY_STATE_REJECTED_AT_SUPPLY_WAREHOUSE' | 'SUPPLY_STATE_CANCELLED' | 'SUPPLY_STATE_OVERDUE';

export interface IV2OrderSupplySupplyTags {
  /** Признак, что для поставки нужна электронная ТТН. */
  readonly is_ettn_required?: boolean;
  /** `true`, если в поставке есть товары с сертификацией в системе «Меркурий». */
  readonly is_evsd_required?: boolean;
  /** `true`, если в поставке есть ювелирные товары. */
  readonly is_jewelry?: boolean;
  /** `true`, если в поставке есть товары, для которых возможна маркировка. */
  readonly is_marking_possible?: boolean;
  /** `true`, если в поставке есть товары, для которых маркировка обязательна. */
  readonly is_marking_required?: boolean;
  /** Признак, что поставка содержит прослеживаемые товары. */
  readonly is_traceable?: boolean;
}

export interface IV2OrderSupply {
  /** Идентификатор состава поставки. Используется в методе [/v1/supply-order/bundle](#operation/SupplyOrderBundle). */
  readonly bundle_id?: string;
  /** Идентификатор склада хранения. */
  readonly storage_warehouse_id?: number;
  /** Идентификатор поставки. */
  readonly supply_id?: number;
  readonly supply_state?: IV2SupplyState;
  /** Метки товаров в заявке на поставку. */
  readonly supply_tags?: unknown;
}

export interface IV2Timeslot {
  /** Начало интервала. */
  readonly from?: string;
  /** Конец интервала. */
  readonly to?: string;
}

export interface IV2Timezone {
  /** Название часового пояса. */
  readonly iana_name?: string;
  /** Смещение часового пояса от UTC-0 в секундах. */
  readonly offset?: string;
}

export interface IV2TimeslotZonedMessage {
  /** Интервал поставки по местному времени. */
  readonly timeslot?: unknown;
  /** Часовой пояс. */
  readonly timezone_info?: unknown;
}

/**
 * Интервал поставки.
 */
export interface IV2OrderTimeslot {
  /** Причина, по которой не получается выбрать интервал поставки. */
  readonly can_not_set_reasons?: string[];
  /** `true`, если интервал поставки можно выбрать или изменить. */
  readonly can_set?: boolean;
  /** `true`, если характеристику указывать обязательно. */
  readonly is_required?: boolean;
  readonly value?: IV2TimeslotZonedMessage;
}

export interface IV2VehicleInfo {
  /** Имя водителя. */
  readonly driver_name?: string;
  /** Телефон водителя. */
  readonly driver_phone?: string;
  /** Модель автомобиля. */
  readonly vehicle_model?: string;
  /** Номер автомобиля. */
  readonly vehicle_number?: string;
}

/**
 * Информация о водителе и автомобиле.
 */
export interface IV2OrderVehicle {
  /** Причина, по которой не получается указать или изменить данные водителя и автомобиля. */
  readonly can_not_set_reasons?: string[];
  /** `true`, если можно указать или изменить данные водителя и автомобиля. */
  readonly can_set?: boolean;
  /** `true`, если характеристику указывать обязательно. */
  readonly is_required?: boolean;
  /** Данные водителя и автомобиля. */
  readonly value?: unknown;
}

export interface IV2Order {
  /** `true`, если заявку можно отменить. */
  readonly can_cancel?: boolean;
  /** Дата создания заявки на поставку. */
  readonly creation_date?: string;
  /** Время в секундах, оставшееся на заполнение данных по поставке. Только для заявок с вРЦ. */
  readonly data_filling_deadline_utc?: string;
  /** Идентификатор склада поставки. */
  readonly dropoff_warehouse_id?: number;
  /** `true`, если заявка на поставку относится к товарам «Суперэконом». */
  readonly is_econom?: boolean;
  /** `true`, если продавец подключен к Super-поставкам. */
  readonly is_super_fbo?: boolean;
  /** `true`, если заявка на поставку виртуальная. */
  readonly is_virtual?: boolean;
  /** `true`, если заявка на поставку относится к Super-товарам. */
  readonly product_super_fbo?: boolean;
  readonly state?: IV2State;
  /** Состав заявки на поставку. */
  readonly supplies?: IV2OrderSupply[];
  /** Идентификатор заявки на поставку. */
  readonly supply_order_id?: number;
  /** Номер заявки. */
  readonly supply_order_number?: string;
  readonly timeslot?: IV2OrderTimeslot;
  readonly vehicle?: IV2OrderVehicle;
}

/**
 * Склад поставки.
 */
export interface IV2Warehouse {
  /** Адрес склада. */
  readonly address?: string;
  /** Название склада. */
  readonly name?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
}

export interface IV2GetSupplyOrdersResponse {
  /** Информация о заявке на поставку. */
  readonly orders?: IV2Order[];
  /** Информация о складе. */
  readonly warehouses?: IV2Warehouse[];
}

export interface IV1GetSupplyOrderTimeslotsRequest {
  /** Идентификатор заявки на поставку. */
  readonly supply_order_id: number;
}

/**
 * Время интервала поставки.
 */
export interface IV1SupplyOrderTimeslot {
  /** Начало интервала по местному времени. */
  readonly from: string;
  /** Конец интервала по местному времени. */
  readonly to: string;
}

export interface IV1Timezone {
  /** Название часового пояса. */
  readonly iana_name?: string;
  /** Смещение часового пояса от UTC-0 в секундах. */
  readonly offset?: string;
}

export interface IV1GetSupplyOrderTimeslotsResponse {
  /** Интервалы поставки. */
  readonly timeslots?: IV1SupplyOrderTimeslot[];
  /** Часовой пояс. */
  readonly timezone?: unknown;
}

export interface IV1UpdateSupplyOrderTimeslotRequest {
  /** Идентификатор заявки на поставку. */
  readonly supply_order_id: number;
  readonly timeslot: IV1SupplyOrderTimeslot;
}

export type IV1UpdateTimeslotError = 'UPDATE_TIMESLOT_ERROR_UNSPECIFIED' | 'UPDATE_TIMESLOT_ERROR_INVALID_ORDER_STATE' | 'UPDATE_TIMESLOT_ERROR_INCOMPATIBLE_ORDER_FLOW' | 'UPDATE_TIMESLOT_ERROR_SET_TIMESLOT_DEADLINE_EXCEED' | 'UPDATE_TIMESLOT_ERROR_OUT_OF_ALLOWED_RANGE' | 'UPDATE_TIMESLOT_ERROR_ORDER_NOT_BELONG_CONTRACTOR' | 'UPDATE_TIMESLOT_ERROR_ORDER_NOT_BELONG_COMPANY';

export interface IV1UpdateSupplyOrderTimeslotResponse {
  /** Возможные ошибки:    - `UNSPECIFIED` — статус не указан;   - `INVALID_ORDER_STATE` — неверный статус заказа;   - `INCOMPATIBLE_ORDER_FLOW` — неверный статус интервала поставки;   - `SET_TIMESLOT_DEADLINE_EXCEED` — заявка на поставку просрочена;   - `OUT_OF_ALLOWED_RANGE` — вы ввели некорректное значение интервала поставки;   - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическим лицом, работать с ней не получится;   - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится. */
  readonly errors?: IV1UpdateTimeslotError[];
  /** Идентификатор операции. */
  readonly operation_id?: string;
}

export interface IV1GetSupplyOrderTimeslotStatusRequest {
  /** Идентификатор операции. */
  readonly operation_id: string;
}

/**
 * Статус данных: 
 *   - `UNSPECIFIED` — не указан;
 *   - `ERROR` — ошибка;
 *   - `IN_PROGRESS` — устанавливается;
 *   - `SUCCESS` — установлен.
 * 
 */
export type IV1GetSupplyOrderTimeslotStatusResponseStatus = 'STATUS_UNSPECIFIED' | 'STATUS_ERROR' | 'STATUS_IN_PROGRESS' | 'STATUS_SUCCESS';

export interface IV1GetSupplyOrderTimeslotStatusResponse {
  /** Возможные ошибки:    - `UNSPECIFIED` — статус не указан;   - `INVALID_ORDER_STATE` — неверный статус заказа;   - `INCOMPATIBLE_ORDER_FLOW` — неверный статус интервала поставки;   - `SET_TIMESLOT_DEADLINE_EXCEED` — заявка на поставку просрочена;   - `OUT_OF_ALLOWED_RANGE` — вы ввели некорректное значение интервала поставки;   - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическом лицом, работать с ней не получится;   - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится. */
  readonly errors?: IV1UpdateTimeslotError[];
  readonly status?: IV1GetSupplyOrderTimeslotStatusResponseStatus;
}

/**
 * Информация о водителе и автомобиле.
 */
export interface IV1VehicleInfo {
  /** Имя водителя. */
  readonly driver_name: string;
  /** Телефон водителя. */
  readonly driver_phone: string;
  /** Модель автомобиля. */
  readonly vehicle_model: string;
  /** Номер автомобиля. */
  readonly vehicle_number: string;
}

export interface IV1SupplyOrderPassCreateRequest {
  /** Идентификатор заявки на поставку. */
  readonly supply_order_id: number;
  readonly vehicle: IV1VehicleInfo;
}

export type IV1SetVehicleError = 'SET_VEHICLE_ERROR_UNSPECIFIED' | 'SET_VEHICLE_ERROR_INVALID_ORDER_STATE' | 'SET_VEHICLE_ERROR_VEHICLE_NOT_REQUIRED' | 'SET_VEHICLE_ERROR_ORDER_NOT_BELONG_CONTRACTOR' | 'SET_VEHICLE_ERROR_ORDER_NOT_BELONG_COMPANY';

export interface IV1SupplyOrderPassCreateResponse {
  /** Причина ошибки:   - `UNSPECIFIED` — статус заявки не указан;   - `INVALID_ORDER_STATE` — неверный статус заявки;   - `VEHICLE_NOT_REQUIRED` — указывать данные автомобиля необязательно;   - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическом лицом, работать с ней не получится;   - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится. */
  readonly error_reasons?: IV1SetVehicleError[];
  /** Идентификатор операции. */
  readonly operation_id?: string;
}

export interface IV1SupplyOrderPassStatusRequest {
  /** Идентификатор операции. */
  readonly operation_id: string;
}

/**
 * Статус ввода данных о водителе и автомобиле:
 * - `Unknown` — статус неизвестен;
 * - `Success` — данные указаны;
 * - `InProgress` — данные обрабатываются;
 * - `Failed` — не удалось обработать данные.
 * 
 */
export type IV1SupplyOrderPassStatusResponseStatus = 'Unknown' | 'Success' | 'InProgress' | 'Failed';

export interface IV1SupplyOrderPassStatusResponse {
  /** Причина ошибки: - `UNSPECIFIED` — статус не указан; - `INVALID_ORDER_STATE` — неверный статус заявки; - `VEHICLE_NOT_REQUIRED` — указывать данные автомобиля необязательно; - `ORDER_NOT_BELONG_CONTRACTOR` — заявка создана другим юридическом лицом, работать с ней не получится; - `ORDER_NOT_BELONG_COMPANY` — заявка не принадлежит вашему кабинету, работать с ней не получится. */
  readonly errors?: IV1SetVehicleError[];
  readonly result?: IV1SupplyOrderPassStatusResponseStatus;
}

export interface ISupplierAvailableWarehousesResponseCapacity {
  /** Начало периода по местному времени. */
  readonly start?: string;
  /** Конец периода по местному времени. */
  readonly end?: string;
  /** Среднее количество товаров, которые склад может принять в день за период. */
  readonly value?: number;
}

/**
 * Загруженность.
 */
export interface ISupplierAvailableWarehousesResponseSchedule {
  /** Данные о количестве поставляемых на склад товаров. */
  readonly capacity?: unknown;
  /** Ближайшая доступная дата для записи на поставку по местному времени. */
  readonly date?: string;
}

/**
 * Склад.
 */
export interface ISupplierAvailableWarehousesResponseWarehouse {
  /** Идентификатор склада. */
  readonly id?: string;
  /** Название склада. */
  readonly name?: string;
}

export interface ISupplierAvailableWarehousesResponseResult {
  readonly schedule?: ISupplierAvailableWarehousesResponseSchedule;
  readonly warehouse?: ISupplierAvailableWarehousesResponseWarehouse;
}

export interface IV1SupplierAvailableWarehousesResponse {
  /** Результат работы метода. */
  readonly result?: unknown;
}
