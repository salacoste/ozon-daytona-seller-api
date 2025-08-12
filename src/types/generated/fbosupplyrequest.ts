/**
 * Generated types for FboSupplyRequest (FboSupplyRequest)
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: 02-fbosupplyrequest.json
 * Endpoints: 19
 * Schemas: 107
 */

/**
 * Тип кластера:
 * - `CLUSTER_TYPE_OZON` — кластер в России,
 * - `CLUSTER_TYPE_CIS` — кластер в СНГ.
 * 
 */
export type IV1ClusterType = 'CLUSTER_TYPE_OZON' | 'CLUSTER_TYPE_CIS';

export interface IV1DraftClusterListRequest {
  /** Идентификаторы кластеров. */
  readonly cluster_ids?: string[];
  readonly cluster_type: IV1ClusterType;
}

export interface IV1DraftClusterListResponseWarehouse {
  /** Название склада. */
  readonly name?: string;
  /** Тип склада: - `FULL_FILLMENT` — фулфилмент, - `EXPRESS_DARK_STORE` — даркстор, - `SORTING_CENTER` — сортировочный центр, - `ORDERS_RECEIVING_POINT` — пункт приёма заказов, - `CROSS_DOCK` — кросс-докинг, - `DISTRIBUTION_CENTER` — распределительный центр. */
  readonly type?: 'FULL_FILLMENT' | 'EXPRESS_DARK_STORE' | 'SORTING_CENTER' | 'ORDERS_RECEIVING_POINT' | 'CROSS_DOCK' | 'DISTRIBUTION_CENTER';
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
}

export interface IDraftClusterListResponseLogisticCluster {
  /** Склады. */
  readonly warehouses?: IV1DraftClusterListResponseWarehouse[];
}

export interface IV1DraftClusterListResponseCluster {
  /** Идентификатор кластера. */
  readonly id?: number;
  /** Информация о складах кластера. */
  readonly logistic_clusters?: IDraftClusterListResponseLogisticCluster[];
  /** Название кластера. */
  readonly name?: string;
  /** Тип кластера: - `CLUSTER_TYPE_OZON` — кластер в России, - `CLUSTER_TYPE_CIS` — кластер в СНГ. */
  readonly type?: 'CLUSTER_TYPE_OZON' | 'CLUSTER_TYPE_CIS';
}

