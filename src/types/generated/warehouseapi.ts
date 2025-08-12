/**
 * Generated types for WarehouseAPI (WarehouseAPI)
 * 
 * This file is auto-generated from Ozon Seller API documentation.
 * Do not edit manually - changes will be overwritten.
 * 
 * Generated from: 23-warehouseapi.json
 * Endpoints: 2
 * Schemas: 9
 */

/**
 * Первая миля FBS.
 */
export interface IWarehouseFirstMileType {
  /** Идентификатор DropOff-точки. */
  readonly dropoff_point_id?: string;
  /** Идентификатор временного слота для DropOff. */
  readonly dropoff_timeslot_id?: number;
  /** Признак, что настройки склада обновляются. */
  readonly first_mile_is_changing?: boolean;
  /** Тип первой мили — `DropOff` или `Pickup`. */
  readonly first_mile_type?: 'DropOff' | 'Pickup';
}

export interface IWarehouseListResponseWarehouse {
  /** Признак доверительной приёмки. `true`, если доверительная приёмка включена на складе. */
  readonly has_entrusted_acceptance?: boolean;
  /** Признак работы склада по схеме rFBS: - `true` — склад работает по схеме rFBS; - `false` — не работает по схеме rFBS. */
  readonly is_rfbs?: boolean;
  /** Название склада. */
  readonly name?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
  /** Возможность печати акта приёма-передачи заранее. `true`, если печатать заранее возможно. */
  readonly can_print_act_in_advance?: boolean;
  readonly first_mile_type?: IWarehouseFirstMileType;
  /** Признак наличия лимита минимального количества заказов. `true`, если лимит есть. */
  readonly has_postings_limit?: boolean;
  /** Признак, что склад не работает из-за карантина. */
  readonly is_karantin?: boolean;
  /** Признак, что склад принимает крупногабаритные товары. */
  readonly is_kgt?: boolean;
  /** `true`, если склад работает с эконом-товарами. */
  readonly is_economy?: boolean;
  /** Признак, что можно менять расписание работы складов. */
  readonly is_timetable_editable?: boolean;
  /** Минимальное значение лимита — количество заказов, которые можно привезти в одной поставке. */
  readonly min_postings_limit?: number;
  /** Значение лимита. `-1`, если лимита нет. */
  readonly postings_limit?: number;
  /** Количество рабочих дней склада. */
  readonly min_working_days?: number;
  /** Статус склада.  Соответствие статусов склада со статусами с личном кабинете:  | Статус Seller&nbsp;API | Статус в личном кабинете | |---|---| | `new` | Активируется | | `created` | Активный | | `disabled` | В архиве | | `blocked` | Заблокирован | | `disabled_due_to_limit` | На паузе | | `error` | Ошибка | */
  readonly status?: string;
  /** Рабочие дни склада (1-7, где 1=понедельник, 7=воскресенье). */
  readonly working_days?: string[];
}

export interface IWarehouseListResponse {
  /** Список складов. */
  readonly result?: IWarehouseListResponseWarehouse[];
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
 * Фильтр для поиска методов доставки.
 */
export interface IDeliveryMethodListRequestFilter {
  /** Идентификатор службы доставки. */
  readonly provider_id?: number;
  /** Статус метода доставки:   - `NEW` — создан,   - `EDITED` — редактируется,   - `ACTIVE` — активный,   - `DISABLED` — неактивный. */
  readonly status?: string;
  /** Идентификатор склада. Можно получить с помощью метода [/v1/warehouse/list ](#operation/WarehouseAPI_WarehouseList). */
  readonly warehouse_id?: number;
}

export interface IWarehouseDeliveryMethodListRequest {
  readonly filter?: IDeliveryMethodListRequestFilter;
  /** Количество элементов в ответе. Максимум — 50, минимум — 1. */
  readonly limit: number;
  /** Количество элементов, которое будет пропущено в ответе. Например, если `offset = 10`, то ответ начнётся с 11-го найденного элемента. */
  readonly offset?: number;
}

export interface IDeliveryMethodListResponseDeliveryMethod {
  /** Идентификатор продавца. */
  readonly company_id?: number;
  /** Дата и время создания метода доставки. */
  readonly created_at?: string;
  /** Время, до которого продавцу нужно собрать заказ. */
  readonly cutoff?: string;
  /** Идентификатор метода доставки. */
  readonly id?: number;
  /** Название метода доставки. */
  readonly name?: string;
  /** Идентификатор службы доставки. */
  readonly provider_id?: number;
  /** Минимальное время на сборку заказа в минутах в соответствии с настройками склада. */
  readonly sla_cut_in?: number;
  /** Статус метода доставки:   - `NEW` — создан,   - `EDITED` — редактируется,   - `ACTIVE` — активный,   - `DISABLED` — неактивный. */
  readonly status?: string;
  /** Идентификатор услуги по доставке заказа. */
  readonly template_id?: number;
  /** Дата и время последнего обновления метода метода доставки. */
  readonly updated_at?: string;
  /** Идентификатор склада. */
  readonly warehouse_id?: number;
}

export interface IWarehouseDeliveryMethodListResponse {
  /** Признак, что в запросе вернулась только часть методов доставки: - `true` — сделайте повторный запрос с новым параметром `offset` для получения остальных методов; - `false` — ответ содержит все методы доставки по запросу. */
  readonly has_next?: boolean;
  /** Результат запроса. */
  readonly result?: IDeliveryMethodListResponseDeliveryMethod[];
}
