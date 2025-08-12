/**
 * Generated types for FBS (FBS)
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: 01-fbs.json
 * Endpoints: 22
 * Schemas: 98
 */

/**
 * Фильтр запроса.
 * 
 * Используйте фильтр либо по времени сборки — `cutoff`, либо по дате передачи отправления в доставку — `delivering_date`.
 * Если использовать их вместе, в ответе вернётся ошибка.
 * 
 * Чтобы использовать фильтр по времени сборки, заполните поля `cutoff_from` и `cutoff_to`.
 * 
 * Чтобы использовать фильтр по дате передачи отправления в доставку, заполните поля `delivering_date_from` и `delivering_date_to`.
 * 
 */
export interface IPostingv3GetFbsPostingUnfulfilledListRequestFilter {
  /** Фильтр по времени, до которого продавцу нужно собрать заказ. Начало периода.  Формат: YYYY-MM-DDThh:mm:ss.mcsZ. Пример: 2020-03-18T07:34:50.359Z. */
  readonly cutoff_from: string;
  /** Фильтр по времени, до которого продавцу нужно собрать заказ. Конец периода.  Формат: YYYY-MM-DDThh:mm:ss.mcsZ. Пример: 2020-03-18T07:34:50.359Z. */
  readonly cutoff_to: string;
  /** Минимальная дата передачи отправления в доставку. */
  readonly delivering_date_from?: string;
  /** Максимальная дата передачи отправления в доставку. */
  readonly delivering_date_to?: string;
  /** Идентификатор способа доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList). */
  readonly delivery_method_id?: number[];
  /** Укажите `true`, чтобы получить только отправления квантов.  По умолчанию — `false`, в ответе придут все отправления. */
  readonly is_quantum?: boolean;
  /** Идентификатор службы доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList). */
  readonly provider_id?: number[];
  /** Статус отправления: - `acceptance_in_progress` — идёт приёмка, - `awaiting_approve` — ожидает подтверждения, - `awaiting_packaging` — ожидает упаковки, - `awaiting_registration` — ожидает регистрации, - `awaiting_deliver` — ожидает отгрузки, - `arbitration` — арбитраж, - `client_arbitration` — клиентский арбитраж доставки, - `delivering` — доставляется, - `driver_pickup` — у водителя, - `not_accepted` — не принят на сортировочном центре. */
  readonly status?: string;
  /** Идентификатор склада. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList). */
  readonly warehouse_id?: number[];
}

/**
 * Дополнительные поля, которые нужно добавить в ответ.
 */
export interface IPostingv3FbsPostingWithParams {
  /** Добавить в ответ данные аналитики. */
  readonly analytics_data?: boolean;
  /** Добавить в ответ штрихкоды отправления. */
  readonly barcodes?: boolean;
  /** Добавить в ответ финансовые данные. */
  readonly financial_data?: boolean;
  /** Добавить в ответ юридическую информацию. */
  readonly legal_info?: boolean;
  /** Выполнить транслитерацию возвращаемых значений. */
  readonly translit?: boolean;
}

export interface IPostingv3GetFbsPostingUnfulfilledListRequest {
  /** Направление сортировки:   - `asc` — по возрастанию,   - `desc` — по убыванию. */
  readonly dir?: string;
  readonly filter: IPostingv3GetFbsPostingUnfulfilledListRequestFilter;
  /** Количество значений в ответе:   - максимум — 1000,   - минимум — 1. */
  readonly limit: number;
  /** Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента. */
  readonly offset: number;
  readonly with?: IPostingv3FbsPostingWithParams;
}

/**
 * Контактные данные получателя.
 */
export interface IV3AddresseeFbsLists {
  /** Имя покупателя. */
  readonly name?: string;
  /** Контактный телефон.  Всегда возвращает пустую строку `""`. */
  readonly phone?: string;
}

/**
 * Данные аналитики.
 */
export interface IV3FbsPostingAnalyticsData {
  /** Город доставки. Только для отправлений rFBS и продавцов из СНГ. */
  readonly city?: string;
  /** Дата и время начала доставки. */
  readonly delivery_date_begin?: string;
  /** Дата и время конца доставки. */
  readonly delivery_date_end?: string;
  /** Способ доставки. */
  readonly delivery_type?: string;
  /** Признак, что получатель юридическое лицо:   - `true` — юридическое лицо,   - `false` — физическое лицо. */
  readonly is_legal?: boolean;
  /** Наличие подписки Premium. */
  readonly is_premium?: boolean;
  /** Способ оплаты:  - `картой онлайн`, - `Ozon Карта`, - `автосписание с Ozon Карты при выдаче`, - `сохранённой картой при получении`, - `Система Быстрых Платежей`,  - `Ozon Рассрочка`,  - `оплата на расчётный счёт`, - `SberPay`. */
  readonly payment_type_group_name?: string;
  /** Регион доставки. Только для отправлений rFBS. */
  readonly region?: string;
  /** Служба доставки. */
  readonly tpl_provider?: string;
  /** Идентификатор службы доставки. */
  readonly tpl_provider_id?: number;
  /** Название склада отправки заказа. */
  readonly warehouse?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
}

/**
 * Штрихкоды отправления.
 */
export interface IV3Barcodes {
  /** Нижний штрихкод на маркировке отправления. */
  readonly lower_barcode?: string;
  /** Верхний штрихкод на маркировке отправления. */
  readonly upper_barcode?: string;
}

/**
 * Информация об отмене.
 */
export interface IV3Cancellation {
  /** Если отмена влияет на рейтинг продавца — `true`. */
  readonly affect_cancellation_rating?: boolean;
  /** Причина отмены. */
  readonly cancel_reason?: string;
  /** Идентификатор причины отмены отправления. */
  readonly cancel_reason_id?: number;
  /** Инициатор отмены: - `Продавец`,  - `Клиент` или `покупатель`, - `Ozon`,   - `Система`,  - `Служба доставки`. */
  readonly cancellation_initiator?: string;
  /** Тип отмены отправления: - `seller` — отменено продавцом; - `client` или `customer` — отменено покупателем; - `ozon` — отменено Ozon; - `system`— отменено системой; - `delivery` — отменено службой доставки. */
  readonly cancellation_type?: string;
  /** Если отмена произошла после сборки отправления — `true`. */
  readonly cancelled_after_ship?: boolean;
}

/**
 * Информация об адресе доставки.
 */
