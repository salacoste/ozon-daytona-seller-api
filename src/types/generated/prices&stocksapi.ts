/**
 * Generated types for Prices&StocksAPI (Prices&StocksAPI)
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: 10-prices-stocksapi.json
 * Endpoints: 9
 * Schemas: 46
 */

export interface IProductv2ProductsStocksRequestStock {
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id: number;
  /** Количество товара в наличии без учёта зарезервированных товаров. */
  readonly stock: number;
  /** Идентификатор склада, полученный из метода [/v1/warehouse/list](#operation/WarehouseAPI_WarehouseList). */
  readonly warehouse_id: number;
}

export interface IProductv2ProductsStocksRequest {
  /** Информация о товарах на складах. */
  readonly stocks: IProductv2ProductsStocksRequestStock[];
}

export interface IProductv2ProductsStocksResponseError {
  /** Код ошибки. */
  readonly code?: string;
  /** Причина ошибки. */
  readonly message?: string;
}

export interface IProductv2ProductsStocksResponseResult {
  /** Массив ошибок, которые возникли при обработке запроса. */
  readonly errors?: IProductv2ProductsStocksResponseError[];
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Если запрос выполнен успешно и остатки обновлены — `true`. */
  readonly updated?: boolean;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
}

/**
 * Результаты запроса.
 */
