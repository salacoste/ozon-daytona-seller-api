/**
 * Generated types for ProductAPI (ProductAPI)
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: 03-productapi.json
 * Endpoints: 18
 * Schemas: 105
 */

export interface IV3ImportProductsRequestDictionaryValue {
  /** Идентификатор справочника. */
  readonly dictionary_value_id?: number;
  /** Значение из справочника. */
  readonly value?: string;
}

export interface IV3ImportProductsRequestAttribute {
  /** Идентификатор характеристики, которая поддерживает вложенные свойства. Например, у характеристики «Процессор» есть вложенные характеристики «Производитель», «L2 Cache» и другие. У каждой из вложенных характеристик может быть несколько вариантов значений. */
  readonly complex_id?: number;
  /** Идентификатор характеристики. */
  readonly id?: number;
  /** Массив вложенных значений характеристики. */
  readonly values?: IV3ImportProductsRequestDictionaryValue[];
}

export interface IV3ImportProductsRequestComplexAttribute {
  readonly attributes?: IV3ImportProductsRequestAttribute[];
}

export interface IImportProductsRequestPdfList {
  /** Индекс документа в хранилище, который задаёт порядок. */
  readonly index?: number;
  /** Название файла. */
  readonly name?: string;
  /** Адрес файла. */
  readonly src_url?: string;
}

export interface IImportProductRequestPromotion {
  /** Атрибут для действий с акцией: - `ENABLE` — включить, - `DISABLE` — выключить, - `UNKNOWN` — ничего не менять, передаётся по умолчанию. */
  readonly operation?: 'UNKNOWN' | 'ENABLE' | 'DISABLE';
  /** Тип акции: - `REVIEWS_PROMO` — акция «Баллы за отзывы». */
  readonly type?: 'REVIEWS_PROMO';
}

export type IV3ServiceType = 'IS_CODE_SERVICE' | 'IS_NO_CODE_SERVICE';

export interface IV3ImportProductsRequestItem {
  /** Массив с характеристиками товара. Характеристики отличаются для разных категорий — их можно посмотреть в [Базе знаний продавца](https://seller-edu.ozon.ru/) или через API. */
  readonly attributes?: IV3ImportProductsRequestAttribute[];
  /** Штрихкод товара. */
  readonly barcode?: string;
  /** Маркетинговый цвет.  Формат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG. */
  readonly color_image?: string;
  /** Массив характеристик, у которых есть вложенные атрибуты. */
  readonly complex_attributes?: IV3ImportProductsRequestComplexAttribute[];
  /** Валюта ваших цен. Переданное значение должно совпадать с валютой, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.  Например, если у вас установлена валюта взаиморасчётов юань, передавайте значение `CNY`, иначе вернётся ошибка.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
  /** Глубина упаковки. */
  readonly depth?: number;
  /** Идентификатор категории. Можно получить с помощью метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree). */
  readonly description_category_id: number;
  /** Новый идентификатор категории. Укажите его, если нужно изменить текущую категорию товара. */
  readonly new_description_category_id?: number;
  /** Единица измерения габаритов:   - `mm` — миллиметры,   - `cm` — сантиметры,   - `in` — дюймы. */
  readonly dimension_unit?: string;
  /** Геоограничения — при необходимости заполните параметр в личном кабинете при создании или редактировании товара.  Необязательный параметр. */
  readonly geo_names?: string[];
  /** Высота упаковки. */
  readonly height?: number;
  /** Массив изображений. До 15 штук. Изображения показываются на сайте в таком же порядке, как в массиве.  Если не передать значение `primary_image`, первое изображение в массиве будет главным для товара.  Если вы передали значение `primary_image`, передайте до 14 изображений. Если параметр `primary_image` пустой, передайте до 15 изображений.  Формат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG или PNG. */
  readonly images?: string[];
  /** Массив изображений 360. До 70 штук.  Формат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG. */
  readonly images360?: string[];
  /** Название товара. До 500 символов. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул.  Максимальная длина строки — 50 символов. */
  readonly offer_id?: string;
  /** Цена до скидок (будет зачёркнута на карточке товара). Указывается в рублях. Разделитель дробной части — точка, до двух знаков после точки.  Если вы раньше передавали `old_price`, то при обновлении `price` также обновите `old_price`. */
  readonly old_price?: string;
  /** Список PDF-файлов. */
  readonly pdf_list?: IImportProductsRequestPdfList[];
  /** Цена товара с учётом скидок, отображается на карточке товара. Если на товар нет скидок, укажите значение `old_price` в этом параметре. */
  readonly price?: string;
  /** Ссылка на главное изображение товара. */
  readonly primary_image?: string;
  /** Акции. */
  readonly promotions?: IImportProductRequestPromotion[];
  readonly service_type?: IV3ServiceType;
  /** Идентификатор типа товара.  Значения можно получить из такого же параметра `type_id` в ответе метода [/v1/description-category/tree](#operation/DescriptionCategoryAPI_GetTree). При заполнении этого параметра можно не указывать в `attibutes ` атрибут с параметром `id:8229`, `type_id` будет использоваться в приоритете. */
  readonly type_id: number;
  /** Ставка НДС для товара:   - `0` — не облагается НДС,   - `0.05` — 5%,   - `0.07` — 7%,   - `0.1` — 10%,   - `0.2` — 20%.  Передавайте значение ставки, актуальное на данный момент. */
  readonly vat?: string;
  /** Вес товара в упаковке. Предельное значение — 1000 килограммов или конвертированная величина в других единицах измерения. */
  readonly weight?: number;
  /** Единица измерения веса:   - `g` — граммы,   - `kg` — килограммы,   - `lb` — фунты. */
  readonly weight_unit?: string;
  /** Ширина упаковки. */
  readonly width?: number;
}