export interface IV3Address {
  /** Адрес в текстовом формате. */
  readonly address_tail?: string;
  /** Город доставки. */
  readonly city?: string;
  /** Комментарий к заказу. */
  readonly comment?: string;
  /** Страна доставки. */
  readonly country?: string;
  /** Район доставки. */
  readonly district?: string;
  /** Широта. */
  readonly latitude?: number;
  /** Долгота. */
  readonly longitude?: number;
  /** Код пункта выдачи заказов 3PL провайдера. */
  readonly provider_pvz_code?: string;
  /** Код пункта выдачи заказов. */
  readonly pvz_code?: number;
  /** Регион доставки. */
  readonly region?: string;
  /** Почтовый индекс получателя. */
  readonly zip_code?: string;
}

/**
 * Данные о покупателе.
 */
export interface IV3CustomerFbsLists {
  readonly address?: IV3Address;
  /** Идентификатор покупателя. */
  readonly customer_id?: number;
  /** Имя покупателя. */
  readonly name?: string;
  /** Контактный телефон.  Всегда возвращает пустую строку `""`. */
  readonly phone?: string;
}

/**
 * Метод доставки.
 */
export interface IV3DeliveryMethod {
  /** Идентификатор способа доставки. */
  readonly id?: number;
  /** Название способа доставки. */
  readonly name?: string;
  /** Служба доставки. */
  readonly tpl_provider?: string;
  /** Идентификатор службы доставки. */
  readonly tpl_provider_id?: number;
  /** Название склада. */
  readonly warehouse?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
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
 * Данные о стоимости товара, размере скидки, выплате и комиссии.
 */
export interface IV3PostingFinancialData {
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

/**
 * Список товаров с дополнительными характеристиками.
 */
export interface IV3FbsPostingDetailOptional {
  /** Список товаров с возможной маркировкой. */
  readonly products_with_possible_mandatory_mark?: unknown[];
}

export interface IV3FbsPostingProduct {
  /** Название товара. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Цена товара. */
  readonly price?: string;
  /** Количество товара в отправлении. */
  readonly quantity?: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
  /** Валюта ваших цен. Совпадает с валютой, которая установлена в настройках личного кабинета.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Признак прослеживаемости товара. */
  readonly is_blr_traceable?: boolean;
  /** Признак выкупа товара. */
  readonly is_marketplace_buyout?: boolean;
}

/**
 * Cписок продуктов, для которых нужно передать страну-изготовителя, номер грузовой таможенной декларации (ГТД), регистрационный номер партии товара (РНПТ) или маркировку «Честный ЗНАК», чтобы перевести отправление в следующий статус.
 */
export interface IV3FbsPostingRequirementsV3 {
  /** Список идентификаторов товаров (SKU), для которых нужно изменить страну-изготовитель. Чтобы изменить страну-изготовитель, используйте методы [/v2/posting/fbs/product/country/list](#operation/PostingAPI_ListCountryProductFbsPostingV2) и [/v2/posting/fbs/product/country/set](#operation/PostingAPI_SetCountryProductFbsPostingV2). */
  readonly products_requiring_change_country?: string[];
  /** Список идентификаторов товаров (SKU), для которых нужно передать номера таможенной декларации (ГТД).  Для сборки отправления передайте для всех перечисленных товаров номер таможенной декларации или информацию о том, что номера нет, с помощью метода [/v3/posting/fbs/ship/package](#operation/PostingAPI_PackageShipFbsPostingV3) или [/v3/posting/fbs/ship](#operation/PostingAPI_ShipFbsPostingV3). */
  readonly products_requiring_gtd?: string[];
  /** Список идентификаторов товаров (SKU), для которых нужно передать информацию о стране-изготовителе.  Для сборки отправления передайте информацию о стране-изготовителе для всех перечисленных товаров с помощью метода [/v2/posting/fbs/product/country/set](#operation/PostingAPI_SetCountryProductFbsPostingV2). */
  readonly products_requiring_country?: string[];
  /** Список идентификаторов товаров (SKU), для которых нужно передать маркировку «Честный ЗНАК». */
  readonly products_requiring_mandatory_mark?: string[];
  /** Список товаров, для которых нужно передать уникальный идентификационный номер (УИН) ювелирного изделия. */
  readonly products_requiring_jw_uin?: string[];
  /** Список идентификаторов товаров (SKU), для которых нужно передать регистрационный номер партии товара (РНПТ). */
  readonly products_requiring_rnpt?: string[];
}

export type IV3FbsTariffication = unknown;

export interface IV3FbsPosting {
  readonly addressee?: IV3AddresseeFbsLists;
  readonly analytics_data?: IV3FbsPostingAnalyticsData;
  /** Доступные действия и информация об отправлении: - `arbitration` — открыть спор; - `awaiting_delivery` — перевести в статус «Ожидает отгрузки»; - `can_create_chat` — начать чат с покупателем; - `cancel` — отменить отправление; - `click_track_number` — просмотреть по трек-номеру историю изменения статусов в личном кабинете; - `customer_phone_available` — телефон покупателя; - `has_weight_products` — весовые товары в отправлении; - `hide_region_and_city` — скрыть регион и город покупателя в отчёте; - `invoice_get` —  получить информацию из счёта-фактуры; - `invoice_send` — создать счёт-фактуру; - `invoice_update` — отредактировать счёт-фактуру; - `label_download_big` — скачать большую этикетку; - `label_download_small` — скачать маленькую этикетку; - `label_download` — скачать этикетку; - `non_int_delivered` — перевести в статус «Условно доставлен»; - `non_int_delivering` — перевести в статус «Доставляется»; - `non_int_last_mile` — перевести в статус «Курьер в пути»; - `product_cancel` — отменить часть товаров в отправлении; - `set_cutoff` — необходимо указать дату отгрузки, воспользуйтесь методом [/v1/posting/cutoff/set](#operation/PostingAPI_SetPostingCutoff); - `set_timeslot` — изменить время доставки покупателю; - `set_track_number` — указать или изменить трек-номер; - `ship_async_in_process` — отправление собирается; - `ship_async_retry` — собрать отправление повторно после ошибки сборки; - `ship_async` — собрать отправление; - `ship_with_additional_info` — необходимо заполнить дополнительную информацию; - `ship` — собрать отправление; - `update_cis` — изменить дополнительную информацию. */
  readonly available_actions?: unknown;
  readonly barcodes?: IV3Barcodes;
  readonly cancellation?: IV3Cancellation;
  readonly customer?: IV3CustomerFbsLists;
  /** Дата передачи отправления в доставку. */
  readonly delivering_date?: string;
  readonly delivery_method?: IV3DeliveryMethod;
  readonly financial_data?: IV3PostingFinancialData;
  /** Дата и время начала обработки отправления. */
  readonly in_process_at?: string;
  /** Если использовалась быстрая доставка Ozon Express — `true`. */
  readonly is_express?: boolean;
  /** Признак, что в отправлении есть многокоробочный товар и нужно передать количество коробок для него:  - `true` — до сборки передайте количество коробок через метод [/v3/posting/multiboxqty/set](#operation/PostingAPI_PostingMultiBoxQtySetV3). - `false` — отправление собрано с указанием количества коробок в параметре `multi_box_qty` или в отправлении нет многокоробочного товара. */
  readonly is_multibox?: boolean;
  readonly legal_info?: IV2FboSinglePostingLegalInfo;
  /** Количество коробок, в которые упакован товар. */
  readonly multi_box_qty?: number;
  readonly optional?: IV3FbsPostingDetailOptional;
  /** Идентификатор заказа, к которому относится отправление. */
  readonly order_id?: number;
  /** Номер заказа, к которому относится отправление. */
  readonly order_number?: string;
  /** Номер родительского отправления, в результате разделения которого появилось текущее. */
  readonly parent_posting_number?: string;
  /** Дата и время успешной валидации кода курьера. Чтобы проверить код курьера, воспользуйтесь методом [/v1/posting/fbs/pick-up-code/verify](#operation/PostingAPI_PostingFBSPickupCodeVerify). */
  readonly pickup_code_verified_at?: string;
  /** Номер отправления. */
  readonly posting_number?: string;
  /** Список товаров в отправлении. */
  readonly products?: IV3FbsPostingProduct[];
  /** Код услуги погрузочно-разгрузочных работ: - `lift` — подъём на лифте. - `stairs` — подъём по лестнице. - `none` — покупатель отказался от услуги, поднимать товары не нужно. - `delivery_default` — доставка включена в стоимость, по условиям оферты нужно доставить товар на этаж.  Параметр актуален для КГТ-отправлений с доставкой силами продавца или интегрированной службой. */
  readonly prr_option?: string;
  /** Идентификатор эконом-товара. */
  readonly quantum_id?: number;
  readonly requirements?: IV3FbsPostingRequirementsV3;
  /** Дата и время, до которой необходимо собрать отправление. Показываем рекомендованное время отгрузки. По истечении этого времени начнёт применяться новый тариф, информацию о нём уточняйте в поле `tariffication`. */
  readonly shipment_date?: string;
  /** Статус отправления: - `acceptance_in_progress` — идёт приёмка, - `arbitration` — арбитраж, - `awaiting_approve` — ожидает подтверждения, - `awaiting_deliver` — ожидает отгрузки, - `awaiting_packaging` — ожидает упаковки, - `awaiting_registration` — ожидает регистрации, - `awaiting_verification` — создано, - `cancelled` — отменено, - `cancelled_from_split_pending` — отменён из-за разделения отправления, - `client_arbitration` — клиентский арбитраж доставки, - `delivering` — доставляется, - `driver_pickup` — у водителя, - `not_accepted` — не принят на сортировочном центре, - `sent_by_seller` — отправлено продавцом. */
  readonly status?: string;
  /** Подстатус отправления: - `posting_acceptance_in_progress`— идёт приёмка, - `posting_in_arbitration` — арбитраж, - `posting_created` — создано, - `posting_in_carriage` — в перевозке, - `posting_not_in_carriage` — не добавлено в перевозку, - `posting_registered` — зарегистрировано, - `posting_transferring_to_delivery` (`status=awaiting_deliver`) — передаётся в доставку, - `posting_awaiting_passport_data` — ожидает паспортных данных,  - `posting_created` — создано, - `posting_awaiting_registration` — ожидает регистрации, - `posting_registration_error` — ошибка регистрации, - `posting_transferring_to_delivery` (`status=awaiting_registration`) — передаётся курьеру, - `posting_split_pending` — создано, - `posting_canceled` — отменено, - `posting_in_client_arbitration` — клиентский арбитраж доставки, - `posting_delivered` — доставлено, - `posting_received` — получено, - `posting_conditionally_delivered` — условно доставлено, - `posting_in_courier_service` — курьер в пути, - `posting_in_pickup_point` — в пункте выдачи, - `posting_on_way_to_city` — в пути в ваш город, - `posting_on_way_to_pickup_point` — в пути в пункт выдачи, - `posting_returned_to_warehouse` — возвращено на склад, - `posting_transferred_to_courier_service` — передаётся в службу доставки, - `posting_driver_pick_up` — у водителя, - `posting_not_in_sort_center` — не принято на сортировочном центре, - `sent_by_seller` — отправлено продавцом. */
  readonly substatus?: string;
  /** Тип интеграции со службой доставки:   - `ozon` — доставка службой Ozon.   - `3pl_tracking` — доставка интегрированной службой.   - `non_integrated` — доставка сторонней службой.   - `aggregator` — доставка через партнёрскую доставку Ozon.   - `hybryd` — схема доставки Почты России. */
  readonly tpl_integration_type?: string;
  /** Трек-номер отправления. */
  readonly tracking_number?: string;
  /** Информация по тарификации отгрузки. */
  readonly tariffication?: IV3FbsTariffication[];
}

/**
 * Результат запроса.
 */
export interface IPostingv3GetFbsPostingUnfulfilledListResponseResult {
  /** Счётчик элементов в ответе. */
  readonly count?: number;
  /** Список отправлений и подробная информация по каждому. */
  readonly postings?: IV3FbsPosting[];
}

export interface IPostingv3GetFbsPostingUnfulfilledListResponse {
  readonly result?: IPostingv3GetFbsPostingUnfulfilledListResponseResult;
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

/**
 * Период, в который последний раз изменялся статус у отправлений.
 */
export interface IPostinglistV3status {
  /** Дата начала периода. */
  readonly from?: string;
  /** Дата окончания периода. */
  readonly to?: string;
}

/**
 * Фильтр.
 */
export interface IPostingv3GetFbsPostingListRequestFilter {
  /** Идентификатор способа доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList). */
  readonly delivery_method_id?: number[];
  /** Укажите `true`, чтобы получить только отправления квантов.  По умолчанию — `false`, в ответе придут все отправления. */
  readonly is_quantum?: boolean;
  /** Идентификатор заказа. */
  readonly order_id?: number;
  /** Идентификатор службы доставки. Можно получить с помощью метода [/v1/delivery-method/list](#operation/WarehouseAPI_DeliveryMethodList). */
  readonly provider_id?: number[];
  /** Дата начала периода, за который нужно получить список отправлений.  Формат UTC: ГГГГ-ММ-ДДTЧЧ:ММ:ССZ.  Пример: 2019-08-24T14:15:22Z. */
  readonly since: string;
  /** Дата конца периода, за который нужно получить список отправлений.  Формат UTC: ГГГГ-ММ-ДДTЧЧ:ММ:ССZ.  Пример: 2019-08-24T14:15:22Z. */
  readonly to: string;
  /** Статус отправления: - `awaiting_registration` — ожидает регистрации, - `acceptance_in_progress` — идёт приёмка, - `awaiting_approve` — ожидает подтверждения, - `awaiting_packaging` — ожидает упаковки, - `awaiting_deliver` — ожидает отгрузки, - `arbitration` — арбитраж, - `client_arbitration` — клиентский арбитраж доставки, - `delivering` — доставляется, - `driver_pickup` — у водителя, - `delivered` — доставлено, - `cancelled` — отменено, - `not_accepted` — не принят на сортировочном центре, - `sent_by_seller` – отправлено продавцом. */
  readonly status?: string;
  /** Идентификатор склада. Можно получить с помощью метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList). */
  readonly warehouse_id?: string[];
  readonly last_changed_status_date?: IPostinglistV3status;
}

export interface IPostingv3GetFbsPostingListRequest {
  /** Направление сортировки:   - `asc` — по возрастанию,   - `desc` — по убыванию. */
  readonly dir?: string;
  readonly filter: IPostingv3GetFbsPostingListRequestFilter;
  /** Количество значений в ответе:   - максимум — 1000,   - минимум — 1. */
  readonly limit: number;
  /** Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента. */
  readonly offset: number;
  readonly with?: IPostingv3FbsPostingWithParams;
}

/**
 * Массив отправлений.
 */
export interface IV3GetFbsPostingListResponseV3Result {
  /** Признак, что в ответе вернули не весь массив отправлений: - `true` — необходимо сделать новый запрос с другим значением `offset`, чтобы получить информацию об остальных отправлениях; - `false` — в ответе вернули весь массив отправлений для фильтра, который был задан в запросе. */
  readonly has_next?: boolean;
  /** Информация об отправлении. */
  readonly postings?: IV3FbsPosting[];
}

export interface IV3GetFbsPostingListResponseV3 {
  readonly result?: IV3GetFbsPostingListResponseV3Result;
}

/**
 * Дополнительные поля, которые нужно добавить в ответ.
 */
export interface IPostingv3FbsPostingWithParamsExamplars {
  /** Добавить в ответ данные аналитики. */
  readonly analytics_data?: boolean;
  /** Добавить в ответ штрихкоды отправления. */
  readonly barcodes?: boolean;
  /** Добавить в ответ финансовые данные. */
  readonly financial_data?: boolean;
  /** Добавить в ответ юридическую информацию. */
  readonly legal_info?: boolean;
  /** Добавить в ответ данные о продуктах и их экземплярах. */
  readonly product_exemplars?: boolean;
  /** Добавить в ответ номера связанных отправлений. Связанные отправления — те, на которое было разделено родительское отправление при сборке. */
  readonly related_postings?: boolean;
  /** Выполнить транслитерацию возвращаемых значений. */
  readonly translit?: boolean;
}

export interface IPostingv3GetFbsPostingRequest {
  /** Идентификатор отправления. */
  readonly posting_number: string;
  readonly with?: IPostingv3FbsPostingWithParamsExamplars;
}

export interface IV3AdditionalDataItem {
  readonly key?: string;
  readonly value?: string;
}

/**
 * Контактные данные получателя.
 */
export interface IV3Addressee {
  /** Имя покупателя. */
  readonly name?: string;
  /** Контактный телефон.   Всегда возвращает пустую строку `""`. */
  readonly phone?: string;
}

/**
 * Данные о курьере.
 */
export interface IFbsPostingDetailCourier {
  /** Модель автомобиля. */
  readonly car_model?: string;
  /** Номер автомобиля. */
  readonly car_number?: string;
  /** Полное имя курьера. */
  readonly name?: string;
  /** Телефон курьера.   Всегда возвращает пустую строку `""`. */
  readonly phone?: string;
}

/**
 * Данные о покупателе.
 */
export interface IV3Customer {
  readonly address?: IV3Address;
  /** Идентификатор покупателя. */
  readonly customer_id?: number;
  /** Имя покупателя. */
  readonly name?: string;
  /** Контактный телефон.   Всегда возвращает пустую строку `""`. */
  readonly phone?: string;
}

export interface IV3FbsPostingProductExemplarInfoV3 {
  /** Идентификатор экземпляра. */
  readonly exemplar_id?: number;
  /** Обязательная маркировка «Честный ЗНАК». */
  readonly mandatory_mark?: string;
  /** Номер грузовой таможенной декларации (ГТД). */
  readonly gtd?: string;
  /** Признак того, что не указан номер таможенной декларации. */
  readonly is_gtd_absent?: boolean;
  /** Регистрационный номер партии товара (РНПТ). */
  readonly rnpt?: string;
  /** Признак того, что не указан регистрационный номер партии товара (РНПТ). */
  readonly is_rnpt_absent?: boolean;
}

/**
 * Список товаров и экземпляров.
 */
export interface IV3FbsPostingExemplarProductV3 {
  /** Информация по экземплярам. */
  readonly exemplars?: IV3FbsPostingProductExemplarInfoV3[];
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
}

/**
 * Информация по продуктам и их экзмеплярам.
 * 
 * Ответ содержит поле `product_exemplars`, если в запросе передан признак `with.product_exemplars = true`.
 * 
 */
export interface IV3FbsPostingProductExemplarsV3 {
  readonly products?: IV3FbsPostingExemplarProductV3[];
}

/**
 * Размеры товара.
 */
export interface IV3Dimensions {
  /** Высота упаковки. */
  readonly height?: string;
  /** Длина товара. */
  readonly length?: string;
  /** Вес товара в упаковке. */
  readonly weight?: string;
  /** Ширина упаковки. */
  readonly width?: string;
}

/**
 * Размеры товара.
 */
export interface IV3PostingProductDetail {
  readonly dimensions?: IV3Dimensions;
  /** Обязательная маркировка товара. */
  readonly mandatory_mark?: string[];
  /** Название. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Цена товара с учётом скидок — это значение показывается на карточке товара. */
  readonly price?: string;
  /** Уникальный идентификационный номер (УИН) ювелирного изделия. */
  readonly jw_uin?: unknown;
  /** Валюта ваших цен. Совпадает с валютой, которая установлена в настройках личного кабинета.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Признак прослеживаемости товара. */
  readonly is_blr_traceable?: boolean;
  /** Признак выкупа товара. */
  readonly is_marketplace_buyout?: boolean;
  /** Количество товара. */
  readonly quantity?: number;
  /** Идентификатор товара на Ozon. */
  readonly sku?: number;
}

/**
 * Информация об услуге погрузочно-разгрузочных работ. Актуально для КГТ-отправлений с доставкой силами продавца или интегрированной службой.
 */
export interface IFbsPostingDetailPrrOption {
  /** Код услуги погрузочно-разгрузочных работ: - `lift` — подъём на лифте. - `stairs` — подъём по лестнице. - `none` — покупатель отказался от услуги, поднимать товары не нужно. - `delivery_default` — доставка включена в стоимость, по условиям оферты нужно доставить товар на этаж. */
  readonly code?: string;
  /** Стоимость услуги, которую Ozon компенсирует продавцу. */
  readonly price?: string;
  /** Валюта. */
  readonly currency_code?: string;
  /** Этаж, на который нужно поднять товар. */
  readonly floor?: string;
}

/**
 * Связанные отправления.
 */
export interface IV3FbsPostingDetailRelatedPostings {
  /** Список номеров связанных отправлений. */
  readonly related_posting_numbers?: unknown;
}

/**
 * Информация об отправлении.
 */
export interface IV3FbsPostingDetail {
  readonly additional_data?: IV3AdditionalDataItem[];
  readonly addressee?: IV3Addressee;
  readonly analytics_data?: IV3FbsPostingAnalyticsData;
  /** Доступные действия и информация об отправлении: - `arbitration` — открыть спор; - `awaiting_delivery` — перевести в статус «Ожидает отгрузки»; - `can_create_chat` — начать чат с покупателем; - `cancel` — отменить отправление; - `click_track_number` — просмотреть по трек-номеру историю изменения статусов в личном кабинете; - `customer_phone_available` — телефон покупателя; - `has_weight_products` — весовые товары в отправлении; - `hide_region_and_city` — скрыть регион и город покупателя в отчёте; - `invoice_get` —  получить информацию из счёта-фактуры; - `invoice_send` — создать счёт-фактуру; - `invoice_update` — отредактировать счёт-фактуру; - `label_download_big` — скачать большую этикетку; - `label_download_small` — скачать маленькую этикетку; - `label_download` — скачать этикетку; - `non_int_delivered` — перевести в статус «Условно доставлен»; - `non_int_delivering` — перевести в статус «Доставляется»; - `non_int_last_mile` — перевести в статус «Курьер в пути»; - `product_cancel` — отменить часть товаров в отправлении; - `set_cutoff` — необходимо указать дату отгрузки, воспользуйтесь методом [/v1/posting/cutoff/set](#operation/PostingAPI_SetPostingCutoff); - `set_timeslot` — изменить время доставки покупателю; - `set_track_number` — указать или изменить трек-номер; - `ship_async_in_process` — отправление собирается; - `ship_async_retry` — собрать отправление повторно после ошибки сборки; - `ship_async` — собрать отправление; - `ship_with_additional_info` — необходимо заполнить дополнительную информацию; - `ship` — собрать отправление; - `update_cis` — изменить дополнительную информацию. */
  readonly available_actions?: unknown;
  readonly barcodes?: IV3Barcodes;
  readonly cancellation?: IV3Cancellation;
  readonly courier?: IFbsPostingDetailCourier;
  readonly customer?: IV3Customer;
  /** Дата передачи отправления в доставку. */
  readonly delivering_date?: string;
  readonly delivery_method?: IV3DeliveryMethod;
  /** Стоимость доставки. */
  readonly delivery_price?: string;
  readonly financial_data?: IV3PostingFinancialData;
  /** Дата и время начала обработки отправления. */
  readonly in_process_at?: string;
  /** Если использовалась быстрая доставка Ozon Express — `true`. */
  readonly is_express?: boolean;
  /** Признак, что в отправлении есть многокоробочный товар и нужно передать количество коробок для него:  - `true` — до сборки передайте количество коробок через метод [/v3/posting/multiboxqty/set](#operation/PostingAPI_PostingMultiBoxQtySetV3). - `false` — отправление собрано с указанием количества коробок в параметре `multi_box_qty` или в отправлении нет многокоробочного товара. */
  readonly is_multibox?: boolean;
  readonly legal_info?: IV2FboSinglePostingLegalInfo;
  /** Количество коробок, в которые упакован товар. */
  readonly multi_box_qty?: number;
  readonly optional?: IV3FbsPostingDetailOptional;
  /** Идентификатор заказа, к которому относится отправление. */
  readonly order_id?: number;
  /** Номер заказа, к которому относится отправление. */
  readonly order_number?: string;
  /** Номер родительского отправления, в результате разделения которого появилось текущее. */
  readonly parent_posting_number?: string;
  /** Дата и время успешной валидации кода курьера. Чтобы проверить код курьера, воспользуйтесь методом [/v1/posting/fbs/pick-up-code/verify](#operation/PostingAPI_PostingFBSPickupCodeVerify). */
  readonly pickup_code_verified_at?: string;
  /** Номер отправления. */
  readonly posting_number?: string;
  readonly product_exemplars?: IV3FbsPostingProductExemplarsV3;
  /** Массив товаров в отправлении. */
  readonly products?: IV3PostingProductDetail[];
  /** Статус службы доставки. */
  readonly provider_status?: string;
  readonly prr_option?: IFbsPostingDetailPrrOption;
  readonly related_postings?: IV3FbsPostingDetailRelatedPostings;
  readonly requirements?: IV3FbsPostingRequirementsV3;
  /** Дата и время, до которой необходимо собрать отправление. Показываем рекомендованное время отгрузки. По истечении этого времени начнёт применяться новый тариф, информацию о нём уточняйте в поле `tariffication`. */
  readonly shipment_date?: string;
  /** Статус отправления: - `acceptance_in_progress` — идёт приёмка, - `arbitration` — арбитраж, - `awaiting_approve` — ожидает подтверждения, - `awaiting_deliver` — ожидает отгрузки, - `awaiting_packaging` — ожидает упаковки, - `awaiting_registration` — ожидает регистрации, - `awaiting_verification` — создано, - `cancelled` — отменено, - `cancelled_from_split_pending` — отменён из-за разделения отправления, - `client_arbitration` — клиентский арбитраж доставки, - `delivered` — доставлено, - `delivering` — доставляется, - `driver_pickup` — у водителя, - `not_accepted` — не принят на сортировочном центре, - `sent_by_seller` – отправлено продавцом. */
  readonly status?: string;
  /** Подстатус отправления: - `posting_acceptance_in_progress` — идёт приёмка, - `posting_in_arbitration` — арбитраж, - `posting_created` — создано, - `posting_in_carriage` — в перевозке, - `posting_not_in_carriage` — не добавлено в перевозку, - `posting_registered` — зарегистрировано, - `posting_transferring_to_delivery` (`status=awaiting_deliver`) — передаётся в доставку, - `posting_awaiting_passport_data` — ожидает паспортных данных,  - `posting_created` — создано, - `posting_awaiting_registration` — ожидает регистрации, - `posting_registration_error` — ошибка регистрации, - `posting_transferring_to_delivery` (`status=awaiting_registration`) — передаётся курьеру, - `posting_split_pending` — создано, - `posting_canceled` — отменено, - `posting_in_client_arbitration` — клиентский арбитраж доставки, - `posting_delivered` — доставлено, - `posting_received` — получено, - `posting_conditionally_delivered` — условно доставлено, - `posting_in_courier_service` — курьер в пути, - `posting_in_pickup_point` — в пункте выдачи, - `posting_on_way_to_city` — в пути в ваш город, - `posting_on_way_to_pickup_point` — в пути в пункт выдачи, - `posting_returned_to_warehouse` — возвращено на склад, - `posting_transferred_to_courier_service` — передаётся в службу доставки, - `posting_driver_pick_up` — у водителя, - `posting_not_in_sort_center` — не принято на сортировочном центре, - `sent_by_seller` — отправлено продавцом. */
  readonly substatus?: string;
  /** Предыдущий подстатус отправления. Возможные значения: - `posting_acceptance_in_progress` — идёт приёмка, - `posting_in_arbitration` — арбитраж, - `posting_created` — создано, - `posting_in_carriage` — в перевозке, - `posting_not_in_carriage` — не добавлено в перевозку, - `posting_registered` — зарегистрировано, - `posting_transferring_to_delivery` (`status=awaiting_deliver`) — передаётся в доставку, - `posting_awaiting_passport_data` — ожидает паспортных данных,  - `posting_created` — создано, - `posting_awaiting_registration` — ожидает регистрации, - `posting_registration_error` — ошибка регистрации, - `posting_transferring_to_delivery` (`status=awaiting_registration`) — передаётся курьеру, - `posting_split_pending` — создано, - `posting_canceled` — отменено, - `posting_in_client_arbitration` — клиентский арбитраж доставки, - `posting_delivered` — доставлено, - `posting_received` — получено, - `posting_conditionally_delivered` — условно доставлено, - `posting_in_courier_service` — курьер в пути, - `posting_in_pickup_point` — в пункте выдачи, - `posting_on_way_to_city` — в пути в ваш город, - `posting_on_way_to_pickup_point` — в пути в пункт выдачи, - `posting_returned_to_warehouse` — возвращено на склад, - `posting_transferred_to_courier_service` — передаётся в службу доставки, - `posting_driver_pick_up` — у водителя, - `posting_not_in_sort_center` — не принято на сортировочном центре, - `sent_by_seller` — отправлено продавцом. */
  readonly previous_substatus?: string;
  /** Тип интеграции со службой доставки:   - `ozon` — доставка через Ozon логистику.   - `aggregator` — доставка внешней службой, Ozon регистрирует заказ.   - `3pl_tracking` — доставка внешней службой, продавец регистрирует заказ.   - `non_integrated` — доставка силами продавца. */
  readonly tpl_integration_type?: string;
  /** Трек-номер отправления. */
  readonly tracking_number?: string;
  /** Информация по тарификации отгрузки. */
  readonly tariffication?: IV3FbsTariffication[];
}

export interface IV3GetFbsPostingResponseV3 {
  readonly result?: IV3FbsPostingDetail;
}

export interface IPostingGetFbsPostingByBarcodeRequest {
  /** Штрихкод отправления. Можно получить с помощью методов: [/v3/posting/fbs/get](#operation/PostingAPI_GetFbsPostingV3), [/v3/posting/fbs/list](#operation/PostingAPI_GetFbsPostingListV3) и [/v3/posting/fbs/unfulfilled/list](#operation/PostingAPI_GetFbsPostingUnfulfilledList) в массиве `barcodes`. */
  readonly barcode?: string;
}

/**
 * Аналитические данные.
 */
export interface IFbsPostingFbsPostingAnalyticsData {
  /** Город доставки. */
  readonly city?: string;
  /** Способ доставки. */
  readonly delivery_type?: string;
  /** Признак, что получатель юридическое лицо:   - `true` — юридическое лицо,   - `false` — физическое лицо. */
  readonly is_legal?: boolean;
  /** Наличие подписки Premium. */
  readonly is_premium?: boolean;
  /** Способ оплаты:  - `картой онлайн`, - `Ozon Карта`, - `автосписание с Ozon Карты при выдаче`, - `сохранённой картой при получении`, - `Система Быстрых Платежей`,  - `Ozon Рассрочка`,  - `оплата на расчётный счёт`, - `SberPay`. */
  readonly payment_type_group_name?: string;
  /** Регион доставки. */
  readonly region?: string;
}

/**
 * Штрихкоды отправления.
 */
export interface IFbsPostingBarcodes {
  /** Нижний штрихкод на маркировке отправления. */
  readonly lower_barcode?: string;
  /** Верхний штрихкод на маркировке отправления. */
  readonly upper_barcode?: string;
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

export interface IV2FbsPostingProduct {
  /** Название товара. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Цена товара. */
  readonly price?: string;
  /** Количество товара в отправлении. */
  readonly quantity?: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
}

/**
 * Результаты запроса.
 */
export interface IV2FbsPosting {
  readonly analytics_data?: IFbsPostingFbsPostingAnalyticsData;
  readonly barcodes?: IFbsPostingBarcodes;
  /** Идентификатор причины отмены отправления. */
  readonly cancel_reason_id?: number;
  /** Дата и время создания отправления. */
  readonly created_at?: string;
  readonly financial_data?: IV2PostingFinancialData;
  /** Дата и время начала обработки отправления. */
  readonly in_process_at?: string;
  /** Идентификатор заказа, к которому относится отправление. */
  readonly order_id?: number;
  /** Номер заказа, к которому относится отправление. */
  readonly order_number?: string;
  /** Номер отправления. */
  readonly posting_number?: string;
  /** Список товаров в отправлении. */
  readonly products?: IV2FbsPostingProduct[];
  /** Дата и время, до которой необходимо собрать отправление. Если отправление не собрать к этой дате — оно автоматически отменится. */
  readonly shipment_date?: string;
  /** Статус отправления. */
  readonly status?: string;
}

/**
 * Информация об отправлении.
 */
export interface IV2FbsPostingResponse {
  readonly result?: IV2FbsPosting;
}

export interface IPostingv3PostingMultiBoxQtySetV3Request {
  /** Идентификатор многокоробочного отправления. */
  readonly posting_number: string;
  /** Количество коробок, в которые упакован товар. */
  readonly multi_box_qty: number;
}

/**
 * Результат передачи количества коробок.
 */
export interface IPostingv3PostingMultiBoxQtySetV3ResponseResult {
  /** Возможные значения: - `true` — значение передано успешно. - `false` — при передаче произошла ошибка. Попробуйте снова. */
  readonly result?: boolean;
}

export interface IPostingv3PostingMultiBoxQtySetV3Response {
  readonly result?: IPostingv3PostingMultiBoxQtySetV3ResponseResult;
}

export interface IPostingProductChangeRequestItem {
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku: number;
  /** Вес единиц товара в отправлении. */
  readonly weightReal: number[];
}

export interface IPostingPostingProductChangeRequest {
  /** Информация о товарах. */
  readonly items: IPostingProductChangeRequestItem[];
  /** Идентификатор отправления. */
  readonly posting_number: string;
}

export interface IPostingPostingProductChangeResponse {
  /** Идентификатор отправления. */
  readonly result?: string;
}

export interface IV2FbsPostingProductCountryListRequest {
  /** Фильтрация по строке. */
  readonly name_search?: string;
}

export interface IV2FbsPostingProductCountryListResponseResult {
  /** Название страны на русском языке. */
  readonly name?: string;
  /** ISO код страны. */
  readonly country_iso_code?: string;
}

export interface IV2FbsPostingProductCountryListResponse {
  /** Список стран-изготовителей и ISO коды. */
  readonly result?: IV2FbsPostingProductCountryListResponseResult[];
}

export interface IGooglerpcStatus {
  /** Код ошибки. */
  readonly code?: number;
  /** Дополнительная информация об ошибке. */
  readonly details?: IProtobufAny[];
  /** Описание ошибки. */
  readonly message?: string;
}

export interface IV2FbsPostingProductCountrySetRequest {
  /** Номер отправления. */
  readonly posting_number: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id: number;
  /** Двухбуквенный код добавляемой страны по стандарту ISO_3166-1.  Список доступных стран-изготовителей и их ISO коды можно получить с помощью метода [/v2/posting/fbs/product/country/list](#operation/PostingAPI_ListCountryProductFbsPostingV2). */
  readonly country_iso_code: string;
}

export interface IV2FbsPostingProductCountrySetResponse {
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Признак того, что необходимо передать номер грузовой таможенной декларации (ГТД) для продукта и отправления. */
  readonly is_gtd_needed?: boolean;
}

export interface IV1GetRestrictionsRequest {
  /** Номер отправления, для которого нужно определить ограничения. */
  readonly posting_number: string;
}

export interface IV1Restriction {
  /** Номер отправления. */
  readonly posting_number?: string;
  /** Ограничение по максимальному весу в граммах. */
  readonly max_posting_weight?: number;
  /** Ограничение по минимальному весу в граммах. */
  readonly min_posting_weight?: number;
  /** Ограничение по ширине в сантиметрах. */
  readonly width?: number;
  /** Ограничение по длине в сантиметрах. */
  readonly length?: number;
  /** Ограничение по высоте в сантиметрах. */
  readonly height?: number;
  /** Ограничение по максимальной стоимости отправления в рублях. */
  readonly max_posting_price?: number;
  /** Ограничение по минимальной стоимости отправления в рублях. */
  readonly min_posting_price?: number;
}

export interface IV1GetRestrictionsResponse {
  readonly result?: IV1Restriction;
}

export interface IPostingPostingFBSPackageLabelRequest {
  /** Идентификатор отправления. */
  readonly posting_number: string[];
}

export interface IPostingPostingFBSPackageLabelResponse {
  /** Содержание файла в бинарном виде. */
  readonly file_content?: string;
  /** Название файла. */
  readonly file_name?: string;
  /** Тип файла. */
  readonly content_type?: string;
}

export interface IV1CreateLabelBatchRequest {
  /** Номера отправлений, для которых нужны этикетки. */
  readonly posting_number: unknown;
}

/**
 * Результат работы метода.
 */
export interface IV1CreateLabelBatchResponseResult {
  /** Идентификатор задания на формирование этикеток. */
  readonly task_id?: number;
}

export interface IV1CreateLabelBatchResponse {
  readonly result?: IV1CreateLabelBatchResponseResult;
}

export interface IV2CreateLabelBatchResponseResultTasks {
  /** Идентификатор задания на формирование этикеток. В зависимости от типа этикетки передайте значение в метод [/v1/posting/fbs/package-label/get](#operation/PostingAPI_GetLabelBatch). */
  readonly task_id?: number;
  /** Тип задания на формирование этикеток: - `big_label` — для обычной этикетки, - `small_label` — для маленькой этикетки. */
  readonly task_type?: string;
}

/**
 * Результат работы метода.
 */
export interface IV2CreateLabelBatchResponseResult {
  /** Список заданий. */
  readonly tasks?: IV2CreateLabelBatchResponseResultTasks[];
}

export interface IV2CreateLabelBatchResponse {
  readonly result?: IV2CreateLabelBatchResponseResult;
}

export interface IV1GetLabelBatchRequest {
  /** Номер задания на формирование этикеток из ответа метода [/v1/posting/fbs/package-label/create](#operation/PostingAPI_CreateLabelBatch). */
  readonly task_id: number;
}

/**
 * Результат работы метода.
 */
export interface IV1GetLabelBatchResponseResult {
  /** Код ошибки. */
  readonly error?: string;
  /** Ссылка на файл с этикетками. */
  readonly file_url?: string;
  /** Статус формирования этикеток: - `pending` — задание в очереди. - `in_progress` — формируются. - `completed` — файл с этикетками готов. - `error` — при формировании файла произошла ошибка. */
  readonly status?: string;
}

export interface IV1GetLabelBatchResponse {
  readonly result?: IV1GetLabelBatchResponseResult;
}

export interface IPostingCancelReasonRequest {
  /** Номера отправлений. */
  readonly related_posting_numbers: string[];
}

export interface IRelatedPostingCancelReasons {
  /** Идентификатор причины отмены: - `352` — товар закончился на складе продавца.  - `400` — остался только бракованный товар. - `401` — продавец отклонил арбитраж. - `402` — другое (вина продавца). - `665` — покупатель не забрал заказ. - `666` — возврат из службы доставки: нет доставки в указанный регион. - `667` — заказ утерян службой доставки. */
  readonly id?: number;
  /** Описание причины отмены. */
  readonly title?: string;
  /** Инициатор отмены отправления:    - `buyer` — покупатель,   - `seller` — продавец. */
  readonly type_id?: string;
}

export interface IRelatedPostingCancelReason {
  /** Номер отправления. */
  readonly posting_number?: string;
  /** Информация о причинах отмены. */
  readonly reasons?: IRelatedPostingCancelReasons[];
}

export interface IPostingCancelReasonResponse {
  /** Результат запроса. */
  readonly result?: IRelatedPostingCancelReason[];
}

export interface IPostingCancelReason {
  /** Идентификатор причины отмены. */
  readonly id?: number;
  /** Результат отмены отправления. `true`, если запрос доступен для отмены. */
  readonly is_available_for_cancellation?: boolean;
  /** Название категории. */
  readonly title?: string;
  /** Инициатор отмены отправления: - `buyer` — покупатель, - `seller` — продавец. */
  readonly type_id?: string;
}

export interface IPostingCancelReasonListResponse {
  /** Результат работы метода. */
  readonly result?: IPostingCancelReason[];
}

export interface IPostingProductCancelRequestItem {
  /** Количество товара в отправлении. */
  readonly quantity: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku: number;
}

export interface IPostingPostingProductCancelRequest {
  /** Идентификатор причины отмены отправления товара. */
  readonly cancel_reason_id: number;
  /** Обязательное поле. Дополнительная информация по отмене. */
  readonly cancel_reason_message: string;
  /** Информация о товарах. */
  readonly items: IPostingProductCancelRequestItem[];
  /** Идентификатор отправления. */
  readonly posting_number: string;
}

export interface IPostingPostingProductCancelResponse {
  /** Номер отправления. */
  readonly result?: string;
}

export interface IPostingCancelFbsPostingRequest {
  /** Идентификатор причины отмены отправления. */
  readonly cancel_reason_id?: number;
  /** Дополнительная информация по отмене. Если `cancel_reason_id = 402`, параметр обязательный. */
  readonly cancel_reason_message?: string;
  /** Идентификатор отправления. */
  readonly posting_number?: string;
}

export interface IPostingBooleanResponse {
  /** Результат обработки запроса. `true`, если запрос выполнился без ошибок. */
  readonly result?: boolean;
}

export interface IPostingMovePostingRequest {
  /** Идентификатор отправления. */
  readonly posting_number: string[];
}

export interface IV2MovePostingToAwaitingDeliveryRequest {
  /** Идентификатор отправления. Максимальное количество в одном запросе — 100. */
  readonly posting_number: string[];
}

export interface IV1PostingFBSPickupCodeVerifyRequest {
  /** Код курьера. */
  readonly pickup_code: string;
  /** Номер отправления. */
  readonly posting_number: string;
}

export interface IV1PostingFBSPickupCodeVerifyResponse {
  /** `true`, если код корректный. */
  readonly valid?: boolean;
}

/**
 * Фильтр по периоду создания деклараций.
 */
export interface IGetEtgbRequestDate {
  /** Дата начала. */
  readonly from: string;
  /** Дата окончания. */
  readonly to: string;
}

export interface IV1GetEtgbRequest {
  readonly date: IGetEtgbRequestDate;
}

/**
 * Информация о декларации.
 */
export interface IGetEtgbResponseResultEtgb {
  /** Номер. */
  readonly number?: string;
  /** Дата создания. */
  readonly date?: string;
  /** Ссылка на файл.  Если поле пустое и вам нужен файл, обратитесь в поддержку Ozon. */
  readonly url?: string;
}

export interface IGetEtgbResponseResult {
  /** Номер отправления. */
  readonly posting_number?: string;
  readonly etgb?: IGetEtgbResponseResultEtgb;
}

export interface IV1GetEtgbResponse {
  /** Результат запроса. */
  readonly result?: IGetEtgbResponseResult[];
}

export interface IV1PostingUnpaidLegalProductListRequest {
  /** Указатель для выборки следующих данных. */
  readonly cursor?: string;
  /** Количество значений в ответе. */
  readonly limit?: number;
}

export interface IV1PostingUnpaidLegalProductListResponseProducts {
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Количество экземпляров. */
  readonly quantity?: number;
  /** Название товара. */
  readonly name?: string;
  /** Ссылка на изображение товара. */
  readonly image_url?: string;
}

export interface IV1PostingUnpaidLegalProductListResponse {
  /** Список неоплаченных товаров. */
  readonly products?: IV1PostingUnpaidLegalProductListResponseProducts[];
  /** Указатель для выборки следующих данных. */
  readonly cursor?: string;
}