export interface IProductv2ProductsStocksResponse {
  readonly result?: IProductv2ProductsStocksResponseResult[];
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
 * Фильтр по видимости товара:
 *   - `ALL` — все товары.
 *   - `VISIBLE` — товары, которые видны покупателям.
 *   - `INVISIBLE` — товары, которые не видны покупателям.
 *   - `EMPTY_STOCK` — товары, у которых не указано наличие.
 *   - `NOT_MODERATED` — товары, которые не прошли модерацию.
 *   - `MODERATED` — товары, которые прошли модерацию.
 *   - `DISABLED` — товары, которые видны покупателям, но недоступны к покупке.
 *   - `STATE_FAILED` — товары, создание которых завершилось ошибкой.
 *   - `READY_TO_SUPPLY` — товары, готовые к поставке.
 *   - `VALIDATION_STATE_PENDING` — товары, которые проходят проверку валидатором на премодерации.
 *   - `VALIDATION_STATE_FAIL` — товары, которые не прошли проверку валидатором на премодерации.
 *   - `VALIDATION_STATE_SUCCESS` — товары, которые прошли проверку валидатором на премодерации.
 *   - `TO_SUPPLY` — товары, готовые к продаже.
 *   - `IN_SALE` — товары в продаже.
 *   - `REMOVED_FROM_SALE` — товары, скрытые от покупателей.
 *   - `BANNED` — заблокированные товары.
 *   - `OVERPRICED` — товары с завышенной ценой.
 *   - `CRITICALLY_OVERPRICED` — товары со слишком завышенной ценой.
 *   - `EMPTY_BARCODE` — товары без штрихкода.
 *   - `BARCODE_EXISTS` — товары со штрихкодом.
 *   - `QUARANTINE` — товары на карантине после изменения цены более чем на 50%.
 *   - `ARCHIVED` — товары в архиве.
 *   - `OVERPRICED_WITH_STOCK` — товары в продаже со стоимостью выше, чем у конкурентов.
 *   - `PARTIAL_APPROVED` — товары в продаже с пустым или неполным описанием.
 * 
 */
export type IV4Visibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'BANNED' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';

/**
 * Товары по тарифу «Эконом».
 */
export interface IFilterWithQuant {
  /** Активные эконом-товары. */
  readonly created?: boolean;
  /** Эконом-товары во всех статусах. */
  readonly exists?: boolean;
}

/**
 * Фильтр по товарам.
 */
export interface IV4GetProductInfoStocksRequestFilter {
  /** Фильтр по параметру `offer_id`. Можно передавать список значений. */
  readonly offer_id?: string[];
  /** Фильтр по параметру `product_id`. Можно передавать список значений. */
  readonly product_id?: string[];
  readonly visibility?: IV4Visibility;
  readonly with_quant?: IFilterWithQuant;
}

export interface IV4GetProductInfoStocksRequest {
  /** Указатель для выборки следующих данных. */
  readonly cursor?: string;
  readonly filter: IV4GetProductInfoStocksRequestFilter;
  /** Количество значений на странице. Минимум — 1, максимум — 1000. */
  readonly limit: number;
}

/**
 * Тип упаковки:
 * - `SHIPMENT_TYPE_GENERAL` — обычный товар;
 * - `SHIPMENT_TYPE_BOX` — коробка;
 * - `SHIPMENT_TYPE_PALLET` — палета.
 * 
 */
export type IStockShipmentType = 'SHIPMENT_TYPE_GENERAL' | 'SHIPMENT_TYPE_BOX' | 'SHIPMENT_TYPE_PALLET';

export interface IGetProductInfoStocksResponseStock {
  /** Сейчас на складе. */
  readonly present?: number;
  /** Зарезервировано. */
  readonly reserved?: number;
  readonly shipment_type?: IStockShipmentType;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
  /** Тип склада. */
  readonly type?: string;
  /** Идентификаторы складов, на которых хранился или хранится товар. */
  readonly warehouse_ids?: string[];
}

export interface IV4GetProductInfoStocksResponseItem {
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Информация об остатках. */
  readonly stocks?: IGetProductInfoStocksResponseStock[];
}

export interface IV4GetProductInfoStocksResponse {
  /** Указатель для выборки следующих данных. */
  readonly cursor?: string;
  /** Информация о товарах. */
  readonly items?: IV4GetProductInfoStocksResponseItem[];
  /** Количество уникальных товаров, для которых выводится информация об остатках. */
  readonly total?: number;
}

export interface IProductsv1GetProductInfoStocksByWarehouseFbsRequest {
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku: unknown;
}

export interface IProductsv1GetProductInfoStocksByWarehouseFbsResponseResult {
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
  /** Общее количество товара на складе. */
  readonly present?: number;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly product_id?: number;
  /** Количество зарезервированных товаров на складе. */
  readonly reserved?: number;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
  /** Название склада. */
  readonly warehouse_name?: string;
}

export interface IProductsv1GetProductInfoStocksByWarehouseFbsResponse {
  /** Результат работы метода. */
  readonly result?: unknown;
}

export interface IProductImportProductsPricesRequestPrice {
  /** Атрибут для включения и выключения автоматического применения к товару доступных акций Ozon: - `ENABLED` — включить; - `DISABLED` — выключить; - `UNKNOWN` — ничего не менять, передаётся по умолчанию.  Например, если ранее вы включили автодобавление и не хотите выключать его, передавайте `UNKNOWN`.  Если вы передаёте `ENABLED` в этом параметре, установите значение минимальной цены в параметре `min_price`. Цена не опустится ниже минимальной. */
  readonly auto_action_enabled?: 'UNKNOWN' | 'ENABLED' | 'DISABLED';
  /** Атрибут для включения и выключения автодобавления товара в акции: - `ENABLED` — включить; - `DISABLED` — выключить; - `UNKNOWN` — ничего не менять, передаётся по умолчанию.  Например, если ранее вы включили автодобавление товара в акции и не хотите выключать его, передавайте `UNKNOWN`. */
  readonly auto_add_to_ozon_actions_list_enabled?: 'UNKNOWN' | 'ENABLED' | 'DISABLED';
  /** Валюта ваших цен. Переданное значение должно совпадать с валютой, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.  Например, если у вас установлена валюта взаиморасчётов юань, передавайте значение `CNY`, иначе вернётся ошибка.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Минимальная цена товара после применения акций. */
  readonly min_price?: string;
  /** `true`, если Ozon учитывает минимальную цену при добавлении в акции. Если ничего не передать, изменений в статусе учёта цены не будет. */
  readonly min_price_for_auto_actions_enabled?: boolean;
  /** Себестоимость товара. */
  readonly net_price?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Цена до скидок (зачеркнута на карточке товара). Указывается в рублях. Разделитель дробной части — точка, до двух знаков после точки.  Если на товар нет скидок, укажите значение `0` в этом поле, а текущую цену передайте в поле `price`. */
  readonly old_price?: string;
  /** Цена товара с учётом скидок, отображается на карточке товара.  Если значение параметра `old_price` больше 0, между `price` и `old_price` должна быть определённая разница. Она зависит от значения `price`.  | Значение `price` | Минимальная разница | |---|---| | < 400 | 20 рублей | | 400–10 000 | 5% | | > 10 000 | 500 рублей | */
  readonly price?: string;
  /** Атрибут для автоприменения стратегий цены: - `ENABLED` — включить; - `DISABLED` — выключить; - `UNKNOWN` — ничего не менять, передаётся по умолчанию.  Если ранее вы включили автоприменение стратегий цены и не хотите выключать его, передавайте `UNKNOWN` в следующих запросах.  Если вы передаёте `ENABLED` в этом параметре, установите значение минимальной цены в параметре `min_price`.  Если вы передаёте `DISABLED` в этом параметре, товар удаляется из стратегии. */
  readonly price_strategy_enabled?: 'UNKNOWN' | 'ENABLED' | 'DISABLED';
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Используйте параметр, если у обычного и эконом-товара совпадает артикул — `offer_id = quant_id`. Чтобы обновить цену: - обычного товара — передайте значение `1`; - эконом-товара — передайте размер его кванта.  Если у обычного и эконом-товара разные артикулы, не передавайте параметр. */
  readonly quant_size?: number;
  /** Ставка НДС для товара:   - `0` — не облагается НДС,   - `0.05` — 5%,   - `0.07` — 7%,   - `0.1` — 10%,   - `0.2` — 20%.  Передавайте значение ставки, актуальное на данный момент. */
  readonly vat?: string;
}

export interface IProductImportProductsPricesRequest {
  /** Информация о ценах товаров. */
  readonly prices?: IProductImportProductsPricesRequestPrice[];
}

export interface IProductImportProductsPricesResponseError {
  /** Код ошибки. */
  readonly code?: string;
  /** Причина ошибки. */
  readonly message?: string;
}

export interface IProductImportProductsPricesResponseProcessResult {
  /** Массив ошибок, которые возникли при обработке запроса. */
  readonly errors?: IProductImportProductsPricesResponseError[];
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Если информации о товаре успешно обновлена — `true`. */
  readonly updated?: boolean;
}

export interface IProductImportProductsPricesResponse {
  /** Результаты запроса. */
  readonly result?: IProductImportProductsPricesResponseProcessResult[];
}

export interface IV1ProductActionTimerUpdateRequest {
  /** Список идентификаторов товаров в системе продавца — `product_id`. */
  readonly product_ids?: unknown;
}

export type IV1ProductActionTimerUpdateResponse = Record<string, unknown>;

export interface IV1ProductActionTimerStatusRequest {
  /** Список идентификаторов товаров в системе продавца — `product_id`. */
  readonly product_ids?: unknown;
}

export interface IV1ProductActionTimerStatusResponseStatuses {
  /** Время окончания таймера. */
  readonly expired_at?: string;
  /** `true`, если Ozon учитывает минимальную цену при добавлении в акции. */
  readonly min_price_for_auto_actions_enabled?: boolean;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
}

export interface IV1ProductActionTimerStatusResponse {
  readonly statuses?: unknown;
}

/**
 * Фильтр по видимости товара:
 *   - `ALL` — все товары.
 *   - `VISIBLE` — товары, которые видны покупателям.
 *   - `INVISIBLE` — товары, которые не видны покупателям.
 *   - `EMPTY_STOCK` — товары, у которых не указано наличие.
 *   - `NOT_MODERATED` — товары, которые не прошли модерацию.
 *   - `MODERATED` — товары, которые прошли модерацию.
 *   - `DISABLED` — товары, которые видны покупателям, но недоступны к покупке.
 *   - `STATE_FAILED` — товары, создание которых завершилось ошибкой.
 *   - `READY_TO_SUPPLY` — товары, готовые к поставке.
 *   - `VALIDATION_STATE_PENDING` — товары, которые проходят проверку валидатором на премодерации.
 *   - `VALIDATION_STATE_FAIL` — товары, которые не прошли проверку валидатором на премодерации.
 *   - `VALIDATION_STATE_SUCCESS` — товары, которые прошли проверку валидатором на премодерации.
 *   - `TO_SUPPLY` — товары, готовые к продаже.
 *   - `IN_SALE` — товары в продаже.
 *   - `REMOVED_FROM_SALE` — товары, скрытые от покупателей.
 *   - `OVERPRICED` — товары с завышенной ценой.
 *   - `CRITICALLY_OVERPRICED` — товары со слишком завышенной ценой.
 *   - `EMPTY_BARCODE` — товары без штрихкода.
 *   - `BARCODE_EXISTS` — товары со штрихкодом.
 *   - `QUARANTINE` — товары на карантине после изменения цены более чем на 50%.
 *   - `ARCHIVED` — товары в архиве.
 *   - `OVERPRICED_WITH_STOCK` — товары в продаже со стоимостью выше, чем у конкурентов.
 *   - `PARTIAL_APPROVED` — товары в продаже с пустым или неполным описанием.
 * 
 */
export type IProductv5GetProductListRequestFilterFilterVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';

/**
 * Фильтр по товарам.
 */
export interface IProductv5Filter {
  /** Фильтр по параметру `offer_id`. Можно передавать до 1000 значений. */
  readonly offer_id?: unknown;
  /** Фильтр по параметру `product_id`. Можно передавать до 1000 значений. */
  readonly product_id?: unknown;
  readonly visibility?: IProductv5GetProductListRequestFilterFilterVisibility;
}

export interface IProductv5GetProductInfoPricesV5Request {
  /** Указатель для выборки следующих данных. */
  readonly cursor?: string;
  readonly filter: IProductv5Filter;
  /** Количество значений на странице. */
  readonly limit: number;
}

/**
 * Информация о комиссиях.
 */
export interface IItemCommissionsv5 {
  /** Последняя миля (FBO). */
  readonly fbo_deliv_to_customer_amount?: number;
  /** Магистраль до (FBO). */
  readonly fbo_direct_flow_trans_max_amount?: number;
  /** Магистраль от (FBO). */
  readonly fbo_direct_flow_trans_min_amount?: number;
  /** Комиссия за возврат и отмену (FBO). */
  readonly fbo_return_flow_amount?: number;
  /** Последняя миля (FBS). */
  readonly fbs_deliv_to_customer_amount?: number;
  /** Магистраль до (FBS). */
  readonly fbs_direct_flow_trans_max_amount?: number;
  /** Магистраль от (FBS). */
  readonly fbs_direct_flow_trans_min_amount?: number;
  /** Максимальная комиссия за обработку отправления (FBS).  [Подробнее о тарифах в Базе знаний продавца](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/rashody-na-dop-uslugi#выезд-транспортного-средства-по-адресу-продавца-для-забора-отправлении-(pick-up)) */
  readonly fbs_first_mile_max_amount?: number;
  /** Минимальная комиссия за обработку отправления (FBS).  [Подробнее о тарифах в Базе знаний продавца](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/rashody-na-dop-uslugi#выезд-транспортного-средства-по-адресу-продавца-для-забора-отправлении-(pick-up)) */
  readonly fbs_first_mile_min_amount?: number;
  /** Комиссия за возврат и отмену, обработка отправления (FBS). */
  readonly fbs_return_flow_amount?: number;
  /** Процент комиссии за продажу (FBO). */
  readonly sales_percent_fbo?: number;
  /** Процент комиссии за продажу (FBS). */
  readonly sales_percent_fbs?: number;
}

export interface IMarketingAction {
  /** Дата и время начала акции продавца. */
  readonly date_from?: string;
  /** Дата и время окончания акции продавца. */
  readonly date_to?: string;
  /** Название акции продавца. */
  readonly title?: string;
  /** Скидка по акции продавца. */
  readonly value?: string;
}

/**
 * Маркетинговые акции продавца.
 */
export interface IItemMarketing {
  /** Маркетинговые акции продавца. Параметры `date_from`, `date_to`, `title` и `value` указываются для каждой акции продавца. */
  readonly actions?: IMarketingAction[];
  /** Дата и время начала текущего периода по всем действующим акциям. */
  readonly current_period_from?: string;
  /** Дата и время окончания текущего периода по всем действующим акциям. */
  readonly current_period_to?: string;
  /** `true`, если к товару можно применить акцию за счёт Ozon. */
  readonly ozon_actions_exist?: boolean;
}

/**
 * Цена товара.
 */
export interface IItemPricev5 {
  /** `true`, если автоприменение акций у товара включено. */
  readonly auto_action_enabled?: boolean;
  /** `true`, если автодобавление товара в акции включено. */
  readonly auto_add_to_ozon_actions_list_enabled?: boolean;
  /** Валюта ваших цен. Совпадает с валютой, которая установлена в настройках личного кабинета.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Цена на товар с учётом всех акций, которая будет указана на витрине Ozon, без учёта скидки по Ozon Карте. */
  readonly marketing_price?: number;
  /** Цена на товар с учётом акций продавца. */
  readonly marketing_seller_price?: number;
  /** Минимальная цена товара после применения всех скидок. */
  readonly min_price?: number;
  /** Себестоимость товара. */
  readonly net_price?: number;
  /** Цена до учёта скидок. На карточке товара отображается зачёркнутой. */
  readonly old_price?: number;
  /** Цена товара с учётом скидок — это значение показывается на карточке товара. */
  readonly price?: number;
  /** Цена поставщика. */
  readonly retail_price?: number;
  /** Ставка НДС для товара. */
  readonly vat?: number;
}

/**
 * Цена товара у конкурентов на других площадках.
 */
export interface IPriceIndexesIndexExternalData {
  /** Минимальная цена товара у конкурентов на другой площадке. */
  readonly min_price?: string;
  /** Валюта цены. */
  readonly min_price_currency?: string;
  /** Значение индекса цены. */
  readonly price_index_value?: number;
}

/**
 * Цена товара у конкурентов на Ozon.
 */
export interface IPriceIndexesIndexOzonData {
  /** Минимальная цена товара у конкурентов на Ozon. */
  readonly min_price?: string;
  /** Валюта цены. */
  readonly min_price_currency?: string;
  /** Значение индекса цены. */
  readonly price_index_value?: number;
}

/**
 * Цена вашего товара на других площадках.
 */
export interface IPriceIndexesIndexSelfData {
  /** Минимальная цена вашего товара на других площадках. */
  readonly min_price?: string;
  /** Валюта цены. */
  readonly min_price_currency?: string;
  /** Значение индекса цены. */
  readonly price_index_value?: number;
}

/**
 * Индексы цены товара.
 * 
 * [Подробнее об индексе цен в Базе знаний продавца](https://seller-edu.ozon.ru/seller-rating/metrics/price-index)
 * 
 */
export interface IGetProductInfoPricesResponseItemPriceIndexes {
  /** Итоговый индекс цены товара: - `WITHOUT_INDEX` — нет индекса,  - `GREEN` — выгодный, - `YELLOW` — умеренный,  - `RED` — невыгодный. */
  readonly color_index?: 'WITHOUT_INDEX' | 'GREEN' | 'YELLOW' | 'RED';
  readonly external_index_data?: IPriceIndexesIndexExternalData;
  readonly ozon_index_data?: IPriceIndexesIndexOzonData;
  readonly self_marketplaces_index_data?: IPriceIndexesIndexSelfData;
}

export interface IProductGetProductInfoPricesV5ResponseItem {
  /** Максимальная комиссия за эквайринг.  [Подробнее об эквайринге в Базе знаний продавца](https://seller-edu.ozon.ru/commissions-tariffs/commissions-tariffs-ozon/rashody-na-dop-uslugi#экваиринг) */
  readonly acquiring?: number;
  readonly commissions?: IItemCommissionsv5;
  /** Маркетинговые акции продавца. */
  readonly marketing_actions?: IItemMarketing;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  readonly price?: IItemPricev5;
  readonly price_indexes?: IGetProductInfoPricesResponseItemPriceIndexes;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Объёмный вес товара. */
  readonly volume_weight?: number;
}

export interface IProductv5GetProductInfoPricesV5Response {
  /** Указатель для выборки следующих данных. */
  readonly cursor?: string;
  /** Список товаров. */
  readonly items?: unknown;
  /** Количество товаров в списке. */
  readonly total?: number;
}

export interface IV1GetProductInfoDiscountedRequest {
  /** Список SKU уценённых товаров. */
  readonly discounted_skus: unknown;
}

export interface IV1GetProductInfoDiscountedResponseItem {
  /** Комментарий к причине повреждения. */
  readonly comment_reason_damaged?: string;
  /** Состояние товара — новый или Б/У. */
  readonly condition?: string;
  /** Состояние товара по шкале от 1 до 7: - 1 — удовлетворительное, - 2 — хорошее, - 3 — очень хорошее, - 4 — отличное, - 5–7 — как новый. */
  readonly condition_estimation?: string;
  /** Дефекты товара. */
  readonly defects?: string;
  /** SKU уценённого товара. */
  readonly discounted_sku?: number;
  /** Описание механического повреждения. */
  readonly mechanical_damage?: string;
  /** Описание повреждения упаковки. */
  readonly package_damage?: string;
  /** Признак нарушения целостности упаковки. */
  readonly packaging_violation?: string;
  /** Причина повреждения. */
  readonly reason_damaged?: string;
  /** Признак, что товар отремонтирован. */
  readonly repair?: string;
  /** Признак, что товар некомплектный. */
  readonly shortage?: string;
  /** SKU основного товара. */
  readonly sku?: number;
  /** Наличие у товара действующей гарантии. */
  readonly warranty_type?: string;
}

export interface IV1GetProductInfoDiscountedResponse {
  /** Информация об уценке и основном товаре. */
  readonly items?: unknown;
}

export interface IV1ProductUpdateDiscountRequest {
  /** Размер скидки: от 3 до 99 процентов. */
  readonly discount: number;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id: number;
}

export interface IV1ProductUpdateDiscountResponse {
  /** Результат работы метода. `true`, если запрос выполнен без ошибок. */
  readonly result?: boolean;
}