export interface IV1DraftClusterListResponse {
  /** Кластеры. */
  readonly clusters?: IV1DraftClusterListResponseCluster[];
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
 * Тип поставки:
 * - `CREATE_TYPE_CROSSDOCK` — кросс-докинг,
 * - `CREATE_TYPE_DIRECT` — прямая.
 * 
 */
export type IV1CreateType = 'CREATE_TYPE_CROSSDOCK' | 'CREATE_TYPE_DIRECT';

export interface IV1DraftGetWarehouseFboListRequest {
  /** Тип поставки: - `CREATE_TYPE_CROSSDOCK` — кросс-докинг, - `CREATE_TYPE_DIRECT` — прямая. */
  readonly filter_by_supply_type: IV1CreateType[];
  /** Поиск по названию склада. Для поиска пунктов выдачи заказов укажите полное название. */
  readonly search: string;
}

/**
 * Координаты склада.
 */
export interface IDraftGetWarehouseFboListResponseCoordinate {
  /** Широта. */
  readonly latitude?: number;
  /** Долгота. */
  readonly longitude?: number;
}

/**
 * Тип склада, пункта выдачи заказов или сортировочного центра:
 * - `WAREHOUSE_TYPE_DELIVERY_POINT` — пункт выдачи заказов,
 * - `WAREHOUSE_TYPE_ORDERS_RECEIVING_POINT` — пункт приёма заказов,
 * - `WAREHOUSE_TYPE_SORTING_CENTER` — сортировочный центр,
 * - `WAREHOUSE_TYPE_FULL_FILLMENT` — фулфилмент,
 * - `WAREHOUSE_TYPE_CROSS_DOCK` — кросс-докинг.
 * 
 */
export type IDraftGetWarehouseFboListResponseWarehouseType = 'WAREHOUSE_TYPE_DELIVERY_POINT' | 'WAREHOUSE_TYPE_ORDERS_RECEIVING_POINT' | 'WAREHOUSE_TYPE_SORTING_CENTER' | 'WAREHOUSE_TYPE_FULL_FILLMENT' | 'WAREHOUSE_TYPE_CROSS_DOCK';

export interface IDraftGetWarehouseFboListResponseSearch {
  /** Адрес склада. */
  readonly address?: string;
  readonly coordinates?: IDraftGetWarehouseFboListResponseCoordinate;
  /** Название склада. */
  readonly name?: string;
  /** Идентификатор склада, пункта выдачи заказов или сортировочного центра. */
  readonly warehouse_id?: number;
  readonly warehouse_type?: IDraftGetWarehouseFboListResponseWarehouseType;
}

export interface IV1DraftGetWarehouseFboListResponse {
  /** Результат поиска складов. */
  readonly search?: IDraftGetWarehouseFboListResponseSearch[];
}

export interface IDraftCreateRequestItem {
  /** Количество товара. */
  readonly quantity: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku: number;
}

export interface IV1DraftCreateRequest {
  /** Идентификаторы кластеров. Можно получить с помощью метода [/v1/cluster/list](#operation/SupplyDraftAPI_DraftClusterList). */
  readonly cluster_ids?: string[];
  /** Идентификатор точки отгрузки — пункта выдачи заказов или сортировочного центра. Можно получить с помощью метода [/v1/warehouse/fbo/list](#operation/SupplyDraftAPI_DraftGetWarehouseFboList). Только для типа поставки `type = CREATE_TYPE_CROSSDOCK`. */
  readonly drop_off_point_warehouse_id?: number;
  /** Товары. */
  readonly items: IDraftCreateRequestItem[];
  readonly type: IV1CreateType;
}

export interface IV1DraftCreateResponse {
  /** Идентификатор черновика заявки на поставку. */
  readonly operation_id?: string;
}

export interface IV1DraftCreateInfoRequest {
  /** Уникальный идентификатор генерации черновика заявки на поставку. */
  readonly operation_id: string;
}

export interface IV1BundleId {
  /** Идентификатор комплекта. Используйте параметр в методе [/v1/supply-order/bundle](#operation/SupplyOrderBundle), чтобы получить подробную информацию. */
  readonly bundle_id?: string;
  /** Признак необходимости передачи УПД: - `true` — документы не требуются, - `false` — требуются. */
  readonly is_docless?: boolean;
}

/**
 * Причина недоступности склада:
 *   - `WAREHOUSE_SCORING_INVALID_REASON_PARTIAL_MATRIX_AVAILABLE` — склад не может принять часть товаров;
 *   - `WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_MATRIX` — склад не может принять все товары;
 *   - `WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_RANK` — склад недоступен из-за рейтинга;
 *   - `WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_ROUTE` — нет доступного маршрута;
 *   - `WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_DROP_OFF_POINT` — нет таймслотов на точке отгрузки;
 *   - `WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_STORAGE_WAREHOUSE` — нет таймслотов на складе поставки;
 *   - `WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_BOTH_WAREHOUSE` — нет таймслотов на складах отгрузки и поставки.
 * 
 */
export type IV1WarehouseScoringInvalidReason = 'WAREHOUSE_SCORING_INVALID_REASON_PARTIAL_MATRIX_AVAILABLE' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_MATRIX' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_RANK' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_ROUTE' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_DROP_OFF_POINT' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_STORAGE_WAREHOUSE' | 'WAREHOUSE_SCORING_INVALID_REASON_NOT_AVAILABLE_TIMESLOT_FOR_BOTH_WAREHOUSE';

/**
 * Статус склада:
 * - `WAREHOUSE_SCORING_STATUS_FULL_AVAILABLE` — доступен,
 * - `WAREHOUSE_SCORING_STATUS_PARTIAL_AVAILABLE` —  частично доступен,
 * - `WAREHOUSE_SCORING_STATUS_NOT_AVAILABLE` — недоступен.
 * 
 */
export type IV1WarehouseScoringStatus = 'WAREHOUSE_SCORING_STATUS_FULL_AVAILABLE' | 'WAREHOUSE_SCORING_STATUS_PARTIAL_AVAILABLE' | 'WAREHOUSE_SCORING_STATUS_NOT_AVAILABLE';

/**
 * Доступность склада.
 */
export interface IV1WarehouseStatus {
  readonly invalid_reason?: IV1WarehouseScoringInvalidReason;
  /** Доступность склада: - `true` — доступен, - `false` — недоступен. */
  readonly is_available?: boolean;
  readonly state?: IV1WarehouseScoringStatus;
}

/**
 * Склады для поставки.
 */
export interface IV1SupplyWarehouse {
  /** Адрес склада. */
  readonly address?: string;
  /** Название склада. */
  readonly name?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
}

export interface IDraftv1Warehouse {
  /** Товарный состав в виде комплекта. */
  readonly bundle_ids?: IV1BundleId[];
  /** Комплект товаров, которые не попадают в поставку. Используйте параметр в методе [/v1/supply-order/bundle](#operation/SupplyOrderBundle), чтобы получить подробную информацию. */
  readonly restricted_bundle_id?: string;
  readonly status?: IV1WarehouseStatus;
  readonly supply_warehouse?: IV1SupplyWarehouse;
  /** Ранг склада в кластере. */
  readonly total_rank?: number;
  /** Рейтинг склада. */
  readonly total_score?: number;
  /** Предполагаемый срок доставки. */
  readonly travel_time_days?: number;
}

export interface IDraftv1Cluster {
  /** Идентификатор кластера. */
  readonly cluster_id?: number;
  /** Название кластера. */
  readonly cluster_name?: string;
  /** Склады. */
  readonly warehouses?: IDraftv1Warehouse[];
}

export interface IV1ItemsValidation {
  /** Причины ошибки. */
  readonly reasons?: string[];
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
}

export interface IV1CalculationError {
  /** Возможные ошибки: - `vdc_is_not_supported` — не поддерживается тип поставки вРЦ; - `drop_off_point_warehouse_is_required` — не передано значение `drop_off_point_warehouse_id`; - `empty_items_list` — передан пустой список `items`; - `items_count_more_than_max` — превышено количество `sku`; - `invalid_shipment_type` — неверный тип черновика; - `unknown_cluster_ids` — кластер с таким `id` не существует; - `items_validation` — ошибки валидации товарного состава; - `drop_off_point_does_not_exist` — точка отгрузки с таким `id` не существует; - `drop_off_point_has_no_timeslots` — нет доступных таймслотов на точке отгрузки; - `total_volume_in_litres_invalid` — объём поставляемых товаров слишком большой для этой точки; - `xdock_in_delivery_point_disabled_for_seller` — поставка кросс-докингом через пункт выдачи заказов недоступна для продавца. */
  readonly error_message?: string;
  /** Ошибки валидации. */
  readonly items_validation?: IV1ItemsValidation[];
  /** Неизвестные идентификаторы кластеров. */
  readonly unknown_cluster_ids?: string[];
}

/**
 * Статус создания черновика заявки на поставку:
 * - `CALCULATION_STATUS_FAILED` — не удалось создать черновик,
 * - `CALCULATION_STATUS_SUCCESS` — черновик создан,
 * - `CALCULATION_STATUS_IN_PROGRESS` — черновик создаётся,
 * - `CALCULATION_STATUS_EXPIRED` — истёк срок действия черновика.
 * 
 */
export type IV1CalculationStatus = 'CALCULATION_STATUS_FAILED' | 'CALCULATION_STATUS_SUCCESS' | 'CALCULATION_STATUS_IN_PROGRESS' | 'CALCULATION_STATUS_EXPIRED';

export interface IV1DraftCreateInfoResponse {
  /** Кластеры. */
  readonly clusters?: IDraftv1Cluster[];
  /** Идентификатор черновика заявки на поставку. */
  readonly draft_id?: number;
  /** Ошибки. */
  readonly errors?: IV1CalculationError[];
  readonly status?: IV1CalculationStatus;
}

export interface IV1DraftTimeslotInfoRequest {
  /** Дата начала нужного периода доступных таймслотов. */
  readonly date_from: string;
  /** Дата окончания нужного периода доступных таймслотов.  Максимальный период — 28 дней с текущей даты. */
  readonly date_to: string;
  /** Идентификатор черновика заявки на поставку. */
  readonly draft_id: number;
  /** Идентификаторы складов, для которых нужно получить таймслоты. */
  readonly warehouse_ids: string[];
}

/**
 * Таймслот поставки.
 */
export interface IV1DayTimeSlot {
  /** Начало таймслота. */
  readonly from_in_timezone?: string;
  /** Конец таймслота. */
  readonly to_in_timezone?: string;
}

export interface IV1Day {
  /** Дата таймслотов. */
  readonly date_in_timezone?: string;
  /** Таймслоты. */
  readonly timeslots?: IV1DayTimeSlot[];
}

export interface IV1DropOffWarehouse {
  /** Текущее время в часовом поясе склада. */
  readonly current_time_in_timezone?: string;
  /** Таймслоты по датам. */
  readonly days?: IV1Day[];
  /** Идентификатор склада. */
  readonly drop_off_warehouse_id?: number;
  /** Часовой пояс склада. */
  readonly warehouse_timezone?: string;
}

export interface IV1DraftTimeslotInfoResponse {
  /** Таймслоты складов. */
  readonly drop_off_warehouse_timeslots?: IV1DropOffWarehouse[];
  /** Дата начала интересующего периода. */
  readonly requested_date_from?: string;
  /** Дата окончания интересующего периода. */
  readonly requested_date_to?: string;
}

export interface IV1DraftSupplyCreateRequest {
  /** Идентификатор черновика заявки на поставку. */
  readonly draft_id: number;
  readonly timeslot?: IV1DayTimeSlot;
  /** Идентификатор склада размещения. Можно получить с помощью метода [/v1/draft/create/info](#operation/SupplyDraftAPI_DraftCreateInfo). */
  readonly warehouse_id: number;
}

export interface IV1DraftSupplyCreateResponse {
  /** Идентификатор заявки на поставку. */
  readonly operation_id?: string;
}

export interface IV1DraftSupplyCreateStatusRequest {
  /** Идентификатор заявки на поставку. */
  readonly operation_id: string;
}

/**
 * Идентификаторы заявок на поставку.
 */
export interface IDraftSupplyCreateStatusResponseResult {
  /** Идентификаторы заявок на поставку. */
  readonly order_ids?: string[];
}

/**
 * Статус создания заявки на поставку:
 *   - `DraftSupplyCreateStatusUnknown` — неизвестный,
 *   - `DraftSupplyCreateStatusSuccess` — создана,
 *   - `DraftSupplyCreateStatusFailed` — не создана,
 *   - `DraftSupplyCreateStatusInProgress` — создаётся.
 * 
 */
export type IV1DraftSupplyCreateStatus = 'DraftSupplyCreateStatusUnknown' | 'DraftSupplyCreateStatusSuccess' | 'DraftSupplyCreateStatusFailed' | 'DraftSupplyCreateStatusInProgress';

export interface IV1DraftSupplyCreateStatusResponse {
  /** Ошибки создания заявок. */
  readonly error_messages?: string[];
  readonly result?: IDraftSupplyCreateStatusResponseResult;
  readonly status?: IV1DraftSupplyCreateStatus;
}

export interface IValueItem {
  /** Штрихкод товара. */
  readonly barcode?: string;
  /** Годен до. */
  readonly expires_at?: string;
  /** Размер кванта. */
  readonly quant?: number;
  /** Количество товара. */
  readonly quantity?: number;
}

/**
 * Тип грузоместа: 
 *    - `BOX` — коробка.
 *    - `PALLET` — палета.
 * 
 */
export type IValueCargoType = 'BOX' | 'PALLET';

/**
 * Информация о грузоместе.
 */
export interface IV1CargoesCreateRequestCargoValue {
  /** Информация о товарах в грузоместе. */
  readonly items?: IValueItem[];
  readonly type: IValueCargoType;
}

export interface IV1CargoesCreateRequestCargo {
  /** Уникальный ключ для идентификации грузоместа. */
  readonly key: string;
  readonly value: IV1CargoesCreateRequestCargoValue;
}

export interface IV1CargoesCreateRequest {
  /** Информация о грузоместах. Вы можете передать не больше 40 палет или 30 коробок. */
  readonly cargoes: IV1CargoesCreateRequestCargo[];
  /** `true`, если нужно удалить предыдущие грузоместа. */
  readonly delete_current_version?: boolean;
  /** Идентификатор поставки. Можно получить с помощью метода [/v2/supply-order/get](#operation/SupplyOrderAPI_GetSupplyOrdersV2). Нужное значение — в параметре ответа `orders.supplies.supply_id`. */
  readonly supply_id: number;
}

export type ICargoesCreateErrorsErrorReason = 'INVALID_STATE' | 'VALIDATION_FAILED' | 'WAREHOUSE_LIMITS_EXCEED' | 'SUPPLY_NOT_BELONG_CONTRACTOR' | 'SUPPLY_NOT_BELONG_COMPANY' | 'IS_FINALIZED' | 'SKU_DISTRIBUTION_DISABLED' | 'SUPPLY_IS_NOT_EMPTY' | 'OPERATION_NOT_FOUND' | 'OPERATION_FAILED';

/**
 * Тип ошибки:
 *   - `SUPPLY_ITEM_NOT_FOUND` — товар не найден.
 *   - `DUPLICATED_SUPPLY_ITEM` — найден дубликат товара.
 *   - `BEFORE_DEADLINE` — некорректный срок годности.
 *   - `SAME_BARCODES` — у разных SKU одинаковые штрихкоды.
 *   - `SAME_ARTICLES` — у разных SKU одинаковые артикулы.
 *   - `NOT_UNIQUE_SKU_BY_PRODUCT` — одинаковый SKU в грузоместе используется для разных товаров.
 *   - `QUANTITY_NOT_DIVISIBLE_BY_QUANT` — количество SKU в грузоместе не кратно кванту.
 *   - `NOT_SINGLE_PALLET_SKU_IN_PALLET_CARGO` — в грузоместе отсутствует палетная SKU.
 *   - `NOT_ONE_QUANT_PALLET_SKU` — в квантовом палетном грузоместе должен быть только один квант.
 *   - `NOT_ECONOM_SKU` — в эконом-поставке указан не эконом-SKU.
 *   - `QUANTITY_LESS_ONE` — количество SKU в эконом-поставке меньше 1.
 *   - `SUPPLY_ITEM_WITH_QUANT_NOT_FOUND` — товар не найден по артикулу, штрихкоду и размеру кванта.
 * 
 */
export type IItemValidationErrorType = 'SUPPLY_ITEM_NOT_FOUND' | 'DUPLICATED_SUPPLY_ITEM' | 'BEFORE_DEADLINE' | 'SAME_BARCODES' | 'SAME_ARTICLES' | 'NOT_UNIQUE_SKU_BY_PRODUCT' | 'QUANTITY_NOT_DIVISIBLE_BY_QUANT' | 'NOT_SINGLE_PALLET_SKU_IN_PALLET_CARGO' | 'NOT_ONE_QUANT_PALLET_SKU' | 'NOT_ECONOM_SKU' | 'QUANTITY_LESS_ONE' | 'SUPPLY_ITEM_WITH_QUANT_NOT_FOUND';

export interface ICargoesCreateErrorsItemValidation {
  /** Штрихкод товара. */
  readonly barcode?: string;
  /** Ключ грузоместа. */
  readonly cargo_key?: string;
  /** Размер кванта. */
  readonly quant?: number;
  readonly type?: IItemValidationErrorType;
}

/**
 * Ошибки.
 */
export interface IV1CargoesCreateErrors {
  /** Причина ошибки:   - `INVALID_STATE` — недопустимое состояние поставки.   - `VALIDATION_FAILED` — ошибки валидации.   - `WAREHOUSE_LIMITS_EXCEED` — превышены лимиты склада.   - `SUPPLY_NOT_BELONG_CONTRACTOR` — поставка не относится к указанному контрагенту.   - `SUPPLY_NOT_BELONG_COMPANY` — поставка не относится к указанной компании.   - `IS_FINALIZED` — редактирование поставки недоступно.   - `SKU_DISTRIBUTION_DISABLED` — распределение состава недоступно.   - `SUPPLY_IS_NOT_EMPTY` — поставка содержит распределение состава.   - `OPERATION_NOT_FOUND` — операция не найдена.   - `OPERATION_FAILED` — ошибка при обработке операции. */
  readonly error_reasons?: ICargoesCreateErrorsErrorReason[];
  /** Ошибки валидации. */
  readonly items_validation?: ICargoesCreateErrorsItemValidation[];
}

export interface IV1CargoesCreateResponse {
  /** Идентификатор операции. */
  readonly operation_id?: string;
  readonly errors?: IV1CargoesCreateErrors;
}

export interface IGooglerpcStatus {
  /** Код ошибки. */
  readonly code?: number;
  /** Дополнительная информация об ошибке. */
  readonly details?: IProtobufAny[];
  /** Описание ошибки. */
  readonly message?: string;
}

export interface IV1CargoesCreateInfoRequest {
  /** Идентификатор операции. */
  readonly operation_id: string;
}

/**
 * Информация о грузоместе.
 */
export interface ICargoesCreateInfoResponseResultCargoValue {
  /** Идентификатор грузоместа. */
  readonly cargo_id?: number;
}

export interface ICargoesCreateInfoResponseResultCargo {
  /** Ключ грузоместа. */
  readonly key?: string;
  readonly value?: ICargoesCreateInfoResponseResultCargoValue;
}

/**
 * Результат запроса.
 */
export interface ICargoesCreateInfoResponseResult {
  /** Информация о грузоместах. */
  readonly cargoes?: ICargoesCreateInfoResponseResultCargo[];
}

/**
 * Статус формирования грузомест:
 *   - `SUCCESS` — успешно.
 *   - `IN_PROGRESS` — формируются.
 *   - `FAILED` — при формировании грузомест произошла ошибка.
 * 
 */
export type IV1CargoesCreateInfoResponseStatus = 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';

export interface IV1CargoesCreateInfoResponse {
  readonly result?: ICargoesCreateInfoResponseResult;
  readonly status?: IV1CargoesCreateInfoResponseStatus;
  readonly errors?: IV1CargoesCreateErrors;
}

export interface IV1CargoesDeleteRequest {
  /** Список идентификаторов грузомест, которые нужно удалить.  Максимум 70 значений. */
  readonly cargo_ids?: string[];
  /** Идентификатор поставки. */
  readonly supply_id?: number;
}

export type IV1CargoesDeleteResponseErrorCargoErrorReasonErrorReasonEnum = 'CARGO_NOT_FOUND';

export interface IV1CargoesDeleteResponseErrorCargoErrorReason {
  /** Идентификатор грузоместа. */
  readonly cargo_id?: number;
  /** Список ошибок грузоместа.  Если значение `CARGO_NOT_FOUND`, грузоместо не найдено. */
  readonly error_reasons?: IV1CargoesDeleteResponseErrorCargoErrorReasonErrorReasonEnum[];
}

export type IV1CargoesDeleteResponseErrorSupplyErrorReasonEnum = 'SUPPLY_NOT_FOUND' | 'CANT_DELETE_ALL_CARGOES' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY' | 'SUPPLY_CARGOES_IS_FINALIZED' | 'SUPPLY_CARGOES_LOCKED' | 'OPERATION_NOT_FOUND';

/**
 * Список ошибок, которые возникли при удалении грузомест.
 */
export interface IV1CargoesDeleteResponseError {
  /** Ошибки при удалении грузомест. */
  readonly cargo_error_reasons?: IV1CargoesDeleteResponseErrorCargoErrorReason[];
  /** Список ошибок поставки: - `SUPPLY_NOT_FOUND` — поставка не найдена, - `CANT_DELETE_ALL_CARGOES` — нельзя удалять все грузоместа, - `SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR` — не принадлежит вашему юридическому лицу, - `SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY` — не принадлежит вашему кабинету, - `SUPPLY_CARGOES_IS_FINALIZED` — грузоместа поставки нельзя редактировать, - `SUPPLY_CARGOES_LOCKED` — другой процесс блокирует редактирование грузомест поставки, - `OPERATION_NOT_FOUND` — операция не найдена. */
  readonly supply_error_reasons?: IV1CargoesDeleteResponseErrorSupplyErrorReasonEnum[];
}

export interface IV1CargoesDeleteResponse {
  readonly errors?: IV1CargoesDeleteResponseError;
  /** Идентификатор операции. */
  readonly operation_id?: string;
}

export interface IV1CargoesDeleteStatusRequest {
  /** Идентификатор операции. */
  readonly operation_id?: string;
}

export type IV1CargoesDeleteStatusResponseErrorCargoErrorReasonErrorReasonEnum = 'CARGO_NOT_FOUND';

export interface IV1CargoesDeleteStatusResponseErrorCargoErrorReason {
  /** Идентификатор грузоместа. */
  readonly cargo_id?: number;
  /** Список ошибок грузоместа.  Если значение `CARGO_NOT_FOUND`, грузоместо не найдено. */
  readonly error_reasons?: IV1CargoesDeleteStatusResponseErrorCargoErrorReasonErrorReasonEnum[];
}

export type IV1CargoesDeleteStatusResponseErrorSupplyErrorReasonEnum = 'SUPPLY_NOT_FOUND' | 'CANT_DELETE_ALL_CARGOES' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR' | 'SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY' | 'SUPPLY_CARGOES_IS_FINALIZED' | 'SUPPLY_CARGOES_LOCKED' | 'OPERATION_NOT_FOUND';

/**
 * Список ошибок, которые возникли при удалении грузомест.
 */
export interface IV1CargoesDeleteStatusResponseError {
  /** Ошибки при удалении грузомест. */
  readonly cargo_error_reasons?: IV1CargoesDeleteStatusResponseErrorCargoErrorReason[];
  /** Список ошибок поставки: - `SUPPLY_NOT_FOUND` — поставка не найдена, - `CANT_DELETE_ALL_CARGOES` — нельзя удалять все грузоместа, - `SUPPLY_DOES_NOT_BELONG_TO_THE_CONTRACTOR` — не принадлежит вашему юридическому лицу, - `SUPPLY_DOES_NOT_BELONG_TO_THE_COMPANY` — не принадлежит вашему кабинету, - `SUPPLY_CARGOES_IS_FINALIZED` — грузоместа поставки нельзя редактировать, - `SUPPLY_CARGOES_LOCKED` — другой процесс блокирует редактирование грузомест поставки, - `OPERATION_NOT_FOUND` — операция не найдена. */
  readonly supply_error_reasons?: IV1CargoesDeleteStatusResponseErrorSupplyErrorReasonEnum[];
}

/**
 * Статус удаления грузоместа.
 * 
 * Возможные статусы:
 * - `SUCCESS` — грузоместо удалено,
 * - `IN_PROGRESS` — грузоместо в процессе удаления,
 * - `ERROR` — возникла ошибка при удалении грузоместа.
 * 
 */
export type ICargoesDeleteStatusResponseStatusEnum = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';

export interface IV1CargoesDeleteStatusResponse {
  readonly errors?: IV1CargoesDeleteStatusResponseError;
  readonly status?: ICargoesDeleteStatusResponseStatusEnum;
}

export interface IV1CargoesRulesGetRequest {
  /** Список идентификаторов поставок в заявке.  Максимум 100 идентификаторов. */
  readonly supply_ids?: string[];
}

/**
 * Тип грузоместа:
 * - `BOX` — коробка,
 * - `PALLET` — палета.
 * 
 */
export type ICargoesPresentRuleCargoCountPerTypeEnum = 'BOX' | 'PALLET';

export interface ICargoesPresentRuleCargoCountPerType {
  /** Количество грузомест. */
  readonly count?: number;
  readonly type?: ICargoesPresentRuleCargoCountPerTypeEnum;
}

/**
 * Правило указания грузомест.
 */
export interface ISupplyCheckCargoesPresentRule {
  /** Количество грузомест каждого типа. */
  readonly cargo_count_per_type?: ICargoesPresentRuleCargoCountPerType[];
  /** Общее количество грузомест. */
  readonly count?: number;
  /** `true`, если грузоместа указаны. */
  readonly satisfied?: boolean;
}

/**
 * Правило крайнего срока редактирования грузомест.
 */
export interface ISupplyCheckEditDeadlineExpireRule {
  /** `true`, если правило применимо к текущей поставке. */
  readonly is_applicable?: boolean;
  /** `true`, если правило обязательно для текущей поставки. */
  readonly is_required?: boolean;
  /** `true`, если крайний срок для редактирования не наступил. */
  readonly satisfied?: boolean;
}

/**
 * Правило указания сроков годности для товаров.
 */
export interface ISupplyCheckExpireDatePresentedRule {
  /** Количество SKU с корректным сроком годности. */
  readonly count_sku_with_expiration?: number;
  /** Количество SKU, для которых обязателен срок годности. */
  readonly count_sku_with_expiration_filled?: number;
  /** `true`, если правило применимо к текущей поставке. */
  readonly is_applicable?: boolean;
  /** `true`, если правило обязательно для текущей поставки. */
  readonly is_required?: boolean;
  /** `true`, если сроки годности указаны корректно. */
  readonly satisfied?: boolean;
}

/**
 * Правило совпадения составов грузомест с составом поставки.
 */
export interface ISupplyCheckIsValidDistributionRule {
  /** Количество SKU, которые совпадают с поставкой. */
  readonly count_distributed_sku?: number;
  /** Общее количество SKU. */
  readonly count_sku_total?: number;
  /** `true`, если правило применимо к текущей поставке. */
  readonly is_applicable?: boolean;
  /** Процент совпадения состава грузомест с составом поставки. */
  readonly percents_int?: number;
  /** `true`, если состав грузомест совпадает с составом поставки. */
  readonly satisfied?: boolean;
}

/**
 * Правило заполнения состава грузомест.
 */
export interface ISupplyCheckPackageUnitWithDistributionRule {
  /** Общее количество грузомест. */
  readonly count_all?: number;
  /** Количество заполненных грузомест. */
  readonly count_with_distribution?: number;
  /** `true`, если правило применимо к текущей поставке. */
  readonly is_applicable?: boolean;
  /** `true`, если правило обязательно для текущей поставки. */
  readonly is_required?: boolean;
  /** `true`, если указаны составы для всех грузомест. */
  readonly satisfied?: boolean;
}

/**
 * Правило распределения товаров в грузоместах по зонам размещения.
 */
export interface ISupplyCheckPlacementZoneRule {
  /** Количество грузомест. */
  readonly count_cargoes_all?: number;
  /** Количество грузомест с распределением по зонам размещения. */
  readonly count_cargoes_with_mono_placement_zone?: number;
  /** `true`, если правило применимо к текущей поставке. */
  readonly is_applicable?: boolean;
  /** `true`, если товары во всех грузоместах распределены по зонам размещения. */
  readonly satisfied?: boolean;
}

/**
 * Чек-лист правил заполнения грузомест.
 */
export interface ICargoesRulesGetResponseSupplyCheck {
  readonly cargoes_presents_rule?: ISupplyCheckCargoesPresentRule;
  readonly edit_deadline_expire_rule?: ISupplyCheckEditDeadlineExpireRule;
  readonly expire_dates_presented_rule?: ISupplyCheckExpireDatePresentedRule;
  readonly is_valid_distribution_rule?: ISupplyCheckIsValidDistributionRule;
  readonly package_units_with_distribution_rule?: ISupplyCheckPackageUnitWithDistributionRule;
  readonly placement_zones_rule?: ISupplyCheckPlacementZoneRule;
  /** Идентификатор поставки. */
  readonly supply_id?: number;
}

export interface IV1CargoesRulesGetResponse {
  /** Список чек-листов с правилами заполнения грузомест по поставкам. */
  readonly supply_check_lists?: ICargoesRulesGetResponseSupplyCheck[];
}

export interface IV1CargoesLabelCreateRequestCargo {
  /** Идентификатор грузоместа. */
  readonly cargo_id?: number;
}

export interface IV1CargoesLabelCreateRequest {
  /** Информация о грузоместах. */
  readonly cargoes?: IV1CargoesLabelCreateRequestCargo[];
  /** Идентификатор поставки. */
  readonly supply_id: number;
}

export type IV1CargoesLabelCreateErrorsErrorReason = 'INVALID_STATE' | 'OPERATION_NOT_FOUND' | 'OPERATION_FAILED' | 'SUPPLY_NOT_BELONG_CONTRACTOR' | 'SUPPLY_NOT_BELONG_COMPANY' | 'SUPPLY_IS_EMPTY' | 'CARGOES_NOT_FOUND';

/**
 * Ошибки.
 */
export interface IV1CargoesLabelCreateErrors {
  /** Причина ошибки:    - `INVALID_STATE` — недопустимое состояние поставки.    - `OPERATION_NOT_FOUND` — операция не найдена.    - `OPERATION_FAILED` — операция завершилась с ошибкой.    - `SUPPLY_NOT_BELONG_CONTRACTOR` — контрагент не соответствует поставке.    - `SUPPLY_NOT_BELONG_COMPANY` — компания не соответствует поставке.    - `SUPPLY_IS_EMPTY` — поставка без грузомест.    - `CARGOES_NOT_FOUND` — грузоместа не найдены. */
  readonly error_reasons?: IV1CargoesLabelCreateErrorsErrorReason[];
}

export interface IV1CargoesLabelCreateResponse {
  /** Идентификатор операции. */
  readonly operation_id?: string;
  readonly errors?: IV1CargoesLabelCreateErrors;
}

export interface IV1CargoesLabelGetRequest {
  /** Идентификатор операции. */
  readonly operation_id: string;
}

/**
 * Информация об этикетках.
 */
export interface IV1CargoesLabelGetResponseResult {
  /** Идентификатор для получения файла с этикетками. */
  readonly file_guid?: string;
}

/**
 * Статус формирования этикеток:
 * - `SUCCESS` — готовы.
 * - `IN_PROGRESS` — формируются.
 * - `FAILED` — ошибка при формировании.
 * 
 */
export type IV1CargoesLabelGetResponseStatus = 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';

export interface IV1CargoesLabelGetResponse {
  readonly result?: IV1CargoesLabelGetResponseResult;
  readonly status?: IV1CargoesLabelGetResponseStatus;
  readonly errors?: IV1CargoesLabelCreateErrors;
}

export interface IV1SupplyOrderCancelRequest {
  /** Идентификатор заявки на поставку. */
  readonly order_id: number;
}

export interface IV1SupplyOrderCancelResponse {
  /** Идентификатор операции на отмену заявки. */
  readonly operation_id?: string;
}

export interface IV1SupplyOrderCancelStatusRequest {
  /** Идентификатор операции на отмену заявки на поставку. */
  readonly operation_id: string;
}

export type ISupplyOrderCancelStatusResponseCancelOrderError = 'INVALID_ORDER_STATE' | 'ORDER_IS_VIRTUAL' | 'ORDER_DOES_NOT_BELONG_TO_CONTRACTOR' | 'ORDER_DOES_NOT_BELONG_TO_COMPANY' | 'OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS';

export type ICancelSupplyResultsCancelSupplyError = 'INVALID_SUPPLY_STATE' | 'SUPPLY_DOES_NOT_BELONG_TO_CONTRACTOR' | 'SUPPLY_DOES_NOT_BELONG_TO_COMPANY' | 'SUPPLY_DOES_NOT_BELONG_TO_ORDER' | 'SUPPLY_BELONGS_TO_VIRTUAL_ORDER' | 'OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS';

export interface ISupplyOrderCancelStatusResponseCancelSupplyResults {
  /** Причина, по которой не удалось отменить поставки:   - `INVALID_SUPPLY_STATE` — неверный статус поставки.   - `SUPPLY_DOES_NOT_BELONG_TO_CONTRACTOR` — поставка не принадлежит юридическому лицу.   - `SUPPLY_DOES_NOT_BELONG_TO_COMPANY` — поставка не принадлежит продавцу.   - `SUPPLY_DOES_NOT_BELONG_TO_ORDER` — поставка не принадлежит заявке на поставку.   - `SUPPLY_BELONGS_TO_VIRTUAL_ORDER` — поставка принадлежит виртуальной заявке на поставку.   - `OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS` — поставка в процессе отмены. */
  readonly error_reasons?: ICancelSupplyResultsCancelSupplyError[];
  /** `true`, если поставка отменена. */
  readonly is_supply_cancelled?: boolean;
  /** Идентификатор поставки. */
  readonly supply_id?: number;
}

/**
 * Информация об отмене заявки на поставку.
 */
export interface ISupplyOrderCancelStatusResponseResult {
  /** `true`, если заявка на поставку отменена. */
  readonly is_order_cancelled?: boolean;
  /** Список отменённых поставок. */
  readonly supplies?: ISupplyOrderCancelStatusResponseCancelSupplyResults[];
}

/**
 * Статус отмены заявки на поставку. Возможные значения:
 * - `SUCCESS` — заявка отменена.
 * - `IN_PROGRESS` — заявки в процессе отмены.
 * - `ERROR` — ошибка.
 * 
 */
export type IV1SupplyOrderCancelStatusResponseStatus = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';

export interface IV1SupplyOrderCancelStatusResponse {
  /** Причина, по которой не удалось отменить заявку на поставку:   - `INVALID_ORDER_STATE` — неверный статус заявки на поставку.   - `ORDER_IS_VIRTUAL` — заявка виртуальная.    - `ORDER_DOES_NOT_BELONG_TO_CONTRACTOR` —  заявка на поставку не принадлежит вашему юридическому лицу.   - `ORDER_DOES_NOT_BELONG_TO_COMPANY` — заявка на поставку не принадлежит продавцу.    - `OTHER_ASYNCHRONOUS_OPERATION_IN_PROGRESS` — заявка на поставку в процессе отмены. */
  readonly error_reasons?: ISupplyOrderCancelStatusResponseCancelOrderError[];
  readonly result?: ISupplyOrderCancelStatusResponseResult;
  readonly status?: IV1SupplyOrderCancelStatusResponseStatus;
}

export interface IV1SupplyOrderContentUpdateRequestItem {
  /** Размер кванта. */
  readonly quant?: number;
  /** Количество товара. */
  readonly quantity?: number;
  /** Идентификатор товара в системе Ozon — SKU. */
  readonly sku?: number;
}

export interface IV1SupplyOrderContentUpdateRequest {
  /** Новый товарный состав заявки на поставку.  Максимум 5000 товаров. */
  readonly items?: IV1SupplyOrderContentUpdateRequestItem[];
  /** Идентификатор заказа. */
  readonly order_id?: number;
  /** Идентификатор поставки. */
  readonly supply_id?: number;
}

export type IV1SupplyOrderContentUpdateResponseErrorEnum = 'INVALID_DRAFT_BUNDLE_ID' | 'SOME_SERVICE_ERROR' | 'HAS_UTD' | 'ORDER_SKU_LIMIT' | 'SAME_SKU' | 'SUPPLY_LOCKED' | 'INBOUND_NO_CAPACITY' | 'INBOUND_LOCK' | 'SUPPLY_CONTENT_NOT_VALID' | 'SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR' | 'SUPPLY_BELONG_TO_ANOTHER_COMPANY' | 'INCORRECT_SUPPLY_STATE' | 'INCORRECT_SUPPLY_SOURCE' | 'INCORRECT_STORAGE_WAREHOUSE' | 'DEADLINE' | 'INACTIVE_CONTRACT' | 'QUANTITY_OUT_OF_RANGE_BOTTOM' | 'QUANTITY_OUT_OF_RANGE_UPPER' | 'EMPTY_CONTENT' | 'NO_SUPPLY_PRODUCT_BUNDLE_ID' | 'ONLY_DOCLESS_ALLOWED' | 'INVALID_VOLUME' | 'SUPPLY_IS_VIRTUAL' | 'ORDER_LOCKED' | 'CONTRACT_IS_NOT_FOUND' | 'COMPANY_DOES_NOT_BELONGS_TO_CONTRACTOR' | 'ORDER_IS_NOT_FOUND' | 'ORDER_DOES_NOT_BELONGS_TO_COMPANY' | 'SUPPLY_IS_NOT_FOUND' | 'SUPPLY_DOES_NOT_BELONGS_TO_ORDER' | 'UTD_IS_UPLOADED' | 'STORAGE_WAREHOUSE_IS_NOT_WMS' | 'CONTRACT_IS_NOT_VALID_FOR_HANDLING_ORDERS' | 'ORDER_DOES_NOT_BELONG_TO_CONTRACTOR';

export interface IV1SupplyOrderContentUpdateResponse {
  /** Ошибки при редактировании товарного состава: - `INVALID_DRAFT_BUNDLE_ID`, `SOME_SERVICE_ERROR`, `ORDER_IS_NOT_FOUND`, `SUPPLY_IS_NOT_FOUND`, `SUPPLY_DOES_NOT_BELONGS_TO_ORDER` — ошибка при редактировании поставки. - `HAS_UTD`, `UTD_IS_UPLOADED` — документы в системе ЭДО не удалены. Аннулируйте документы в системе ЭДО. Когда отредактируете состав, сформируйте и подпишите новые документы. - `ORDER_SKU_LIMIT` — количество товаров в поставке должно быть меньше или равно 5000. - `SAME_SKU` — товарный состав поставки остался прежним. - `SUPPLY_LOCKED` — обновление товарного состава в процессе, попробуйте позже. - `INBOUND_NO_CAPACITY` — на складе недостаточно места для поставки. - `INBOUND_LOCK`, `ORDER_LOCKED`, `STORAGE_WAREHOUSE_IS_NOT_WMS` — нельзя редактировать товарный состав. - `SUPPLY_CONTENT_NOT_VALID` — в составе поставки есть товары, которые склад не может принять. - `SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR`, `COMPANY_DOES_NOT_BELONGS_TO_CONTRACTOR`, `ORDER_DOES_NOT_BELONG_TO_CONTRACTOR` — заявка на поставку не принадлежит вашему юридическому лицу. - `SUPPLY_BELONG_TO_ANOTHER_COMPANY`, `ORDER_DOES_NOT_BELONGS_TO_COMPANY` — заявка на поставку не принадлежит вашему кабинету. - `INCORRECT_SUPPLY_STATE` — нельзя изменить поставку в этом статусе. - `INCORRECT_SUPPLY_SOURCE` — нельзя изменить поставку с этим источником данных. - `INCORRECT_STORAGE_WAREHOUSE` — нельзя изменить поставку с этим складом хранения. - `NO_SUPPLY_PRODUCT_BUNDLE_ID` — отсутствует идентификатор товарного состава поставки. - `ONLY_DOCLESS_ALLOWED` — нельзя редактировать поставку при наличии документов. - `INVALID_VOLUME` — некорректный объём поставки. - `SUPPLY_IS_VIRTUAL` — нельзя редактировать виртуальную поставку. - `DEADLINE` — нельзя изменить поставку за час до таймслота. - `INACTIVE_CONTRACT` — нельзя редактировать состав поставки с истекшим договором. - `QUANTITY_OUT_OF_RANGE_BOTTOM` — количество экземпляров каждого товара должно быть больше 0. - `QUANTITY_OUT_OF_RANGE_UPPER` — количество экземпляров каждого товара должно быть меньше или равно 1 000 000. - `EMPTY_CONTENT` — не сможем принять пустую поставку, добавьте товары. - `CONTRACT_IS_NOT_FOUND`, `CONTRACT_IS_NOT_VALID_FOR_HANDLING_ORDERS` — в этом личном кабинете нельзя изменить поставку. */
  readonly errors?: IV1SupplyOrderContentUpdateResponseErrorEnum[];
  /** Идентификатор операции. */
  readonly operation_id?: string;
}

export interface IV1SupplyOrderContentUpdateStatusRequest {
  /** Идентификатор операции. */
  readonly operation_id?: string;
}

export type IV1SupplyOrderContentUpdateStatusResponseErrorEnum = 'INVALID_DRAFT_BUNDLE_ID' | 'SOME_SERVICE_ERROR' | 'HAS_UTD' | 'ORDER_SKU_LIMIT' | 'SAME_SKU' | 'SUPPLY_LOCKED' | 'INBOUND_NO_CAPACITY' | 'INBOUND_LOCK' | 'SUPPLY_CONTENT_NOT_VALID' | 'SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR' | 'SUPPLY_BELONG_TO_ANOTHER_COMPANY' | 'INCORRECT_SUPPLY_STATE' | 'INCORRECT_SUPPLY_SOURCE' | 'INCORRECT_STORAGE_WAREHOUSE' | 'DEADLINE' | 'INACTIVE_CONTRACT' | 'QUANTITY_OUT_OF_RANGE_BOTTOM' | 'QUANTITY_OUT_OF_RANGE_UPPER' | 'EMPTY_CONTENT' | 'NO_SUPPLY_PRODUCT_BUNDLE_ID' | 'ONLY_DOCLESS_ALLOWED' | 'INVALID_VOLUME' | 'SUPPLY_IS_VIRTUAL' | 'ORDER_LOCKED';

/**
 * Статус редактирования товарного состава поставки.
 * 
 * Возможные статусы:
 * - `SUCCESS` — товарный состав изменён,
 * - `IN_PROGRESS` — товарный состав в процессе изменения,
 * - `ERROR` — возникла ошибка при изменении товарного состава.
 * 
 */
export type ISupplyOrderContentUpdateStatusResponseStatusEnum = 'SUCCESS' | 'IN_PROGRESS' | 'ERROR';

export interface IV1SupplyOrderContentUpdateStatusResponse {
  /** Список ошибок при редактировании товарного состава: - `INVALID_DRAFT_BUNDLE_ID`, `SOME_SERVICE_ERROR` — ошибка при редактировании поставки. - `HAS_UTD` — документы в системе ЭДО не удалены. Аннулируйте документы в системе ЭДО. Когда отредактируете состав, сформируйте и подпишите новые документы. - `ORDER_SKU_LIMIT` — количество товаров в поставке должно быть меньше или равно 5000. - `SAME_SKU` — товарный состав поставки остался прежним. - `SUPPLY_LOCKED` — обновление товарного состава в процессе, попробуйте позже. - `INBOUND_NO_CAPACITY` — на складе недостаточно места для поставки. - `INBOUND_LOCK`, `ORDER_LOCKED` — нельзя редактировать товарный состав. - `SUPPLY_CONTENT_NOT_VALID` — в составе поставки есть товары, которые склад не может принять. - `SUPPLY_BELONG_TO_ANOTHER_CONTRACTOR` — заявка на поставку не принадлежит вашему юридическому лицу. - `SUPPLY_BELONG_TO_ANOTHER_COMPANY` — заявка на поставку не принадлежит вашему кабинету. - `INCORRECT_SUPPLY_STATE` — нельзя изменить поставку в этом статусе. - `INCORRECT_SUPPLY_SOURCE` — нельзя изменить поставку с этим источником данных. - `INCORRECT_STORAGE_WAREHOUSE` — нельзя изменить поставку с этим складом хранения. - `NO_SUPPLY_PRODUCT_BUNDLE_ID` — отсутствует идентификатор товарного состава поставки. - `ONLY_DOCLESS_ALLOWED` — нельзя редактировать поставку при наличии документов. - `INVALID_VOLUME` — некорректный объём поставки. - `SUPPLY_IS_VIRTUAL` — нельзя редактировать виртуальную поставку. - `DEADLINE` — нельзя изменить поставку за час до таймслота. - `INACTIVE_CONTRACT` — нельзя редактировать состав поставки с истекшим договором. - `QUANTITY_OUT_OF_RANGE_BOTTOM` — количество экземпляров каждого товара должно быть больше 0. - `QUANTITY_OUT_OF_RANGE_UPPER` — количество экземпляров каждого товара должно быть меньше или равно 1 000 000. - `EMPTY_CONTENT` — не сможем принять пустую поставку, добавьте товары. */
  readonly errors?: IV1SupplyOrderContentUpdateStatusResponseErrorEnum[];
  readonly status?: ISupplyOrderContentUpdateStatusResponseStatusEnum;
}