export interface IV3ImportProductsRequest {
  /** Массив данных. */
  readonly items?: IV3ImportProductsRequestItem[];
}

/**
 * Результаты запроса.
 */
export interface IV3ImportProductsResponseResult {
  /** Номер задания на загрузку товаров. */
  readonly task_id?: number;
}

export interface IV3ImportProductsResponse {
  readonly result?: IV3ImportProductsResponseResult;
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

export interface IProductGetImportProductsInfoRequest {
  /** Код задачи на импорт товаров. Можно получить с помощью метода [/v3/product/import](#operation/ProductAPI_ImportProductsV3). */
  readonly task_id: number;
}

export interface IV1ItemError {
  /** Код ошибки. */
  readonly code?: string;
  /** Техническое описание ошибки. */
  readonly message?: string;
  /** Состояние товара, в котором произошла ошибка. */
  readonly state?: string;
  /** Уровень ошибки. */
  readonly level?: string;
  /** Описание ошибки. */
  readonly description?: string;
  /** Поле, в котором произошла ошибка. */
  readonly field?: string;
  /** Атрибут, в котором произошла ошибка. */
  readonly attribute_id?: number;
  /** Название атрибута, в котором произошла ошибка. */
  readonly attribute_name?: string;
}

export interface IGetImportProductsInfoResponseResultItem {
  /** Идентификатор товара в системе продавца — артикул.  Максимальная длина строки в значении поля — 50 символов. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Статус создания или обновления товара. Информация о товаре обрабатывается очередями. Возможные значения параметра: - `pending` — товар в очереди на обработку; - `imported` — товар успешно загружен; - `failed` — товар загружен с ошибками; - `skipped` — товар не был обновлен, так как запрос не содержал изменений. */
  readonly status?: string;
  /** Массив ошибок. */
  readonly errors?: IV1ItemError[];
}

export interface IProductGetImportProductsInfoResponseResult {
  /** Информация о товарах. */
  readonly items?: IGetImportProductsInfoResponseResultItem[];
  /** Идентификатор товара в системе продавца — артикул. */
  readonly total?: number;
}

export interface IProductGetImportProductsInfoResponse {
  readonly result?: IProductGetImportProductsInfoResponseResult;
}

export interface IProductImportProductsBySKURequestItem {
  /** Название товара. До 500 символов. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул.  Максимальная длина строки — 50 символов. */
  readonly offer_id?: string;
  /** Цена до скидок (будет зачеркнута на карточке товара). Указывается в рублях. Разделитель дробной части — точка, до двух знаков после точки. */
  readonly old_price?: string;
  /** Цена товара с учётом скидок, отображается на карточке товара. Если на товар нет скидок, укажите значение `old_price` в этом параметре. */
  readonly price?: string;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku: number;
  /** Ставка НДС для товара:   - `0` — не облагается НДС,   - `0.05` — 5%,   - `0.07` — 7%,   - `0.1` — 10%,   - `0.2` — 20%.  Передавайте значение ставки, актуальное на данный момент. */
  readonly vat?: string;
  /** Валюта ваших цен. Переданное значение должно совпадать с валютой, которая установлена в настройках личного кабинета. По умолчанию передаётся `RUB` — российский рубль.  Например, если у вас установлена валюта взаиморасчётов юань, передавайте значение `CNY`, иначе вернётся ошибка.  Возможные значения:    - `RUB` — российский рубль,   - `BYN` — белорусский рубль,   - `KZT` — тенге,   - `EUR` — евро,   - `USD` — доллар США,   - `CNY` — юань. */
  readonly currency_code?: string;
}

export interface IProductImportProductsBySKURequest {
  /** Информация о товарах. */
  readonly items?: IProductImportProductsBySKURequestItem[];
}

export interface IProductImportProductsBySKUResponseResult {
  /** Код задачи на импорт товаров. */
  readonly task_id?: number;
  /** Список идентификаторов товаров в системе продавца — `product_id`. */
  readonly unmatched_sku_list?: number[];
}

export interface IProductImportProductsBySKUResponse {
  readonly result?: IProductImportProductsBySKUResponseResult;
}

export interface IV1ProductUpdateAttributesRequestValue {
  /** Идентификатор характеристики в словаре. */
  readonly dictionary_value_id?: number;
  /** Значение характеристики товара. */
  readonly value?: string;
}

export interface IV1ProductUpdateAttributesRequestAttribute {
  /** Идентификатор характеристики, которая поддерживает вложенные свойства. У каждой из вложенных характеристик может быть несколько вариантов значений. */
  readonly complex_id?: number;
  /** Идентификатор характеристики. */
  readonly id?: number;
  /** Массив вложенных значений характеристики. */
  readonly values?: unknown;
}

export interface IV1ProductUpdateAttributesRequestItem {
  /** Характеристики товара. */
  readonly attributes?: unknown;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id: string;
}

export interface IV1ProductUpdateAttributesRequest {
  /** Товары и характеристики, которые нужно обновить. */
  readonly items?: unknown;
}

export interface IV1ProductUpdateAttributesResponse {
  /** Номер задания на обновление товаров.   Чтобы проверить статус обновления, передайте полученное значение в метод [/v1/product/import/info](#operation/ProductAPI_GetImportProductsInfo). */
  readonly task_id?: number;
}

export interface IProductv1ProductImportPicturesRequest {
  /** Маркетинговый цвет. */
  readonly color_image?: string;
  /** Массив ссылок на изображения.  Изображения в массиве расположены в порядке их расположения на сайте.  Первое изображение в массиве будет главным. */
  readonly images?: unknown;
  /** Массив изображений 360. До 70 штук.  Формат: адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG. */
  readonly images360?: unknown;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id: number;
}

export interface IProductProductInfoPicturesResponsePicture {
  /** Признак, что картинка — изображение 360. */
  readonly is_360?: boolean;
  /** Признак, что картинка — образец цвета. */
  readonly is_color?: boolean;
  /** Признак, что картинка — главное изображение. */
  readonly is_primary?: boolean;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Статус загрузки изображения.   Если вызывали метод [/v1/product/pictures/import](#operation/ProductAPI_ProductImportPictures), то в ответе метода всегда будет `imported` — картинка не обработана. Чтобы посмотреть финальный статус, примерно через 10 секунд вызовите метод [/v1/product/pictures/info](#operation/ProductAPI_ProductInfoPictures).  Если вызывали метод [/v1/product/pictures/info](#operation/ProductAPI_ProductInfoPictures), вы увидите один из статусов: - `uploaded` — изображение загружено; - `pending` — при загрузке изображения возникла ошибка. Повторите попытку позже. */
  readonly state?: string;
  /** Адрес ссылки на изображение в общедоступном облачном хранилище. Формат изображения по ссылке — JPG или PNG. */
  readonly url?: string;
}

/**
 * Результат работы метода.
 */
export interface IProductv1ProductInfoPicturesResponseResult {
  readonly pictures?: unknown;
}

export interface IProductv1ProductInfoPicturesResponse {
  readonly result?: IProductv1ProductInfoPicturesResponseResult;
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
export type IProductv3GetProductListRequestFilterFilterVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';

/**
 * Фильтр по товарам.
 */
export interface IProductv3GetProductListRequestFilter {
  /** Фильтр по параметру `offer_id`. Вы можете передавать список значений. */
  readonly offer_id?: unknown;
  /** Фильтр по параметру `product_id`. Вы можете передавать список значений. */
  readonly product_id?: unknown;
  readonly visibility?: IProductv3GetProductListRequestFilterFilterVisibility;
}

export interface IProductv3GetProductListRequest {
  readonly filter?: IProductv3GetProductListRequestFilter;
  /** Идентификатор последнего значения на странице. При первом запросе оставьте это поле пустым.  Чтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса. */
  readonly last_id?: string;
  /** Количество значений на странице. Минимум — 1, максимум — 1000. */
  readonly limit?: number;
}

export interface IProductv3GetProductListResponseItemQuant {
  /** Идентификатор эконом-товара. */
  readonly quant_code?: string;
  /** Размер кванта. */
  readonly quant_size?: number;
}

export interface IProductv3GetProductListResponseItem {
  /** Товар в архиве. */
  readonly archived?: boolean;
  /** Есть остатки на складах FBO. */
  readonly has_fbo_stocks?: boolean;
  /** Есть остатки на складах FBS. */
  readonly has_fbs_stocks?: boolean;
  /** Уценённый товар. */
  readonly is_discounted?: boolean;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Список квантов. */
  readonly quants?: IProductv3GetProductListResponseItemQuant;
}

/**
 * Результат.
 */
export interface IProductv3GetProductListResponseResult {
  /** Список товаров. */
  readonly items?: unknown;
  /** Идентификатор последнего значения на странице.  Чтобы получить следующие значения, передайте полученное значение в следующем запросе в параметре `last_id`. */
  readonly last_id?: string;
  /** Всего товаров. */
  readonly total?: number;
}

export interface IProductv3GetProductListResponse {
  readonly result?: IProductv3GetProductListResponseResult;
}

export interface IV1GetProductRatingBySkuRequest {
  /** Идентификаторы товаров в системе Ozon — SKU,  для которых нужно вернуть контент-рейтинг. */
  readonly skus: unknown;
}

export interface IGetProductRatingBySkuResponseRatingCondition {
  /** Количество баллов контент-рейтинга, которое даёт выполнение условия. */
  readonly cost?: number;
  /** Описание условия. */
  readonly description?: string;
  /** Признак, что условие выполнено. */
  readonly fulfilled?: boolean;
  /** Идентификатор условия. */
  readonly key?: string;
}

export interface IGetProductRatingBySkuResponseRatingImproveAttribute {
  /** Идентификатор атрибута. */
  readonly id?: number;
  /** Название атрибута. */
  readonly name?: string;
}

export interface IGetProductRatingBySkuResponseRatingGroup {
  /** Список условий, увеличивающих контент-рейтинг товара. */
  readonly conditions?: unknown;
  /** Количество атрибутов, которые нужно заполнить для получения максимального балла в этой группе характеристик. */
  readonly improve_at_least?: number;
  /** Cписок атрибутов, заполнение которых может увеличить контент-рейтинг товара. */
  readonly improve_attributes?: unknown;
  /** Идентификатор группы. */
  readonly key?: string;
  /** Название группы. */
  readonly name?: string;
  /** Рейтинг в группе. */
  readonly rating?: number;
  /** Процент влияния характеристик группы на контент-рейтинг. */
  readonly weight?: number;
}

export interface IGetProductRatingBySkuResponseProductRating {
  /** Идентификатор товара на Ozon. */
  readonly sku?: number;
  /** Контент-рейтинг товара: от 0 до 100. */
  readonly rating?: number;
  /** Группы характеристик, из которых складывается контент-рейтинг. */
  readonly groups?: unknown;
}

export interface IV1GetProductRatingBySkuResponse {
  /** Контент-рейтинг товаров. */
  readonly products?: unknown;
}

export interface IV3GetProductInfoListRequest {
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string[];
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: string[];
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: string[];
}

export interface IGetProductInfoListResponseCommission {
  /** Стоимость доставки. */
  readonly delivery_amount?: number;
  /** Процент комиссии. */
  readonly percent?: number;
  /** Стоимость возврата. */
  readonly return_amount?: number;
  /** Схема продажи. */
  readonly sale_schema?: string;
  /** Сумма комиссии. */
  readonly value?: number;
}

/**
 * Описание уровней ошибок: 
 *   - `ERROR_LEVEL_UNSPECIFIED` — не определён;
 *   - `ERROR_LEVEL_ERROR` — критичная ошибка, товар нельзя продавать;
 *   - `ERROR_LEVEL_INTERNAL` — критичная ошибка, товар нельзя продавать.
 *   - `ERROR_LEVEL_WARNING` — некритичная ошибка, товар можно продавать.
 * 
 * [Подробнее об ошибках при создании товара в Базе знаний продавца](https://seller-edu.ozon.ru/work-with-goods/zagruzka-tovarov/creating-goods/oshibki-pri-rabote-s-kartochkami)             
 * 
 */
export type IErrorErrorLevel = 'ERROR_LEVEL_UNSPECIFIED' | 'ERROR_LEVEL_ERROR' | 'ERROR_LEVEL_WARNING' | 'ERROR_LEVEL_INTERNAL';

export interface IHumanTextsParam {
  /** Название параметра. */
  readonly name?: string;
  /** Значение параметра. */
  readonly value?: string;
}

/**
 * Описание ошибок.
 */
export interface IErrorHumanTexts {
  /** Название атрибута, в котором произошла ошибка. */
  readonly attribute_name?: string;
  /** Описание ошибки. */
  readonly description?: string;
  /** Код ошибки в системе Ozon. */
  readonly hint_code?: string;
  /** Текст ошибки. */
  readonly message?: string;
  /** В каких параметрах допущена ошибка. */
  readonly params?: IHumanTextsParam[];
  /** Краткое описание ошибки. */
  readonly short_description?: string;
}

export interface IGetProductInfoListResponseError {
  /** Идентификатор характеристики. */
  readonly attribute_id?: number;
  /** Код ошибки. */
  readonly code?: string;
  /** Поле, в котором найдена ошибка. */
  readonly field?: string;
  readonly level?: IErrorErrorLevel;
  /** Статус товара, в котором произошла ошибка. */
  readonly state?: string;
  readonly texts?: IErrorHumanTexts;
}

/**
 * Информация о модели товара.
 */
export interface IGetProductInfoListResponseModelInfo {
  /** Количество товаров в ответе. */
  readonly count?: number;
  /** Идентификатор модели товара. */
  readonly model_id?: number;
}

/**
 * Виды индекса цен:
 * - `COLOR_INDEX_UNSPECIFIED` — не определён,
 * - `COLOR_INDEX_WITHOUT_INDEX` — отсутствует,
 * - `COLOR_INDEX_GREEN` — выгодный,
 * - `COLOR_INDEX_YELLOW` — умеренный,
 * - `COLOR_INDEX_RED` — невыгодный.
 * 
 * [Подробнее об индексе цен в Базе знаний продавца](https://seller-edu.ozon.ru/ceny-i-akcii/rabota-s-cenami/price-index)
 * 
 */
export type IPriceIndexesColorIndex = 'COLOR_INDEX_UNSPECIFIED' | 'COLOR_INDEX_WITHOUT_INDEX' | 'COLOR_INDEX_GREEN' | 'COLOR_INDEX_YELLOW' | 'COLOR_INDEX_RED';

/**
 * Цена товара у конкурентов на других площадках.
 */
export interface IPriceIndexesIndexDataExternal {
  /** Минимальная цена товара у конкурентов на другой площадке. */
  readonly minimal_price?: string;
  /** Валюта цены. */
  readonly minimal_price_currency?: string;
  /** Значение индекса цены. */
  readonly price_index_value?: number;
}

/**
 * Цена товара у конкурентов на Ozon.
 */
export interface IPriceIndexesIndexDataOzon {
  /** Минимальная цена товара у конкурентов на Ozon. */
  readonly minimal_price?: string;
  /** Валюта цены. */
  readonly minimal_price_currency?: string;
  /** Значение индекса цены. */
  readonly price_index_value?: number;
}

/**
 * Цена вашего товара на других площадках.
 */
export interface IPriceIndexesIndexDataSelf {
  /** Минимальная цена вашего товара на других площадках. */
  readonly minimal_price?: string;
  /** Валюта цены. */
  readonly minimal_price_currency?: string;
  /** Значение индекса цены. */
  readonly price_index_value?: number;
}

/**
 * Ценовые индексы товара.
 */
export interface IGetProductInfoListResponsePriceIndexes {
  readonly color_index?: IPriceIndexesColorIndex;
  readonly external_index_data?: IPriceIndexesIndexDataExternal;
  readonly ozon_index_data?: IPriceIndexesIndexDataOzon;
  readonly self_marketplaces_index_data?: IPriceIndexesIndexDataSelf;
}

/**
 * Тип упаковки:
 * - `SHIPMENT_TYPE_UNSPECIFIED` — не указано;
 * - `SHIPMENT_TYPE_GENERAL` — обычный товар;
 * - `SHIPMENT_TYPE_BOX` — коробка;
 * - `SHIPMENT_TYPE_PALLET` — палета.
 * 
 */
export type ISourceShipmentType = 'SHIPMENT_TYPE_UNSPECIFIED' | 'SHIPMENT_TYPE_GENERAL' | 'SHIPMENT_TYPE_BOX' | 'SHIPMENT_TYPE_PALLET';

export interface IGetProductInfoListResponseSource {
  /** Дата создания товара. */
  readonly created_at?: string;
  /** Список квантов с товарами. */
  readonly quant_code?: string;
  readonly shipment_type?: ISourceShipmentType;
  /** Идентификатор товара на Ozon — SKU. */
  readonly sku?: number;
  /** Схема продажи: - `SDS` — FBO и FBS с одинаковым SKU; - `FBO`; - `FBS`. */
  readonly source?: string;
}

/**
 * Информация о статусах товара.
 */
export interface IGetProductInfoListResponseStatuses {
  /** `true`, если товар создан корректно. */
  readonly is_created?: boolean;
  /** Статус модерации. */
  readonly moderate_status?: string;
  /** Статус товара. */
  readonly status?: string;
  /** Описание статуса товара. */
  readonly status_description?: string;
  /** Статус товара, в котором возникла ошибка. */
  readonly status_failed?: string;
  /** Название статуса товара. */
  readonly status_name?: string;
  /** Описание статуса. */
  readonly status_tooltip?: string;
  /** Время последнего изменения статуса. */
  readonly status_updated_at?: string;
  /** Статус валидации. */
  readonly validation_status?: string;
}

export interface IGetProductInfoListResponseStocksStock {
  /** Сейчас на складе. */
  readonly present?: number;
  /** Зарезервировано. */
  readonly reserved?: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
  /** Схема продажи. */
  readonly source?: string;
}

/**
 * Информация об остатках товара.
 */
export interface IGetProductInfoListResponseStocks {
  /** `true`, если есть остаток на складах. */
  readonly has_stock?: boolean;
  /** Статус остатков товара. */
  readonly stocks?: IGetProductInfoListResponseStocksStock[];
}

/**
 * Настройки видимости товара.
 */
export interface IGetProductInfoListResponseVisibilityDetails {
  /** Если установлена цена — `true`. */
  readonly has_price?: boolean;
  /** Если есть остаток на складах — `true`. */
  readonly has_stock?: boolean;
}

export interface IV3GetProductInfoListResponseItem {
  /** Все штрихкоды товара. */
  readonly barcodes?: string[];
  /** Изображение цвета товара. */
  readonly color_image?: string[];
  /** Информация о комиссиях. */
  readonly commissions?: IGetProductInfoListResponseCommission[];
  /** Дата и время создания товара. */
  readonly created_at?: string;
  /** Валюта. */
  readonly currency_code?: string;
  /** Идентификатор категории. Используйте его с методами [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes) и [/v1/description-category/attribute/values](#operation/DescriptionCategoryAPI_GetAttributeValues). */
  readonly description_category_id?: number;
  /** Остатки уценённого товара на складе Ozon. */
  readonly discounted_fbo_stocks?: number;
  /** Информация об ошибках при создании или валидации товара. */
  readonly errors?: IGetProductInfoListResponseError[];
  /** Признак, что у товара есть уценённые аналоги на складе Ozon. */
  readonly has_discounted_fbo_item?: boolean;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly id?: number;
  /** Массив ссылок на изображения. Изображения в массиве расположены в порядке их расположения на сайте. Если параметр `primary_image` не указан, первое изображение в массиве главное для товара. */
  readonly images?: string[];
  /** Массив изображений 360. */
  readonly images360?: string[];
  /** `true`, если товар архивирован вручную. */
  readonly is_archived?: boolean;
  /** `true`, если товар архивирован автоматически. */
  readonly is_autoarchived?: boolean;
  /** Признак, является ли товар уценённым:   - Если товар создавался продавцом как уценённый — `true`.    - Если товар не уценённый или был уценён Ozon — `false`. */
  readonly is_discounted?: boolean;
  /** Признак крупногабаритного товара. */
  readonly is_kgt?: boolean;
  /** `true`, если возможна предоплата. */
  readonly is_prepayment_allowed?: boolean;
  /** Признак супер-товара.  [Подробнее о супер-товарах в Базе знаний продавца](https://seller-edu.ozon.ru/fbo/rabota-so-stokom/super-tovary) */
  readonly is_super?: boolean;
  /** Цена на товар с учётом всех акций, которая будет указана на витрине Ozon, без учёта скидки по Ozon Карте. */
  readonly marketing_price?: string;
  /** Минимальная цена товара после применения акций. */
  readonly min_price?: string;
  readonly model_info?: IGetProductInfoListResponseModelInfo;
  /** Название. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Цена до учёта скидок. На карточке товара отображается зачёркнутой. */
  readonly old_price?: string;
  /** Цена товара с учётом скидок — это значение показывается на карточке товара. */
  readonly price?: string;
  readonly price_indexes?: IGetProductInfoListResponsePriceIndexes;
  /** Главное изображение товара. */
  readonly primary_image?: string[];
  /** Информация об источниках создания товара. */
  readonly sources?: IGetProductInfoListResponseSource[];
  readonly statuses?: IGetProductInfoListResponseStatuses;
  readonly stocks?: IGetProductInfoListResponseStocks;
  /** Идентификатор типа товара. */
  readonly type_id?: number;
  /** Дата последнего обновления товара. */
  readonly updated_at?: string;
  /** Ставка НДС для товара. */
  readonly vat?: string;
  readonly visibility_details?: IGetProductInfoListResponseVisibilityDetails;
  /** Объёмный вес товара. */
  readonly volume_weight?: number;
}

export interface IV3GetProductInfoListResponse {
  /** Массив данных. */
  readonly items?: IV3GetProductInfoListResponseItem[];
}

/**
 * Фильтр по видимости товара:
 *   - `ALL` — все товары, кроме архивных.
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
export type IProductv2GetProductListRequestFilterFilterVisibility = 'ALL' | 'VISIBLE' | 'INVISIBLE' | 'EMPTY_STOCK' | 'NOT_MODERATED' | 'MODERATED' | 'DISABLED' | 'STATE_FAILED' | 'READY_TO_SUPPLY' | 'VALIDATION_STATE_PENDING' | 'VALIDATION_STATE_FAIL' | 'VALIDATION_STATE_SUCCESS' | 'TO_SUPPLY' | 'IN_SALE' | 'REMOVED_FROM_SALE' | 'OVERPRICED' | 'CRITICALLY_OVERPRICED' | 'EMPTY_BARCODE' | 'BARCODE_EXISTS' | 'QUARANTINE' | 'ARCHIVED' | 'OVERPRICED_WITH_STOCK' | 'PARTIAL_APPROVED';

/**
 * Фильтр по товарам.
 */
export interface IProductv4Filter {
  /** Фильтр по параметру `offer_id`. Можно передавать список значений. */
  readonly offer_id?: unknown;
  /** Фильтр по параметру `product_id`. Можно передавать до 1000 значений. */
  readonly product_id?: unknown;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: string[];
  readonly visibility?: IProductv2GetProductListRequestFilterFilterVisibility;
}

export interface IProductv4GetProductAttributesV4Request {
  readonly filter?: IProductv4Filter;
  /** Идентификатор последнего значения на странице. Оставьте это поле пустым при выполнении первого запроса.  Чтобы получить следующие значения, укажите `last_id` из ответа предыдущего запроса. */
  readonly last_id?: string;
  /** Количество значений на странице. */
  readonly limit?: number;
  /** Параметр, по которому товары будут отсортированы: - `sku` — сортировка по идентификатору товара в системе Ozon; - `offer_id` — сортировка по артикулу товара; - `id` — сортировка по идентификатору товара; - `title` — сортировка по названию товара. */
  readonly sort_by?: string;
  /** Направление сортировки: - `asc` — по возрастанию, - `desc` — по убыванию. */
  readonly sort_dir?: string;
}

export interface IProductGetProductAttributesV3ResponseDictionaryValue {
  /** Идентификатор характеристики в словаре. */
  readonly dictionary_value_id?: number;
  /** Значение характеристики товара. */
  readonly value?: string;
}

export interface IProductGetProductAttributesV4ResponseAttribute {
  /** Идентификатор характеристики. */
  readonly id?: number;
  /** Идентификатор характеристики, которая поддерживает вложенные свойства. Например, у характеристики «Процессор» есть вложенные характеристики «Производитель» и «L2 Cache». У каждой из вложенных характеристик может быть несколько вариантов значений. */
  readonly complex_id?: number;
  /** Массив значений характеристик. */
  readonly values?: IProductGetProductAttributesV3ResponseDictionaryValue[];
}

export interface IGetProductAttributesV3ResponseDictionaryValue {
  /** Идентификатор характеристики в словаре. */
  readonly dictionaryValueId?: number;
  /** Значение характеристики товара. */
  readonly value?: string;
}

export interface IGetProductAttributesV4ResponseAttribute {
  /** Идентификатор характеристики. */
  readonly id?: number;
  /** Идентификатор характеристики, которая поддерживает вложенные свойства. Например, у характеристики «Процессор» есть вложенные характеристики «Производитель» и «L2 Cache». У каждой из вложенных характеристик может быть несколько вариантов значений. */
  readonly complex_id?: number;
  /** Массив значений характеристик. */
  readonly values?: IGetProductAttributesV3ResponseDictionaryValue[];
}

export interface IGetProductAttributesResponseImage {
  /** `true`, если изображение главное и отображается первым на карточке товара. */
  readonly default?: boolean;
  readonly file_name?: string;
  readonly index?: number;
}

/**
 * Информация о модели.
 */
export interface IV4GetProductAttributesResponseModelInfo {
  /** Идентификатор модели. */
  readonly model_id?: number;
  /** Количество объединённых товаров модели. */
  readonly count?: number;
}

export interface IV4GetProductAttributesResponsePdf {
  /** Путь к PDF-файлу. */
  readonly file_name?: string;
  /** Название файла. */
  readonly name?: string;
}

export interface IProductv4GetProductAttributesV4ResponseResult {
  /** Список характеристик товара. */
  readonly attributes?: IProductGetProductAttributesV4ResponseAttribute[];
  /** Список идентификаторов характеристик со значением по умолчанию. */
  readonly attributes_with_defaults?: number[];
  /** Штрихкод. */
  readonly barcode?: string;
  /** Все штрихкоды товара. */
  readonly barcodes?: unknown;
  /** Идентификатор категории. Используйте его с методами [/v1/description-category/attribute](#operation/DescriptionCategoryAPI_GetAttributes) и [/v1/description-category/attribute/values](#operation/DescriptionCategoryAPI_GetAttributeValues). */
  readonly description_category_id?: number;
  /** Маркетинговый цвет. */
  readonly color_image?: string;
  /** Массив вложенных характеристик. */
  readonly complex_attributes?: IGetProductAttributesV4ResponseAttribute[];
  /** Глубина. */
  readonly depth?: number;
  /** Единица измерения габаритов:   - `mm` — миллиметры,   - `cm` — сантиметры,   - `in` — дюймы. */
  readonly dimension_unit?: string;
  /** Высота упаковки. */
  readonly height?: number;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly id?: number;
  /** Массив ссылок на изображения товара. Порядок изображений аналогичен порядку в карточке товаров. */
  readonly images?: unknown;
  readonly model_info?: IV4GetProductAttributesResponseModelInfo;
  /** Название товара. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Массив PDF-файлов. */
  readonly pdf_list?: IV4GetProductAttributesResponsePdf[];
  /** Ссылка на главное изображение товара. */
  readonly primary_image?: string;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: string;
  /** Идентификатор типа товара. */
  readonly type_id?: number;
  /** Вес товара в упаковке. */
  readonly weight?: number;
  /** Единица измерения веса. */
  readonly weight_unit?: string;
  /** Ширина упаковки. */
  readonly width?: number;
}

export interface IProductv4GetProductAttributesV4Response {
  /** Результаты запроса. */
  readonly result?: IProductv4GetProductAttributesV4ResponseResult[];
  /** Идентификатор последнего значения на странице.  Чтобы получить следующие значения, укажите полученное значение в следующем запросе в параметре `last_id`. */
  readonly last_id?: string;
  /** Количество товаров в списке. */
  readonly total?: string;
}

export interface IProductGetProductInfoDescriptionRequest {
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
}

export interface IProductGetProductInfoDescriptionResponseProduct {
  /** Описание. */
  readonly description?: string;
  /** Идентификатор. */
  readonly id?: number;
  /** Название. */
  readonly name?: string;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
}

export interface IProductGetProductInfoDescriptionResponse {
  readonly result?: IProductGetProductInfoDescriptionResponseProduct;
}

export type IV1Empty = Record<string, unknown>;

/**
 * Суточный лимит на создание товаров.
 */
export interface IGetUploadQuotaResponseDailyCreate {
  /** Сколько всего товаров можно создать в сутки. */
  readonly limit?: number;
  /** Время в формате UTC, когда сбросится значение счётчика за текущие сутки. */
  readonly reset_at?: string;
  /** Сколько товаров создано за текущие сутки. */
  readonly usage?: number;
}

/**
 * Суточный лимит на обновление товаров.
 */
export interface IGetUploadQuotaResponseDailyUpdate {
  /** Сколько всего товаров можно обновить в сутки. */
  readonly limit?: number;
  /** Время в формате UTC, когда сбросится значение счётчика за текущие сутки. */
  readonly reset_at?: string;
  /** Сколько товаров обновлено за текущие сутки. */
  readonly usage?: number;
}

/**
 * Лимит на ассортимент.
 */
export interface IGetUploadQuotaResponseTotal {
  /** Сколько всего товаров можно создать в личном кабинете. */
  readonly limit?: number;
  /** Сколько товаров уже создано. */
  readonly usage?: number;
}

export interface IV4GetUploadQuotaResponse {
  readonly daily_create?: IGetUploadQuotaResponseDailyCreate;
  readonly daily_update?: IGetUploadQuotaResponseDailyUpdate;
  readonly total?: IGetUploadQuotaResponseTotal;
}

export interface IProductUpdateOfferIdRequestUpdateOfferId {
  /** Новый артикул.  Максимальная длина строки — 50 символов. */
  readonly new_offer_id: string;
  /** Старый артикул. */
  readonly offer_id: string;
}

export interface IV1ProductUpdateOfferIdRequest {
  /** Список пар с новыми и старыми значениями артикулов. */
  readonly update_offer_id: unknown;
}

export interface IV1ProductUpdateOfferIdResponseError {
  /** Сообщение об ошибке. */
  readonly message?: string;
  /** Артикул товара, который не получилось изменить. */
  readonly offer_id?: string;
}

export interface IV1ProductUpdateOfferIdResponse {
  /** Список ошибок. */
  readonly errors?: unknown;
}

export interface IProductProductArchiveRequest {
  /** Список идентификаторов товаров в системе продавца — `product_id`.  Вы можете передать до 100 идентификаторов за раз. */
  readonly product_id: number[];
}

export interface IProductBooleanResponse {
  /** Результат обработки запроса. `true`, если запрос выполнен без ошибок. */
  readonly result?: boolean;
}

export interface IProductProductUnarchiveRequest {
  /** Список идентификаторов товаров в системе продавца — `product_id`.  Вы можете передать до 100 идентификаторов за раз.   В сутки можно восстановить из архива не больше 10 товаров, которые были архивированы автоматически.   Лимит обновляется в 03:00 по московскому времени. На разархивацию товаров, перенесённых в архив вручную, ограничений нет. */
  readonly product_id: number[];
}

export interface IDeleteProductsRequestProduct {
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id: string;
}

export interface IProductv2DeleteProductsRequest {
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly products: IDeleteProductsRequestProduct[];
}

export interface IDeleteProductsResponseDeleteStatus {
  /** Причина ошибки, которая возникла при обработке запроса. */
  readonly error?: string;
  /** Если запрос выполнен без ошибок и товары удалены — `true`. */
  readonly is_deleted?: boolean;
  /** Идентификатор товара в системе продавца — артикул. */
  readonly offer_id?: string;
}

export interface IProductv2DeleteProductsResponse {
  /** Статус обработки запроса. */
  readonly status?: IDeleteProductsResponseDeleteStatus[];
}

export interface IV1GetProductInfoSubscriptionRequest {
  /** Список SKU, идентификаторов товара в системе Ozon. */
  readonly skus: string[];
}

export interface IV1GetProductInfoSubscriptionResponseResult {
  /** Количество подписавшихся пользователей. */
  readonly count?: number;
  /** Идентификатор товара в системе Ozon, SKU. */
  readonly sku?: number;
}

export interface IV1GetProductInfoSubscriptionResponse {
  /** Результат работы метода. */
  readonly result?: IV1GetProductInfoSubscriptionResponseResult[];
}

export interface IV1ProductGetRelatedSKURequest {
  /** Список SKU. */
  readonly sku: unknown;
}

export interface IV1ProductGetRelatedSKUResponseItem {
  /** Признак доступности товара по SKU: - `HIDDEN` — скрыт; - `AVAILABLE` — доступен; - `UNAVAILABLE` — недоступен, SKU удалён. */
  readonly availability?: string;
  /** Дата и время удаления. */
  readonly deleted_at?: string;
  /** Схема доставки: - `SDS` - идентификатор единого Ozon SKU; - `FBO` - идентификатор товара, который продаётся со склада Ozon; - `FBS` - идентификатор товара, который продаётся со склада FBS; - `Crossborder` - идентификатор товара, который продаётся из-за границы. */
  readonly delivery_schema?: string;
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
}

export interface IV1ProductGetRelatedSKUResponseError {
  /** Код ошибки. */
  readonly code?: string;
  /** SKU, в котором произошла ошибка. */
  readonly sku?: number;
  /** Текст ошибки. */
  readonly message?: string;
}

export interface IV1ProductGetRelatedSKUResponse {
  /** Информация о связанных SKU. */
  readonly items?: unknown;
  /** Ошибки. */
  readonly errors?: unknown;
}

export interface IV2ProductInfoPicturesRequest {
  /** Список идентификаторов товаров в системе продавца — `product_id`. */
  readonly product_id: unknown;
}

export interface IV2ProductInfoPicturesResponseError {
  /** Описание ошибки. */
  readonly message?: string;
  /** Ссылка на изображение. */
  readonly url?: string;
}

export interface IV2ProductInfoPicturesResponseItem {
  /** Идентификатор товара в системе продавца — `product_id`. */
  readonly product_id?: number;
  /** Ссылка на главное изображение. */
  readonly primary_photo?: string[];
  /** Ссылки на фотографии товара. */
  readonly photo?: string[];
  /** Ссылки на загруженные образцы цвета. */
  readonly color_photo?: string[];
  /** Ссылки на изображения 360. */
  readonly photo_360?: string[];
  /** Список ошибок по изображениям товара. */
  readonly errors?: IV2ProductInfoPicturesResponseError[];
}

export interface IV2ProductInfoPicturesResponse {
  /** Изображения товаров. */
  readonly items?: IV2ProductInfoPicturesResponseItem[];
}
